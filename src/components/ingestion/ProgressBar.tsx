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
        className="h-full bg-blue-600 transition-all duration-300 ease-out rounded-xl relative"
        style={{ width: `${Math.min(progress, 100)}%` }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
      </div>
    </div>
  )
}
