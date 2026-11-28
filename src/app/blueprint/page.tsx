import type { Metadata } from "next";
import Link from "next/link";
import { portfolio } from "~/portfolio.config";
import { CommandMenu } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "../system-pages.module.css";

export const metadata: Metadata = {
  title: "Under the Hood | " + portfolio.name,
  description: "The engineering decisions behind MARK I.",
  robots: { index: false, follow: false },
};

const systems = [
  { title: "Application", detail: "Next.js App Router, React and TypeScript. Server-rendered content where possible; client components for interactive controls." },
  { title: "Content", detail: "Identity in portfolio.config.ts; projects, experience and writing in typed local data modules. No database is required for the core portfolio." },
  { title: "Engineering activity", detail: "A server-side GitHub integration validates calendar data, bounds response size, caches fresh results and handles unavailable data without inventing activity." },
  { title: "Rendering", detail: "Canvas and WebGL power the decorative banner, mesh and procedural terrain. Scroll-driven transforms move the armor; visibility and reduced-motion checks constrain work." },
  { title: "Quality gates", detail: "The repository includes TypeScript, ESLint, Node regression tests, browser accessibility and SEO checks, Docker and security checks. These are verification mechanisms, not a claim that every current check passes." },
  { title: "Security", detail: "Server-side credentials remain outside the client bundle; the terminal resolves a fixed command allowlist, with no shell, network request or elevated permission." },
];

export default function BlueprintPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.header}>
        <Link href="/">Home</Link>
        <div className={styles.controls}><ThemeToggle /><CommandMenu /></div>
      </header>
      <div className={styles.intro}>
        <p className={styles.label}>MARK I / Engineering blueprint</p>
        <h1 className="mark-display">Under the Hood</h1>
        <p>How this portfolio is built, and why its pieces are designed this way.</p>
      </div>
      <section aria-labelledby="architecture-heading" className={styles.section}>
        <h2 id="architecture-heading" className="mark-section-title">Architecture</h2>
        <figure className={styles.diagram}>
          <svg viewBox="0 0 340 220" role="img" aria-labelledby="architecture-title architecture-desc">
            <title id="architecture-title">Portfolio architecture</title>
            <desc id="architecture-desc">The browser receives pages from Next.js. React and Canvas render interactive UI. Local typed content supplies the pages. The server-side API integrates with GitHub.</desc>
            <g fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M170 42V66 M170 100V119H57V138 M170 119V138 M170 119H283V138 M283 172V188" />
              <rect x="115" y="8" width="110" height="34" rx="4" />
              <rect x="115" y="66" width="110" height="34" rx="4" />
              <rect x="5" y="138" width="104" height="34" rx="4" />
              <rect x="118" y="138" width="104" height="34" rx="4" />
              <rect x="231" y="138" width="104" height="34" rx="4" />
              <rect x="231" y="188" width="104" height="26" rx="4" />
            </g>
            <g fill="currentColor" textAnchor="middle" fontSize="10.5">
              <text x="170" y="29">Browser</text><text x="170" y="87">Next.js</text>
              <text x="57" y="152">React UI</text><text x="57" y="164">Canvas / WebGL</text>
              <text x="170" y="152">Typed local</text><text x="170" y="164">content</text>
              <text x="283" y="159">Server API</text><text x="283" y="205">GitHub</text>
            </g>
          </svg>
          <figcaption>Logical component relationships; not a live infrastructure or deployment diagram.</figcaption>
        </figure>
        <dl className={styles.systems}>
          {systems.map(system => <div key={system.title}><dt>{system.title}</dt><dd>{system.detail}</dd></div>)}
        </dl>
      </section>
      <section className={styles.section} aria-labelledby="design-heading">
        <h2 id="design-heading" className="mark-section-title">Design decisions</h2>
        <p>Workshop neutrals keep the content readable. Armor red and gold establish the visual identity; reactor blue indicates interaction. The closing scene combines a seeded seven-layer dithered landscape with an independently scroll-driven figure. The public interface stays usable without discovering any hidden commands.</p>
      </section>
      {portfolio.repo && <a className={styles.link} href={portfolio.repo} target="_blank" rel="noopener noreferrer">Inspect the source on GitHub</a>}
    </main>
  );
}
