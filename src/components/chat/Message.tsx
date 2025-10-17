'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { formatTimestamp } from '@/lib/utils'
import { Bot, User, FileText, AlertTriangle } from 'lucide-react'
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
        ? 'bg-blue-600 text-white ml-auto' 
        : isError
        ? 'bg-yellow-100 border-2 border-yellow-400 text-yellow-800'
        : 'bg-white text-gray-800 border-2 border-gray-200'
    )}>
      {/* Message Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-transform duration-300',
          isUser 
            ? 'bg-white/20 text-white' 
            : isError
            ? 'bg-yellow-400 text-white'
            : 'bg-blue-600 text-white'
        )}>
          {isUser ? <User className="w-4 h-4" /> :
           isError ? <AlertTriangle className="w-4 h-4" /> :
           <Bot className="w-4 h-4" />}
        </div>
        <span className="font-semibold text-sm">
          {isUser ? 'Utilisateur' : 'Docu-Mentor IA'}
        </span>
      </div>

      {/* Message Content */}
      <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: message.content }} />

      {/* Sources */}
      {message.sources && message.sources.length > 0 && (
        <div className="mt-6 p-4 bg-white/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-3 hover:text-blue-700 transition-colors duration-300">
            <FileText className="w-4 h-4" />
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
        <div className="flex items-center gap-2 mt-4 p-3 bg-yellow-200/80 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
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
