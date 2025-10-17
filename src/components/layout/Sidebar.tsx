'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BookOpen, Search, CloudUpload, Database, BarChart3 } from 'lucide-react'

const navigationItems = [
  {
    section: 'Fonctionnalités',
    items: [
      { id: 'chat', label: 'Chat RAG', icon: Search, href: '/chat' },
      { id: 'ingestion', label: 'Ingestion Documents', icon: CloudUpload, href: '/ingestion' }
    ]
  },
  {
    section: 'Gestion',
    items: [
      { id: 'knowledge', label: 'Base de Connaissances', icon: Database, href: '/knowledge' },
      { id: 'stats', label: 'Statistiques', icon: BarChart3, href: '/stats' }
    ]
  }
]

export const Sidebar: React.FC = () => {
  const pathname = usePathname()

  return (
    <div className="w-72 bg-gray-800 flex flex-col p-8 shadow-2xl z-10">
      {/* Logo Section */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center text-gray-800 text-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <BookOpen />
          </div>
        </div>
        <div className="text-white text-xl font-bold mb-2 tracking-tight">
          Docu-Mentor
        </div>
        <div className="text-gray-400 text-sm">
          Assistant IA Documentaire
        </div>
      </div>

      {/* Navigation */}
      {navigationItems.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 pl-4">
            {section.section}
          </div>
          {section.items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 px-6 py-4 mb-2 rounded-xl transition-all duration-300 group relative',
                  isActive
                    ? 'bg-yellow-400/20 text-yellow-400 shadow-lg translate-x-2'
                    : 'text-gray-400 hover:text-white hover:bg-white/10 hover:translate-x-1'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-r-full shadow-lg" />
                )}
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      ))}
    </div>
  )
}
