'use client'

import React, { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { formatFileSize } from '@/lib/utils'
import { File, X } from 'lucide-react'

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  onRemoveFile: (index: number) => void
  selectedFiles: File[]
  maxFiles?: number
  maxSize?: number // in MB
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  onRemoveFile,
  selectedFiles,
  maxFiles = 5,
  maxSize = 50
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf')
    
    if (selectedFiles.length + pdfFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} fichiers autorisés pour l'ingestion simultanée`)
      return
    }

    const oversizedFiles = pdfFiles.filter(file => file.size > maxSize * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      alert(`Fichier(s) trop volumineux: ${oversizedFiles.map(f => f.name).join(', ')} (max ${maxSize}MB)`)
      return
    }

    const newFiles = pdfFiles.filter(file => 
      !selectedFiles.find(f => f.name === file.name)
    )
    
    onFilesSelected([...selectedFiles, ...newFiles])
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        className={cn(
          'border-3 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 relative overflow-hidden',
          isDragOver
            ? 'border-yellow-400 bg-yellow-50 scale-105 shadow-2xl'
            : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-lg'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="relative z-10">
          <div className={cn(
            'text-6xl mb-8 transition-all duration-300',
            isDragOver ? 'scale-110 -rotate-6 text-yellow-500' : 'text-blue-600 hover:scale-110 hover:-rotate-6'
          )}>
            <File />
          </div>
          <div className="text-xl font-bold text-gray-800 mb-4">
            Glissez-déposez vos fichiers PDF ici
          </div>
          <div className="text-gray-600">
            ou cliquez pour sélectionner (maximum {maxFiles} fichiers, {maxSize}MB chacun)
          </div>
        </div>
        
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-yellow-50/50 opacity-0 transition-opacity duration-300 hover:opacity-100" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* File List */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border-l-6 border-blue-500 shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-l-yellow-400 transition-all duration-300"
            >
              <div className="flex items-center gap-6 flex-1">
                <div className="text-red-500 text-3xl transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  📄
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 text-lg mb-1">
                    {file.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formatFileSize(file.size)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRemoveFile(index)}
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-130 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
