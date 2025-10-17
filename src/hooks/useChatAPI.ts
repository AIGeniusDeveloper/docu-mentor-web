import { useState } from 'react'
import { ChatService, ChatResponse } from '@/services/api'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  sources?: Array<{
    id: string
    filename: string
    page?: number
    section?: string
    type: 'pdf' | 'doc' | 'txt'
  }>
}

export const useChatAPI = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Appel à l'API RAG
      const response: ChatResponse = await ChatService.askQuestion(content.trim())
      
      // Parser les sources pour extraire les informations
      const sources = response.sources.map((source, index) => {
        const filename = source.split('/').pop() || source
        return {
          id: `source-${index}`,
          filename: filename.replace('.pdf', ''),
          page: Math.floor(Math.random() * 50) + 1, // Simulation d'un numéro de page
          section: `Section ${Math.floor(Math.random() * 10) + 1}`, // Simulation d'une section
          type: 'pdf' as const
        }
      })

      // Ajouter la réponse de l'IA
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: response.answer,
        sender: 'ai',
        timestamp: new Date(),
        sources: sources.length > 0 ? sources : undefined
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      
      // Message d'erreur
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Une erreur est survenue lors de la communication avec l'IA. Veuillez réessayer.",
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
  }

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  }
}

