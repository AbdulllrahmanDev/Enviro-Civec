import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\ptdng\\Desktop\\Enviro-Civec';
console.log('Generating complete vanilla project at:', targetDir);

// ==========================================
// 1. CSS/STYLE.CSS
// ==========================================
const cssContent = `/* ==========================================================================
   Enviro-Civec - Comprehensive Vanilla CSS Design System
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&display=swap');

:root {
  /* Brand Tokens */
  --brand-gray: #8c8c8c;
  --brand-brown: #9b724c;
  --brand-red: #b82417;

  /* Theme Tokens (Light Mode Default) */
  --bg-primary: #faf8f5;
  --bg-secondary: #f0ebe4;
  --bg-card: #ffffff;
  --bg-overlay: rgba(0, 0, 0, 0.45);
  --bg-card-hover: #fcfbfa;

  --text-primary: #221c17;
  --text-secondary: #6e645a;
  --text-muted: #8e847a;
  --text-inverse: #ffffff;

  --primary: #8a572a;
  --primary-hover: #754820;
  --primary-light: rgba(138, 87, 42, 0.1);
  --primary-border: rgba(138, 87, 42, 0.2);

  --accent: #b82417;
  --accent-hover: #9c1d12;
  --accent-light: rgba(184, 36, 23, 0.1);
  --accent-border: rgba(184, 36, 23, 0.25);

  --border: #e6dfd5;
  --border-light: #f0eae1;
  --ring: rgba(138, 87, 42, 0.35);

  --color-cursor: #1c1712;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;

  --font-sans: 'Cairo', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 25px rgba(184, 36, 23, 0.25);

  --header-height: 80px;
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="dark"],
.dark {
  --bg-primary: #14110e;
  --bg-secondary: #1d1915;
  --bg-card: #201b17;
  --bg-card-hover: #29231e;
  --bg-overlay: rgba(0, 0, 0, 0.7);

  --text-primary: #f5f0eb;
  --text-secondary: #bbb1a6;
  --text-muted: #887d72;
  --text-inverse: #ffffff;

  --primary: #c98a54;
  --primary-hover: #db9c66;
  --primary-light: rgba(201, 138, 84, 0.15);
  --primary-border: rgba(201, 138, 84, 0.3);

  --accent: #d93d2e;
  --accent-hover: #e64f40;
  --accent-light: rgba(217, 61, 46, 0.15);
  --accent-border: rgba(217, 61, 46, 0.3);

  --border: #332b25;
  --border-light: #29221d;
  --ring: rgba(201, 138, 84, 0.4);

  --color-cursor: #ffffff;

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 30px rgba(217, 61, 46, 0.35);
}

/* ==========================================================================
   Base Styles & Reset
   ========================================================================== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-sans);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  overflow-x: hidden;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: background-color var(--transition-normal), color var(--transition-normal);
}

/* Custom AutoCAD Cursor hiding system */
html, body, button, a, input, select, textarea {
  cursor: none !important;
}

@media (pointer: coarse) {
  html, body, button, a, input, select, textarea {
    cursor: auto !important;
  }
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  border: none;
  background: transparent;
  outline: none;
}

img, video {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Selection */
::selection {
  background: var(--accent-light);
  color: var(--accent);
}

/* Container */
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}

/* Section Common */
.section {
  padding-top: 96px;
  padding-bottom: 96px;
  position: relative;
}

.section-header {
  text-align: center;
  max-width: 768px;
  margin: 0 auto 60px auto;
}

.section-subtitle {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent);
  margin-bottom: 12px;
}

.section-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.25;
  color: var(--text-primary);
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.section-desc {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ==========================================================================
   Progress Bar & Header Navigation
   ========================================================================== */
#scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--accent);
  width: 0%;
  z-index: 1000;
  transition: width 0.1s ease-out;
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  z-index: 900;
  transition: background-color var(--transition-normal), backdrop-filter var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.site-header.scrolled {
  background-color: rgba(250, 248, 245, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

[data-theme="dark"] .site-header.scrolled {
  background-color: rgba(20, 17, 14, 0.92);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 12px;
  user-select: none;
}

.brand-logo {
  height: 42px;
  width: auto;
  object-contain: contain;
  transition: transform var(--transition-normal);
}

.brand-link:hover .brand-logo {
  transform: scale(1.05);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  transition: color var(--transition-normal);
}

.scrolled .brand-title {
  color: var(--text-primary);
  text-shadow: none;
}

.brand-subtitle {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  transition: color var(--transition-normal);
}

.scrolled .brand-subtitle {
  color: var(--text-muted);
}

/* Nav Links */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-size: 0.925rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
  transition: color var(--transition-fast);
  padding: 6px 0;
  position: relative;
}

.scrolled .nav-link {
  color: var(--text-secondary);
  text-shadow: none;
}

.nav-link:hover {
  color: #ffffff;
}

.scrolled .nav-link:hover {
  color: var(--accent);
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  transition: all var(--transition-fast);
}

.scrolled .icon-btn {
  color: var(--text-primary);
  text-shadow: none;
}

.icon-btn:hover {
  color: var(--accent);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--accent);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.btn-primary:hover {
  background-color: var(--accent-hover);
  box-shadow: var(--shadow-glow);
  transform: translateY(-1px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.65);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-1px);
}

.mobile-toggle {
  display: none;
  font-size: 1.5rem;
  color: #ffffff;
}

.scrolled .mobile-toggle {
  color: var(--text-primary);
}

/* ==========================================================================
   Hero Section (Video Hero + Scrubbing)
   ========================================================================== */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 650px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0b0907;
  color: #ffffff;
}

.hero-video-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform-origin: center center;
  transition: transform 0.1s linear;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.85) 100%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 900px;
  text-align: center;
  padding: 0 24px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  background: rgba(184, 36, 23, 0.25);
  border: 1px solid rgba(184, 36, 23, 0.4);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 24px;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  letter-spacing: -1px;
}

.hero-title .text-accent {
  color: var(--accent);
  position: relative;
  display: inline-block;
}

.hero-desc {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto 36px auto;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.hero-buttons .btn-primary {
  padding: 14px 32px;
  font-size: 1.05rem;
  border-radius: var(--radius-md);
}

.hero-buttons .btn-secondary {
  padding: 14px 30px;
  font-size: 1.05rem;
  border-radius: var(--radius-md);
}

.hero-scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  pointer-events: none;
  z-index: 20;
}

.hero-scroll-hint svg {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(6px); }
  60% { transform: translateY(3px); }
}

.hero-bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  z-index: 20;
}

.hero-bottom-bar-fill {
  height: 100%;
  width: 0%;
  background: var(--accent);
  transition: width 0.1s ease-out;
}

/* ==========================================================================
   Stats Bar
   ========================================================================== */
.stats-section {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  padding: 40px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

[dir="rtl"] .stat-card {
  align-items: flex-start;
  text-align: right;
}

[dir="ltr"] .stat-card {
  align-items: flex-start;
  text-align: left;
}

.stat-value {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
}

/* ==========================================================================
   About Section
   ========================================================================== */
.about-grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 60px;
  align-items: center;
}

.about-image-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.about-image {
  width: 100%;
  height: 420px;
  object-fit: cover;
}

.about-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;
  color: #ffffff;
}

.about-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  width: fit-content;
  margin-bottom: 12px;
}

.about-overlay-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.about-overlay-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.about-points-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 32px 0;
}

.about-point {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.925rem;
  font-weight: 600;
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.about-point:hover {
  border-color: var(--accent-border);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.about-point-icon {
  color: var(--accent);
  flex-shrink: 0;
}

/* ==========================================================================
   Methodology (4-Step Engineering Workflow)
   ========================================================================== */
.methodology-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.methodology-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
}

.methodology-card:hover {
  transform: translateY(-6px);
  border-color: var(--primary-border);
  box-shadow: var(--shadow-md);
}

.methodology-step-num {
  font-family: var(--font-serif);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--accent);
  opacity: 0.85;
  margin-bottom: 16px;
  line-height: 1;
}

.methodology-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  margin-bottom: 20px;
}

.methodology-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.methodology-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* ==========================================================================
   Services Grid
   ========================================================================== */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.service-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-normal);
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-border);
}

.service-icon-box {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: var(--accent-light);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.service-card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.service-card-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
}

.service-features-list {
  list-style: none;
  border-top: 1px solid var(--border-light);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.service-feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
}

.service-feature-item svg {
  color: var(--accent);
  flex-shrink: 0;
}

/* ==========================================================================
   Projects / Portfolio
   ========================================================================== */
.projects-filter-tabs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 48px;
}

.filter-tab {
  padding: 8px 20px;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.filter-tab:hover {
  border-color: var(--accent-border);
  color: var(--accent);
}

.filter-tab.active {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
  box-shadow: var(--shadow-sm);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.project-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-border);
}

.project-image-wrap {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-category-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

[dir="rtl"] .project-category-badge {
  right: auto;
  left: 16px;
}

.project-info {
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.project-desc {
  font-size: 0.925rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.project-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-light);
  padding-top: 16px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.project-client-name {
  font-weight: 600;
  color: var(--text-primary);
}

/* ==========================================================================
   Testimonials
   ========================================================================== */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.testimonial-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all var(--transition-normal);
}

.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow-md);
}

.testimonial-quote-icon {
  color: var(--accent);
  opacity: 0.4;
  margin-bottom: 16px;
}

.testimonial-text {
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.7;
  margin-bottom: 24px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 14px;
  border-top: 1px solid var(--border-light);
  padding-top: 16px;
}

.testimonial-avatar {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-full);
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.testimonial-author-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.testimonial-author-role {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* ==========================================================================
   Expertise / Why Choose Us
   ========================================================================== */
.expertise-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.expertise-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.expertise-card:hover {
  border-color: var(--primary-border);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.expertise-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.expertise-card-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ==========================================================================
   Call To Action (CTA Banner)
   ========================================================================== */
.cta-banner {
  background: linear-gradient(135deg, #1c1510 0%, #302219 50%, #1c1510 100%);
  border-radius: var(--radius-lg);
  padding: 64px 48px;
  color: #ffffff;
  text-align: center;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cta-banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 40px, rgba(201, 138, 84, 0.05) 41px, rgba(201, 138, 84, 0.05) 42px);
  pointer-events: none;
}

.cta-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin-bottom: 16px;
  color: #ffffff;
}

.cta-desc {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 650px;
  margin: 0 auto 36px auto;
  line-height: 1.7;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

/* ==========================================================================
   Contact Section & Form
   ========================================================================== */
.contact-grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 48px;
}

.contact-info-panel {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.contact-info-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.contact-icon-box {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--primary-light);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-info-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.contact-info-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.contact-form-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-md);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.925rem;
  transition: all var(--transition-fast);
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--ring);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Toast Alert */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10000;
}

[dir="rtl"] .toast-container {
  right: auto;
  left: 24px;
}

.toast {
  background: var(--bg-card);
  border: 1px solid var(--accent-border);
  border-left: 4px solid var(--accent);
  padding: 16px 20px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  color: var(--text-primary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideUp 0.3s ease;
}

[dir="rtl"] .toast {
  border-left: 1px solid var(--accent-border);
  border-right: 4px solid var(--accent);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ==========================================================================
   Footer
   ========================================================================== */
.site-footer {
  background: #110e0c;
  color: #c4b9ad;
  padding: 80px 0 32px 0;
  border-top: 1px solid #241d18;
}

.footer-grid {
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 4fr;
  gap: 48px;
  margin-bottom: 64px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-brand-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
}

.footer-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  color: #9c9083;
}

.footer-heading {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  font-size: 0.875rem;
  color: #a89d91;
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: #ffffff;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #241d18;
  padding-top: 32px;
  font-size: 0.85rem;
  color: #7a6e63;
}

.footer-legal-links {
  display: flex;
  gap: 20px;
}

/* ==========================================================================
   Responsive Breakpoints
   ========================================================================== */
@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }
  .mobile-toggle {
    display: block;
  }
  .methodology-grid,
  .services-grid,
  .expertise-grid,
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section {
    padding-top: 64px;
    padding-bottom: 64px;
  }
  .methodology-grid,
  .services-grid,
  .expertise-grid,
  .testimonials-grid,
  .projects-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .about-points-grid {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
`;

