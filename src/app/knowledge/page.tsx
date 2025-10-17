'use client'

import React, { useState, useMemo } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { XCard } from '@/components/ui/x-gradient-card'
import { SearchBar } from '@/components/knowledge/SearchBar'
import { HoverEffect } from '@/components/ui/hover-effect'
import { Button } from '@/components/ui/Button'
import { Plus, Download, Settings, File, Database, CheckCircle } from 'lucide-react'
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
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Statistiques */}
          <HoverEffect 
            items={[
              {
                title: "Documents Totaux",
                description: "Tous les documents dans la base",
                value: stats.totalDocuments.toLocaleString(),
                icon: <File className="w-8 h-8 text-blue-600" />
              },
              {
                title: "Documents Actifs",
                description: "Documents disponibles pour l'IA",
                value: stats.activeDocuments.toLocaleString(),
                icon: <CheckCircle className="w-8 h-8 text-yellow-600" />
              },
              {
                title: "Chunks Créés",
                description: "Segments de texte indexés",
                value: stats.totalChunks.toLocaleString(),
                icon: <Database className="w-8 h-8 text-blue-600" />
              },
              {
                title: "Taille Totale",
                description: "Espace de stockage utilisé",
                value: stats.totalSize,
                icon: <File className="w-8 h-8 text-yellow-600" />
              }
            ]}
            className="mb-6"
          />

          {/* Barre de recherche */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onFilterClick={() => setShowFilters(!showFilters)}
            hasActiveFilters={hasActiveFilters}
            resultsCount={filteredDocuments.length}
          />

          {/* Filtres avancés */}
          {showFilters && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                Filtres avancés
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Statut</label>
                  <select className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="processing">En traitement</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Catégorie</label>
                  <select className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Toutes les catégories</option>
                    <option value="Réglementation">Réglementation</option>
                    <option value="Législation">Législation</option>
                    <option value="Procédures">Procédures</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Taille</label>
                  <select className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Toutes les tailles</option>
                    <option value="small">&lt; 1MB</option>
                    <option value="medium">1MB - 5MB</option>
                    <option value="large">&gt; 5MB</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Appliquer les filtres
                </Button>
                <Button variant="outline" onClick={() => setShowFilters(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}

          {/* Liste des documents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => (
              <XCard
                key={document.id}
                documentName={document.originalName}
                documentType="PDF"
                documentSize={`${(document.size / 1024 / 1024).toFixed(1)} MB`}
                uploadDate={document.uploadDate.toLocaleDateString('fr-FR')}
                status={document.status}
                chunksCount={document.chunksCount}
                sourceCount={document.sourceCount}
                tags={document.metadata?.tags}
                onToggleActive={() => handleToggleActive(document.id)}
                onDelete={() => handleDelete(document.id)}
                onViewDetails={() => handleViewDetails(document.id)}
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
