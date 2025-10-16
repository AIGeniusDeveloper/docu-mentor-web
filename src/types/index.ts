export interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  sources?: Source[]
  isError?: boolean
}

export interface Source {
  id: string
  filename: string
  page?: number
  section?: string
  type: 'pdf' | 'doc' | 'txt'
}

export interface Document {
  id: string
  name: string
  size: number
  type: string
  status: 'pending' | 'processing' | 'success' | 'error'
  uploadDate: Date
  errorMessage?: string
}

export interface NavigationItem {
  id: string
  label: string
  icon: string
  href: string
  section?: string
}

export interface Stats {
  totalDocuments: number
  totalSize: string
  successRate: number
}

export interface KnowledgeDocument {
  id: string
  name: string
  originalName: string
  size: number
  type: string
  status: 'active' | 'inactive' | 'processing' | 'error'
  uploadDate: Date
  lastIngestionDate: Date
  chunksCount: number
  sourceCount: number
  isActive: boolean
  metadata?: {
    author?: string
    department?: string
    category?: string
    tags?: string[]
  }
}

export interface DashboardStats {
  totalDocuments: number
  ragEfficiency: number
  hallucinationRate: number
  totalQueries: number
}

export interface UsageData {
  date: string
  queries: number
}

export interface SourceUsage {
  documentName: string
  usageCount: number
  percentage: number
}
