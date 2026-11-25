export type Education = { school: string; degree: string; sgpa: string; dates: string; location: string; coursework: string[] };

export const education: Education = {
  school: "Deen Dayal Upadhyaya Gorakhpur University",
  degree: "BCA — Machine Learning & Data Science",
  sgpa: "9.08 / 10.00",
  dates: "2025–2028 (expected)",
  location: "Gorakhpur, India",
  coursework: ["Data Structures and Algorithms", "Object-Oriented Programming", "Statistics", "Exploratory Data Analysis", "Databases", "Machine Learning Fundamentals"],
};

export type Certification = { name: string; issuer: string; date?: string; note?: string; link?: string };
export const certifications: Certification[] = [
  { name: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI & Stanford Online", note: "Machine Learning Specialization — Course 1" },
  { name: "Fundamentals of Remote Sensing", issuer: "NASA ARSET" },
];
