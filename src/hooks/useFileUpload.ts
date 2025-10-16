'use client'

import { useState, useCallback } from 'react'

interface UseFileUploadOptions {
  maxFiles?: number
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

export const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const { maxFiles = 5, maxSize = 50, acceptedTypes = ['application/pdf'] } = options
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `Le fichier ${file.name} n'est pas un type de fichier accepté`
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      return `Le fichier ${file.name} est trop volumineux (max ${maxSize}MB)`
    }
    
    return null
  }, [acceptedTypes, maxSize])

  const addFiles = useCallback((files: File[]) => {
    setError(null)
    
    if (selectedFiles.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} fichiers autorisés`)
      return
    }

    const validFiles: File[] = []
    const errors: string[] = []

    files.forEach(file => {
      const error = validateFile(file)
      if (error) {
        errors.push(error)
      } else if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
        validFiles.push(file)
      }
    })

    if (errors.length > 0) {
      setError(errors.join(', '))
    }

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles])
    }
  }, [selectedFiles, maxFiles, validateFile])

  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setError(null)
  }, [])

  const clearFiles = useCallback(() => {
    setSelectedFiles([])
    setError(null)
  }, [])

  const processFiles = useCallback(async (): Promise<boolean> => {
    if (selectedFiles.length === 0) return false

    setIsProcessing(true)
    setProgress(0)
    setError(null)

    try {
      // Simuler le traitement
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          setProgress(prev => {
            const increment = Math.random() * 8 + 2
            const newProgress = Math.min(prev + increment, 100)
            
            if (newProgress >= 100) {
              clearInterval(interval)
              setTimeout(() => {
                setIsProcessing(false)
                setProgress(0)
                setSelectedFiles([])
                resolve(true)
              }, 1000)
            }
            
            return newProgress
          })
        }, 300)
      })
    } catch {
      setError('Erreur lors du traitement des fichiers')
      setIsProcessing(false)
      setProgress(0)
      return false
    }
  }, [selectedFiles])

  return {
    selectedFiles,
    isProcessing,
    progress,
    error,
    addFiles,
    removeFile,
    clearFiles,
    processFiles
  }
}
