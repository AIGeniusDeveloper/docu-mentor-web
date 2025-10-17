'use client'

import React from 'react'
import { Document } from '@/types'
import { formatTimestamp } from '@/lib/utils'

interface HistoryTableProps {
  documents: Document[]
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ documents }) => {
  const getStatusBadge = (status: Document['status']) => {
    const statusConfig = {
      success: {
        className: 'bg-blue-100 text-blue-800',
        label: 'Succès'
      },
      error: {
        className: 'bg-yellow-100 text-yellow-800',
        label: 'Échec'
      },
      processing: {
        className: 'bg-yellow-100 text-yellow-800',
        label: 'En cours'
      },
      pending: {
        className: 'bg-gray-100 text-gray-800',
        label: 'En attente'
      }
    }

    const config = statusConfig[status]

    return (
      <span className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-transform duration-300 hover:scale-105 ${config.className}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 text-left font-bold text-gray-800 text-base">Fichier</th>
            <th className="px-6 py-4 text-left font-bold text-gray-800 text-base">Statut</th>
            <th className="px-6 py-4 text-left font-bold text-gray-800 text-base">Date</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="border-b border-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:scale-101 hover:shadow-sm"
            >
              <td className="px-6 py-4">
                <div className="font-bold text-gray-800">{doc.name}</div>
                {doc.errorMessage && (
                  <div className="text-sm text-red-600 mt-1">{doc.errorMessage}</div>
                )}
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(doc.status)}
              </td>
              <td className="px-6 py-4 text-gray-600 text-sm">
                {formatTimestamp(doc.uploadDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
