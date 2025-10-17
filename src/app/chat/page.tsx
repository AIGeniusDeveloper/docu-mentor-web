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
          className="flex-1 overflow-y-auto flex flex-col"
        >
          {messages.length === 0 ? (
            /* Écran de bienvenue centré - tout visible sans scroll */
            <div className="flex-1 flex flex-col items-center justify-center p-4 relative min-h-0">
              {/* Fond dégradé subtil */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-yellow-50/30"></div>
              
              {/* Contenu centré - tailles augmentées mais toujours centré */}
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Titre principal - plus grand */}
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-4 tracking-tight leading-tight">
                  Docu-Mentor
                </h1>
                
                {/* Ligne décorative - plus grande */}
                <div className="h-1.5 w-32 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mx-auto mb-6 shadow-lg"></div>
                
                {/* Description - plus grande */}
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
                  Posez vos questions sur la documentation interne et obtenez des réponses précises avec sources fiables.
                </p>

                {/* Input de chat centré */}
                <div className="max-w-2xl mx-auto mb-8">
                  <ChatInput 
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    isCentered={true}
                  />
                </div>

                {/* Suggestions de questions - plus grandes */}
                <div>
                  <p className="text-base text-gray-500 mb-4 font-medium">Questions suggérées :</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      "Quels sont les risques dans les opérations minières ?",
                      "Expliquez l'essayage virtuel",
                      "Code minier guinéen",
                      "Mesures de sécurité"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="px-4 py-2 bg-white/80 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-full text-sm text-gray-700 hover:text-blue-700 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Conversation normale */
            <div className="p-8 space-y-6 flex flex-col items-center">
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
          )}
        </div>
        
        {/* Input en bas seulement quand il y a des messages */}
        {messages.length > 0 && (
          <div className="pb-6">
            <ChatInput 
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  )
}
