import { portfolio } from "~/portfolio.config";

const allSections = [
  {
    "id": "projects",
    "label": "Selected projects",
    "icon": "Code",
    "key": "P"
  },
  {
    "id": "experience",
    "label": "Experience",
    "icon": "Briefcase",
    "key": "E"
  },
  {
    "id": "opensource",
    "label": "Open source & community",
    "icon": "GitPullRequest",
    "key": "W"
  },
  {
    "id": "hackathons",
    "label": "Hackathons",
    "icon": "Trophy",
    "key": "H"
  },
  {
    "id": "blogs",
    "label": "Technical writing",
    "icon": "FileText",
    "key": "B"
  },
  {
    "id": "skills",
    "label": "Skills",
    "icon": "BookOpen",
    "key": "S"
  },
  {
    "id": "education",
    "label": "Education",
    "icon": "GraduationCap",
    "key": "G"
  },
  {
    "id": "certifications",
    "label": "Certifications",
    "icon": "Award",
    "key": "F"
  },
  {
    "id": "activity",
    "label": "Engineering activity",
    "icon": "Binary",
    "key": "D"
  }
] as const;

export const homeSections = allSections.filter((section) => section.id !== "blogs" || portfolio.sections.blog);
