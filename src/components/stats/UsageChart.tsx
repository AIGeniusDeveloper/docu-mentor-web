'use client'

import React from 'react'
import { UsageData } from '@/types'

interface UsageChartProps {
  data: UsageData[]
  title: string
}

export const UsageChart: React.FC<UsageChartProps> = ({ data, title }) => {
  // Simulation d'un graphique simple avec des barres CSS
  const maxValue = Math.max(...data.map(d => d.queries))
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      
      <div className="space-y-4">
        {data.slice(-7).map((item, index) => {
          const height = (item.queries / maxValue) * 100
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600 font-medium">
                {new Date(item.date).toLocaleDateString('fr-FR', { 
                  weekday: 'short',
                  day: 'numeric'
                })}
              </div>
              
              <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 hover:from-blue-600 hover:to-blue-700"
                  style={{ width: `${height}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                  {item.queries > 0 && item.queries}
                </div>
              </div>
              
              <div className="w-12 text-sm text-gray-600 font-medium text-right">
                {item.queries}
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        Dernières 7 activités
      </div>
    </div>
  )
}
