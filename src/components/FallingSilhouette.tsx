import Image from "next/image";
import styles from "./closing.module.css";

// Decorative generated illustration; the motto remains accessible HTML.
export function FallingSilhouette() {
  return (
    <Image
      src="/art/falling-armor.webp"
      alt=""
      aria-hidden="true"
      className={styles.figure}
      width={533}
      height={640}
      sizes="(max-width: 639px) 150px, 280px"
      loading="lazy"
      unoptimized
    />
  );
}
