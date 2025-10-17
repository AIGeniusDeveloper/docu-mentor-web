'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { FileUpload } from '@/components/ingestion/FileUpload'
import { StatsGrid } from '@/components/ingestion/StatsGrid'
import { ProgressBar } from '@/components/ingestion/ProgressBar'
import { HistoryTable } from '@/components/ingestion/HistoryTable'
import { Button } from '@/components/ui/Button'
import { Rocket, CheckCircle, AlertCircle } from 'lucide-react'
import { Document, Stats } from '@/types'

const sampleStats: Stats = {
  totalDocuments: 247,
  totalSize: '1.2GB',
  successRate: 98
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Decret-041-CNM.pdf',
    size: 2048576,
    type: 'application/pdf',
    status: 'success',
    uploadDate: new Date(Date.now() - 3600000)
  },
  {
    id: '2',
    name: 'Nouveau-Code-du-travail-guineen.pdf',
    size: 5124096,
    type: 'application/pdf',
    status: 'success',
    uploadDate: new Date(Date.now() - 7200000)
  },
  {
    id: '3',
    name: 'document_corrompu.pdf',
    size: 1024000,
    type: 'application/pdf',
    status: 'error',
    uploadDate: new Date(Date.now() - 9000000),
    errorMessage: 'Fichier corrompu'
  },
  {
    id: '4',
    name: 'procedures_securite.pdf',
    size: 3072000,
    type: 'application/pdf',
    status: 'processing',
    uploadDate: new Date(Date.now() - 1800000)
  },
  {
    id: '5',
    name: 'etude_marche_2024.pdf',
    size: 6144000,
    type: 'application/pdf',
    status: 'success',
    uploadDate: new Date(Date.now() - 10800000)
  },
  {
    id: '6',
    name: 'rapport_environnemental.pdf',
    size: 4096000,
    type: 'application/pdf',
    status: 'success',
    uploadDate: new Date(Date.now() - 86400000)
  }
]

export default function IngestionPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error'
    text: string
    visible: boolean
  }>({
    type: 'success',
    text: '',
    visible: false
  })

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files)
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text, visible: true })
    setTimeout(() => {
      setStatusMessage(prev => ({ ...prev, visible: false }))
    }, 8000)
  }

  const handleIngestion = async () => {
    if (selectedFiles.length === 0) return

    setIsProcessing(true)
    setShowProgress(true)
    setProgress(0)
    setStatusMessage(prev => ({ ...prev, visible: false }))

    // Simuler le processus d'ingestion
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 8 + 2
        const newProgress = Math.min(prev + increment, 100)
        
        if (newProgress >= 100) {
          clearInterval(interval)
          
          setTimeout(() => {
            setIsProcessing(false)
            setShowProgress(false)
            setProgress(0)
            showStatus('success', `${selectedFiles.length} document(s) ingéré(s) avec succès dans la base de connaissances IA`)
            setSelectedFiles([])
          }, 1000)
        }
        
        return newProgress
      })
    }, 300)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Ingestion de Documents"
          subtitle="Ajoutez vos documents PDF à la base de connaissances IA"
        />
        
        <div className="flex-1 overflow-y-auto p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section Upload */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border-2 border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-blue-600">
                  Sélection de Documents
                </h2>
              </div>
              
              <StatsGrid stats={sampleStats} />
              
              <FileUpload
                onFilesSelected={handleFilesSelected}
                onRemoveFile={handleRemoveFile}
                selectedFiles={selectedFiles}
              />
              
              <Button
                onClick={handleIngestion}
                disabled={selectedFiles.length === 0 || isProcessing}
                isLoading={isProcessing}
                className="w-full mt-8 py-4 text-lg"
              >
                <Rocket className="w-5 h-5" />
                {isProcessing ? 'Ingestion en cours...' : 'Lancer l\'Ingestion'}
              </Button>
              
              <ProgressBar 
                progress={progress}
                isVisible={showProgress}
                className="mt-6"
              />
              
              {/* Message de statut */}
              {statusMessage.visible && (
                <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  statusMessage.type === 'success'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {statusMessage.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}
            </div>

            {/* Section Historique */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border-2 border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-gray-800" />
                </div>
                <h2 className="text-2xl font-bold text-yellow-600">
                  Historique des Opérations
                </h2>
              </div>
              
              <HistoryTable documents={sampleDocuments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