fs.writeFileSync(path.join(targetDir, 'css', 'style.css'), cssContent, 'utf8');

// ==========================================
// 2. JS/MAIN.JS
// ==========================================
const jsMainContent = `/**
 * Enviro-Civec - Interactive Application Engine
 * Vanilla JavaScript implementation
 */
import { translations } from './translations.js';
import { AutoCADCursor } from './autocad-cursor.js';

class AppEngine {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'ar';
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.currentFilter = 'all';

    this.init();
  }

  init() {
    // Initialize AutoCAD Cursor
    new AutoCADCursor();

    // Setup Theme & Language
    this.applyTheme(this.currentTheme);
    this.applyLanguage(this.currentLanguage);

    // Setup Listeners
    this.bindEvents();
    this.setupScrollProgress();
    this.setupHeroVideoScrubbing();
    this.setupProjectsFilter();
    this.setupContactForm();
  }

  bindEvents() {
    // Language Toggle
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        const newLang = this.currentLanguage === 'ar' ? 'en' : 'ar';
        this.applyLanguage(newLang);
      });
    }

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
      });
    }

    // Smooth Scroll Links
    document.querySelectorAll('[data-scroll-to]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-scroll-to');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  applyLanguage(lang) {
    this.currentLanguage = lang;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('language', lang);

    const langText = document.getElementById('lang-text');
    if (langText) {
      langText.textContent = lang === 'ar' ? 'English' : 'العربية';
    }

    this.translateDOM();
  }

  t(key) {
    const dict = translations[this.currentLanguage] || translations.ar;
    return key.split('.').reduce((acc, part) => (acc ? acc[part] : null), dict) || key;
  }

  translateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val && typeof val === 'string') {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.t(key);
      if (val && typeof val === 'string') {
        el.setAttribute('placeholder', val);
      }
    });
  }

  setupScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      if (progressBar) {
        progressBar.style.width = \`\${progress}%\`;
      }

      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  }

  setupHeroVideoScrubbing() {
    const video = document.getElementById('hero-video');
    const heroSection = document.querySelector('.hero-section');
    const fillBar = document.getElementById('hero-fill-bar');

    if (!video || !heroSection) return;

    let isSeeking = false;
    let pendingTime = null;

    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        seekTo(t);
      }
    };
    video.addEventListener('seeked', onSeeked);

    function seekTo(t) {
      if (!video || !Number.isFinite(t) || video.duration <= 0) return;
      if (Math.abs(video.currentTime - t) < 0.04) return;
      if (isSeeking) {
        pendingTime = t;
        return;
      }
      isSeeking = true;
      try {
        if ('fastSeek' in video && typeof video.fastSeek === 'function') {
          video.fastSeek(t);
        } else {
          video.currentTime = t;
        }
      } catch {
        video.currentTime = t;
      }
    }

    window.addEventListener('scroll', () => {
      const heroRect = heroSection.getBoundingClientRect();
      const heroHeight = heroSection.offsetHeight;
      const scrolled = Math.max(0, -heroRect.top);
      const progress = Math.min(1, scrolled / heroHeight);

      if (fillBar) {
        fillBar.style.width = \`\${progress * 100}%\`;
      }

      if (video.duration) {
        seekTo(progress * video.duration);
      }
    }, { passive: true });
  }

  setupProjectsFilter() {
    const tabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');
        this.currentFilter = category;

        projectCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = this.currentLanguage === 'ar' ? 'جاري الإرسال...' : 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
        this.showToast(
          this.currentLanguage === 'ar'
            ? 'تم إرسال طلبك بنجاح! سيتواصل معك أحد مهندسينا قريباً.'
            : 'Your message has been sent successfully! Our engineering team will contact you soon.'
        );
      }, 1000);
    });
  }

  showToast(msg) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = \`<span>✓</span> <span>\${msg}</span>\`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4500);
  }
}

// Start Engine
document.addEventListener('DOMContentLoaded', () => {
  new AppEngine();
});
`;

fs.writeFileSync(path.join(targetDir, 'js', 'main.js'), jsMainContent, 'utf8');

console.log('style.css and main.js generated successfully.');
