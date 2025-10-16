# Docu-Mentor - Assistant IA Documentaire

Un assistant IA moderne et professionnel pour l'analyse documentaire intelligente avec RAG (Retrieval-Augmented Generation).

## 🚀 Fonctionnalités

### 💬 Chat RAG
- Interface de chat intuitive avec l'IA
- Analyse contextuelle des documents
- Affichage des sources utilisées
- Gestion des erreurs et messages d'information

### 📄 Ingestion de Documents
- Upload par glisser-déposer ou sélection de fichiers
- Support des fichiers PDF (jusqu'à 50MB par fichier)
- Traitement en lot (jusqu'à 5 fichiers simultanés)
- Barre de progression en temps réel
- Historique des opérations

### 🎨 Interface Moderne
- Design responsive et élégant
- Animations fluides et transitions
- Système de couleurs cohérent
- Composants modulaires et réutilisables

## 🛠️ Technologies

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes
- **React Hooks** - Gestion d'état et effets de bord

## 📁 Structure du Projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── chat/              # Page Chat RAG
│   ├── ingestion/         # Page Ingestion Documents
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil (redirection)
├── components/            # Composants React
│   ├── chat/             # Composants de chat
│   ├── common/           # Composants communs
│   ├── ingestion/        # Composants d'ingestion
│   ├── layout/           # Composants de layout
│   └── ui/               # Composants UI de base
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires
└── types/                # Types TypeScript
```

## 🚀 Installation et Démarrage

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📋 Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run start` - Démarre le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

## 🎯 Fonctionnalités Clés

### Architecture Modulaire
- Composants réutilisables et maintenables
- Hooks personnalisés pour la logique métier
- Types TypeScript pour la sécurité du code
- Séparation claire des responsabilités

### Expérience Utilisateur
- Interface intuitive et responsive
- Animations fluides et feedback visuel
- Gestion d'état optimisée
- Messages d'erreur informatifs

### Performance
- Optimisations Next.js (SSR, ISR)
- Lazy loading des composants
- Optimisation des images et assets
- Bundle splitting automatique

## 🔧 Configuration

### Tailwind CSS
Le projet utilise une configuration Tailwind personnalisée avec :
- Couleurs primaires et secondaires
- Animations personnalisées
- Ombres premium
- Typographie optimisée

### TypeScript
Configuration stricte avec :
- Types pour tous les composants
- Interfaces pour les données
- Utilitaires de type helpers

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte à :
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Système de Design

### Couleurs
- **Primaire** : Bleu (#2563eb)
- **Secondaire** : Jaune (#f59e0b)
- **Succès** : Vert (#10b981)
- **Erreur** : Rouge (#ef4444)
- **Neutre** : Gris (#6b7280)

### Typographie
- **Police** : Inter (Google Fonts)
- **Taille** : Échelle modulaire
- **Poids** : 400, 500, 600, 700

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

## 📈 Améliorations Futures

- [ ] Authentification utilisateur
- [ ] Base de données pour persistance
- [ ] API backend pour RAG
- [ ] Tests unitaires et d'intégration
- [ ] Mode sombre
- [ ] Internationalisation (i18n)
- [ ] Notifications en temps réel
- [ ] Export des conversations

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature
3. Commiter vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation

---

**Développé avec ❤️ pour le TAS 2025**