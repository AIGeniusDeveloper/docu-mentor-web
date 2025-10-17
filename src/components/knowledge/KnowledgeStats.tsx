'use client'

import React from 'react'
import { File, Database, CheckCircle, AlertTriangle } from 'lucide-react'

interface KnowledgeStatsProps {
  totalDocuments: number
  activeDocuments: number
  totalChunks: number
  totalSize: string
}

export const KnowledgeStats: React.FC<KnowledgeStatsProps> = ({
  totalDocuments,
  activeDocuments,
  totalChunks,
  totalSize
}) => {
  const stats = [
    {
      title: 'Documents Totaux',
      value: totalDocuments.toLocaleString(),
      icon: File,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-900'
    },
    {
      title: 'Documents Actifs',
      value: activeDocuments.toLocaleString(),
      icon: CheckCircle,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      valueColor: 'text-yellow-900'
    },
    {
      title: 'Chunks Créés',
      value: totalChunks.toLocaleString(),
      icon: Database,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-900'
    },
    {
      title: 'Taille Totale',
      value: totalSize,
      icon: File,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      valueColor: 'text-yellow-900'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor.replace('50', '100')}`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${stat.valueColor}`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.title}
                </div>
              </div>
            </div>
            
            {/* Progress bar for active documents */}
            {stat.title === 'Documents Actifs' && totalDocuments > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(activeDocuments / totalDocuments) * 100}%` }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
