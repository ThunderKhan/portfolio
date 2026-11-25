import type { ComponentType } from "react";
import { Network, Search, Radio, Sparkles, MousePointerClick } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiThreedotjs,
  SiLangchain,
  SiNodedotjs,
  SiTailwindcss,
  SiGithub,
  SiFastapi,
  SiRedis,
  SiPython,
  SiKotlin,
  SiAndroid,
  SiJetpackcompose,
  SiEclipsemosquitto,
  SiSupabase,
  SiDatabricks,
  SiPostgresql,
  SiDocker,
  SiGrafana,
  SiPrometheus,
  SiScikitlearn,
  SiQdrant,
  SiGooglechrome,
  SiGradle,
  SiJunit5,
  SiCplusplus,
  SiApple,
  SiHomebrew,
  SiGnubash,
} from "react-icons/si";

export type TechIcon = ComponentType<{ className?: string }>;
export type TechKey =
  | "next" | "ts" | "react" | "three" | "langchain" | "langgraph" | "rag"
  | "node" | "tailwind" | "github" | "fastapi" | "redis" | "python"
  | "kotlin" | "android" | "compose" | "mqtt" | "supabase" | "databricks"
  | "postgres" | "docker" | "grafana" | "prometheus" | "sklearn" | "qdrant"
  | "chrome" | "gradle" | "junit" | "playwright" | "websockets" | "llm"
  | "cpp" | "macos" | "homebrew" | "shell";

export type TechItem = TechKey | { label: string; tooltip?: string; };

export type ProjectStatus = "live" | "building" | "research" | "archived" | "completed" | "prototype";

export interface Project {
  slug: string;
  title: string;
  imageTitle: string;
  /** Omit until an owner-supplied screenshot exists in public. */
  src?: string;
  lightModeSrc?: string;
  description: string;
  problem?: string;
  highlights?: string[];
  caseStudy?: string;
  evidence?: { label: string; href: string }[];
  statusDetail?: string;
  tech: TechItem[];
  github: string;
  /** Omit when there is nothing working to link to. */
  live?: string;
  /**
   * A demo reel for the detail page, shown in place of `src`. It carries a
   * voice-over, so it is never autoplayed - `src` becomes its poster frame.
   */
  video?: string;
  status: ProjectStatus;
  starsText?: string;
  backgroundImage?: string;
  hasPin: boolean;
}

export const iconMap: Record<TechKey, TechIcon> = {
  next: SiNextdotjs, ts: SiTypescript, react: SiReact, three: SiThreedotjs,
  langchain: SiLangchain, langgraph: Network, rag: Search, node: SiNodedotjs,
  tailwind: SiTailwindcss, github: SiGithub, fastapi: SiFastapi, redis: SiRedis,
  python: SiPython, kotlin: SiKotlin, android: SiAndroid, compose: SiJetpackcompose,
  mqtt: SiEclipsemosquitto, supabase: SiSupabase, databricks: SiDatabricks,
  postgres: SiPostgresql, docker: SiDocker, grafana: SiGrafana, prometheus: SiPrometheus,
  sklearn: SiScikitlearn, qdrant: SiQdrant, chrome: SiGooglechrome, gradle: SiGradle,
  junit: SiJunit5, playwright: MousePointerClick, websockets: Radio, llm: Sparkles,
  cpp: SiCplusplus, macos: SiApple, homebrew: SiHomebrew, shell: SiGnubash,
};

export const techNames: Record<TechKey, string> = {
  next: "Next.js", ts: "TypeScript", react: "React", three: "Three.js",
  langchain: "LangChain", langgraph: "LangGraph", rag: "RAG", node: "Node.js",
  tailwind: "Tailwind CSS", github: "GitHub API", fastapi: "FastAPI", redis: "Redis",
  python: "Python", kotlin: "Kotlin", android: "Android", compose: "Jetpack Compose",
  mqtt: "MQTT", supabase: "Supabase", databricks: "Databricks", postgres: "PostgreSQL",
  docker: "Docker", grafana: "Grafana", prometheus: "Prometheus", sklearn: "scikit-learn",
  qdrant: "Qdrant", chrome: "Chrome Extension", gradle: "Gradle", junit: "JUnit",
  playwright: "Playwright", websockets: "WebSockets", llm: "LLM",
  cpp: "C++", macos: "macOS", homebrew: "Homebrew", shell: "Shell",
};

