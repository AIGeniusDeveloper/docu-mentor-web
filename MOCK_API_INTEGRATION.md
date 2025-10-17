# Documentation : Intégration des Mock APIs

## Vue d'ensemble

Cette documentation explique l'architecture et l'implémentation des mock APIs dans le projet Documentor. Le système a été conçu pour simuler les interactions avec un backend réel en attendant l'implémentation des vraies APIs.

## Architecture générale

```
Frontend (React/Next.js)
    ↓
Hooks personnalisés (useChatAPI, useIngestionAPI, useKnowledgeAPI)
    ↓
Services API (api.ts)
    ↓
Simulation des appels HTTP avec données mock
```

### Diagramme de l'architecture
rt
```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                      │
├─────────────────────────────────────────────────────────────┤
│  Pages: /chat, /ingestion, /knowledge, /stats              │
│  Components: ChatInput, FileUpload, DocumentCard, etc.     │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                HOOKS PERSONNALISÉS                          │
├─────────────────────────────────────────────────────────────┤
│  useChatAPI.ts    │  useIngestionAPI.ts  │  useKnowledgeAPI │
│  - messages       │  - ingestionStatus   │  - documents     │
│  - isLoading      │  - progress          │  - search        │
│  - sendMessage()  │  - uploadDocuments() │  - CRUD ops      │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   SERVICES API (api.ts)                    │
├─────────────────────────────────────────────────────────────┤
│  ChatService       │  IngestionService   │  KnowledgeService│
│  - askQuestion()   │  - uploadDocuments()│  - getDocsList() │
│  - Mock responses  │  - Mock processing  │  - Mock CRUD     │
│  - 1.5s delay      │  - 2s delay         │  - 1s delay      │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  SIMULATION LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  • setTimeout() pour délais réseau                         │
│  • Données mock réalistes                                  │
│  • Gestion d'erreurs simulée                              │
│  • Sources et métadonnées générées                        │
└─────────────────────────────────────────────────────────────┘
```

## Structure des fichiers

### 1. `src/services/api.ts` - Point central des APIs

Ce fichier contient :
- **Configuration des URLs** : URLs de base pour les différents services
- **Headers par défaut** : Configuration des en-têtes HTTP
- **Types TypeScript** : Interfaces pour les réponses API
- **Services simulés** : ChatService, IngestionService, KnowledgeService

#### Configuration
```typescript
const API_BASE_URL = 'http://localhost:8082'
const INGESTION_API_BASE_URL = 'http://localhost:8081'
const API_KEY = '525E1DDA-6CCB-4576-87A8-F053931B88E9'
```

#### Types définis
- `ChatResponse` : Réponse du chat RAG
- `IngestionResponse` : Réponse de l'ingestion de documents
- `Document` : Structure d'un document
- `DocumentsListResponse` : Liste des documents

### 2. Services implémentés

#### A. ChatService
**Fonction** : Simule les appels au service RAG pour les questions/réponses

**Méthode principale** :
```typescript
static async askQuestion(question: string, userId: string = 'api-user'): Promise<ChatResponse>
```

**Fonctionnalités** :
- Simulation de délai réseau (1.5s)
- Réponses contextuelles basées sur les mots-clés
- Gestion des sources de documents
- Messages d'erreur appropriés

**Exemples de réponses simulées** :
- Questions sur "essayage virtuel" → Réponse détaillée avec sources
- Questions sur "risques mines" → Réponse sur la conformité minière
- Questions hors domaine → Message d'excuse avec sources vides

#### B. IngestionService
**Fonction** : Simule l'upload et le traitement de documents

**Méthode principale** :
```typescript
static async uploadDocuments(files: File[]): Promise<IngestionResponse>
```

**Fonctionnalités** :
- Simulation de délai réseau (2s)
- Retour de statut de succès/erreur
- Message de confirmation avec nombre de fichiers traités

#### C. KnowledgeService
**Fonction** : Simule la gestion de la base de connaissances

**Méthodes principales** :
```typescript
static async getDocumentsList(): Promise<DocumentsListResponse>
static async toggleDocumentStatus(documentId: string, isActive: boolean): Promise<{ success: boolean }>
static async deleteDocument(documentId: string): Promise<{ success: boolean }>
```

**Fonctionnalités** :
- Liste de documents mock avec métadonnées complètes
- Simulation des opérations CRUD
- Délais réseau réalistes (1s pour listage, 0.5s pour modifications)

