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

* **Liquid Magnetic Cursor**: A custom, fluid cursor that intelligently tracks the mouse and snaps to interactive elements, seamlessly expanding into a bubble wrap effect using optimized `requestAnimationFrame` lerping.
* **Interactive SVG Diagrams**: Complex, fully declarative React/SVG architectural diagrams featuring automated packet-routing animations and dynamic state visualizations.
* **Hero entrance**: Headline lines rise out of overflow masks with staggered delays, followed by a blur-fade cascade; replays on language switch.
* **Scroll reveals**: Sections de-blur and rise into place via a precisely tuned Intersection Observer API.
* **Micro-interactions**: Magnetic CTA buttons, active-state robust navbar, paused-on-hover tech marquee.
* **Accessibility**: Every animation strictly respects the `prefers-reduced-motion` media query.

---

## Technical Stack

* **Frontend**: React with Hooks and functional components — zero heavy UI or animation libraries.
* **Styling**: Pure CSS3 with custom properties for global theme management.
* **Performance**: Stripped of unnecessary boilerplate (no unused testing suites or heavy metrics packages) for an ultra-lightweight bundle.
* **Deployment**: Automated CI/CD pipeline via GitHub Actions using the native `actions/deploy-pages@v4`.

---

## Project Structure

* **Navbar**: Floating frosted-glass pill with numbered nav links, language toggles, precise active-state tracking, and a scroll-progress hairline.
* **Hero**: Masked headline reveal beside a syntax-highlighted terminal card with a live status bar and floating tech badges.
* **Marquee**: Full-width scrolling strip of core technologies.
* **About**: Editorial two-column biography with glass fact cards (education, languages, relocation).
* **Experience**: Timeline rail with glowing nodes and frosted experience cards.
* **Projects**: Bento grid — featuring an interactive, animated MCP orchestration server diagram, the Our Day Flutter app, the Porsche Showcase full-stack rebuild and more, each with optional repo links.
* **Skills**: Categorized toolbox panels with mono-spaced pills.
* **Contact**: Centered glass panel with copy-to-clipboard email and social links.

---

## Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/michelegravagnone/portfolio.git](https://github.com/michelegravagnone/portfolio.git)