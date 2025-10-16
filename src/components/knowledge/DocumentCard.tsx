'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { formatFileSize, formatTimestamp } from '@/lib/utils'
import { KnowledgeDocument } from '@/types'
import { File, Calendar, Database, Eye, EyeOff, Trash2, MoreVertical } from 'lucide-react'

interface DocumentCardProps {
  document: KnowledgeDocument
  onToggleActive: (id: string) => void
  onDelete: (id: string) => void
  onViewDetails: (id: string) => void
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onToggleActive,
  onDelete,
  onViewDetails
}) => {
  const getStatusColor = (status: KnowledgeDocument['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-xl">
            <File className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
              {document.originalName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                'px-2 py-1 rounded-full text-xs font-semibold border',
                getStatusColor(document.status)
              )}>
                {document.status === 'active' ? 'Actif' : 
                 document.status === 'inactive' ? 'Inactif' :
                 document.status === 'processing' ? 'Traitement' : 'Erreur'}
              </span>
              <span className="text-xs text-gray-500">
                {formatFileSize(document.size)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleActive(document.id)}
            className={cn(
              'p-2 rounded-lg transition-all duration-300',
              document.isActive
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
            title={document.isActive ? 'Désactiver' : 'Activer'}
          >
            {document.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => onDelete(document.id)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-300"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Upload: {formatTimestamp(document.uploadDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Dernière ingestion: {formatTimestamp(document.lastIngestionDate)}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">Chunks</span>
          </div>
          <div className="text-xl font-bold text-blue-900">
            {document.chunksCount.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <File className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-800">Sources</span>
          </div>
          <div className="text-xl font-bold text-green-900">
            {document.sourceCount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tags */}
      {document.metadata?.tags && document.metadata.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {document.metadata.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {document.metadata.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{document.metadata.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails(document.id)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
        >
          Voir les détails
        </button>
      </div>
    </div>
  )
}
