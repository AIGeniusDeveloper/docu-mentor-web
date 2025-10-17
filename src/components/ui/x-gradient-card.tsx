"use client";

import { VerifiedIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  documentName: string;
  documentType: string;
  documentSize: string;
  uploadDate: string;
  status: 'active' | 'inactive' | 'processing';
  chunksCount: number;
  sourceCount: number;
  tags?: string[];
  onToggleActive: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

export function XCard({
  documentName = "Document PDF",
  documentType = "PDF",
  documentSize = "2.5 MB",
  uploadDate = "Il y a 2 jours",
  status = 'active',
  chunksCount = 156,
  sourceCount = 89,
  tags = ['réglementation', 'mines', 'CNM'],
  onToggleActive,
  onDelete,
  onViewDetails,
}: DocumentCardProps) {
  const statusColors = {
    active: 'bg-blue-100 text-blue-800',
    inactive: 'bg-gray-100 text-gray-800',
    processing: 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    active: 'Actif',
    inactive: 'Inactif',
    processing: 'Traitement'
  };

  return (
    <div
      className={cn(
        "w-full p-1.5 rounded-2xl relative isolate overflow-hidden",
        "bg-white/80 backdrop-blur-sm",
        "border border-gray-200",
        "shadow-sm hover:shadow-md transition-all duration-300"
      )}
    >
      <div
        className={cn(
          "w-full p-5 rounded-xl relative",
          "bg-white/90 backdrop-blur-sm",
          "border border-gray-100",
          "text-gray-900",
          "hover:bg-white/95 transition-all duration-300"
        )}
      >
        {/* Header avec nom et statut */}
        <div className="flex gap-3 mb-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-xl overflow-hidden bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">PDF</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-start gap-2 mb-1">
                  <span className="font-semibold text-gray-900 hover:underline cursor-pointer truncate">
                    {documentName}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
                    statusColors[status]
                  )}>
                    {statusLabels[status]}
                  </span>
                  <span className="text-gray-600 text-sm truncate">
                    {documentSize} • {uploadDate}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={onToggleActive}
                  className="h-8 w-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-1 flex items-center justify-center transition-all duration-300"
                >
                  <VerifiedIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={onDelete}
                  className="h-8 w-8 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg p-1 flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={onViewDetails}
                  className="h-8 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 whitespace-nowrap"
                >
                  Détails
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-sm font-semibold text-blue-800 mb-1">Chunks</div>
            <div className="text-xl font-bold text-blue-900">
              {chunksCount.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="text-sm font-semibold text-yellow-800 mb-1">Sources</div>
            <div className="text-xl font-bold text-yellow-900">
              {sourceCount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
