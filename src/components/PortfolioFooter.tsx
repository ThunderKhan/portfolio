import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { portfolio } from "~/portfolio.config";
import { RidgelineScene } from "./RidgelineScene";
import styles from "./closing.module.css";

const explore = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  ...(portfolio.sections.blog ? [{ label: "Writing", href: "/blogs" }] : []),
  { label: "Highlights", href: "/highlights" },
];

export function PortfolioFooter() {
  return (
    <footer className={styles.footer} aria-label="Portfolio footer">
      <div className={styles.footerGrid}>
        <div className={styles.identity}>
          <Link href="/" className={styles.brand}>{portfolio.name}</Link>
          <p className="mark-muted text-sm leading-relaxed">Systems, developer tools and applied AI.</p>
          <ul className={styles.socials}>
            <li><a href={`https://github.com/${portfolio.handles.github}`} aria-label="GitHub profile"><SiGithub aria-hidden="true" /></a></li>
            <li><a href={`https://www.linkedin.com/in/${portfolio.handles.linkedin}/`} aria-label="LinkedIn profile"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" fill="none"></path></svg></a></li>
            <li><a href={`mailto:${portfolio.email}`} aria-label="Email"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg></a></li>
          </ul>
        </div>
        <nav aria-label="Footer explore" className={styles.column}>
          <h2>Explore</h2>
          <ul>{explore.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Footer connect" className={styles.column}>
          <h2>Connect</h2>
          <ul>
            <li><Link href="/contact">Get in touch</Link></li>
            <li><a href={portfolio.resume}>Résumé</a></li>
            {portfolio.repo && <li><a href={portfolio.repo}>Source on GitHub</a></li>}
          </ul>
        </nav>
      </div>
      <div className={styles.credit}>
        <p>© {new Date().getFullYear()} {portfolio.name}</p>
        <p>Designed and built by {portfolio.name}.</p>
      </div>
      <RidgelineScene />
    </footer>
  );
}
