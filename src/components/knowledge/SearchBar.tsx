'use client'

import React from 'react'
import { Search, Filter, X } from 'lucide-react'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  onFilterClick: () => void
  hasActiveFilters: boolean
  resultsCount: number
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  hasActiveFilters,
  resultsCount
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher dans le catalogue de documents..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors duration-300"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={onFilterClick}
          className={`
            flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5
            ${hasActiveFilters
              ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-gray-200'
            }
          `}
        >
          <Filter className="w-5 h-5" />
          Filtres
          {hasActiveFilters && (
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-medium">
              Actifs
            </span>
          )}
        </button>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          {resultsCount} document{resultsCount > 1 ? 's' : ''} trouvé{resultsCount > 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
