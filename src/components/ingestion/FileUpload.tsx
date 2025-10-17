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
          'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 relative',
          isDragOver
            ? 'border-yellow-400 bg-yellow-50'
            : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="relative z-10">
          <div className={cn(
            'text-5xl mb-6 transition-all duration-300',
            isDragOver ? 'text-yellow-500' : 'text-blue-600'
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
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-6 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <File className="w-5 h-5 text-blue-600" />
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
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
