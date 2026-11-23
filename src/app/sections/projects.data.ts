export const PROJECTS = [
  {
    number: "01",
    slug: "vero-autonomous-cfo",
    art: "api",
    category: "backend",
    title: "Vero Autonomous CFO",
    context: "Collabothon 2026 · Commerzbank × Red Hat challenge · team of 6",
    contextIt: "Collabothon 2026 · sfida Commerzbank × Red Hat · team di 6",
    status: "Public repository",
    statusIt: "Repository pubblico",
    tech: "Python / FastAPI / Pydantic / SQLModel / PostgreSQL / pytest / Red Hat OpenShift AI / vLLM",
    description:
      "An AI finance assistant for small businesses: it forecasts 13 weeks of cash and checks every recurring cost against contracts. The model proposes; a deterministic backend computes every number and decides what can run alone, what needs the owner's approval and what is not allowed.",
    descriptionIt:
      "Assistente finanziario AI per piccole imprese: prevede la liquidità delle 13 settimane successive e verifica ogni costo ricorrente rispetto ai contratti. Il modello propone; un backend deterministico calcola ogni numero e decide cosa può essere eseguito in autonomia, cosa richiede l’approvazione del titolare e cosa non è consentito.",
    notes:
      "I built the FastAPI backend: a 91-day cash forecast from a real bank statement (backtest error 3%), a policy engine for the owner's rules, a formula engine, and a grounding layer that re-checks the agent's evidence against real tool results before the backend sets the final label. If the agent fails, a scripted investigation reaches the same result. Includes a SHA-256 hash-chained activity log, idempotency keys, in-memory and PostgreSQL storage, and 554 tests with two end-to-end release gates. Payments and letters are simulated.",
    notesIt:
      "Ho realizzato il backend FastAPI: previsione di liquidità a 91 giorni da un estratto conto reale (errore di backtest del 3%), un motore di regole per i limiti del titolare, un motore di calcolo e un livello di verifica che confronta le prove dell’agente con i risultati reali degli strumenti prima che sia il backend a stabilire l’esito. Se l’agente fallisce, un’indagine con passi prestabiliti raggiunge lo stesso risultato. Include un registro attività con catena di hash SHA-256, chiavi di idempotenza, archiviazione in memoria e PostgreSQL e 554 test con due verifiche end-to-end di rilascio. Pagamenti e lettere sono simulati.",
  },
  {
    number: "02",
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
      "Implemented 9 REST endpoints with strict DTO validation, Swagger documentation, versioned migrations and Vitest unit tests. PostgreSQL end-to-end tests run in GitHub Actions. Ingestion is idempotent to handle conflicting sensor uploads. Planned next: RabbitMQ between the backend and AI inference service to decouple uploads from asynchronous classification. Authentication and public response filtering also remain planned.",
    notesIt:
      "Implementati 9 endpoint REST con validazione rigorosa dei DTO, documentazione Swagger, migrazioni versionate e test unitari Vitest. I test end-to-end con PostgreSQL vengono eseguiti in GitHub Actions. L’ingestione è idempotente per gestire upload dei sensori in conflitto. Prossimo passo previsto: RabbitMQ tra backend e servizio di inferenza AI per separare gli upload dalla classificazione asincrona. Anche autenticazione e filtri delle risposte pubbliche restano pianificati.",
  },
  {
    number: "03",
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
      "A full-stack catalog of 9 cars and 7 REST endpoints with a clear access boundary: browse the models freely; retrieve performance specifications only with a valid server-side session.",
    descriptionIt:
      "Catalogo full-stack di 9 auto e 7 endpoint REST con accessi distinti: modelli pubblici, specifiche prestazionali disponibili solo con una sessione validata dal server.",
    notes:
      "Express serves a vanilla HTML/CSS/JavaScript frontend and a TypeScript API. Passwords use bcrypt, JWTs travel in httpOnly cookies and SQLite queries are parameterized. HTTP integration tests cover startup, catalog access and authentication; GitHub Actions runs the checks. Includes a free Render demo configuration that reseeds temporary SQLite storage at startup. Requires a Node host; no live deployment is claimed.",
    notesIt:
      "Express serve un frontend HTML/CSS/JavaScript e API in TypeScript. Password con bcrypt, JWT in cookie httpOnly e query SQLite parametrizzate. Test HTTP di integrazione coprono avvio, catalogo e autenticazione; GitHub Actions esegue i controlli. Include una configurazione demo gratuita per Render che ricrea il catalogo SQLite temporaneo a ogni avvio. Richiede hosting Node; nessun deployment live dichiarato.",
  },
  {
    number: "04",
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
