# Michele Gravagnone — Portfolio

A Notion-inspired Angular portfolio: a workspace sidebar, a compact profile document, expandable project records and quiet typography. Light by default, with persistent light/dark and English/Italian preferences.

```sh
npm ci
npm start
```

Open http://localhost:4200.

```sh
npm run build          # Root-hosted production build
npm run build:pages    # GitHub Pages build with /portfolio/ base URL
npm run typecheck     # Strict TypeScript check
```

The Pages artifact is `dist/portfolio/browser`. The existing GitHub Actions workflow builds and deploys it on pushes to `main`.

## Structure

```text
src/
  main.ts                              Standalone Angular bootstrap
  index.html                           Metadata and early theme selection
  styles.css                           Workspace layout, tokens and themes
  app/
    app.component.ts                   Navigation and active section tracking
    app.component.html                 Profile, experience, education and profile properties
    core/preferences.service.ts        Theme/language state and persistence
    sections/icon.component.ts         Shared inline SVG icons
    sections/projects.component.ts     Expandable database, filters and reading view
    sections/projects.data.ts          Verified bilingual project records
public/apps/                           Preserved legacy demo assets
```

The project database supports category filters, native keyboard-accessible disclosures and a reading view. The workspace sidebar tracks the current section and becomes a dismissible navigation drawer on compact screens. The profile email and sidebar GitHub/LinkedIn links remain available. Theme changes use a circular sunrise/sunset reveal centered on the switch icon, with the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition). A single page snapshot keeps colors and text synchronized. Reduced motion and browsers without that API switch instantly.

Edit project copy in `projects.data.ts` and biography/education in `app.component.html`, keeping both languages aligned. The site is static: it does not use a Notion backend, execute shell commands, fetch GitHub data at runtime or require credentials. No third-party UI library or external font requests are needed.

MIT license; see [LICENSE](LICENSE).
