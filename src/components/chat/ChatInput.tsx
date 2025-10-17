'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
  disabled?: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading = false, 
  disabled = false 
}) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 shadow-xl">
      <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onInput={handleInput}
            placeholder="Posez votre question sur la documentation interne ici..."
            disabled={disabled || isLoading}
            maxLength={1000}
            rows={2}
            className="w-full p-4 pr-16 border border-gray-300 rounded-2xl font-inter text-base outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none min-h-[60px] max-h-[120px] focus:border-blue-600 focus:bg-white focus:shadow-lg focus:-translate-y-1 disabled:bg-gray-100 disabled:text-gray-400"
          />
          <button
            type="submit"
            disabled={disabled || isLoading || !message.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
