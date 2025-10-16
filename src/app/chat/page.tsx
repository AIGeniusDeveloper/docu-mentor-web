'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { Message } from '@/components/chat/Message'
import { ChatInput } from '@/components/chat/ChatInput'
import { Bot } from 'lucide-react'
import { Message as MessageType } from '@/types'


const sampleMessages: MessageType[] = [
  {
    id: '1',
    content: 'Quels sont les principaux risques identifiés dans le rapport de conformité pour les opérations minières en Guinée ?',
    sender: 'user',
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: '2',
    content: `Selon l'analyse des documents ingérés, les principaux risques identifiés dans le rapport de conformité pour les opérations minières en Guinée sont :

<br><br><strong>1. Risques opérationnels</strong><br>
• Non-conformité aux procédures de sécurité minière (Section 3.2)<br>
• Défaillances des équipements de protection individuelle<br>
• Gestion inadéquate des substances dangereuses

<br><br><strong>2. Risques financiers</strong><br>
• Exposition aux fluctuations des devises (USD/GNF)<br>
• Variations des prix des matières premières<br>
• Coûts de mise en conformité réglementaire

<br><br><strong>3. Risques environnementaux</strong><br>
• Impact sur les ressources hydriques locales<br>
• Gestion des déchets miniers<br>
• Restauration des sites d'exploitation

<br><br>Ces risques nécessitent une attention particulière et des mesures de mitigation appropriées selon les standards internationaux.`,
    sender: 'ai',
    timestamp: new Date(Date.now() - 3590000),
    sources: [
      {
        id: '1',
        filename: 'Decret-041-CNM.pdf',
        page: 15,
        section: 'Section 3.2',
        type: 'pdf'
      },
      {
        id: '2',
        filename: 'Nouveau-Code-du-travail-guineen.pdf',
        page: 42,
        section: 'Article 127',
        type: 'pdf'
      },
      {
        id: '3',
        filename: 'etude_impact_environnemental.pdf',
        page: 23,
        section: 'Chapitre 5',
        type: 'pdf'
      }
    ]
  },
  {
    id: '3',
    content: 'Quelles sont les prévisions météorologiques pour demain ?',
    sender: 'user',
    timestamp: new Date(Date.now() - 1800000)
  },
  {
    id: '4',
    content: `Je suis désolé, mais les informations nécessaires pour répondre à cette question ne se trouvent pas dans la documentation interne que j'ai pu consulter. 

<br><br>Ma base de connaissances contient uniquement des documents relatifs aux opérations minières, à la conformité réglementaire et aux procédures internes. Pour des informations météorologiques, je vous recommande de consulter un service météorologique spécialisé.`,
    sender: 'ai',
    timestamp: new Date(Date.now() - 1790000),
    isError: true
  }
]

export default function ChatPage() {
  const [messages, setMessages] = useState<MessageType[]>(sampleMessages)
  const [isLoading, setIsLoading] = useState(false)
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
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simuler une réponse IA
    setTimeout(() => {
      const shouldSimulateError = Math.random() < 0.3 // 30% de chance d'erreur
      
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: shouldSimulateError
          ? `Je suis désolé, mais les informations nécessaires pour répondre à cette question ne se trouvent pas dans la documentation interne que j'ai pu consulter.

<br><br>Ma base de connaissances est spécialisée dans les documents d'entreprise et la conformité réglementaire.`
          : `Je traite votre demande concernant "<strong>${content}</strong>". Cette réponse est générée à des fins de démonstration pour le TAS 2025.

<br><br>L&apos;IA a analysé la base de connaissances et peut fournir des informations contextuelles basées sur les documents ingérés.`,
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

      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
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
          className="flex-1 overflow-y-auto p-12 space-y-6"
        >
          {/* Message de bienvenue */}
          <div className="text-center bg-white rounded-2xl p-12 shadow-md border-2 border-gray-100 mx-auto max-w-4xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="text-6xl text-blue-600 mb-6 transition-transform duration-300 hover:scale-110 hover:rotate-6">
              <Bot />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Bienvenue sur Docu-Mentor
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Posez vos questions sur la documentation interne. L&apos;IA analysera le contenu de vos documents ingérés et vous fournira des réponses précises avec les sources contextuelles.
            </p>
          </div>

          {/* Messages */}
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}

          {/* Message de chargement */}
          {isLoading && (
            <div className="max-w-[70%] p-6 rounded-2xl shadow-lg bg-white border-2 border-gray-200 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                <span className="text-gray-600 italic">
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
