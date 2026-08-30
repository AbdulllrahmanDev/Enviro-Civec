import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\ptdng\\Desktop\\Enviro-Civec';

// 1. .gitignore
const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production / build
dist/
build/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Editor / OS files
.DS_Store
Thumbs.db
.vscode/
.idea/
*.local
`;
fs.writeFileSync(path.join(targetDir, '.gitignore'), gitignoreContent, 'utf8');

// 2. README.md
const readmeContent = `# Enviro-Civec UI 🏗️🌿

> Modern, ultra-performant Environmental & Civil Engineering Consulting website built with Vanilla HTML5, CSS3, JavaScript ES Modules, and a TypeScript-powered AutoCAD Crosshair cursor.

---

## ✨ Features

- **🚀 Lightweight & Blazing Fast:** Built with pure Vanilla Web Stack (Zero heavy runtime overhead).
- **📐 AutoCAD Precision Cursor (TypeScript):** Interactive crosshair cursor with real-time selection box (Crossing & Window mode) written in TypeScript (\`ts/autocad-cursor.ts\`).
- **🎬 Apple-Style 60/120fps Canvas Hero:** Frame-by-frame image sequence scrubbing on HTML5 Canvas with smooth scroll-lock.
- **🌐 Bilingual & RTL/LTR Native Support:** Instant toggle between Arabic (RTL) and English (LTR) with directional layout and arrow flipping.
- **🌙 Dark & Light Theme:** Tailored brand color system supporting high-contrast dark and light modes.
- **📱 Fully Responsive:** Adaptive layouts with Lucide vector icons for desktop, tablet, and mobile.

---

## 📁 Project Structure

\`\`\`
Enviro-Civec/
├── index.html                  # Main landing page
├── privacy-policy.html          # Privacy policy page
├── terms-of-service.html        # Terms of service page
├── package.json                # Project configuration & scripts
├── tsconfig.json               # TypeScript configuration
├── css/
│   └── style.css               # Comprehensive CSS design system
├── js/
│   ├── main.js                 # App engine (i18n, theme, canvas scrubbing, filter)
│   ├── translations.js         # Arabic & English translations dictionary
│   └── autocad-cursor.js       # Compiled AutoCAD cursor
├── ts/
│   └── autocad-cursor.ts       # TypeScript source code for AutoCAD cursor
└── assets/
    ├── favicon.png
    ├── images/                 # Brand logos and high-res visuals
    ├── videos/                 # Video source files
    └── hero_frames/            # Extracted 141 video frames for 60fps canvas scrubbing
\`\`\`

---

## 🚀 Getting Started

### Local Preview (Quick start)
Open \`index.html\` directly in any modern browser, or run a local static server:

\`\`\`bash
npx serve .
\`\`\`

### Compile TypeScript Cursor
\`\`\`bash
npm run build:ts
\`\`\`

---

## 📄 License
MIT License © 2026 Enviro-Civec.
`;
fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent, 'utf8');

console.log('.gitignore and README.md created for Enviro-Civec-ui');
