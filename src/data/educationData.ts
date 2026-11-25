export type SemesterResult = {
  semester: number;
  sgpa: number;
  result: "Passed";
  declaredOn: string;
  coursework: string[];
};

export type Education = {
  school: string;
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
