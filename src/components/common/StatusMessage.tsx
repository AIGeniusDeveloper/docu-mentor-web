'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

interface StatusMessageProps {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  isVisible: boolean
  onClose?: () => void
  className?: string
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  message,
  isVisible,
  onClose,
  className
}) => {
  if (!isVisible) return null

  const typeConfig = {
    success: {
      icon: CheckCircle,
      className: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300',
      iconColor: 'text-green-600'
    },
    error: {
      icon: AlertCircle,
      className: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300',
      iconColor: 'text-red-600'
    },
    warning: {
      icon: AlertCircle,
      className: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300',
      iconColor: 'text-yellow-600'
    },
    info: {
      icon: Info,
      className: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300',
      iconColor: 'text-blue-600'
    }
  }

  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div className={cn(
      'p-4 rounded-xl flex items-center gap-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-md border-2',
      config.className,
      className
    )}>
      <Icon className={cn('w-5 h-5', config.iconColor)} />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-black/10 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
