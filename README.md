# Moroccan License Plate Detector - Interface Utilisateur

Une interface web moderne construite avec React et Vite pour détecter et extraire le texte des plaques d'immatriculation marocaines.


## 🚀 Fonctionnalités

- Téléchargement d'images par glisser-déposer
- Détection de plaques d'immatriculation en temps réel
- Support des caractères latins et arabes
- Visualisation des résultats avec mise en évidence des plaques détectées
- Historique des détections précédentes
- Interface responsive pour mobile et bureau

## 🛠️ Technologies

- **React** - Framework frontend
- **Vite** - Environnement de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **Axios** - Client HTTP pour les requêtes API
- **React Router** - Navigation entre les pages

## 📋 Prérequis

- Node.js (v14.0.0 ou supérieur)
- npm ou yarn
- API backend en cours d'exécution (voir [le dépôt de l'API](https://github.com/echarif/moroccan-plate-detection-api))

## 🚀 Installation et démarrage

1. Clonez le dépôt
   ```bash
   git clone https://github.com/echarif/moroccan-plate-detector-ui.git
   cd moroccan-plate-detector-ui
   ```

2. Installez les dépendances
   ```bash
   npm install
   ```

3. Configurez l'URL de l'API
   Créez un fichier `.env.local` à la racine du projet:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```
   Remplacez l'URL par celle de votre API déployée si nécessaire.

4. Démarrez le serveur de développement
   ```bash
   npm run dev
   ```

5. Ouvrez votre navigateur à l'adresse `http://localhost:5173`

## 📦 Création du build de production

Pour créer une version optimisée pour la production:

```bash
npm run build
```

Les fichiers générés seront dans le dossier `dist`, prêts à être déployés.

## 🚢 Déploiement

Cette interface utilisateur peut être déployée sur toute plateforme supportant les applications statiques, comme:

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

### Déploiement sur Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Connectez votre dépôt GitHub
3. Configurez les paramètres de build:
   - Build command: `npm run build` ou `yarn build`
   - Publish directory: `dist`
4. Ajoutez la variable d'environnement:
   - Clé: `VITE_API_URL`
   - Valeur: URL de votre API (ex: `https://votre-api.pythonanywhere.com/api`)
5. Cliquez sur "Deploy site"

## 📝 Guide d'utilisation

1. **Page d'accueil**: Téléchargez une image contenant une plaque d'immatriculation
2. **Détection**: Sélectionnez la méthode OCR et cliquez sur "Detect Plate"
3. **Résultats**: Visualisez le texte extrait et l'image avec la plaque détectée
4. **Historique**: Consultez les détections précédentes dans l'onglet "History"

## 🧩 Structure du projet

```
src/
├── assets/            # Images, icônes, etc.
├── components/        # Composants React réutilisables
│   ├── DetectionResult.jsx
│   ├── FileUploader.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   └── ...
├── pages/             # Pages de l'application
│   ├── Home.jsx       # Page principale de détection
│   ├── History.jsx    # Historique des détections
│   └── About.jsx      # Informations sur l'application
├── services/          # Services et utilitaires
│   └── api.js         # Appels à l'API
├── App.jsx            # Composant racine
└── main.jsx           # Point d'entrée
```

## 🔗 Liens utiles

- [API Backend](https://github.com/echarif/moroccan-plate-detection-api)
- [Documentation de l'API](https://echarif.pythonanywhere.com/api)
- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
