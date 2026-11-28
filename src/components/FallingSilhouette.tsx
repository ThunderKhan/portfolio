"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./closing.module.css";

// Decorative artwork follows scroll only; the quote and footer links never move.
export function FallingSilhouette() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = ref.current;
    const footer = image?.closest("footer");
    if (!image || !footer) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 639px)");
    let near = false;
    let frame = 0;

    const cancel = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const draw = () => {
      frame = 0;
      if (!near || document.hidden || reduced.matches) return;
      const vh = window.innerHeight;
      const top = footer.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (vh * .95 - top) / (vh * .65)));
      const travel = compact.matches ? 32 : 84;
      // Direct transform only: no React render, layout animation or idle loop.
      image.style.transform = `translate3d(-50%, ${(travel * progress).toFixed(2)}px, 0)`;
    };
    const schedule = () => {
      if (!frame && near && !document.hidden && !reduced.matches) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (near) schedule();
      else cancel();
    }, { rootMargin: "160px 0px" });
    const motionChange = () => {
      cancel();
      if (reduced.matches) image.style.removeProperty("transform");
      else schedule();
    };
    const visibilityChange = () => {
      if (document.hidden) cancel();
      else schedule();
    };

    observer.observe(footer);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reduced.addEventListener("change", motionChange);
    compact.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      cancel();
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", motionChange);
      compact.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", visibilityChange);
      image.style.removeProperty("transform");
    };
  }, []);

  return (
    <Image
      ref={ref}
      src="/art/falling-armor.webp"
      alt=""
      aria-hidden="true"
      className={styles.figure}
      width={533}
      height={640}
      sizes="(max-width: 639px) 150px, 240px"
      loading="lazy"
      unoptimized
    />
  );
}