export const projectsData: Project[] = [
  {
    "slug": "diff2test",
    "title": "diff2test",
    "status": "completed",
    "imageTitle": "CLI output",
    "tech": [
      "cpp",
      {
        "label": "CMake"
      },
      {
        "label": "CTest"
      },
      {
        "label": "ASan/UBSan"
      }
    ],
    "hasPin": true,
    "src": "/project-image/diff2test.png",
    "description": "A zero-runtime-dependency C++20 test-impact analyzer that consumes existing CMake, compiler dependency, and CTest metadata to select only tests justified by build evidence, then widens conservatively when that evidence is incomplete.",
    "problem": "Large C++ repositories either run the entire test suite after every change or rely on heuristics that can silently miss affected tests.",
    "highlights": [
      "Builds an explainable changed-file → translation-unit → target → test graph from pre-generated toolchain metadata",
      "Uses explicit safety states so missing, stale, malformed, ambiguous, or unsupported evidence widens to the known full suite instead of guessing",
      "Ships as a single runtime source file with no runtime process spawning, public verification, sanitizers, reproducibility checks, and deterministic output"
    ],
    "github": "https://github.com/ThunderKhan/diff2test",
    "caseStudy": "/blogs/001",
    "statusDetail": "Completed · C++20 CLI"
  },
  {
    "slug": "webclerk",
    "title": "webclerk",
    "status": "live",
    "imageTitle": "WebMCP application interface",
    "tech": [
      "ts",
      "react",
      {
        "label": "WebMCP"
      },
      {
        "label": "Vite"
      },
      {
        "label": "Vitest"
      }
    ],
    "hasPin": true,
    "src": "/project-image/webclerk.png",
    "description": "A trust-first WebMCP layer for consequential web forms where agents operate through semantic site tools, apply only evidence-backed edits, preserve conflicts and stale evidence, and leave declarations and final submission under human control.",
    "problem": "Browser agents can fill consequential forms quickly, but ordinary automation makes it too easy to guess unsupported facts, hide uncertainty, or cross human-only decision boundaries.",
    "highlights": [
      "Registers nine semantic WebMCP tools directly through document.modelContext and routes writes through the same deterministic domain rules as the human UI",
      "Verified an end-to-end agent flow that moves a fictional application from 70% to 96% completion using six evidence-backed edits while leaving blockers visible",
      "Includes provenance, reversible agent changes, consistency checks, stale-evidence handling, deterministic preflight, and an explicit no-submit boundary"
    ],
    "github": "https://github.com/ThunderKhan/webclerk",
    "live": "https://webclerk.vercel.app/",
    "statusDetail": "WebMCP Challenge · live"
  },
  {
    "slug": "frame",
    "title": "FRAME",
    "status": "research",
    "imageTitle": "Fraud investigation interface",
    "tech": [
      "python",
      "fastapi",
      "sklearn",
      "react",
      "ts",
      {
        "label": "NetworkX"
      }
    ],
    "hasPin": false,
    "src": "/project-image/frame.png",
    "description": "Fraud Ring Analysis & Mapping Engine: a graph-aware fraud-analysis system combining online relational features, short-window temporal signals, calibrated risk scoring, deterministic policy, analyst evidence, and a live investigation interface.",
    "problem": "Coordinated payment abuse can remain invisible when transactions are scored independently even though relationships between customers, devices, cards, IPs, and merchants reveal the pattern.",
    "highlights": [
      "Maintains an evolving payment graph and computes graph + temporal features before every transaction decision",
      "Separates calibrated model risk from deterministic ALLOW / REVIEW / BLOCK policy and observed analyst evidence",
      "Includes a locked synthetic hard-negative benchmark and a live ring-formation demo, with results explicitly scoped as synthetic rather than real-world performance"
    ],
    "github": "https://github.com/ThunderKhan/frame",
    "statusDetail": "Completed · research prototype"
  },
  {
    "slug": "oasis",
    "title": "O.A.S.I.S.",
    "status": "prototype",
    "imageTitle": "Screening and referral interface",
    "tech": [
      "next",
      "ts",
      "fastapi",
      "sklearn",
      {
        "label": "SQLite"
      }
    ],
    "hasPin": false,
    "src": "/project-image/oasis.png",
    "description": "Oncology Assessment & Screening Information System, an explainable clinician-facing prototype for screening and referral prioritisation across oral, breast, and cervical cancer pathways.",
    "problem": "Cancer-screening workflows need to prioritize referral urgency while keeping red flags, eligibility rules, model outputs, and clinical uncertainty legible to the people making decisions.",
    "highlights": [
      "Combines red-flag safety rules, screening-program eligibility, optional statistical support, and explainable referral-priority recommendations",
      "Keeps the Screening Priority Index distinct from cancer probability and explicitly prevents low model output from overriding symptoms or abnormal examination findings",
      "Built as a Next.js frontend with a FastAPI backend, persisted assessment history, dashboard views, referral workflow, and evidence/model documentation"
    ],
    "github": "https://github.com/ThunderKhan/oasis",
    "statusDetail": "Hackathon prototype · completed phase"
  },
  {
    "slug": "llm-social-selection",
    "title": "LLM Social Selection",
    "status": "research",
    "imageTitle": "Multi-agent experiment results",
    "tech": [
      "python",
      {
        "label": "SQLite"
      },
      {
        "label": "Ollama"
      },
      {
        "label": "pytest"
      }
    ],
    "hasPin": false,
    "description": "A model-independent experimentation framework for repeated multi-agent answer, voting, elimination, and evaluation trials with deterministic orchestration, resumable runs, structured ballots, diagnostics, and SQLite provenance.",
    "problem": "Multi-agent LLM experiments are easy to make entertaining and surprisingly hard to make reproducible, diagnosable, and useful for studying emergent social behavior.",
    "highlights": [
      "Separates orchestration, providers, task generation, ballots, persistence, and diagnostics so experiments can be rerun across different local or remote model backends",
      "Supports checkpoint/resume, canonicalized events, hashing, structured outputs, deterministic controls, and multiple voting conditions",
      "Used calibration and diagnostic runs to surface positional concentration and degenerate agent behavior before larger experiments"
    ],
    "github": "https://github.com/ThunderKhan/llm-social-selection",
    "statusDetail": "Research experiment · active"
  },
  {
    "slug": "heatops",
    "title": "HeatOps",
    "status": "prototype",
    "imageTitle": "Heat-risk and resource allocation map",
    "tech": [
      "python",
      "fastapi",
      "react",
      "ts",
      {
        "label": "GeoJSON"
      },
      {
        "label": "FortyGuard API"
      }
    ],
    "hasPin": false,
    "description": "An explainable decision-support system that enriches heat data with vulnerability signals, generates candidate resource sites, optimizes intervention placement, and produces an operational brief from a canonical evidence bundle.",
    "problem": "Heat maps show where conditions are dangerous, but emergency-response teams still need to decide where limited cooling and drinking-water resources should actually go.",
    "highlights": [
      "Supports live FortyGuard and synthetic providers with explicit provenance so mock values are never presented as observations",
      "Keeps site selection deterministic: the optimizer chooses locations while an optional LLM only narrates already-verified evidence",
      "Produces interactive risk maps, optimized placement plans, evidence fingerprints, downloadable action briefs, and end-to-end tests"
    ],
    "github": "https://github.com/ThunderKhan/heatops",
    "statusDetail": "Hackathon prototype · milestone 5"
  },
  {
    "slug": "pareto",
    "title": "Pareto",
    "status": "live",
    "statusDetail": "Trustume AI Hackathon 2026 · team project · fictional candidate demo",
    "imageTitle": "Pareto project preview",
    "src": "/project-image/pareto.png",
    "description": "Evidence-grounded recruitment intelligence: converts hiring briefs into reviewable criteria, then searches and explains candidate matches using deterministic rules.",
    "problem": "Keyword search loses hiring intent, while unconstrained language-model ranking can introduce unsupported claims.",
    "highlights": [
      "Recruiter confirmation before executing model-generated criteria; explicit MATCH, FAIL and UNKNOWN evidence.",
      "Pareto frontier, near matches, what-if analysis and versioned conversational refinements.",
      "48 fictional demo candidates; resume ingestion requires configured private storage and a running worker."
    ],
    "tech": [
      "next",
      "ts",
      "react",
      "tailwind",
      "postgres",
      "supabase",
      {
        "label": "Prisma"
      },
      {
        "label": "Gemini / Groq"
      }
    ],
    "github": "https://github.com/ThunderKhan/pareto",
    "live": "https://try-pareto.vercel.app",
    "hasPin": false,
    "evidence": [
      {
        "label": "View Trustume participation certificate",
        "href": "/certificates/hackathons/trustume-2026.png"
      }
    ]
  },
  {
    "slug": "refute",
    "title": "refute",
    "status": "completed",
    "statusDetail": "Frontier Engineering Challenge 2026 · benchmarked developer tool",
    "imageTitle": "refute project preview",
    "src": "/project-image/refute.png",
    "description": "Evidence-backed Python patch verification that treats proposed fixes as hypotheses and tries to falsify them with executable probes.",
    "problem": "A patch that passes a narrow test can still fail nearby boundaries or regress the public contract.",
    "highlights": [
      "Runs original and patched code, checks the reported trigger and challenges nearby behavior.",
      "Constrained five-way verdicts based on deterministic observations; zero core runtime dependencies.",
      "Supports real GitHub PR workflows and stdio MCP integration."
    ],
    "tech": [
      "python",
      {
        "label": "MCP"
      },
      {
        "label": "Testing"
      },
      {
        "label": "CLI"
      }
    ],
    "github": "https://github.com/ThunderKhan/refute",
    "hasPin": false
  },
  {
    "slug": "iet-grid",
    "title": "IET Grid",
    "status": "prototype",
    "statusDetail": "Campus scheduling hackathon · team project",
    "imageTitle": "IET Grid project preview",
    "src": "/project-image/iet-grid.png",
    "description": "Campus room scheduling and classroom management with floor plans, role-scoped access, conflict-safe booking and academic notices.",
    "problem": "Campus room availability, faculty schedules and academic commitments need a shared, consistent scheduling workflow.",
    "highlights": [
      "Selectable schematic floor maps and original plan views for five floors.",
      "FastAPI endpoints and PostgreSQL constraints for booking, availability, approvals and rescheduling.",
      "Official student and timetable imports and independent live-user acceptance remain outstanding."
    ],
    "tech": [
      "react",
      "ts",
      "fastapi",
      "supabase",
      "postgres"
    ],
    "github": "https://github.com/ThunderKhan/iet-grid",
    "live": "https://iet-grid.vercel.app",
    "hasPin": false
  },
  {
    "slug": "grantly",
    "title": "GRANTLY",
    "status": "prototype",
    "statusDetail": "Frontend Arena THE OUTPOST 2026 · frontend-only prototype",
    "imageTitle": "GRANTLY project preview",
    "src": "/project-image/grantly.png",
    "description": "A scholarship discovery and application workspace for students, with explainable eligibility, document preparation, comparison and application tracking.",
    "problem": "Students need to understand eligibility and organize applications rather than simply browse disconnected opportunity listings.",
    "highlights": [
      "Searchable opportunities, profile-based matching and explicit matched/unknown/mismatch explanations.",
      "Persistent document readiness, application stages, comparison and calendar export.",
      "Source-linked programs alongside explicitly illustrative records; local workspace backup and restore."
    ],
    "tech": [
      "react",
      "ts",
      "tailwind",
      {
        "label": "Vite"
      },
      {
        "label": "Playwright"
      }
    ],
    "github": "https://github.com/ThunderKhan/grantly",
    "hasPin": false
  },
  {
    "slug": "axiom",
    "title": "Axiom",
    "status": "building",
    "statusDetail": "Active development · production readiness not established",
    "imageTitle": "Axiom project preview",
    "description": "An evidence-grounded startup intelligence product in development, intended to help founders investigate demand signals, competitors and opportunities.",
    "problem": "Founders need to distinguish source-backed market evidence from plausible but unsupported AI research.",
    "highlights": [
      "Next.js web and FastAPI service foundations.",
      "Product and architecture specifications define evidence, research and workspace boundaries.",
      "Hosted database and human acceptance remain subject to verification; planned capabilities are not presented as delivered."
    ],
    "tech": [
      "next",
      "ts",
      "python",
      "fastapi",
      "docker"
    ],
    "github": "https://github.com/ThunderKhan/axiom",
    "hasPin": false
  },
  {
    "slug": "feynman-in-a-loop",
    "title": "Feynman-in-a-Loop",
    "status": "building",
    "statusDetail": "Build With AI: Basics · work in progress",
    "imageTitle": "Feynman-in-a-Loop project preview",
    "description": "A learning prototype that reverses the tutoring relationship: the learner teaches an AI student that challenges misconceptions and tests transfer.",
    "problem": "Learners can mistake a fluent AI explanation for actual understanding.",
    "highlights": [
      "Designed around teaching, misconception repair, transfer questions and evidence-based mastery.",
      "Verified authentication/session shell; text-learning kernel documented as ready for end-to-end verification.",
      "Voice-first interaction is a target capability, not a completed claim."
    ],
    "tech": [
      "next",
      "ts",
      "react",
      "supabase",
      {
        "label": "Groq"
      }
    ],
    "github": "https://github.com/ThunderKhan/feynman-in-a-loop",
    "hasPin": false
  },
  {
    "slug": "vani",
    "title": "VĀṆI / MeshVoice",
    "status": "building",
    "statusDetail": "SIH 2026 · offline communication research and feasibility work",
    "imageTitle": "VĀṆI / MeshVoice project preview",
    "description": "An offline multilingual voice communication project exploring on-device speech processing and direct local transport for infrastructure-denied environments.",
    "problem": "Speech communication can fail when network infrastructure is unavailable.",
    "highlights": [
      "Designed pipeline covers offline STT, critical-information validation, authenticated semantic bundles and offline TTS.",
      "Roadmap defines individual evidence gates for language coverage, transport and device performance.",
      "Complete two-phone multilingual operation is a research target, not a verified capability."
    ],
    "tech": [
      "android",
      {
        "label": "Offline STT/TTS"
      },
      {
        "label": "Local networking"
      }
    ],
    "github": "https://github.com/ThunderKhan/vani",
    "hasPin": false
  },
  {
    "slug": "prometheus-compiler",
    "title": "Prometheus Compiler",
    "status": "completed",
    "statusDetail": "Educational systems project · experimental compiler",
    "imageTitle": "Prometheus Compiler project preview",
    "description": "A minimal C++23 compiler exploring lexing, recursive-descent parsing, AST construction, semantic validation and deterministic code generation.",
    "problem": "A small language implementation makes the translation pipeline explicit and inspectable.",
    "highlights": [
      "Explicit AST node hierarchy and recursive-descent parser.",
      "Semantic validation of symbol usage and deterministic code generation.",
      "CMake build and line-numbered error reporting."
    ],
    "tech": [
      "cpp",
      {
        "label": "C++23"
      },
      {
        "label": "CMake"
      },
      {
        "label": "Compiler design"
      }
    ],
    "github": "https://github.com/ThunderKhan/prometheus-compiler",
    "hasPin": false
  },
  {
    "slug": "tab-jumper",
    "title": "Tab Jumper",
    "status": "completed",
    "statusDetail": "Chrome Manifest V3 · unpacked extension",
    "imageTitle": "Tab Jumper project preview",
    "description": "A dependency-free browser extension for navigating visited tabs or switching between the two most recent tabs.",
    "problem": "Tab-strip order is different from the order a user actually visits tabs.",
    "highlights": [
      "Backward and forward visit-order history across Chrome windows.",
      "Two-tab toggle, persistent mode selection and stale-history pruning.",
      "No network requests, analytics, page content access or conventional browser history access."
    ],
    "tech": [
      "chrome",
      {
        "label": "Manifest V3"
      },
      {
        "label": "JavaScript"
      }
    ],
    "github": "https://github.com/ThunderKhan/tab-jumper",
    "hasPin": false
  }
];
