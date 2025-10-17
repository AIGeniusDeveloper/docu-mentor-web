'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { History, Download, Settings } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle: string
  actions?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <header className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-blue-600 mb-0.5">{title}</h1>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      
      <div className="flex gap-4 items-center">
        {actions || (
          <>
            <Button variant="outline" size="md">
              <History className="w-4 h-4" />
              Historique
            </Button>
            <Button variant="outline" size="md">
              <Download className="w-4 h-4" />
              Exporter
            </Button>
            <Button variant="outline" size="md">
              <Settings className="w-4 h-4" />
              Paramètres
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
