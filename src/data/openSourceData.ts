export type ContributionStatus = "Merged" | "Open" | "Closed";
export type OpenSourceEntry = {
  id: string;
  title: string;
  summary: string;
  description: string;
  links: { label: string; href: string; status: ContributionStatus; detail?: string }[];
  evidence?: { label: string; href: string }[];
};

// Curated PR authorship and status snapshot verified against GitHub on 2026-11-28.
export const contributionVerifiedDate = "28 Nov 2026";
export const openSourceWork: OpenSourceEntry[] = [
  {
    "id": "corsair",
    "summary": "Service integrations · 178 API operations",
    "title": "Corsair",
    "description": "Implemented and merged Borneo's 153-operation Composio-backed integration and Ably's 25-operation REST integration. Added schema validation, authentication, provider registration, error handling and endpoint tests. The operation count describes supported API surface, not usage or adoption.",
    "links": [
      {
        "label": "#1187 · Borneo integration",
        "href": "https://github.com/corsairdev/corsair/pull/1187",
        "status": "Merged",
        "detail": "153 canonical Composio-backed operations across 20 groups, typed schemas, authentication and risk metadata; PR reports 165/165 plugin tests."
      },
      {
        "label": "#865 · Ably integration",
        "href": "https://github.com/corsairdev/corsair/pull/865",
        "status": "Merged",
        "detail": "25 REST operations for channels, presence, application and push; PR documents a live service-time call and scoped build/test validation."
      }
    ]
  },
  {
    "id": "proofline",
    "summary": "Verified Windows installer",
    "title": "Proofline CLI",
    "description": "Proposed a current-user Windows installer with verified downloads, recoverable upgrades, rollback and PATH preservation. Fork-only CI and local interruption checks are documented in the PR; the proposal is not merged upstream.",
    "links": [
      {
        "label": "#89 · Verified Windows installer",
        "href": "https://github.com/prooflinedev/cli/pull/89",
        "status": "Open",
        "detail": "SHA-256 verification, transactional staging and recovery; fork preflight covered PowerShell 5.1/7 and ten reported process-interruption checkpoints. Upstream review remains open."
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
        "status": "Merged",
        "detail": "Encoded bracketed IPv6 as a 128-bit value using an escape in the existing v0 format, without adding overhead to normal URL encoding."
      },
      {
        "label": "#59 · Reserved URL escapes",
        "href": "https://github.com/p2r3/ha.mr/pull/59",
        "status": "Merged",
        "detail": "Preserved percent-encoded reserved characters through compression/decompression, preventing double encoding without turning encoded slashes into path separators."
      },
      {
        "label": "#48 · QR error correction",
        "href": "https://github.com/p2r3/ha.mr/pull/48",
        "status": "Merged",
        "detail": "Selected the strongest QR correction level that fits the baseline QR version while retaining manual override."
      },
      {
        "label": "#63 · Nix package layout",
        "href": "https://github.com/p2r3/ha.mr/pull/63",
        "status": "Merged",
        "detail": "Restored the expected docs module directory in the Nix package; PR reports successful encode/decode after rebuilding."
      },
      {
        "label": "#45 · System color scheme",
        "href": "https://github.com/p2r3/ha.mr/pull/45",
        "status": "Merged",
        "detail": "Respected system color-scheme on both primary and 404 pages; removed hardcoded input background."
      },
      {
        "label": "#47 · QR library license",
        "href": "https://github.com/p2r3/ha.mr/pull/47",
        "status": "Merged",
        "detail": "Restored bundled QR library MIT copyright and license notice without changing library implementation."
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
        "status": "Merged",
        "detail": "Replaced lossy floating-point string conversion with max_digits10 precision; regression covers 1e-8 defaults."
      },
      {
        "label": "#1439 · Wide-string overloads",
        "href": "https://github.com/CLIUtils/CLI11/pull/1439",
        "status": "Closed",
        "detail": "Proposed wide-string constructor and usage overloads with Unicode regression coverage. Closed without merge."
      }
    ]
  },
  {
    "id": "runtime-conditions",
    "summary": "Python profiler · Windows compatibility",
    "title": "Runtime Conditions — Python profiler",
    "description": "Corrected cross-platform test assumptions without modifying production profiler behavior. Added Windows CI alongside Linux coverage and preserved canonical schema bytes to prevent digest regressions.",
    "links": [
      {
        "label": "#9 · Cross-platform tests",
        "href": "https://github.com/runtimeconditions/python-rc-profiler/pull/9",
        "status": "Merged",
        "detail": "Explicit UTF-8 fixture writes and platform-neutral path assertions; reported 119/119 Windows tests. Test-only change."
      },
      {
        "label": "#10 · Windows CI",
        "href": "https://github.com/runtimeconditions/python-rc-profiler/pull/10",
        "status": "Merged",
        "detail": "Extended CI to Windows Server 2022/Python 3.12; targeted line-ending rule preserves schema digest. PR reports all five jobs passing."
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
        "status": "Merged",
        "detail": "Added separate openpyxl XLSX discovery/parsing, read-only/data-only workbooks, cleanup and regression coverage."
      },
      {
        "label": "#6 · TSV and XLS discovery",
        "href": "https://github.com/AbdaullahAG/OpenTrace/pull/6",
        "status": "Merged",
        "detail": "Fixed TSV delimiter and legacy XLS binary discovery using xlrd; PR reports six focused tests passing."
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
        "status": "Merged",
        "detail": "Raised LatexError with diagnostic stderr for nonzero dvisvgm exits; explicit process failure only, not successful-but-empty SVG output."
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
