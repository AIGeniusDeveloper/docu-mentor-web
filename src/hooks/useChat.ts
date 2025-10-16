'use client'

import { useState, useCallback } from 'react'
import { Message } from '@/types'

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message])
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    }

    addMessage(userMessage)
    setIsLoading(true)

    try {
      // Simuler l'appel API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const shouldSimulateError = Math.random() < 0.3
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: shouldSimulateError
          ? `Je suis désolé, mais les informations nécessaires pour répondre à cette question ne se trouvent pas dans la documentation interne que j'ai pu consulter.

<br><br>Ma base de connaissances est spécialisée dans les documents d'entreprise et la conformité réglementaire.`
          : `Je traite votre demande concernant "<strong>${content}</strong>". Cette réponse est générée à des fins de démonstration.

<br><br>L'IA a analysé la base de connaissances et peut fournir des informations contextuelles basées sur les documents ingérés.`,
        sender: 'ai',
        timestamp: new Date(),
        isError: shouldSimulateError,
        sources: shouldSimulateError ? undefined : [
          {
            id: '1',
            filename: 'document_exemple.pdf',
            page: 1,
            section: 'Section 1.1',
            type: 'pdf'
          }
        ]
      }

      addMessage(aiMessage)
    } finally {
      setIsLoading(false)
    }
  }, [addMessage])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isLoading,
    sendMessage,
    addMessage,
    clearMessages
  }
}
