# 🚀 Link Manager Launchpad

A productivity tool to organize and launch multiple links at once, grouped by workspace topics.

## ✨ Features

- **Workspace Organization**: Group links by topics (Learning, News, Marketing, etc.)
- **Bulk Launch**: Open all links in a workspace with one click
- **Launch Modes**: Choose between opening in tabs or separate windows
- **Multi-Link Paste**: Add multiple links at once by pasting URLs separated by space or newline
- **Local Storage**: Your workspaces are automatically saved in browser
- **Clean UI**: Bold, modern design inspired by productivity tools

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/link-manager-launchpad.git
cd link-manager-launchpad
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🚀 Deploy to GitHub Pages

1. **Update `vite.config.js`**: Make sure the `base` matches your repo name
```javascript
base: '/link-manager-launchpad/'
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy to GitHub Pages**
```bash
# Install gh-pages (first time only)
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

4. **Enable GitHub Pages**
- Go to your repo → Settings → Pages
- Source: `gh-pages` branch
- Your app will be live at: `https://YOUR_USERNAME.github.io/link-manager-launchpad/`

## 💡 Usage

1. **Create Workspaces**: Click the "+" button in sidebar to add new workspace groups
2. **Add Links**: 
   - Enter optional name
   - Paste one or multiple URLs (separated by space or newline)
   - Click "ADD"
3. **Launch**: 
   - Select workspace
   - Choose Tabs or Windows mode
   - Click "LAUNCH ALL"

## 🎨 Default Workspaces

The app comes with 3 pre-configured workspaces:

- **Learning**: English learning tools (Grammar, Vocab, etc.)
- **News - Vi**: Vietnamese news sites (VnExpress, Tuổi Trẻ, etc.)
- **Mar - En**: Marketing blogs (Search Engine Journal, MarTech, etc.)

## 🔧 Tech Stack

- React 18
- Vite
- LocalStorage for persistence
- Vanilla CSS (no external UI libraries)

## 📝 License

MIT License - feel free to use for personal or commercial projects!

## 👨‍💻 Author

Built by [Your Name]
