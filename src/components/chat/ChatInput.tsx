'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
  disabled?: boolean
  isCentered?: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading = false, 
  disabled = false,
  isCentered = false
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

  if (isCentered) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
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
            rows={3}
            className="w-full p-5 pr-20 border-2 border-gray-200 rounded-3xl font-inter text-lg outline-none transition-all duration-300 bg-white/90 backdrop-blur-sm resize-none min-h-[80px] max-h-[150px] focus:border-blue-500 focus:bg-white focus:shadow-2xl focus:-translate-y-2 disabled:bg-gray-100 disabled:text-gray-400 shadow-lg hover:shadow-xl"
          />
          <button
            type="submit"
            disabled={disabled || isLoading || !message.trim()}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
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
          className="w-full p-4 pr-16 border-2 border-gray-200 rounded-3xl font-inter text-lg outline-none transition-all duration-300 bg-white/90 backdrop-blur-sm resize-none min-h-[60px] max-h-[120px] focus:border-blue-500 focus:bg-white focus:shadow-2xl focus:-translate-y-2 disabled:bg-gray-100 disabled:text-gray-400 shadow-lg hover:shadow-xl"
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !message.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-6 h-6" />
          )}
        </button>
      </div>
    </form>
  )
}
