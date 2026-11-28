export type ExperienceData = {
  title: string;
  role: string;
  dates: string;
  /** YYYY-MM, at month precision for the career timeline. */
  startMonth: string;
  location: string;
  src: string;
  fallbackSrc?: string;
  type?: string;
  imageFit?: "contain" | "cover";
  /** Logos that are their own coloured tile bleed to the edge instead of sitting inset on white. */
  imageBleed?: boolean;
  imageZoom?: number;
  description: string;
  assignments?: { role: string; dates: string; description: string }[];
  tech: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  screenshot?: string;
};

export const experiences: ExperienceData[] = [
  {
    "title": "Runtime Conditions",
    "role": "Member & Open Source Contributor",
    "dates": "Nov 2026 - Present",
    "startMonth": "2026-11",
    "location": "Remote",
    "src": "/Experience-image/runtime-conditions.jpg",
    "fallbackSrc": "/Experience-image/runtime-conditions-monogram.svg",
    "type": "Open source",
    "imageFit": "contain",
    "imageBleed": true,
    "description": "Contribute to the Runtime Conditions specification ecosystem through its Python runtime profiler.\nMade source-fixture encoding explicit and normalized Windows/Unix path assertions. The reported Windows test run improved from 101 passing / 18 failing to 119 passing, with no production profiler behavior changed.\nAdded Windows Server 2022 / Python 3.12 to the existing CI matrix and preserved canonical schema bytes across Git line-ending conversion. Both pull requests were merged upstream.",
    "tech": [
      "Python",
      "Cloud Native Computing",
      "CI/CD",
      "GitHub Actions",
      "Software Testing"
    ],
    "links": [
      {
        "label": "GitHub organization",
        "href": "https://github.com/runtimeconditions"
      },
      {
        "label": "Python runtime profiler",
        "href": "https://github.com/runtimeconditions/python-rc-profiler"
      },
      {
        "label": "Merged · cross-platform test fixes",
        "href": "https://github.com/runtimeconditions/python-rc-profiler/pull/9"
      },
      {
        "label": "Merged · Windows CI coverage",
        "href": "https://github.com/runtimeconditions/python-rc-profiler/pull/10"
      }
    ]
  },
  {
    "title": "micro1",
    "role": "AI Training Expert",
    "dates": "Oct 2026 - Present",
    "startMonth": "2026-10",
    "location": "India · Remote",
    "src": "/Experience-image/micro1-logo.jpg",
    "fallbackSrc": "/Experience-image/micro1-monogram.svg",
    "type": "Contract",
    "imageFit": "contain",
    "imageBleed": true,
    "description": "",
    "assignments": [
      {
        "role": "AI Training Expert · Model Evaluation",
        "dates": "Nov 2026 - Present",
        "description": "Evaluated pairs of model responses against a fixed rubric, identifying factual and reasoning errors and documenting evidence for each preference. Four evaluations received final sign-off, as recorded in the existing portfolio."
      },
      {
        "role": "AI Training Expert · Benchmark Task Design",
        "dates": "Oct 2026 - Present",
        "description": "Prepared a draft software and IT benchmark task: a realistic prompt, reference material, example deliverable and scoring rubric. The draft defines how outputs can be assessed consistently; no benchmark acceptance or model-training outcome is claimed."
      }
    ],
    "tech": [
      "AI Model Evaluation",
      "Rubric Design",
      "Data Annotation"
    ],
    "links": [
      {
        "label": "AI interview recognition · 18 Sep 2026",
        "href": "/certificates/experience/micro1-ai-interview.jpg"
      }
    ]
  },
  {
    "title": "VSPH",
    "role": "SWE Intern",
    "dates": "Sep 2026 - Present",
    "startMonth": "2026-09",
    "location": "",
    "src": "/Experience-image/vsph.jpg",
    "fallbackSrc": "/Experience-image/vsph-monogram.svg",
    "type": "Remote",
    "imageFit": "contain",
    "imageBleed": true,
    "description": "Developed public website pages using Next.js, TypeScript and Tailwind CSS, including homepage, services, industries and portfolio. Internal responsive checks covered 15 routes across seven viewport sizes.\nBuilt Control Center workflows for employee management, CRM access, HR and finance, with organization-scoped authorization using Supabase Auth and PostgreSQL.\nConsolidated owner-dashboard reads into a PostgreSQL snapshot: the previously recorded internal request count fell from 23 to 3 per dashboard API call, preserving owner-only access. This is a database request-count improvement, not a measured latency claim.\nDeveloped email outreach workflows for CSV/Excel imports, versioned templates, approvals and analytics. Implemented Control Center SSO and simulated campaign delivery for pre-launch testing.",
    "tech": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase Auth",
      "PostgreSQL"
    ],
    "links": [
      {
        "label": "Website",
        "href": "https://vsph.in/"
      }
    ]
  }
];
