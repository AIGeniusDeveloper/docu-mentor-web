'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: 'blue' | 'green' | 'yellow' | 'gray'
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
  trend
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      value: 'text-blue-900',
      accent: 'bg-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      value: 'text-green-900',
      accent: 'bg-green-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      icon: 'text-yellow-600',
      value: 'text-yellow-900',
      accent: 'bg-yellow-600'
    },
    gray: {
      bg: 'bg-gray-50',
      icon: 'text-gray-600',
      value: 'text-gray-900',
      accent: 'bg-gray-600'
    }
  }

  const colors = colorClasses[color]

  return (
    <div className={cn(
      'bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden',
      colors.bg
    )}>
      {/* Accent bar */}
      <div className={cn('absolute top-0 left-0 right-0 h-1', colors.accent)} />
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            {title}
          </h3>
          <div className={cn('text-3xl font-bold mb-1', colors.value)}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        
        <div className={cn('p-3 rounded-xl', colors.bg.replace('50', '100'))}>
          <Icon className={cn('w-6 h-6', colors.icon)} />
        </div>
      </div>

      {/* Trend indicator */}
      {trend && (
        <div className={cn(
          'flex items-center gap-1 text-sm font-semibold',
          trend.isPositive ? 'text-green-600' : 'text-red-600'
        )}>
          <span>{trend.isPositive ? '↗' : '↘'}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span className="text-gray-500 text-xs">vs mois dernier</span>
        </div>
      )}
    </div>
  )
}
