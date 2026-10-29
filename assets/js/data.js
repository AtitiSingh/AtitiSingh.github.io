/*
 * Portfolio content — the single source of truth.
 * Every section is rendered from this object; nothing is hardcoded in the UI.
 * All facts come from the resume. Fields set to null are skipped by the renderer
 * (add the content later and it will appear automatically).
 */
window.PORTFOLIO = {
  site: {
    url: "https://atitisingh.github.io/",
    version: "v1.0",
    year: 2026,
    footerNote: "Built with curiosity, caffeine & too many Git commits.",
  },

  personal: {
    name: "Atiti Singh",
    title: "Software Engineer",
    resumeTitle: "Software Developer Engineer",
    location: "Noida, Uttar Pradesh, India",
    careerStart: "2022-07", // first full-time role; drives the "years" stat
    status: "available for opportunities",
    headline: "building scalable systems, intelligent products & high-performance experiences.",
    summary:
      "I build slot-game engines and game servers in TypeScript and Node.js, ship cross-platform Flutter apps to the Play Store and App Store, and prototype LLM agents that call real tools through LangGraph and MCP. I care about the maths being right, the numbers being measurable and the architecture staying modular.",
    typing: [
      "Building slot-game engines in TypeScript...",
      "Shipping Flutter apps to the Play Store & App Store...",
      "Wiring LLM agents to real tools with LangGraph & MCP...",
      "Profiling, stress-testing and fixing what is slow...",
    ],
    builds: [
      "slot-game logic & game servers",
      "cross-platform mobile apps",
      "AI agents & MCP tool servers",
      "REST APIs & backend services",
    ],
    pillars: ["Engineering", "Product", "Architecture", "Performance"],
    buildAreas: [
      {
        title: "Game systems",
        text: "End-to-end slot-game logic: gameplay mechanics, state management and feature flows, backed by RNG, RTP, volatility and payout maths.",
      },
      {
        title: "Full-stack & mobile products",
        text: "Flutter front ends on Node.js / TypeScript back ends, with Firebase or Azure, shipped to real users.",
      },
      {
        title: "Intelligent products",
        text: "RAG pipelines and agentic, tool-calling workflows built on LangGraph and custom MCP servers.",
      },
    ],
  },

  social: {
    email: "atitisingh40@gmail.com",
    phone: "+91 91297 85903",
    phoneHref: "+919129785903",
    linkedin: "https://www.linkedin.com/in/atiti-singh/",
    github: "https://github.com/AtitiSingh/",
  },

  resume: {
    pdf: "assets/resume/Atiti-Singh-Resume.pdf",
    docx: "assets/resume/Atiti-Singh-Resume.docx",
    downloadName: "Atiti-Singh-Resume.pdf",
  },

  experience: [
    {
      role: "Engineer II",
      company: "Aristocrat Technologies India Pvt Ltd",
      location: "Noida, Uttar Pradesh",
      start: "2025-07",
      end: null,
      industry: "Gaming",
      summary: "Slot-based game logic and game-server development.",
      achievements: [
        "Developed end-to-end slot-based game logic in TypeScript, JavaScript and Node.js, covering core gameplay mechanics, state management and feature flows.",
        "Contributed to game-server development with a working command of RNG, RTP (Return to Player), volatility and payout mathematics.",
        "Resolved analytics, stress-testing and profiling issues to improve game performance, reliability and data accuracy.",
        "Worked with game designers, QA and product to turn game specifications into reliable backend and game-engine logic.",
      ],
      tech: ["TypeScript", "JavaScript", "Node.js"],
    },
    {
      role: "Software Developer Engineer - I",
      company: "Tranzita Systems",
      location: "Lucknow, Uttar Pradesh",
      start: "2022-07",
      end: "2025-07",
      industry: "E-commerce · Enterprise · AI",
      summary: "Full-stack mobile and backend products, plus early work with LLM tooling.",
      achievements: [
        "Designed, developed and maintained full-stack applications: Flutter on the front end, Node.js and TypeScript with Firebase / Azure on the back end.",
        "Delivered in agile teams with version control, code reviews and testing as the default, keeping deployments smooth and production issues low.",
        "Explored LLMs, Retrieval-Augmented Generation (RAG) and Model Context Protocol (MCP) servers, and how to integrate them into software products.",
      ],
      tech: ["Flutter", "Node.js", "TypeScript", "Firebase", "Azure", "LLMs", "RAG", "MCP Server"],
    },
    {
      role: "Intern Engineer",
      company: "Cargoflash Pvt Ltd",
      location: "Gurugram, Haryana",
      start: "2022-05",
      end: "2022-07",
      industry: null,
      summary: "SQL and data access for API development.",
      achievements: [
        "Wrote and optimised SQL queries for efficient data retrieval in API integration work.",
        "Supplied structured database queries to backend developers, speeding up API development and data handling.",
      ],
      tech: ["SQL"],
    },
    {
      role: "Web Developer Intern",
      company: "Spark Foundation",
      location: "Singapore",
      start: "2021-08",
      end: "2021-09",
      industry: "FinTech (payments)",
      summary: "Responsive web UIs and a payment gateway interface.",
      achievements: [
        "Built responsive UIs with HTML, CSS and JavaScript while learning front-end / back-end integration.",
        "Developed a payment gateway interface with Razor Pages for secure online transactions for small businesses.",
      ],
      tech: ["HTML", "CSS", "JavaScript", "Razor Pages"],
    },
  ],

  /* Categories drive both the skills grid and the interactive stack map. */
  skills: [
    {
      id: "languages",
      name: "Languages",
      items: [
        { name: "TypeScript", desc: "Typed JavaScript; used for game logic, back ends and agent workflows." },
        { name: "JavaScript", desc: "The language of the web and Node.js runtimes." },
        { name: "Dart", desc: "Client-optimised language behind Flutter." },
        { name: "Kotlin", desc: "JVM language for native Android development." },
      ],
    },
    {
      id: "frontend",
      name: "Frontend & Mobile",
      items: [
        { name: "ReactJS", desc: "Component-based UI library." },
        { name: "Flutter", desc: "Cross-platform UI toolkit for mobile apps from one codebase." },
        { name: "HTML", desc: "Semantic structure of the web." },
        { name: "CSS", desc: "Styling and responsive layout." },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      items: [
        { name: "Node.js", desc: "JavaScript runtime for servers, APIs and tooling." },
        { name: "Express.js", desc: "Minimal web framework for Node.js APIs." },
      ],
    },
    {
      id: "databases",
      name: "Databases",
      items: [
        { name: "MongoDB", desc: "Document database." },
        { name: "Firestore", desc: "Managed, real-time NoSQL database on Firebase." },
        { name: "SQL", desc: "Relational querying and data modelling." },
        { name: "Redis", desc: "In-memory data store, commonly used for caching." },
      ],
    },
    {
      id: "ai",
      name: "AI Tools & Technologies",
      items: [
        { name: "LLMs", desc: "Large Language Models as reasoning and generation engines." },
        { name: "LangChain", desc: "Framework for composing LLM applications." },
        { name: "LangGraph", desc: "Graph-based orchestration for stateful, agentic workflows." },
        { name: "MCP Server", desc: "Model Context Protocol servers that expose tools to LLMs." },
        { name: "RAG", desc: "Retrieval-Augmented Generation: ground answers in retrieved documents." },
        { name: "Claude Code", desc: "AI coding agent used in day-to-day development." },
        { name: "Copilot", desc: "AI pair-programming assistant." },
      ],
    },
    {
      id: "cloud",
      name: "Cloud",
      items: [
        { name: "GCP", desc: "Google Cloud Platform." },
        { name: "Azure", desc: "Microsoft cloud services." },
        { name: "Firebase", desc: "Backend-as-a-service: auth, database and hosting." },
      ],
    },
    {
      id: "devops",
      name: "Tools & DevOps",
      items: [
        { name: "Docker", desc: "Containerised, reproducible builds and deployments." },
        { name: "Git", desc: "Version control." },
        { name: "GitHub", desc: "Code hosting, reviews and collaboration." },
        { name: "GitHub Actions", desc: "CI/CD workflows on GitHub." },
        { name: "Postman", desc: "API design and testing." },
        { name: "VS Code", desc: "Editor." },
        { name: "Android Studio", desc: "Android and Flutter tooling." },
        { name: "WebStorm", desc: "JetBrains IDE for JavaScript / TypeScript." },
        { name: "Linux", desc: "Command-line and server environment." },
        { name: "MS Office", desc: "Documentation and collaboration tooling." },
      ],
    },
    {
      id: "apis",
      name: "APIs & Protocols",
      items: [
        { name: "RESTful APIs", desc: "Resource-oriented HTTP API design." },
        { name: "OAuth", desc: "Delegated authorisation." },
        { name: "Beckn Protocol", desc: "Open protocol behind ONDC's digital-commerce network." },
        { name: "Microsoft Graph API", desc: "Unified API for Microsoft 365 data such as OneDrive and SharePoint." },
        { name: "Razor Pages", desc: "Page-focused web UI framework for ASP.NET." },
        { name: "ML Kit", desc: "On-device machine-learning SDK, used here for text recognition." },
      ],
    },
  ],

  /*
   * Each project lists `stack` (names matching skill items link up in the stack map)
   * and `architecture`: nodes placed on layers (rows) with explicit edges.
   * `problem` / `solution` frame the resume bullets; `challenges` is null until supplied.
   */
  projects: [
    {
      id: "slot-games",
      name: "Digital Slot-Based Games",
      kind: "Production",
      industry: "Gaming",
      tagline: "Multiple slot games built on an abstract, reusable TypeScript foundation.",
      problem:
        "Ship several slot-based games with consistent mechanics, accurate analytics and stable performance under load.",
      solution:
        "Built the games at an abstract level in TypeScript so core mechanics and feature flows are reused across titles, then released them into different lobbies.",
      stack: ["TypeScript", "Node.js", "Express.js", "MongoDB", "Git", "Docker", "GCP"],
      architecture: {
        nodes: [
          { id: "logic", label: "Game logic", sub: "TypeScript", layer: 0 },
          { id: "server", label: "Game server", sub: "Node.js · Express", layer: 1 },
          { id: "db", label: "MongoDB", sub: "persistence", layer: 2 },
          { id: "run", label: "Docker on GCP", sub: "deployment", layer: 2 },
        ],
        edges: [["logic", "server"], ["server", "db"], ["server", "run"]],
      },
      impact: [
        "Released games in multiple lobbies.",
        "Resolved analytics, stress-testing and profiling issues, improving performance, reliability and data accuracy.",
      ],
      challenges: null,
      links: [],
    },
    {
      id: "car-manual-ai",
      name: "Car Manual AI Chat Assistant",
      kind: "Proof of concept",
      industry: "AI",
      tagline: "Contextual answers from vehicle documentation, via RAG and a custom MCP server.",
      problem:
        "Vehicle manuals are long and hard to search; owners need an answer to their question, not a page to hunt through.",
      solution:
        "A RAG pipeline retrieves the relevant manual sections and the LLM answers from them. A LangGraph agent decides when to retrieve, and a custom MCP server exposes manual search as tools.",
      stack: ["LLMs", "LangGraph", "MCP Server", "RAG", "Node.js", "Express.js", "TypeScript", "Git", "Docker"],
      architecture: {
        nodes: [
          { id: "user", label: "User question", sub: "chat", layer: 0 },
          { id: "agent", label: "LangGraph agent", sub: "reason · retrieve · act", layer: 1 },
          { id: "llm", label: "LLM", sub: "generation", layer: 2 },
          { id: "mcp", label: "Custom MCP server", sub: "manual-search tools", layer: 2 },
          { id: "rag", label: "RAG pipeline", sub: "retrieval", layer: 3 },
          { id: "docs", label: "Car manuals", sub: "documentation", layer: 4 },
        ],
        edges: [["user", "agent"], ["agent", "llm"], ["agent", "mcp"], ["mcp", "rag"], ["rag", "docs"]],
      },
      impact: [
        "Modular, extensible architecture: retrieval is exposed as MCP tools that other assistants could reuse.",
      ],
      challenges: null,
      links: [],
    },
    {
      id: "stock-ai",
      name: "Stock AI Chat Assistant",
      kind: "Proof of concept",
      industry: "FinTech · AI",
      tagline: "Natural-language market data, portfolio inspection and trading through an agent.",
      problem:
        "Market data, portfolio views and order placement sit behind separate screens and APIs; the goal was one conversational interface to all three.",
      solution:
        "A LangGraph agent interprets intent, selects the right tool and runs multi-step operations through the Zerodha MCP server and Zerodha APIs: analysis, portfolio inspection, market data and order placement.",
      stack: ["LLMs", "LangGraph", "MCP Server", "Node.js", "Express.js", "TypeScript", "Git", "Docker"],
      architecture: {
        nodes: [
          { id: "user", label: "User intent", sub: "natural language", layer: 0 },
          { id: "agent", label: "LangGraph agent", sub: "tool-calling workflow", layer: 1 },
          { id: "llm", label: "LLM", sub: "intent & planning", layer: 2 },
          { id: "mcp", label: "Zerodha MCP server", sub: "modular tools", layer: 2 },
          { id: "api", label: "Zerodha APIs", sub: "market · portfolio · orders", layer: 3 },
        ],
        edges: [["user", "agent"], ["agent", "llm"], ["agent", "mcp"], ["mcp", "api"]],
      },
      impact: [
        "Supports stock analysis, portfolio inspection, market-data retrieval and trade execution from plain language.",
        "Modular MCP-based design that extends to additional financial tools.",
      ],
      challenges: null,
      links: [],
    },
    {
      id: "shopcircuit",
      name: "Shopcircuit: ONDC Digital Commerce Platform",
      kind: "Production",
      industry: "E-commerce",
      tagline: "Buyer and seller apps for India's Open Network for Digital Commerce, on the Beckn Protocol.",
      problem:
        "Take part in ONDC's open commerce network, which means speaking Beckn, passing ONDC's compliance guidelines and giving users a mobile app that feels good to use.",
      solution:
        "Built BNP and SNP modules on the Beckn Protocol, REST APIs for catalog, search and order management, and a Flutter mobile interface.",
      stack: ["Flutter", "Node.js", "Express.js", "TypeScript", "Firebase", "MongoDB", "Redis", "Git", "Docker", "OAuth", "Beckn Protocol", "RESTful APIs"],
      architecture: {
        nodes: [
          { id: "app", label: "Flutter app", sub: "mobile UI", layer: 0 },
          { id: "api", label: "REST API", sub: "catalog · search · orders", layer: 1 },
          { id: "bnp", label: "BNP module", sub: "buyer side", layer: 2 },
          { id: "snp", label: "SNP module", sub: "seller side", layer: 2 },
          { id: "store", label: "Data stores", sub: "MongoDB · Redis · Firebase", layer: 2 },
          { id: "ondc", label: "ONDC network", sub: "Beckn Protocol", layer: 3 },
        ],
        edges: [["app", "api"], ["api", "bnp"], ["api", "snp"], ["api", "store"], ["bnp", "ondc"], ["snp", "ondc"]],
      },
      impact: [
        "Increased user satisfaction by 25% with the Flutter mobile interface.",
        "Reduced post-launch bugs by 30% while keeping to ONDC guidelines.",
      ],
      challenges: null,
      links: [
        { label: "Website", href: "https://shopcircuit.ai/" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=vidyant.shopcircuit&pcampaignid=web_share" },
        { label: "App Store", href: "https://apps.apple.com/in/app/shopcircuit-online-shopping/id6472271889" },
      ],
    },
    {
      id: "sage3",
      name: "SAGE 3.0 Mobile Application",
      kind: "Production",
      industry: "Enterprise",
      tagline: "A Flutter rebuild of SAGE 2.0 for performance and cross-platform consistency.",
      problem:
        "SAGE 2.0 needed better performance and consistent behaviour across platforms, without disrupting existing users.",
      solution:
        "Redesigned the front end in Flutter, enhanced the Node.js back-end services for new features and data handling, and managed the migration from SAGE 2.0 using user feedback.",
      stack: ["Flutter", "Node.js", "JavaScript", "Azure", "SQL", "Git", "GitHub Actions", "OAuth"],
      architecture: {
        nodes: [
          { id: "app", label: "Flutter app", sub: "SAGE 3.0 front end", layer: 0 },
          { id: "api", label: "Node.js services", sub: "OAuth-secured", layer: 1 },
          { id: "sql", label: "SQL database", sub: "hosted on Azure", layer: 2 },
        ],
        edges: [["app", "api"], ["api", "sql"]],
      },
      impact: [
        "Better performance and cross-platform consistency from the Flutter redesign.",
        "Seamless migration from SAGE 2.0, shaped by user feedback.",
      ],
      challenges: null,
      links: [
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=tranzita.sage3&pcampaignid=web_share" },
      ],
    },
    {
      id: "sage2",
      name: "SAGE 2.0 Mobile Application",
      kind: "Production",
      industry: "Enterprise",
      tagline: "Maintaining and extending a native Kotlin app on a Node.js and Azure back end.",
      problem: "Keep an existing mobile app healthy: add features and remove performance bottlenecks.",
      solution:
        "Maintained and optimised existing features, implemented new functionality and resolved performance bottlenecks.",
      stack: ["Kotlin", "Node.js", "JavaScript", "Azure", "SQL", "Git", "OAuth"],
      architecture: {
        nodes: [
          { id: "app", label: "Kotlin app", sub: "Android", layer: 0 },
          { id: "api", label: "Node.js services", sub: "OAuth-secured", layer: 1 },
          { id: "sql", label: "SQL database", sub: "hosted on Azure", layer: 2 },
        ],
        edges: [["app", "api"], ["api", "sql"]],
      },
      impact: ["New functionality delivered and performance bottlenecks resolved."],
      challenges: null,
      links: [],
    },
    {
      id: "ocr-tool",
      name: "OCR Data Input Tool",
      kind: "Production",
      industry: "Enterprise",
      tagline: "Structured data extraction from images, saved straight into SharePoint and OneDrive.",
      problem: "Turn text in images into structured data and file it securely in Microsoft 365, without manual re-typing.",
      solution:
        "A Flutter tool using Google ML Kit for text recognition, with OAuth / MSAL sign-in and Microsoft Graph API access to OneDrive and SharePoint Online.",
      stack: ["Flutter", "ML Kit", "Microsoft Graph API", "OAuth", "Git"],
      architecture: {
        nodes: [
          { id: "app", label: "Flutter app", sub: "image capture", layer: 0 },
          { id: "ocr", label: "Google ML Kit", sub: "text recognition", layer: 1 },
          { id: "graph", label: "Microsoft Graph API", sub: "OAuth · MSAL", layer: 2 },
          { id: "sp", label: "SharePoint & OneDrive", sub: "storage", layer: 3 },
        ],
        edges: [["app", "ocr"], ["ocr", "graph"], ["graph", "sp"]],
      },
      impact: ["Secure OneDrive / SharePoint access with OAuth, and high reliability through extensive testing and debugging."],
      challenges: null,
      links: [],
    },
  ],

  /* Only industries evidenced in the resume. `projects` are project ids. */
  industries: [
    {
      name: "Gaming",
      blurb: "Slot-game logic and game servers, grounded in RNG, RTP, volatility and payout maths.",
      tech: ["TypeScript", "Node.js", "MongoDB", "Docker", "GCP"],
      projects: ["slot-games"],
      impact: "Games released across multiple lobbies.",
    },
    {
      name: "E-commerce",
      blurb: "An ONDC buyer and seller platform on the Beckn Protocol, with a Flutter mobile app.",
      tech: ["Flutter", "Node.js", "Beckn Protocol", "Redis"],
      projects: ["shopcircuit"],
      impact: "+25% user satisfaction, -30% post-launch bugs.",
    },
    {
      name: "FinTech",
      blurb: "A conversational trading assistant (proof of concept) and a small-business payment gateway interface.",
      tech: ["LangGraph", "MCP Server", "Razor Pages"],
      projects: ["stock-ai"],
      impact: "Natural-language trade execution through the Zerodha MCP server.",
    },
    {
      name: "AI",
      blurb: "RAG pipelines, agentic workflows and custom MCP servers over real documents and APIs.",
      tech: ["LLMs", "RAG", "LangGraph", "MCP Server"],
      projects: ["car-manual-ai", "stock-ai"],
      impact: "Modular tool servers that extend to new capabilities.",
    },
    {
      name: "Enterprise",
      blurb: "Mobile apps and tooling on Azure and Microsoft 365, secured with OAuth.",
      tech: ["Flutter", "Azure", "SQL", "Microsoft Graph API", "OAuth"],
      projects: ["sage3", "sage2", "ocr-tool"],
      impact: "Migrated SAGE 2.0 users to a faster Flutter app.",
    },
  ],

  philosophy: [
    {
      title: "Correctness first",
      text: "Game maths (RNG, RTP, volatility, payouts) leaves no room for close enough.",
      evidence: "Slot-game logic at Aristocrat",
    },
    {
      title: "Measure, then fix",
      text: "Profiling, stress tests and analytics checks beat guessing where the time goes.",
      evidence: "Performance, reliability and data-accuracy fixes",
    },
    {
      title: "Modular by design",
      text: "Expose capabilities as small, composable tools so systems can grow without rewrites.",
      evidence: "Custom MCP servers for manual search and trading",
    },
    {
      title: "Build with the team",
      text: "Specs become reliable code through designers, QA and product, plus code review and testing.",
      evidence: "Cross-functional delivery at Aristocrat and Tranzita",
    },
    {
      title: "Ship to real users",
      text: "A feature is done when it is live, compliant and not generating bugs.",
      evidence: "Play Store / App Store releases, ONDC compliance",
    },
    {
      title: "Keep learning",
      text: "Tools change quickly. I explore LLMs, RAG, MCP and AI coding agents hands-on.",
      evidence: "Claude Code, Copilot, LangGraph, MCP",
    },
  ],

  underTheHood: {
    intro:
      "This site is a small piece of engineering too: content lives in one data file and the UI renders from it, with no framework and no runtime dependencies.",
    items: [
      { label: "Frontend", value: "Semantic HTML5 · vanilla JavaScript" },
      { label: "Styling", value: "CSS custom properties · mobile-first" },
      { label: "Animation", value: "transform & opacity · IntersectionObserver" },
      { label: "Accessibility", value: "Native <dialog> · ARIA combobox · reduced-motion" },
      { label: "Performance", value: "No framework · system fonts · idle-paused canvas" },
      { label: "Deployment", value: "GitHub Pages · static files" },
    ],
    architecture: {
      nodes: [
        { id: "data", label: "data.js", sub: "all content", layer: 0 },
        { id: "render", label: "Renderers", sub: "sections · graph · modal · palette", layer: 1 },
        { id: "dom", label: "Accessible DOM", sub: "semantic HTML", layer: 2 },
        { id: "pages", label: "GitHub Pages", sub: "static hosting", layer: 3 },
      ],
      edges: [["data", "render"], ["render", "dom"], ["dom", "pages"]],
    },
  },

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Madan Mohan Malviya University of Technology, Gorakhpur",
      start: "2020-08",
      end: "2022-07",
      note: "CGPA 8.4",
    },
  ],

  certifications: [
    { name: "Diploma in O-level (IT)", issuer: "NIELIT" },
    { name: "Certificate in CCC", issuer: "NIELIT" },
  ],
};
