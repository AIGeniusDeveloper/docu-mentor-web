import { useState } from 'react'
import { IngestionService, IngestionResponse } from '@/services/api'

export interface IngestionStatus {
  isProcessing: boolean
  progress: number
  statusMessage: string
  showProgress: boolean
}

export const useIngestionAPI = () => {
  const [ingestionStatus, setIngestionStatus] = useState<IngestionStatus>({
    isProcessing: false,
    progress: 0,
    statusMessage: '',
    showProgress: false
  })

  const uploadDocuments = async (files: File[]): Promise<void> => {
    if (files.length === 0) return

    setIngestionStatus({
      isProcessing: true,
      progress: 0,
      statusMessage: 'Préparation de l\'ingestion...',
      showProgress: true
    })

    try {
      // Simulation du progrès
      const progressInterval = setInterval(() => {
        setIngestionStatus(prev => {
          if (prev.progress >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return {
            ...prev,
            progress: prev.progress + Math.random() * 15
          }
        })
      }, 200)

      // Appel à l'API d'ingestion
      const response: IngestionResponse = await IngestionService.uploadDocuments(files)
      
      clearInterval(progressInterval)

      if (response.status === 'success') {
        setIngestionStatus({
          isProcessing: false,
          progress: 100,
          statusMessage: response.message,
          showProgress: true
        })

        // Masquer le progrès après 3 secondes
        setTimeout(() => {
          setIngestionStatus(prev => ({
            ...prev,
            showProgress: false,
            progress: 0
          }))
        }, 3000)
      } else {
        setIngestionStatus({
          isProcessing: false,
          progress: 0,
          statusMessage: response.message,
          showProgress: false
        })
      }
    } catch (error) {
      console.error('Erreur lors de l\'ingestion:', error)
      
      setIngestionStatus({
        isProcessing: false,
        progress: 0,
        statusMessage: 'Erreur lors de l\'ingestion des documents. Veuillez réessayer.',
        showProgress: false
      })
    }
  }

  const resetStatus = () => {
    setIngestionStatus({
      isProcessing: false,
      progress: 0,
      statusMessage: '',
      showProgress: false
    })
  }

  return {
    ingestionStatus,
    uploadDocuments,
    resetStatus
  }
}

