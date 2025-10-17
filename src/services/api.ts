// Configuration de base pour les appels API
const API_BASE_URL = 'http://localhost:8082'
const INGESTION_API_BASE_URL = 'http://localhost:8081'
const API_KEY = '525E1DDA-6CCB-4576-87A8-F053931B88E9'

// Headers par défaut
const getHeaders = () => ({
  'accept': 'application/json',
  'Content-Type': 'application/json',
  'X-API-KEY': API_KEY
})

// Types pour les réponses API
export interface ChatResponse {
  answer: string
  sources: string[]
}

export interface IngestionResponse {
  message: string
  processedFiles: number
  status: 'success' | 'error'
}

export interface Document {
  id: string
  name: string
  originalName: string
  size: number
  uploadDate: string
  lastIngestionDate: string
  status: 'active' | 'inactive' | 'processing' | 'error'
  chunksCount: number
  sourceCount: number
  isActive: boolean
  metadata?: {
    tags?: string[]
  }
}

export interface DocumentsListResponse {
  documents: Document[]
  total: number
}

// Service pour les appels de chat RAG
export class ChatService {
  static async askQuestion(question: string, userId: string = 'api-user'): Promise<ChatResponse> {
    try {
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock des réponses selon la question
      const questionLower = question.toLowerCase()
      
      // Questions qui ont des réponses avec sources
      if (questionLower.includes('essayage virtuel') || questionLower.includes('virtual try-on')) {
        return {
          answer: "L'Essayage Virtuel (ou Virtual Try-On en anglais) est une technologie qui permet aux utilisateurs d'essayer virtuellement des vêtements, des accessoires (comme des lunettes, des bijoux, des chapeaux) ou même du maquillage, sans avoir à les porter physiquement.\n\nVoici quelques points clés pour comprendre l'Essayage Virtuel :\n\n* Comment ça marche ? L'Essayage Virtuel utilise généralement la réalité augmentée (RA), l'intelligence artificielle (IA) et la reconnaissance d'image/vidéo. La technologie superpose une image numérique du produit (vêtement, accessoire, etc.) sur l'image ou la vidéo de l'utilisateur, donnant l'illusion qu'il le porte réellement.\n\n* Différentes méthodes :\n  * Utilisation de la caméra (RA) : L'utilisateur utilise la caméra de son smartphone, tablette ou ordinateur. L'application ou le site web utilise la RA pour superposer l'image du produit sur le flux vidéo en direct.\n  * Téléchargement de photos : L'utilisateur télécharge une photo de lui-même, et l'application superpose l'image du produit sur la photo.\n  * Avatar 3D : L'utilisateur crée un avatar 3D de lui-même, et peut ensuite essayer virtuellement différents vêtements et accessoires sur cet avatar.\n\n* Applications : L'Essayage Virtuel est utilisé dans divers secteurs, notamment :\n  * Mode : Essayer des vêtements, des chaussures, des lunettes.\n  * Beauté : Essayer du maquillage, des couleurs de cheveux.\n  * Ameublement : Visualiser comment un meuble s'intégrerait dans une pièce.\n\n* Avantages :\n  * Commodité : Permet d'essayer des produits depuis chez soi, sans avoir à se déplacer en magasin.\n  * Gain de temps : Évite les longues files d'attente dans les cabines d'essayage.\n  * Choix plus large : Permet d'essayer un grand nombre de produits rapidement.\n  * Réduction des retours : En permettant aux clients de mieux visualiser le produit avant de l'acheter, cela peut réduire le nombre de retours.\n  * Expérience interactive : Offre une expérience d'achat plus engageante et amusante.\n\n* Limitations :\n  * Précision : La précision de la superposition peut varier en fonction de la qualité de la caméra, de l'éclairage et de la technologie utilisée.\n  * Sensation : L'Essayage Virtuel ne permet pas de ressentir la matière, le toucher ou le confort du produit.\n  * Disponibilité : Tous les produits ne sont pas disponibles pour l'Essayage Virtuel.\n\nEn résumé, l'Essayage Virtuel est une technologie en plein essor qui transforme l'expérience d'achat en ligne et en magasin, en offrant aux clients un moyen pratique et interactif d'essayer des produits avant de les acheter.",
          sources: ["docu-mentor-api-user-45601719106188-Rapport_Opportunity.pdf"]
        }
      }

      if (questionLower.includes('risques') && questionLower.includes('mines')) {
        return {
          answer: "Selon l'analyse des documents ingérés, les principaux risques identifiés dans le rapport de conformité pour les opérations minières en Guinée sont :\n\n**1. Risques opérationnels**\n• Non-conformité aux procédures de sécurité minière (Section 3.2)\n• Défaillances des équipements de protection individuelle\n• Gestion inadéquate des substances dangereuses\n\n**2. Risques financiers**\n• Exposition aux fluctuations des devises (USD/GNF)\n• Variations des prix des matières premières\n• Coûts de mise en conformité réglementaire\n\n**3. Risques environnementaux**\n• Impact sur les ressources hydriques locales\n• Gestion des déchets miniers\n• Restauration des sites d'exploitation\n\nCes risques nécessitent une attention particulière et des mesures de mitigation appropriées selon les standards internationaux.",
          sources: ["Decret-041-CNM.pdf", "Nouveau-Code-du-travail-guineen.pdf", "etude_impact_environnemental.pdf"]
        }
      }

      if (questionLower.includes('code minier') || questionLower.includes('réglementation minière')) {
        return {
          answer: "Le Code Minier guinéen établit le cadre légal pour l'exploration et l'exploitation minière en République de Guinée. Voici les principales dispositions :\n\n**Obligations des exploitants :**\n• Respect des procédures d'évaluation environnementale\n• Mise en place de mesures de protection des populations locales\n• Contribution au développement local et régional\n• Transparence dans les déclarations de production et de revenus\n\n**Droits des communautés :**\n• Consultation préalable pour tout projet d'exploitation\n• Indemnisation équitable en cas de déplacement\n• Participation aux bénéfices du projet\n• Accès à l'information sur les impacts environnementaux",
          sources: ["Code-Minier-Guinee.pdf", "Decret-041-CNM.pdf"]
        }
      }

      if (questionLower.includes('sécurité') || questionLower.includes('protection')) {
        return {
          answer: "Les mesures de sécurité dans les opérations minières comprennent :\n\n**Équipements de protection individuelle (EPI) :**\n• Casques de sécurité avec visière\n• Chaussures de sécurité antidérapantes\n• Gants de protection contre les produits chimiques\n• Masques respiratoires pour la protection contre les poussières\n\n**Mesures de sécurité collective :**\n• Systèmes de ventilation dans les galeries\n• Éclairage de sécurité d'urgence\n• Protocoles d'évacuation en cas d'incident\n• Formation continue du personnel aux procédures de sécurité",
          sources: ["Manuel-Securite-Mines.pdf", "Procedures-Securite.pdf"]
        }
      }

      // Questions qui n'ont pas de réponse dans la base
      if (questionLower.includes('météo') || questionLower.includes('météorologie') || 
          questionLower.includes('football') || questionLower.includes('sport') ||
          questionLower.includes('cuisine') || questionLower.includes('recette')) {
        return {
          answer: "Je suis désolé, mais les informations nécessaires pour répondre à cette question ne se trouvent pas dans la documentation interne que j'ai pu consulter.\n\nMa base de connaissances contient uniquement des documents relatifs aux opérations minières, à la conformité réglementaire et aux procédures internes. Pour des informations sur ce sujet, je vous recommande de consulter des sources spécialisées.",
          sources: []
        }
      }

      // Réponse par défaut pour les autres questions
      return {
        answer: `Je traite votre demande concernant "${question}". Cette réponse est générée à des fins de démonstration.\n\nL'IA a analysé la base de connaissances et peut fournir des informations contextuelles basées sur les documents ingérés. Pour obtenir des réponses plus précises, veuillez poser des questions spécifiques sur les domaines couverts par notre documentation :\n\n• Opérations minières et conformité\n• Réglementation et législation\n• Sécurité et protection\n• Gestion environnementale\n• Procédures internes`,
        sources: ["document_exemple.pdf"]
      }

    } catch (error) {
      console.error('Error asking question:', error)
      return {
        answer: "Une erreur est survenue lors de la communication avec l'IA. Veuillez réessayer.",
        sources: []
      }
    }
  }
}

