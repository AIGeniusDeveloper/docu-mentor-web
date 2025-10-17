'use client'

import React, { useState, useEffect } from 'react'
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
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Effet de frappe pour les messages IA
  useEffect(() => {
    if (isUser || isError) {
      setDisplayedText(message.content)
      return
    }

    setIsTyping(true)
    let currentIndex = 0
    const text = message.content

    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex += Math.random() * 3 + 1 // Vitesse variable comme ChatGPT
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 30) // Vitesse rapide

    return () => clearInterval(typeInterval)
  }, [message.content, isUser, isError])

  return (
    <div className={cn(
      'transition-all duration-500',
      isUser ? 'max-w-[70%] ml-auto' : 'max-w-[95%]'
    )}>
      {isUser ? (
        /* Bloc bleu stylisé pour les questions utilisateur */
        <div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm">Vous</span>
            </div>
            <div className="leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: message.content }} />
          </div>
          <div className="text-xs text-gray-400 mt-3 text-right">
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
      ) : (
        /* Style intégré pour les réponses IA */
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center transition-transform duration-300">
              {isError ? <AlertTriangle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <span className="font-semibold text-sm text-gray-700">
              {isError ? 'Erreur' : 'Docu-Mentor'}
            </span>
          </div>
          <div className="leading-relaxed text-lg text-gray-700 font-normal">
            {isError ? (
              <div dangerouslySetInnerHTML={{ __html: message.content }} />
            ) : (
              <div className="space-y-4">
                <div 
                  className="max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: displayedText.replace(
                      /\*\*(.*?)\*\*/g, 
                      '<strong class="font-bold text-gray-900">$1</strong>'
                    ).replace(
                      /•/g, 
                      '<span class="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2 mt-2"></span>'
                    )
                  }} 
                />
                {isTyping && (
                  <span className="inline-block w-2 h-6 bg-blue-600 ml-1 animate-pulse" />
                )}
              </div>
            )}
          </div>

          {/* Sources - seulement pour les réponses IA */}
          {message.sources && message.sources.length > 0 && !isTyping && (
            <div className="mt-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-3">
                <FileText className="w-4 h-4" />
                Sources utilisées
              </div>
              <div className="flex flex-wrap gap-2">
                {message.sources.map((source) => (
                  <div key={source.id} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 hover:bg-blue-100 transition-colors duration-300">
                    <span className="text-xs">📄</span>
                    <span className="font-medium">{source.filename}</span>
                    {source.page && (
                      <span className="text-xs text-blue-500">
                        p.{source.page}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Warning - seulement pour les réponses IA */}
          {isError && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <div className="font-medium text-yellow-800 text-sm">Informations non disponibles</div>
            </div>
          )}

          {/* Timestamp */}
          <div className="text-xs text-gray-400 mt-3">
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
      )}
    </div>
  )
}
