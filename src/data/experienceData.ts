export type ExperienceData = {
  title: string;
  role: string;
  dates: string;
  /** YYYY-MM, at month precision for the career timeline. */
  startMonth: string;
  location: string;
  src: string;
  type?: string;
  imageFit?: "contain" | "cover";
  /** Logos that are their own coloured tile bleed to the edge instead of sitting inset on white. */
  imageBleed?: boolean;
  imageZoom?: number;
  description: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  screenshot?: string;
};

export const experiences: ExperienceData[] = [
  {
    "title": "micro1",
    "role": "AI Trainer (Independent Contractor)",
    "dates": "Oct 2026 - Present",
    "startMonth": "2026-10",
    "location": "India",
    "src": "/Experience-image/micro1-monogram.svg",
    "type": "Remote",
    "imageFit": "contain",
    "description": "Completed contractor onboarding for AI training work.\nRole focuses on evaluating and refining model responses against task requirements.",
    "tech": []
  },
  {
    "title": "VSPH Global",
    "role": "Software Engineering Intern (Frontend)",
    "dates": "Sep 2026 - Present",
    "startMonth": "2026-09",
    "location": "India",
    "src": "/Experience-image/vsph-monogram.svg",
    "type": "Remote",
    "imageFit": "contain",
    "description": "Built and merged responsive website features using Next.js, React, TypeScript and Tailwind CSS.\nWorked on reusable UI components and collaborated through GitHub pull requests.",
    "tech": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GitHub"
    ]
  }
];