## Hooks personnalisés

### 1. `useChatAPI.ts`

**Responsabilité** : Gestion de l'état du chat et des messages

**État géré** :
```typescript
const [messages, setMessages] = useState<Message[]>([])
const [isLoading, setIsLoading] = useState(false)
```

**Fonctionnalités** :
- Envoi de messages avec gestion d'état
- Parsing des sources retournées par l'API
- Gestion des erreurs avec messages utilisateur
- Historique des conversations

**Flux d'exécution** :
1. Ajout du message utilisateur à l'historique
2. Activation du loading
3. Appel à ChatService.askQuestion()
4. Parsing et formatage des sources
5. Ajout de la réponse IA à l'historique
6. Désactivation du loading

### 2. `useIngestionAPI.ts`

**Responsabilité** : Gestion du processus d'ingestion de documents

**État géré** :
```typescript
const [ingestionStatus, setIngestionStatus] = useState<IngestionStatus>({
  isProcessing: boolean
  progress: number
  statusMessage: string
  showProgress: boolean
})
```

**Fonctionnalités** :
- Simulation de barre de progression
- Messages de statut en temps réel
- Gestion des états d'erreur
- Auto-masquage du progrès après succès

**Flux d'exécution** :
1. Initialisation du statut de traitement
2. Démarrage de la simulation de progression
3. Appel à IngestionService.uploadDocuments()
4. Mise à jour du statut final
5. Auto-masquage après 3 secondes

### 3. `useKnowledgeAPI.ts`

**Responsabilité** : Gestion de la base de connaissances et des documents

**État géré** :
```typescript
const [documents, setDocuments] = useState<KnowledgeDocument[]>([])
const [isLoading, setIsLoading] = useState(false)
const [searchTerm, setSearchTerm] = useState('')
const [filteredDocuments, setFilteredDocuments] = useState<KnowledgeDocument[]>([])
```

**Fonctionnalités** :
- Chargement automatique des documents au montage
- Recherche et filtrage en temps réel
- Opérations CRUD (toggle status, delete)
- Fallback vers données mock en cas d'erreur

**Fonctionnalités avancées** :
- Filtrage par nom de fichier et tags
- Conversion des types entre API et interface locale
- Gestion des erreurs avec données de fallback

## Stratégie de simulation

### 1. Délais réseau réalistes
- Chat : 1.5 secondes (simule le traitement IA)
- Ingestion : 2 secondes (simule le traitement de fichiers)
- Knowledge : 1 seconde (simule la récupération de données)

### 2. Données mock réalistes
- Documents avec métadonnées complètes
- Dates cohérentes et progressives
- Tags et catégories pertinents
- Tailles de fichiers réalistes

### 3. Gestion d'erreurs
- Messages d'erreur contextuels
- Fallbacks appropriés
- États de loading cohérents

### 4. Sources simulées
- Extraction de noms de fichiers depuis les sources
- Numéros de page aléatoires
- Sections simulées

## Migration vers le vrai backend

### Étapes de migration

1. **Remplacement des URLs** :
   ```typescript
   // Remplacer les URLs mock par les vraies
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
   const INGESTION_API_BASE_URL = process.env.NEXT_PUBLIC_INGESTION_URL
   ```

2. **Remplacement des services** :
   - Remplacer les méthodes mock par de vrais appels HTTP
   - Utiliser fetch() ou axios pour les requêtes
   - Adapter la gestion d'erreurs aux vraies réponses

3. **Adaptation des types** :
   - Vérifier la correspondance entre types mock et réels
   - Adapter les interfaces si nécessaire

4. **Tests d'intégration** :
   - Tester chaque endpoint individuellement
   - Vérifier la compatibilité des données
   - Valider la gestion d'erreurs

### Points d'attention

- **Authentification** : Adapter le système d'API keys
- **CORS** : Configurer les en-têtes appropriés
- **Rate limiting** : Gérer les limitations du backend
- **Cache** : Implémenter une stratégie de mise en cache
- **Retry logic** : Ajouter la logique de retry pour les échecs

## Avantages de cette approche

1. **Développement parallèle** : Frontend et backend peuvent évoluer indépendamment
2. **Tests complets** : Toutes les fonctionnalités peuvent être testées sans backend
3. **Démonstrations** : Possibilité de faire des démos complètes
4. **UX réaliste** : L'expérience utilisateur est fidèle à la version finale
5. **Migration douce** : Transition progressive possible

