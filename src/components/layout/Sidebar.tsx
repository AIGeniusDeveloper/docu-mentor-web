'use client'

import React, { useState } from 'react'
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
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Icône de collapse/expand personnalisée comme sur l'image
  const CollapseIcon = () => (
    <svg
      width="24"
      height="14"
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-400 hover:text-white transition-colors duration-300"
    >
      <rect
        x="1"
        y="1"
        width="22"
        height="12"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="4"
        y="4"
        width="3"
        height="6"
        rx="1.5"
        fill="currentColor"
      />
    </svg>
  )

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={cn(
      "bg-gray-800 flex flex-col shadow-2xl z-10 transition-all duration-300",
      isCollapsed ? "w-24 p-4" : "w-72 p-8"
    )}>
      {/* Logo Section avec bouton de collapse */}
      <div className={cn(
        "mb-8 transition-all duration-300",
        isCollapsed ? "text-center" : "text-center"
      )}>
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center text-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300",
            isCollapsed ? "w-12 h-12" : "w-16 h-16"
          )}>
            <BookOpen className={isCollapsed ? "w-6 h-6" : "w-8 h-8"} />
          </div>
          
          {/* Bouton de collapse/expand */}
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            title={isCollapsed ? "Expandir la sidebar" : "Réduire la sidebar"}
          >
            <CollapseIcon />
          </button>
        </div>
        
        {!isCollapsed && (
          <>
            <div className="text-white text-xl font-bold mb-2 tracking-tight">
              Docu-Mentor
            </div>
            <div className="text-gray-400 text-sm">
              Assistant IA Documentaire
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      {navigationItems.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          {!isCollapsed && (
            <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 pl-4">
              {section.section}
            </div>
          )}
          {section.items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            const linkContent = (
              <>
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-r-full shadow-lg" />
                )}
                <Icon className={cn(
                  "transition-transform duration-300 group-hover:scale-110",
                  isCollapsed ? "w-6 h-6" : "w-5 h-5"
                )} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </>
            )
            
            return (
              <div key={item.id} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center transition-all duration-300 group relative',
                    isCollapsed 
                      ? 'px-4 py-4 mb-3 rounded-xl justify-center' 
                      : 'gap-4 px-6 py-4 mb-2 rounded-xl',
                    isActive
                      ? 'bg-yellow-400/20 text-yellow-400 shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10',
                    !isCollapsed && isActive && 'translate-x-2',
                    !isCollapsed && !isActive && 'hover:translate-x-1'
                  )}
                >
                  {linkContent}
                </Link>
                
                {/* Tooltip pour l'état collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
