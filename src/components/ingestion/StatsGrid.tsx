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
      color: 'blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      number: stats.totalSize,
      label: 'Stockage',
      color: 'yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      number: `${stats.successRate}%`,
      label: 'Succès',
      color: 'blue-600',
      bgColor: 'bg-blue-50'
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} p-6 rounded-xl shadow-sm border border-gray-200 text-center transition-all duration-300 hover:shadow-md`}
        >
          <div className={`text-3xl font-bold text-${stat.color} mb-2`}>
            {stat.number}
          </div>
          <div className="text-gray-600 font-medium text-sm">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
