# Michele Gravagnone | Software Engineer Portfolio

A high-performance portfolio website built with React and pure CSS3. The design follows an **"ink & signal"** aesthetic: heavy frosted-glass panels floating over a deep ink-navy backdrop, with a single electric-lime accent, a faint blueprint grid and soft aurora glow orbs.

---

## Design Specifications

* **Visual Theme**: Dark ink-navy default with an electric-lime + teal signal palette; cool porcelain light mode. Both driven entirely by CSS custom properties.
* **Glassmorphism**: Frosted-glass cards with high-blur backdrop filters, inner top highlights and a specular sheen that sweeps across panels on hover.
* **Typography**: Bricolage Grotesque (display) · Hanken Grotesk (body) · JetBrains Mono (labels, tags, terminal details).
* **Iconography**: Minimal geometric Unicode glyphs (`⬡ ∞ ℂ ❯ ⌖`) rendered in the accent color — no emojis, no icon library.
* **Internationalization**: Full English / Italian content switching, persisted to `localStorage`.
* **Responsive Design**: Fully optimized for mobile, tablet and desktop viewing.

## Motion & Transitions

* **Hero entrance**: headline lines rise out of overflow masks with staggered delays, followed by a blur-fade cascade; replays on language switch.
* **Theme switch**: circular "ink spill" reveal radiating from the toggle click point, built on the View Transitions API with a graceful instant fallback.
* **Scroll reveals**: sections de-blur and rise into place via the Intersection Observer API.
* **Micro-interactions**: 3D cursor tilt on the hero terminal card, magnetic CTA buttons, cursor-tracking spotlight on project cards, paused-on-hover tech marquee.
* **Accessibility**: every animation respects `prefers-reduced-motion`.

---

## Technical Stack

* **Frontend**: React with Hooks and functional components — no UI or animation libraries.
* **Styling**: Pure CSS3 with custom properties for global theme management.
* **Deployment**: GitHub Pages via `gh-pages`, with a GitHub Actions deploy workflow.

---

## Project Structure

* **Navbar**: floating frosted-glass pill with numbered nav links, language/theme toggles and a scroll-progress hairline.
* **Hero**: masked headline reveal beside a syntax-highlighted terminal card with a live status bar and floating tech badges.
* **Marquee**: full-width scrolling strip of core technologies.
* **About**: editorial two-column biography with glass fact cards (education, languages, relocation).
* **Experience**: timeline rail with glowing nodes and frosted experience cards.
* **Projects**: bento grid — featured MCP orchestration server, the Our Day Flutter app, the Porsche Showcase full-stack rebuild and more, each with a cursor spotlight and optional repo link.
* **Skills**: categorized toolbox panels with mono-spaced pills.
* **Contact**: centered glass panel with copy-to-clipboard email and social links.

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/michelegravagnone/portfolio.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm start
```

### 4. Build for production
```bash
npm run build
```

### 5. Deploy to GitHub Pages
```bash
npm run deploy
```

---

## Editing Content

All copy lives in `src/i18n.js`, mirrored across the `en` and `it` blocks — keep both in sync when editing. Project entries support optional `repo` (renders a GitHub link button), `icon` (Unicode glyph) and `featured` fields. Theme tokens live at the top of `src/index.css`.

---

## License
This project is licensed under the MIT License. You are permitted to use, modify, and distribute this code provided that the original copyright and license notice are included.

<sup><sub> Built by Michele Gravagnone 2026 </sub></sup>
