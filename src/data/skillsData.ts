import type { ElementType } from "react";
import { Database, Terminal, Network, FlaskConical, Boxes, Webhook, Cable, ScanSearch, Binary, Shuffle, Cpu, RefreshCw, Search, CircleDot } from "lucide-react";
import { SiCplusplus, SiC, SiPython, SiTypescript, SiJavascript, SiOpenjdk, SiLinux, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiFastapi, SiPostgresql, SiSupabase, SiScikitlearn, SiGit, SiGithubactions, SiDocker } from "react-icons/si";

export type Skill = { name: string; icon: ElementType };
export type SkillGroup = { group: string; skills: Skill[] };

// Selected tools and practices demonstrated in projects or coursework; not proficiency ratings.
export const skillGroups: SkillGroup[] = [
  { group: "Languages", skills: [
    { name: "C++", icon: SiCplusplus },
    { name: "C", icon: SiC },
    { name: "Python", icon: SiPython },
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Java", icon: SiOpenjdk },
    { name: "SQL", icon: Database },
  ] },
  { group: "Systems & developer tools", skills: [
    { name: "CMake / CTest", icon: Terminal },
    { name: "Dependency graphs", icon: Network },
    { name: "CLI design", icon: Terminal },
    { name: "Sanitizers", icon: FlaskConical },
    { name: "Linux", icon: SiLinux },
    { name: "Reproducible builds", icon: Boxes },
  ] },
  { group: "Web & data engineering", skills: [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "FastAPI", icon: SiFastapi },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Supabase", icon: SiSupabase },
    { name: "Prisma", icon: Database },
    { name: "REST APIs", icon: Webhook },
  ] },
  { group: "Applied AI & research", skills: [
    { name: "MCP / WebMCP", icon: Cable },
    { name: "Model evaluation", icon: ScanSearch },
    { name: "scikit-learn", icon: SiScikitlearn },
    { name: "Graph features", icon: Network },
    { name: "Structured outputs", icon: Binary },
    { name: "Agent orchestration", icon: Shuffle },
    { name: "Ollama", icon: Cpu },
  ] },
  { group: "Engineering practices", skills: [
    { name: "Git", icon: SiGit },
    { name: "GitHub Actions", icon: SiGithubactions },
    { name: "Docker", icon: SiDocker },
    { name: "Automated testing", icon: FlaskConical },
    { name: "Playwright", icon: ScanSearch },
    { name: "CI/CD", icon: RefreshCw },
    { name: "Debugging", icon: Search },
    { name: "Data validation", icon: CircleDot },
  ] },
];
