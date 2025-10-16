'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  isVisible: boolean
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  isVisible, 
  className 
}) => {
  if (!isVisible) return null

  return (
    <div className={cn('w-full h-4 bg-gray-200 rounded-xl overflow-hidden shadow-inner', className)}>
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-blue-700 to-yellow-400 transition-all duration-300 ease-out rounded-xl shadow-lg relative"
        style={{ width: `${Math.min(progress, 100)}%` }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
      </div>
    </div>
  )
}