## Exemples d'utilisation

### 1. Utilisation du Chat API

```typescript
// Dans un composant React
const { messages, isLoading, sendMessage } = useChatAPI()

const handleSendMessage = async (content: string) => {
  await sendMessage(content)
  // Le message sera automatiquement ajouté à l'historique
  // La réponse de l'IA sera générée selon les mots-clés
}
```

### 2. Utilisation de l'Ingestion API

```typescript
// Dans un composant d'upload
const { ingestionStatus, uploadDocuments } = useIngestionAPI()

const handleFileUpload = async (files: FileList) => {
  const fileArray = Array.from(files)
  await uploadDocuments(fileArray)
  // La barre de progression sera mise à jour automatiquement
  // Le statut sera affiché pendant 3 secondes après succès
}
```

### 3. Utilisation de la Knowledge API

```typescript
// Dans un composant de gestion de documents
const { 
  documents, 
  isLoading, 
  searchTerm, 
  setSearchTerm,
  toggleDocumentStatus,
  deleteDocument 
} = useKnowledgeAPI()

// Les documents sont chargés automatiquement au montage
// La recherche se fait en temps réel
// Les opérations CRUD sont disponibles
```

## Flux de données détaillé

### Chat Flow
```
User Input → useChatAPI.sendMessage() → ChatService.askQuestion() → Mock Response → Message History Update
```

### Ingestion Flow
```
File Upload → useIngestionAPI.uploadDocuments() → Progress Simulation → IngestionService.uploadDocuments() → Status Update
```

### Knowledge Flow
```
Component Mount → useKnowledgeAPI.loadDocuments() → KnowledgeService.getDocumentsList() → Mock Documents → State Update
```

## Points techniques importants

### 1. Gestion des délais
Tous les services utilisent `setTimeout()` pour simuler des délais réseau réalistes :
- Chat : 1500ms (traitement IA)
- Ingestion : 2000ms (traitement fichiers)
- Knowledge : 1000ms (récupération données)

### 2. Simulation de progression
L'ingestion simule une barre de progression avec des intervalles :
```typescript
const progressInterval = setInterval(() => {
  setIngestionStatus(prev => ({
    ...prev,
    progress: prev.progress + Math.random() * 15
  }))
}, 200)
```

### 3. Parsing des sources
Les sources retournées par le chat sont parsées pour extraire les informations :
```typescript
const sources = response.sources.map((source, index) => {
  const filename = source.split('/').pop() || source
  return {
    id: `source-${index}`,
    filename: filename.replace('.pdf', ''),
    page: Math.floor(Math.random() * 50) + 1,
    section: `Section ${Math.floor(Math.random() * 10) + 1}`
  }
})
```

### 4. Gestion d'erreurs
Chaque service a sa propre gestion d'erreurs avec des messages contextuels :
- Chat : "Une erreur est survenue lors de la communication avec l'IA"
- Ingestion : "Erreur lors de l'ingestion des documents"
- Knowledge : Fallback vers données mock en cas d'échec

## Migration vers le vrai backend

### Checklist de migration

- [ ] Remplacer les URLs mock par les vraies URLs d'environnement
- [ ] Adapter les headers d'authentification
- [ ] Remplacer les `setTimeout()` par de vrais appels HTTP
- [ ] Adapter la gestion d'erreurs aux codes de statut HTTP
- [ ] Vérifier la compatibilité des types de données
- [ ] Tester chaque endpoint individuellement
- [ ] Valider l'expérience utilisateur complète

### Code de migration exemple

```typescript
// AVANT (Mock)
static async askQuestion(question: string): Promise<ChatResponse> {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return mockResponse
}

// APRÈS (Vrai API)
static async askQuestion(question: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat/ask`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ question })
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}
```

## Conclusion

L'intégration des mock APIs permet un développement frontend complet et autonome. La structure modulaire facilite la migration vers les vraies APIs sans refactoring majeur. Les hooks personnalisés encapsulent la logique métier et maintiennent une séparation claire entre la couche présentation et la couche données.

Cette approche garantit :
- **Développement parallèle** : Frontend et backend évoluent indépendamment
- **Tests complets** : Toutes les fonctionnalités sont testables
- **Démonstrations réalistes** : UX fidèle à la version finale
- **Migration douce** : Transition progressive possible
- **Maintenabilité** : Code structuré et documenté
