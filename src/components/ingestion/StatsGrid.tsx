'use client'

import React from 'react'
import { Stats } from '@/types'

interface StatsGridProps {
  stats: Stats
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const statCards = [
    {
      number: stats.totalDocuments.toString(),
      label: 'Documents',
      color: 'from-blue-600 to-blue-700'
    },
    {
      number: stats.totalSize,
      label: 'Stockage',
      color: 'from-green-600 to-green-700'
    },
    {
      number: `${stats.successRate}%`,
      label: 'Succès',
      color: 'from-purple-600 to-purple-700'
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-2xl shadow-md border-2 border-gray-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-105 relative overflow-hidden"
        >
          {/* Gradient border top */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 transition-transform duration-300 hover:scale-x-100`} />
          
          <div className={`text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2 transition-transform duration-300 hover:scale-110`}>
            {stat.number}
          </div>
          <div className="text-gray-600 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
