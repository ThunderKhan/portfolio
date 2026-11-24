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
  src: string;
  lightModeSrc?: string;
  description: string;
  problem?: string;
  highlights?: string[];
  caseStudy?: string;
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
    "caseStudy": "https://ayankhan.me/blog/i-built-c-test-impact-analysis-with-zero-runtime-dependencies",
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
    "src": "/project-image/llm-social-selection.png",
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
    "src": "/project-image/heatops.png",
    "description": "An explainable decision-support system that enriches heat data with vulnerability signals, generates candidate resource sites, optimizes intervention placement, and produces an operational brief from a canonical evidence bundle.",
    "problem": "Heat maps show where conditions are dangerous, but emergency-response teams still need to decide where limited cooling and drinking-water resources should actually go.",
    "highlights": [
      "Supports live FortyGuard and synthetic providers with explicit provenance so mock values are never presented as observations",
      "Keeps site selection deterministic: the optimizer chooses locations while an optional LLM only narrates already-verified evidence",
      "Produces interactive risk maps, optimized placement plans, evidence fingerprints, downloadable action briefs, and end-to-end tests"
    ],
    "github": "https://github.com/ThunderKhan/heatops",
    "statusDetail": "Hackathon prototype · milestone 5"
  }
];
