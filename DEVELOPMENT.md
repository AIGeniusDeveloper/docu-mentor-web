# Guide de Développement - Docu-Mentor

## 🏗️ Architecture du Projet

### Structure des Dossiers

```
src/
├── app/                    # Next.js App Router
│   ├── chat/              # Page Chat RAG
│   ├── ingestion/         # Page Ingestion Documents
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── chat/             # Composants de chat
│   │   ├── Message.tsx   # Composant de message
│   │   └── ChatInput.tsx # Composant de saisie
│   ├── common/           # Composants communs
│   │   ├── LoadingSpinner.tsx
│   │   └── StatusMessage.tsx
│   ├── ingestion/        # Composants d'ingestion
│   │   ├── FileUpload.tsx
│   │   ├── HistoryTable.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StatsGrid.tsx
│   ├── layout/           # Composants de layout
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/               # Composants UI de base
│       └── Button.tsx
├── hooks/                # Hooks personnalisés
│   ├── useChat.ts        # Hook pour le chat
│   └── useFileUpload.ts  # Hook pour l'upload
├── lib/                  # Utilitaires
│   └── utils.ts          # Fonctions utilitaires
└── types/                # Types TypeScript
    └── index.ts          # Interfaces et types
```

## 🎯 Principes de Développement

### 1. Composants Modulaires
- Chaque composant a une responsabilité unique
- Props typées avec TypeScript
- Composants réutilisables et maintenables

### 2. Hooks Personnalisés
- Logique métier séparée de l'UI
- Réutilisabilité maximale
- Gestion d'état optimisée

### 3. Types TypeScript
- Interfaces strictes pour toutes les données
- Types pour les props des composants
- Sécurité du code à la compilation

### 4. Styling avec Tailwind
- Classes utilitaires cohérentes
- Design system unifié
- Responsive design natif

## 🛠️ Outils et Technologies

### Développement
- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage statique
- **Tailwind CSS** : Framework CSS
- **Lucide React** : Icônes modernes
- **ESLint** : Linting du code

### Build et Déploiement
- **Turbopack** : Bundler ultra-rapide
- **Vercel** : Déploiement recommandé
- **Docker** : Containerisation disponible

## 📝 Conventions de Code

### Nommage des Fichiers
- Composants : `PascalCase.tsx`
- Hooks : `useHookName.ts`
- Utilitaires : `camelCase.ts`
- Types : `PascalCase.ts`

### Structure des Composants
```typescript
'use client' // Si nécessaire

import React from 'react'
import { ComponentProps } from '@/types'

interface Props {
  // Props typées
}

export const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks
  // Logique
  // Rendu
}
```

### Styling
- Utiliser les classes Tailwind
- Éviter les styles inline
- Composants stylés cohérents
- Animations fluides

## 🚀 Scripts de Développement

```bash
# Développement
npm run dev          # Serveur de développement

# Build et Production
npm run build        # Build de production
npm run start        # Serveur de production

# Qualité du Code
npm run lint         # Vérification ESLint
```

## 🔧 Configuration

### Tailwind CSS
Configuration personnalisée dans `tailwind.config.js` :
- Couleurs primaires et secondaires
- Animations personnalisées
- Ombres premium
- Typographie optimisée

### ESLint
Configuration dans `.eslintrc.json` :
- Règles Next.js
- Règles React
- Règles personnalisées

### TypeScript
Configuration stricte avec :
- Types stricts
- Vérifications strictes
- Import/export optimisés

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 768px
- **Tablet** : 768px - 1023px
- **Desktop** : 1024px+

### Classes Responsive
```css
/* Mobile first */
.class { /* Mobile styles */ }

/* Tablet */
md:class { /* Tablet styles */ }

/* Desktop */
lg:class { /* Desktop styles */ }
```

## 🎨 Système de Design

### Couleurs
```css
/* Primaires */
primary-50 à primary-900

/* Secondaires */
secondary-50 à secondary-900

/* État */
success: green
error: red
warning: yellow
info: blue
```

### Typographie
- **Police** : Inter (Google Fonts)
- **Tailles** : Échelle modulaire Tailwind
- **Poids** : 400, 500, 600, 700

### Espacement
- Système d'espacement Tailwind (4px base)
- Marges et paddings cohérents
- Grid et flexbox pour la mise en page

## 🧪 Tests (Futur)

### Tests Unitaires
- Jest + React Testing Library
- Tests des composants
- Tests des hooks
- Tests des utilitaires

### Tests d'Intégration
- Tests des pages
- Tests des flux utilisateur
- Tests de l'API

## 📈 Performance

### Optimisations Next.js
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Image Optimization
- Bundle Splitting

### Optimisations React
- Memoization des composants
- Lazy loading
- Virtual scrolling (si nécessaire)

## 🔒 Sécurité

### Bonnes Pratiques
- Validation des inputs
- Sanitization des données
- Protection CSRF
- Headers de sécurité

### Authentification (Futur)
- JWT tokens
- Sessions sécurisées
- Middleware d'authentification

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t docu-mentor .
docker run -p 3000:3000 docu-mentor
```

### Variables d'Environnement
```env
NEXT_PUBLIC_API_URL=
DATABASE_URL=
JWT_SECRET=
```

## 📚 Ressources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [React](https://react.dev)

### Outils
- [Vercel](https://vercel.com)
- [GitHub](https://github.com)
- [Figma](https://figma.com) (Design)

## 🤝 Contribution

### Workflow
1. Fork le projet
2. Créer une branche feature
3. Développer avec les conventions
4. Tester les changements
5. Créer une Pull Request

### Code Review
- Vérifier la qualité du code
- Tester les fonctionnalités
- Valider le design
- Vérifier la performance

---

**Bon développement ! 🚀**
