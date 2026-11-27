import styles from "./closing.module.css";

// Original stylized armored figure; no film artwork or external asset.
export function FallingSilhouette() {
  return (
    <svg className={styles.figure} viewBox="0 0 300 280" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="falling-metal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="currentColor" stopOpacity=".94" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".32" />
        </linearGradient>
      </defs>
      <g transform="translate(150 135) rotate(37)" fill="url(#falling-metal)" stroke="currentColor" strokeWidth=".8" strokeLinejoin="round">
        {/* Asymmetric legs, articulated boots and knees. */}
        <path d="M-24 -18 -31 -51 -34 -75 -26 -98 -29 -118 -19 -133 -8 -130 -8 -108 -11 -84 -5 -59 -5 -25Z" />
        <path d="M4 -24 9 -55 24 -75 25 -104 33 -122 45 -119 48 -108 40 -91 37 -65 24 -38 22 -17Z" />
        <path d="M-33 -78 -12 -82 -10 -68 -27 -63Z M23 -76 37 -68 29 -55 15 -59Z" fill="currentColor" />
        <path d="M-23 -25 -9 -30 7 -29 25 -22 22 -2 -21 0Z" />
        {/* Tapered torso, shoulder plates, spread arms. */}
        <path d="M-21 -3 -30 9 -27 29 -16 48 15 48 30 28 29 8 21 -4 8 3 -8 3Z" />
        <path d="M-29 9 -43 4 -54 13 -69 29 -81 17 -91 14 -99 23 -95 32 -75 48 -64 46 -43 32 -30 28Z" />
        <path d="M29 9 41 5 53 12 68 25 80 7 91 3 98 12 94 23 76 43 64 44 45 33 29 28Z" />
        <path d="M-96 15 -103 11 -105 16 -99 23 -109 21 -110 26 -100 31 -96 32 M90 3 94 -6 99 -5 99 5 105 -1 109 2 103 13 94 23" fill="currentColor" />
        <path d="M-17 47 -14 56 14 56 18 47Z" />
        <path d="M-15 55 -18 67 -13 82 -3 90 9 86 17 75 17 62 11 55Z" />
        <g fill="none" strokeOpacity=".55">
          <path d="M-22 11 -11 15 -3 7 M22 11 11 15 3 7 M-17 34 -8 40 8 40 17 34 M-12 68 -3 66 9 68 M-33 -49 -12 -53 M12 -45 27 -43" />
        </g>
        <circle cx="0" cy="23" r="5.5" fill="var(--mark-arc-blue)" stroke="none" opacity=".75" />
        <circle cx="0" cy="23" r="2.5" fill="var(--mark-reactor-white)" stroke="none" />
      </g>
      <g stroke="var(--mark-gold)" strokeLinecap="round" opacity=".34">
        <path d="M227 18 219 29 M245 42 240 50 M212 40 208 47 M255 62 252 68 M236 9 233 13" />
      </g>
    </svg>
  );
}
