'use client'

import React, { useState, useMemo } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { DocumentCard } from '@/components/knowledge/DocumentCard'
import { SearchBar } from '@/components/knowledge/SearchBar'
import { KnowledgeStats } from '@/components/knowledge/KnowledgeStats'
import { Button } from '@/components/ui/Button'
import { Plus, Download, Settings } from 'lucide-react'
import { KnowledgeDocument } from '@/types'

// Données de démonstration
const sampleDocuments: KnowledgeDocument[] = [
  {
    id: '1',
    name: 'decret-041-cnm',
    originalName: 'Decret-041-CNM.pdf',
    size: 2048576,
    type: 'application/pdf',
    status: 'active',
    uploadDate: new Date(Date.now() - 86400000 * 7),
    lastIngestionDate: new Date(Date.now() - 86400000 * 2),
    chunksCount: 156,
    sourceCount: 89,
    isActive: true,
    metadata: {
      author: 'Ministère des Mines',
      department: 'CNM',
      category: 'Réglementation',
      tags: ['décret', 'mines', 'réglementation', 'CNM']
    }
  },
  {
    id: '2',
    name: 'nouveau-code-travail',
    originalName: 'Nouveau-Code-du-travail-guineen.pdf',
    size: 5124096,
    type: 'application/pdf',
    status: 'active',
    uploadDate: new Date(Date.now() - 86400000 * 14),
    lastIngestionDate: new Date(Date.now() - 86400000 * 5),
    chunksCount: 423,
    sourceCount: 234,
    isActive: true,
    metadata: {
      author: 'Assemblée Nationale',
      department: 'Travail',
      category: 'Législation',
      tags: ['code', 'travail', 'droits', 'employés']
    }
  },
  {
    id: '3',
    name: 'etude-impact-environnemental',
    originalName: 'etude_impact_environnemental.pdf',
    size: 3072000,
    type: 'application/pdf',
    status: 'active',
    uploadDate: new Date(Date.now() - 86400000 * 21),
    lastIngestionDate: new Date(Date.now() - 86400000 * 1),
    chunksCount: 289,
    sourceCount: 156,
    isActive: true,
    metadata: {
      author: 'Ministère de l\'Environnement',
      department: 'Écologie',
      category: 'Étude',
      tags: ['environnement', 'impact', 'étude', 'écologie']
    }
  },
  {
    id: '4',
    name: 'procedures-securite',
    originalName: 'procedures_securite.pdf',
    size: 1536000,
    type: 'application/pdf',
    status: 'inactive',
    uploadDate: new Date(Date.now() - 86400000 * 30),
    lastIngestionDate: new Date(Date.now() - 86400000 * 15),
    chunksCount: 98,
    sourceCount: 45,
    isActive: false,
    metadata: {
      author: 'Service Sécurité',
      department: 'Sécurité',
      category: 'Procédures',
      tags: ['sécurité', 'procédures', 'santé']
    }
  },
  {
    id: '5',
    name: 'rapport-environnemental',
    originalName: 'rapport_environnemental.pdf',
    size: 4096000,
    type: 'application/pdf',
    status: 'active',
    uploadDate: new Date(Date.now() - 86400000 * 45),
    lastIngestionDate: new Date(Date.now() - 86400000 * 3),
    chunksCount: 312,
    sourceCount: 178,
    isActive: true,
    metadata: {
      author: 'Bureau d\'Études',
      department: 'Environnement',
      category: 'Rapport',
      tags: ['rapport', 'environnement', 'bilan', 'annuel']
    }
  }
]

export default function KnowledgePage() {
  const [documents] = useState<KnowledgeDocument[]>(sampleDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [hasActiveFilters, setHasActiveFilters] = useState(false)

  // Filtrage des documents
  const filteredDocuments = useMemo(() => {
    if (!searchTerm) return documents
    
    return documents.filter(doc =>
      doc.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.metadata?.tags?.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      doc.metadata?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.metadata?.department?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [documents, searchTerm])

  // Calcul des statistiques
  const stats = useMemo(() => {
    const totalDocuments = documents.length
    const activeDocuments = documents.filter(d => d.isActive).length
    const totalChunks = documents.reduce((sum, doc) => sum + doc.chunksCount, 0)
    const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0)
    
    return {
      totalDocuments,
      activeDocuments,
      totalChunks,
      totalSize: `${(totalSize / 1024 / 1024 / 1024).toFixed(2)} GB`
    }
  }, [documents])

  const handleToggleActive = (id: string) => {
    // Simulation de la logique de basculement
    console.log('Toggle active for document:', id)
  }

  const handleDelete = (id: string) => {
    // Simulation de la suppression
    console.log('Delete document:', id)
  }

  const handleViewDetails = (id: string) => {
    // Simulation de l'affichage des détails
    console.log('View details for document:', id)
  }

  const handleExport = () => {
    // Simulation de l'export
    console.log('Exporting knowledge base')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Base de Connaissances"
          subtitle="Gestion du catalogue de documents sources de l'IA"
          actions={
            <>
              <Button variant="outline" size="md">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button variant="outline" size="md">
                <Settings className="w-4 h-4" />
                Paramètres
              </Button>
              <Button variant="primary" size="md">
                <Plus className="w-4 h-4" />
                Nouveau Document
              </Button>
            </>
          }
        />
        
        <div className="flex-1 overflow-y-auto p-12">
          {/* Statistiques */}
          <KnowledgeStats
            totalDocuments={stats.totalDocuments}
            activeDocuments={stats.activeDocuments}
            totalChunks={stats.totalChunks}
            totalSize={stats.totalSize}
          />

          {/* Barre de recherche */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onFilterClick={() => setShowFilters(!showFilters)}
            hasActiveFilters={hasActiveFilters}
            resultsCount={filteredDocuments.length}
          />

          {/* Filtres (à implémenter) */}
          {showFilters && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Filtres avancés</h3>
              <p className="text-gray-600">Fonctionnalité de filtrage à venir...</p>
            </div>
          )}

          {/* Liste des documents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onToggleActive={handleToggleActive}
                onDelete={handleDelete}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                {searchTerm 
                  ? 'Aucun document trouvé pour cette recherche'
                  : 'Aucun document dans la base de connaissances'
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
