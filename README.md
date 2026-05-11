# AuralX Pro

A cinematic product landing page for a premium wireless headphone brand. Built with React + Vite featuring 3D model rendering, scroll-based storytelling, and immersive animations.

## 🌐 Live Demo
🔗 [Product_Landing](https://product-landing-psi.vercel.app/)

## Tech Stack

- **React 19 + Vite** — Framework & build tool
- **Three.js + React Three Fiber** — 3D GLB model rendering
- **GSAP + ScrollTrigger** — Timeline & scroll animations
- **Framer Motion** — Spring physics & transitions
- **Tailwind CSS v4** — Styling
- **Lenis** — Smooth scrolling

## Getting Started

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Navbar, CustomCursor, HeadphoneModel, Loading
├── sections/       # Hero, ProductShowcase, Features, ScrollStory, About, CTA, Footer
├── animations/     # Framer Motion variants
├── hooks/          # useSmoothScroll
└── assets/         # headphone.glb, hero.png
```

## Features

- 3D headphone GLB model with circular orbit animation and mouse parallax
- GSAP cinematic entrance — model scales from 0 → 1 with blur reveal
- Scroll-pinned storytelling sections with scene transitions
- Glassmorphism cards with gradient borders
- Cursor glow effect tracking mouse movement
- Fully responsive — mobile, tablet, desktop

## Color Palette

| Token | Value |
|---|---|
| Background | `#050816` |
| Primary | `#7c3aed` |
| Secondary | `#06b6d4` |
| Muted | `#94a3b8` |

## License

MIT
