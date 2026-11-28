import Image from "next/image";
import { RidgelineScene } from "@/components/RidgelineScene";
import styles from "./system-pages.module.css";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.lost} data-lost-page>
      <div className={styles.lostInner}>
        <p className={styles.errorCode} aria-hidden="true">404</p>
        <h1 className={`mark-display ${styles.lostTitle}`}><span className="sr-only">404 — </span>Signal lost.</h1>
        <p className={styles.lostCopy}>The page you requested could not be found.</p>
      </div>
      <div className={styles.lostLandscape} aria-hidden="true">
        <RidgelineScene layout="viewport" />
        <Image
          src="/art/falling-armor.webp"
          alt=""
          width={533}
          height={640}
          loading="eager"
          unoptimized
          className={styles.lostArmor}
          data-lost-armor
        />
      </div>
    </main>
  );
}
