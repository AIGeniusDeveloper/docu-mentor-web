'use client'

import React, { useEffect, useRef } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { Message } from '@/components/chat/Message'
import { ChatInput } from '@/components/chat/ChatInput'
import { Bot } from 'lucide-react'
import { useChatAPI } from '@/hooks/useChatAPI'


export default function ChatPage() {
  const { messages, isLoading, sendMessage } = useChatAPI()
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    await sendMessage(content)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Chat RAG"
          subtitle="Assistant IA pour l'analyse documentaire intelligente"
        />
        
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col items-center"
        >
          {/* Message de bienvenue simple et stylé */}
          <div className="text-center w-full max-w-5xl">
            <h2 className="text-6xl font-bold text-blue-600 mb-6 tracking-tight">
              Bienvenue sur Docu-Mentor
            </h2>
            <div className="h-2 w-40 bg-yellow-400 rounded-full mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Posez vos questions sur la documentation interne et obtenez des réponses précises avec sources.
            </p>
          </div>

          {/* Messages */}
          <div className="w-full max-w-4xl space-y-6">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>

          {/* Message de chargement */}
          {isLoading && (
            <div className="max-w-[70%] p-6 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20 flex items-center gap-4 mx-auto">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                <span className="text-gray-600">
                  L&apos;IA analyse vos documents et prépare une réponse contextuelle...
                </span>
              </div>
            </div>
          )}
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
