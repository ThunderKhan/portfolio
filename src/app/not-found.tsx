import Link from "next/link";
import styles from "./system-pages.module.css";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.lost}>
      <div className={styles.lostInner}>
        <svg viewBox="0 0 220 50" aria-hidden="true" className={styles.signal}>
          <path d="M0 25H65L80 13L93 37L106 25H132L143 25" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M158 25H220" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" fill="none" opacity=".45" />
        </svg>
        <p className={styles.errorCode}>404</p>
        <h1 className="mark-display">Signal lost.</h1>
        <p>The page you requested could not be found. You can return home or explore the project archive.</p>
        <nav aria-label="Recovery navigation" className={styles.recovery}>
          <Link href="/" className={styles.link}>Return home</Link>
          <Link href="/projects" className={styles.link}>Explore projects</Link>
        </nav>
      </div>
    </main>
  );
}
