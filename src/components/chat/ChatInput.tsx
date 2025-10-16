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
    <div className="px-12 py-8 bg-white border-t-2 border-gray-200 shadow-lg">
      <form onSubmit={handleSubmit} className="flex gap-6 items-end">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Votre question
          </label>
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
            className="w-full p-5 border-2 border-gray-300 rounded-2xl font-inter text-base outline-none transition-all duration-300 bg-gray-50 resize-none min-h-[60px] max-h-[120px] focus:border-blue-600 focus:bg-white focus:shadow-lg focus:-translate-y-1 disabled:bg-gray-100 disabled:text-gray-400"
          />
        </div>
        
        <div className="flex items-end">
          <Button
            type="submit"
            disabled={disabled || isLoading || !message.trim()}
            isLoading={isLoading}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
