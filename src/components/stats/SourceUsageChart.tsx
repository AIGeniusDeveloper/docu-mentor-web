'use client'

import React from 'react'
import { SourceUsage } from '@/types'

interface SourceUsageChartProps {
  data: SourceUsage[]
  title: string
}

export const SourceUsageChart: React.FC<SourceUsageChartProps> = ({ data, title }) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-yellow-500',
    'bg-purple-500',
    'bg-red-500'
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      
      <div className="space-y-4">
        {data.map((source, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`} />
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-800 truncate">
                  {source.documentName}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {source.percentage}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${colors[index % colors.length]}`}
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {source.usageCount} utilisations
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="text-sm text-gray-600">
          <strong>Top 5</strong> des documents les plus cités comme source de réponse par l&apos;IA
        </div>
      </div>
    </div>
  )
}
