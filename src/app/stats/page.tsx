'use client'

import React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { KPICard } from '@/components/stats/KPICard'
import { UsageChart } from '@/components/stats/UsageChart'
import { SourceUsageChart } from '@/components/stats/SourceUsageChart'
import { 
  CloudUpload, 
  CheckCircle, 
  AlertTriangle, 
  MessageSquare,
  TrendingUp,
  Calendar,
  RefreshCw
} from 'lucide-react'
import { DashboardStats, UsageData, SourceUsage } from '@/types'

// Données de démonstration pour les KPI
const dashboardStats: DashboardStats = {
  totalDocuments: 247,
  ragEfficiency: 92,
  hallucinationRate: 8,
  totalQueries: 4580
}

// Données de démonstration pour le graphique d'utilisation
const usageData: UsageData[] = [
  { date: '2024-01-15', queries: 45 },
  { date: '2024-01-16', queries: 52 },
  { date: '2024-01-17', queries: 38 },
  { date: '2024-01-18', queries: 67 },
  { date: '2024-01-19', queries: 73 },
  { date: '2024-01-20', queries: 89 },
  { date: '2024-01-21', queries: 95 },
  { date: '2024-01-22', queries: 112 },
  { date: '2024-01-23', queries: 98 },
  { date: '2024-01-24', queries: 85 },
  { date: '2024-01-25', queries: 124 },
  { date: '2024-01-26', queries: 156 },
  { date: '2024-01-27', queries: 142 },
  { date: '2024-01-28', queries: 167 },
  { date: '2024-01-29', queries: 189 },
  { date: '2024-01-30', queries: 203 },
  { date: '2024-01-31', queries: 218 },
  { date: '2024-02-01', queries: 234 },
  { date: '2024-02-02', queries: 198 },
  { date: '2024-02-03', queries: 176 },
  { date: '2024-02-04', queries: 201 },
  { date: '2024-02-05', queries: 245 },
  { date: '2024-02-06', queries: 267 },
  { date: '2024-02-07', queries: 289 },
  { date: '2024-02-08', queries: 312 },
  { date: '2024-02-09', queries: 298 },
  { date: '2024-02-10', queries: 324 },
  { date: '2024-02-11', queries: 356 },
  { date: '2024-02-12', queries: 378 }
]

// Données de démonstration pour l'utilisation des sources
const sourceUsageData: SourceUsage[] = [
  {
    documentName: 'Code Minier Guinéen',
    usageCount: 1247,
    percentage: 42
  },
  {
    documentName: 'Décret-041-CNM.pdf',
    usageCount: 892,
    percentage: 30
  },
  {
    documentName: 'Nouveau Code du Travail',
    usageCount: 534,
    percentage: 18
  },
  {
    documentName: 'Étude Impact Environnemental',
    usageCount: 298,
    percentage: 10
  }
]

export default function StatsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title="Statistiques et Analyse"
          subtitle="Tableau de bord des performances du système RAG"
          actions={
            <>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300">
                <Calendar className="w-4 h-4" />
                Période
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300">
                <RefreshCw className="w-4 h-4" />
                Actualiser
              </button>
            </>
          }
        />
        
        <div className="flex-1 overflow-y-auto p-12">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Volume de Connaissance"
              value={`${dashboardStats.totalDocuments} Documents`}
              icon={CloudUpload}
              color="blue"
              subtitle="Documents actifs dans le Vector Store"
              trend={{ value: 12, isPositive: true }}
            />
            
            <KPICard
              title="Efficacité RAG"
              value={`${dashboardStats.ragEfficiency}% de Pertinence`}
              icon={CheckCircle}
              color="green"
              subtitle="Requêtes avec sources trouvées"
              trend={{ value: 5, isPositive: true }}
            />
            
            <KPICard
              title="Taux d'Hallucination"
              value={`${dashboardStats.hallucinationRate}% de Lacune`}
              icon={AlertTriangle}
              color="yellow"
              subtitle="Réponses sans source"
              trend={{ value: 3, isPositive: false }}
            />
            
            <KPICard
              title="Requêtes Totales"
              value={`${dashboardStats.totalQueries.toLocaleString()} Requêtes`}
              icon={MessageSquare}
              color="gray"
              subtitle="Depuis le lancement"
              trend={{ value: 18, isPositive: true }}
            />
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Graphique d'utilisation */}
            <UsageChart
              data={usageData}
              title="Utilisation du Système (30 derniers jours)"
            />
            
            {/* Graphique des sources */}
            <SourceUsageChart
              data={sourceUsageData}
              title="Répartition des Sources"
            />
          </div>

          {/* Insights et Recommandations */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Insights */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Insights Clés
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                  <div className="text-sm font-semibold text-green-800 mb-1">
                    Performance Excellente
                  </div>
                  <div className="text-sm text-green-700">
                    92% des requêtes trouvent des sources pertinentes, démontrant la robustesse du système.
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <div className="text-sm font-semibold text-blue-800 mb-1">
                    Adoption Croissante
                  </div>
                  <div className="text-sm text-blue-700">
                    +18% d&apos;activité ce mois, avec une moyenne de 245 requêtes/jour.
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                  <div className="text-sm font-semibold text-yellow-800 mb-1">
                    Source Dominante
                  </div>
                  <div className="text-sm text-yellow-700">
                    Le Code Minier représente 42% des citations, source de vérité principale.
                  </div>
                </div>
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Recommandations
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                  <div className="text-sm font-semibold text-orange-800 mb-1">
                    Enrichir la Base
                  </div>
                  <div className="text-sm text-orange-700">
                    Ajouter des documents complémentaires pour réduire le taux d&apos;hallucination de 8%.
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                  <div className="text-sm font-semibold text-purple-800 mb-1">
                    Diversifier les Sources
                  </div>
                  <div className="text-sm text-purple-700">
                    Équilibrer l&apos;utilisation des sources pour éviter la sur-dépendance au Code Minier.
                  </div>
                </div>
                
                <div className="p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-500">
                  <div className="text-sm font-semibold text-indigo-800 mb-1">
                    Surveillance Continue
                  </div>
                  <div className="text-sm text-indigo-700">
                    Maintenir la qualité des réponses avec un monitoring régulier des performances.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
