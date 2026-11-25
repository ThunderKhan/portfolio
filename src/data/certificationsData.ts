export type Certification = { id: string; name: string; issuer: string; date: string; kind: string; note?: string; file?: string; link?: string; pending?: string };

export const certifications: Certification[] = [
  {
    "id": "stanford-supervised-ml",
    "name": "Supervised Machine Learning: Regression and Classification",
    "issuer": "DeepLearning.AI & Stanford Online",
    "date": "26 Oct 2026",
    "kind": "Course completion",
    "note": "Machine Learning Specialization — Course 1 · Coursera",
    "file": "/certificates/training/stanford-supervised-ml.pdf",
    "link": "https://coursera.org/verify/1V485KWP4B0W"
  },
  {
    "id": "nasa-remote-sensing",
    "name": "Fundamentals of Remote Sensing",
    "issuer": "NASA ARSET",
    "date": "27 Aug 2026",
    "kind": "Training completion",
    "file": "/certificates/training/nasa-remote-sensing.pdf"
  },
  {
    "id": "isro-geodata-analytics",
    "name": "AI/ML for Geodata Analytics",
    "issuer": "Indian Institute of Remote Sensing (IIRS), ISRO",
    "date": "8 Sep 2026",
    "kind": "Course participation",
    "note": "10 hours · 3–14 Aug 2026",
    "pending": "Certificate copy pending privacy redaction"
  },
  {
    "id": "ibm-ai-fundamentals",
    "name": "Artificial Intelligence Fundamentals",
    "issuer": "IBM SkillsBuild",
    "date": "21 Sep 2026",
    "kind": "Digital credential",
    "file": "/certificates/training/ibm-ai-fundamentals.pdf",
    "link": "https://www.credly.com/badges/4791756a-403c-45d5-b48c-aa18a65f1f55"
  },
  {
    "id": "aws-prompt-engineering",
    "name": "Foundations of Prompt Engineering",
    "issuer": "AWS Training & Certification",
    "date": "21 Sep 2026",
    "kind": "Course completion",
    "file": "/certificates/training/aws-prompt-engineering.pdf"
  }
];

export const featuredCertifications = certifications.slice(0, 3);
