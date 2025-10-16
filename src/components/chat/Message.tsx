'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { formatTimestamp } from '@/lib/utils'
import { Bot, User } from 'lucide-react'
import { Message as MessageType } from '@/types'

interface MessageProps {
  message: MessageType
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user'
  const isError = message.isError

  return (
    <div className={cn(
      'max-w-[70%] p-6 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
      isUser 
        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white ml-auto' 
        : isError
        ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 text-yellow-800 italic'
        : 'bg-white text-gray-800 border-2 border-gray-200'
    )}>
      {/* Message Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-transform duration-300',
          isUser 
            ? 'bg-white/20 text-white' 
            : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
        )}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        <span className="font-semibold text-sm">
          {isUser ? 'Utilisateur' : 'Docu-Mentor IA'}
        </span>
      </div>

      {/* Message Content */}
      <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: message.content }} />

      {/* Sources */}
      {message.sources && message.sources.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-3 hover:text-blue-700 transition-colors duration-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Contextes utilisés par l&apos;IA
          </div>
          <div className="space-y-2">
            {message.sources.map((source) => (
              <div key={source.id} className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer transition-all duration-300 hover:text-blue-600 hover:border-blue-500 border border-gray-200 hover:-translate-y-1 hover:shadow-md">
                <div className="text-red-500 text-lg">
                  📄
                </div>
                <div>
                  <strong className="text-sm">{source.filename}</strong>
                  {source.page && source.section && (
                    <span className="text-xs text-gray-500 ml-2">
                      - Page {source.page}, {source.section}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Warning */}
      {isError && (
        <div className="flex items-center gap-2 mt-4 p-3 bg-yellow-200 rounded-lg border-l-4 border-yellow-400">
          <div className="text-yellow-600 text-lg">⚠️</div>
          <div className="font-bold text-yellow-800 text-sm">Informations non disponibles</div>
        </div>
      )}

      {/* Timestamp */}
      <div className="text-xs opacity-70 mt-4">
        {formatTimestamp(message.timestamp)}
      </div>
    </div>
  )
}