// Service pour l'ingestion de documents
export class IngestionService {
  static async uploadDocuments(files: File[]): Promise<IngestionResponse> {
    try {
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulation d'un succès d'ingestion
      return {
        message: `Ingestion de ${files.length} document(s) lancée en parallèle en utilisant des Virtual Threads.`,
        processedFiles: files.length,
        status: 'success'
      }
    } catch (error) {
      console.error('Error uploading documents:', error)
      return {
        message: `Erreur lors de l'ingestion de ${files.length} document(s).`,
        processedFiles: 0,
        status: 'error'
      }
    }
  }
}

// Service pour la base de connaissances
export class KnowledgeService {
  static async getDocumentsList(): Promise<DocumentsListResponse> {
    try {
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Données mock pour la base de connaissances
      const mockDocuments: Document[] = [
        {
          id: '1',
          name: 'decret-041-cnm',
          originalName: 'Decret-041-CNM.pdf',
          size: 2048576,
          uploadDate: new Date(Date.now() - 86400000 * 7).toISOString(),
          lastIngestionDate: new Date(Date.now() - 86400000 * 2).toISOString(),
          status: 'active',
          chunksCount: 156,
          sourceCount: 89,
          isActive: true,
          metadata: {
            tags: ['décret', 'mines', 'réglementation', 'CNM']
          }
        },
        {
          id: '2',
          name: 'nouveau-code-travail',
          originalName: 'Nouveau-Code-du-travail-guineen.pdf',
          size: 5124096,
          uploadDate: new Date(Date.now() - 86400000 * 14).toISOString(),
          lastIngestionDate: new Date(Date.now() - 86400000 * 5).toISOString(),
          status: 'active',
          chunksCount: 423,
          sourceCount: 234,
          isActive: true,
          metadata: {
            tags: ['code', 'travail', 'droits', 'employés']
          }
        },
        {
          id: '3',
          name: 'rapport-environnemental',
          originalName: 'Rapport_Impact_Environnemental_2024.pdf',
          size: 8192000,
          uploadDate: new Date(Date.now() - 86400000 * 30).toISOString(),
          lastIngestionDate: new Date(Date.now() - 86400000 * 10).toISOString(),
          status: 'active',
          chunksCount: 312,
          sourceCount: 178,
          isActive: true,
          metadata: {
            tags: ['rapport', 'environnement', 'bilan', 'annuel']
          }
        }
      ]

      return {
        documents: mockDocuments,
        total: mockDocuments.length
      }
    } catch (error) {
      console.error('Error fetching documents list:', error)
      return {
        documents: [],
        total: 0
      }
    }
  }

  static async toggleDocumentStatus(documentId: string, isActive: boolean): Promise<{ success: boolean }> {
    try {
      // Simulation d'un appel API pour changer le statut
      await new Promise(resolve => setTimeout(resolve, 500)) // Simule un délai réseau
      
      return { success: true }
    } catch (error) {
      console.error('Error toggling document status:', error)
      return { success: false }
    }
  }

  static async deleteDocument(documentId: string): Promise<{ success: boolean }> {
    try {
      // Simulation d'un appel API pour supprimer un document
      await new Promise(resolve => setTimeout(resolve, 500)) // Simule un délai réseau
      
      return { success: true }
    } catch (error) {
      console.error('Error deleting document:', error)
      return { success: false }
    }
  }
}
