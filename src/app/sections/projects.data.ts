export const PROJECTS = [
  {
    number: "01",
    slug: "wildlife-monitoring",
    art: "wildlife",
    category: "backend",
    title: "Wildlife Monitor",
    context: "Research workshop",
    contextIt: "Workshop di ricerca",
    status: "In development",
    statusIt: "In sviluppo",
    tech: "NestJS / TypeScript / PostgreSQL / Prisma / Docker Compose / GitHub Actions",
    description:
      "An API for wildlife observations in parks around Łódź. Physical sensors, fixed deployments and detections are modelled separately, so moving a device never rewrites observation history.",
    descriptionIt:
      "API per le osservazioni della fauna nei parchi di Łódź. Sensori fisici, installazioni e rilevamenti sono modellati separatamente: spostare un dispositivo non modifica la storia delle osservazioni.",
    notes:
      "Implemented: resource endpoints, validation, Swagger, versioned migrations, unit tests and database-backed HTTP tests in CI. Authentication, public response filtering, idempotent ingestion and pagination are planned. Device capture and cloud inference belong to the wider project, not this backend.",
    notesIt:
      "Implementati: endpoint, validazione, Swagger, migrazioni, test unitari e test HTTP con database in CI. Autenticazione, viste pubbliche, ingestione idempotente e paginazione sono previsti. Acquisizione e inferenza cloud appartengono al progetto più ampio.",
  },
  {
    number: "02",
    slug: "car-website",
    art: "api",
    category: "backend",
    title: "Porsche Showcase API",
    context: "Personal project",
    contextIt: "Progetto personale",
    status: "Public repository",
    statusIt: "Repository pubblico",
    tech: "Node.js / Express / TypeScript / SQLite / Zod / JWT",
    description:
      "A full-stack catalog with a clear access boundary: browse the models freely; retrieve performance specifications only with a valid server-side session.",
    descriptionIt:
      "Catalogo full-stack con accessi distinti: modelli pubblici, specifiche prestazionali disponibili solo con una sessione validata dal server.",
    notes:
      "Express serves a vanilla HTML/CSS/JavaScript frontend and a typed API. Passwords use bcrypt, JWTs travel in httpOnly cookies and SQLite queries are parameterized. The rebuild replaces the original PHP backend.",
    notesIt:
      "Express serve un frontend HTML/CSS/JavaScript e API tipizzate. Password con bcrypt, JWT in cookie httpOnly e query SQLite parametrizzate. Il backend sostituisce la versione originale in PHP.",
  },
  {
    number: "03",
    slug: "task-tracker-cli",
    art: "cli",
    category: "tooling",
    title: "Task Tracker CLI",
    context: "Developer tooling",
    contextIt: "Strumenti di sviluppo",
    status: "Public repository",
    statusIt: "Repository pubblico",
    tech: "Java / Maven / JSON persistence / ANSI terminal",
    description:
      "A terminal task manager built without external dependencies. Task state, due dates and filtering sit behind a hand-written persistence layer.",
    descriptionIt:
      "Gestore di attività da terminale senza dipendenze esterne. Stati, scadenze e filtri con un livello di persistenza scritto da zero.",
    notes:
      "CLI dispatch, business rules, JSON storage and terminal rendering have separate responsibilities. A self-contained JAR runs through shell wrappers. Data is stored in the working directory; this is a local tool, not a distributed service.",
    notesIt:
      "Dispatch CLI, regole di business, archivio JSON e rendering hanno responsabilità distinte. Un JAR autonomo viene eseguito da wrapper shell. I dati sono locali alla directory di lavoro.",
  },
];
