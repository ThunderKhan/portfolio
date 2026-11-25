export type ContributionStatus = "Merged" | "Open" | "Closed";
export type OpenSourceEntry = {
  id: string;
  title: string;
  summary: string;
  description: string;
  links: { label: string; href: string; status: ContributionStatus }[];
  evidence?: { label: string; href: string }[];
};

// Curated PR status snapshot verified against GitHub on 2026-11-25.
export const openSourceWork: OpenSourceEntry[] = [
  {
    "id": "corsair",
    "summary": "Service integrations · 178 API operations",
    "title": "Corsair",
    "description": "Shipped two upstream service integrations covering 178 API operations: Borneo (153 operations across 20 endpoint groups) and Ably (25 REST operations). Added typed input/output schemas, authentication, error handling, provider registration and endpoint tests.",
    "links": [
      {
        "label": "#1187 · Borneo integration",
        "href": "https://github.com/corsairdev/corsair/pull/1187",
        "status": "Merged"
      },
      {
        "label": "#865 · Ably integration",
        "href": "https://github.com/corsairdev/corsair/pull/865",
        "status": "Merged"
      }
    ]
  },
  {
    "id": "proofline",
    "summary": "Verified Windows installer",
    "title": "Proofline CLI",
    "description": "Proposed a Windows PowerShell installer with SHA-256 verification, current-user installation, transactional upgrade recovery, rollback, PATH preservation and Windows PowerShell 5.1/7 test coverage.",
    "links": [
      {
        "label": "#89 · Verified Windows installer",
        "href": "https://github.com/prooflinedev/cli/pull/89",
        "status": "Open"
      }
    ]
  },
  {
    "id": "hamr",
    "summary": "URL encoding, QR and packaging",
    "title": "ha.mr",
    "description": "Six merged changes to the URL compression tool: backward-compatible 128-bit IPv6 encoding, preservation of reserved percent-encoded path characters, adaptive QR error correction, Nix packaging, system dark mode and upstream license compliance.",
    "links": [
      {
        "label": "#52 · IPv6 URL encoding",
        "href": "https://github.com/p2r3/ha.mr/pull/52",
        "status": "Merged"
      },
      {
        "label": "#59 · Reserved URL escapes",
        "href": "https://github.com/p2r3/ha.mr/pull/59",
        "status": "Merged"
      },
      {
        "label": "#48 · QR error correction",
        "href": "https://github.com/p2r3/ha.mr/pull/48",
        "status": "Merged"
      },
      {
        "label": "#63 · Nix package layout",
        "href": "https://github.com/p2r3/ha.mr/pull/63",
        "status": "Merged"
      },
      {
        "label": "#45 · System color scheme",
        "href": "https://github.com/p2r3/ha.mr/pull/45",
        "status": "Merged"
      },
      {
        "label": "#47 · QR library license",
        "href": "https://github.com/p2r3/ha.mr/pull/47",
        "status": "Merged"
      }
    ]
  },
  {
    "id": "cli11",
    "summary": "C++ correctness and precision",
    "title": "CLI11",
    "description": "Fixed precision loss in C++ floating-point defaults using max_digits10 and regression coverage. Separately proposed Unicode wide-string overloads for app descriptions and usage.",
    "links": [
      {
        "label": "#1431 · Floating-point precision",
        "href": "https://github.com/CLIUtils/CLI11/pull/1431",
        "status": "Merged"
      },
      {
        "label": "#1439 · Wide-string overloads",
        "href": "https://github.com/CLIUtils/CLI11/pull/1439",
        "status": "Closed"
      }
    ]
  },
  {
    "id": "runtime-conditions",
    "summary": "Python profiler · Windows compatibility",
    "title": "Runtime Conditions — Python profiler",
    "description": "Resolved Windows test failures caused by source encoding and path separators, taking the reported local suite from 101 passing / 18 failing to 119 passing. Proposed permanent Windows CI coverage with canonical schema line endings.",
    "links": [
      {
        "label": "#9 · Cross-platform tests",
        "href": "https://github.com/runtimeconditions/python-rc-profiler/pull/9",
        "status": "Merged"
      },
      {
        "label": "#10 · Windows CI",
        "href": "https://github.com/runtimeconditions/python-rc-profiler/pull/10",
        "status": "Open"
      }
    ]
  },
  {
    "id": "opentrace",
    "summary": "Spreadsheet import correctness",
    "title": "OpenTrace",
    "description": "Fixed subscription imports across TSV and legacy XLS, then added XLSX discovery and parsing with read-only/data-only workbook handling, resource cleanup and regression tests.",
    "links": [
      {
        "label": "#10 · XLSX support",
        "href": "https://github.com/AbdaullahAG/OpenTrace/pull/10",
        "status": "Merged"
      },
      {
        "label": "#6 · TSV and XLS discovery",
        "href": "https://github.com/AbdaullahAG/OpenTrace/pull/6",
        "status": "Merged"
      }
    ]
  },
  {
    "id": "manim",
    "summary": "TeX conversion error handling",
    "title": "Manim",
    "description": "Fixed the TeX conversion pipeline to surface explicit dvisvgm subprocess failures as LatexError with diagnostic stderr, rather than continuing with invalid SVG output.",
    "links": [
      {
        "label": "#2503 · TeX conversion errors",
        "href": "https://github.com/3b1b/manim/pull/2503",
        "status": "Merged"
      }
    ]
  },
  {
    "id": "osci",
    "summary": "Community contributor",
    "title": "Open Source Connect India 2026",
    "description": "Selected as a contributor.",
    "links": [],
    "evidence": [
      {
        "label": "View contributor badge",
        "href": "/certificates/community/osci-2026.png"
      }
    ]
  },
  {
    "id": "hacktoberfest-completionist",
    "title": "Hacktoberfest 2026 — Completionist++",
    "summary": "Open-source achievement · 12 Oct 2026",
    "description": "Earned the Hacktoberfest 2026 Completionist++ certificate on 12 October 2026.",
    "links": [],
    "evidence": [
      {
        "label": "View completion certificate",
        "href": "/certificates/community/hacktoberfest-completionist-plus-plus.png"
      }
    ]
  },
  {
    "id": "hacktoberfest-host",
    "title": "Hacktoberfest 2026 — Event Host",
    "summary": "Community leadership · 10 Oct 2026",
    "description": "Hosted Hacktoberfest Hack Day Gorakhpur × DDUGU in person on 10 October 2026, as recognized by the Hacktoberfest team.",
    "links": [],
    "evidence": [
      {
        "label": "View host certificate",
        "href": "/certificates/community/hacktoberfest-host.png"
      }
    ]
  }
];

export const featuredContributionIds = ["corsair","runtime-conditions","hamr"] as const;

export const featuredOpenSourceWork = featuredContributionIds.map((id) => {
  const entry = openSourceWork.find((item) => item.id === id);
  if (!entry) throw new Error(`Unknown featured contribution: ${id}`);
  return entry;
});

export const contributionTotals = {
  repositories: openSourceWork.filter((item) => item.links.length > 0).length,
  pullRequests: openSourceWork.flatMap((item) => item.links).length,
  merged: openSourceWork.flatMap((item) => item.links).filter((link) => link.status === "Merged").length,
};
