export type SemesterResult = {
  semester: number;
  sgpa: number;
  result: "Passed";
  declaredOn: string;
  coursework: string[];
};

export type Education = {
  school: string;
  logo: string;
  department: string;
  degree: string;
  cgpa: number;
  dates: string;
  location: string;
  semesters: SemesterResult[];
};

// Academic results transcribed from the university's 2025–2026 grade sheets.
// Only portfolio-relevant academic data is retained; no private identifiers or PDFs.
export const education: Education = {
  school: "Deen Dayal Upadhyaya Gorakhpur University",
  logo: "/education-image/ddugu.jpg",
  department: "Department of Computer Science & Engineering",
  degree: "Bachelor of Computer Applications in Machine Learning & Data Science",
  cgpa: 8.82,
  dates: "2025–2028 (expected)",
  location: "Gorakhpur, India",
  semesters: [
    {
      semester: 1,
      sgpa: 9.08,
      result: "Passed",
      declaredOn: "2026-03-31",
      coursework: [
        "Ethics, Integrity and Aptitude-I",
        "Introduction to Mathematics & Operational Research",
        "IT Tools & Fundamentals of Computer Architecture",
        "C Programming",
        "Data Structures & Algorithm",
        "C Programming Lab",
        "Basic Arithmetic",
      ],
    },
    {
      semester: 2,
      sgpa: 8.56,
      result: "Passed",
      declaredOn: "2026-10-15",
      coursework: [
        "Communication and Interpersonal Skills",
        "Statistical methods for Data Science",
        "Python Programming",
        "Data Science & Visualization",
        "Introduction to Machine Learning",
        "Machine Learning with Python Lab",
        "Personality Development and Communication Skills",
      ],
    },
  ],
};

export type LearningProgram = {
  id: string;
  provider: string;
  logo: string;
  name: string;
  period: string;
  format: string;
  status: "In progress" | "Completed";
  description: string;
  topics: string[];
  url: string;
};

// Published curriculum scope, not a claim that every module has been completed.
export const learningPrograms: LearningProgram[] = [
  {
    "id": "gci-world-2026",
    "logo": "/education-image/gci-world.jpg",
    "provider": "Matsuo-Iwasawa Laboratory, The University of Tokyo",
    "name": "GCI World — Data Science Course",
    "period": "Sep–Dec 2026",
    "format": "Online · 14 weeks · approx. 22 teaching hours",
    "status": "In progress",
    "description": "Applied data science through programming exercises, homework, a competition and a final assignment focused on business applications.",
    "topics": [
      "Python",
      "NumPy",
      "pandas",
      "Matplotlib",
      "SQL",
      "Supervised and unsupervised learning",
      "Model evaluation",
      "Feature engineering",
      "Time series analysis",
      "Marketing analytics"
    ],
    "url": "https://weblab.t.u-tokyo.ac.jp/en/lecture/gci/"
  },
  {
    "id": "ieee-ai-caravan-2026",
    "logo": "/education-image/ieee.jpg",
    "provider": "IEEE Computer Society — Region 8 AI Caravan",
    "name": "AI Engineering Course — AI Engineer Track",
    "period": "2026",
    "format": "Online · 32 hours",
    "status": "In progress",
    "description": "Practical machine-learning development from problem definition and data preparation to model serving, monitoring, responsible AI assessment and a capstone.",
    "topics": [
      "Applied statistics",
      "Data preprocessing",
      "Regression and classification",
      "Model validation and tuning",
      "Ensembles and clustering",
      "Anomaly detection",
      "Neural networks and transfer learning",
      "NLP, embeddings and retrieval",
      "FastAPI and container deployment",
      "Model monitoring and documentation",
      "Responsible AI"
    ],
    "url": "https://www.aicaravan.org/activities/ai-engineer"
  }
];
