import { useState, useEffect } from 'react'
import { KnowledgeService, Document } from '@/services/api'
import { KnowledgeDocument } from '@/types'

export const useKnowledgeAPI = () => {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDocuments, setFilteredDocuments] = useState<KnowledgeDocument[]>([])

  // Charger la liste des documents
  const loadDocuments = async () => {
    setIsLoading(true)
    try {
      const response = await KnowledgeService.getDocumentsList()
      // Convertir les documents de l'API vers le format attendu
      const convertedDocuments: KnowledgeDocument[] = response.documents.map(doc => ({
        id: doc.id,
        name: doc.name,
        originalName: doc.originalName,
        size: doc.size,
        type: 'application/pdf',
        status: doc.status,
        uploadDate: new Date(doc.uploadDate),
        lastIngestionDate: new Date(doc.lastIngestionDate),
        chunksCount: doc.chunksCount,
        sourceCount: doc.sourceCount,
        isActive: doc.isActive,
        metadata: doc.metadata
      }))
      setDocuments(convertedDocuments)
      setFilteredDocuments(convertedDocuments)
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error)
      // En cas d'erreur, utiliser des données mock
      const mockDocuments: KnowledgeDocument[] = [
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
            tags: ['décret', 'mines', 'réglementation', 'CNM']
          }
        }
      ]
      setDocuments(mockDocuments)
      setFilteredDocuments(mockDocuments)
    } finally {
      setIsLoading(false)
    }
  }

  // Charger les documents au montage du composant
  useEffect(() => {
    loadDocuments()
  }, [])

  // Filtrer les documents selon le terme de recherche
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDocuments(documents)
    } else {
      const filtered = documents.filter(doc =>
        doc.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.metadata?.tags?.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      setFilteredDocuments(filtered)
    }
  }, [searchTerm, documents])

  // Basculer le statut actif/inactif d'un document
  const toggleDocumentStatus = async (documentId: string) => {
    try {
      const document = documents.find(doc => doc.id === documentId)
      if (!document) return

      const response = await KnowledgeService.toggleDocumentStatus(
        documentId, 
        !document.isActive
      )

      if (response.success) {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === documentId 
              ? { ...doc, isActive: !doc.isActive }
              : doc
          )
        )
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error)
    }
  }

  // Supprimer un document
  const deleteDocument = async (documentId: string) => {
    try {
      const response = await KnowledgeService.deleteDocument(documentId)

      if (response.success) {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId))
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  // Voir les détails d'un document (pour l'instant juste un log)
  const viewDocumentDetails = (documentId: string) => {
    const document = documents.find(doc => doc.id === documentId)
    if (document) {
      console.log('Détails du document:', document)
      // Ici vous pourriez ouvrir une modal ou naviguer vers une page de détails
    }
  }

  return {
    documents: filteredDocuments,
    allDocuments: documents,
    isLoading,
    searchTerm,
    setSearchTerm,
    toggleDocumentStatus,
    deleteDocument,
    viewDocumentDetails,
    reloadDocuments: loadDocuments
  }
}
