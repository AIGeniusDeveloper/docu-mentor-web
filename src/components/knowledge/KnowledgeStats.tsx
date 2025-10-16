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
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-900'
    },
    {
      title: 'Documents Actifs',
      value: activeDocuments.toLocaleString(),
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      valueColor: 'text-green-900'
    },
    {
      title: 'Chunks Créés',
      value: totalChunks.toLocaleString(),
      icon: Database,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      valueColor: 'text-purple-900'
    },
    {
      title: 'Taille Totale',
      value: totalSize,
      icon: File,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      valueColor: 'text-orange-900'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-2xl p-6 shadow-lg border-2 border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor.replace('50', '100')}`}>
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
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
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
