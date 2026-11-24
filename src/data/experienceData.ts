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
    "title": "micro1",
    "role": "AI Training Expert",
    "dates": "Oct 2026 - Present",
    "startMonth": "2026-10",
    "location": "India",
    "src": "/Experience-image/micro1.jpg",
    "fallbackSrc": "/Experience-image/micro1-monogram.svg",
    "type": "Remote",
    "imageFit": "contain",
    "imageBleed": true,
    "description": "",
    "assignments": [
      {
        "role": "AI Training Expert · Model Evaluation",
        "dates": "Nov 2026 - Present",
        "description": "Completed 4 AI response evaluations that received final sign-off. Compared 2 responses per task against a fixed rubric, flagged errors, and explained each preference with evidence from both responses."
      },
      {
        "role": "AI Training Expert · Benchmark Task Design",
        "dates": "Oct 2026 - Present",
        "description": "Built a draft software and IT benchmark task with a realistic prompt, reference materials, an example deliverable, and a scoring rubric so model outputs could be assessed against clear criteria."
      }
    ],
    "tech": [
      "AI Model Evaluation",
      "Data Annotation"
    ]
  },
  {
    "title": "VSPH",
    "role": "Software Engineer Intern",
    "dates": "Sep 2026 - Present",
    "startMonth": "2026-09",
    "location": "",
    "src": "/Experience-image/vsph.jpg",
    "fallbackSrc": "/Experience-image/vsph-monogram.svg",
    "type": "Remote",
    "imageFit": "contain",
    "imageBleed": true,
    "description": "Developed VSPH’s public website (vsph.in) with Next.js, TypeScript, and Tailwind CSS, covering the homepage, services, industries, and portfolio. Validated responsive behavior across 15 routes at 7 viewport sizes.\nDesigned and built Control Center, a multi-tenant business platform spanning CRM access, employee management, HR, and finance. Implemented organization-scoped authorization with Supabase Auth and PostgreSQL, with distinct access rules for platform owners, HR managers, employees, and customers.\nCut database requests per owner dashboard API call from 23 to 3 by consolidating dashboard reads into a single PostgreSQL snapshot while preserving owner-only access.\nDeveloped an email outreach workspace with CSV and Excel lead imports, versioned templates, campaign approvals, and analytics. Implemented SSO with Control Center and a simulated delivery workflow for testing campaigns before launch.",
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
