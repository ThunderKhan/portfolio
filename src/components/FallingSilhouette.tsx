"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./closing.module.css";
import { armorScrollOffset, armorScrollProgress } from "@/lib/armor-scroll";

// Decorative artwork follows scroll only; the quote and footer links never move.
export function FallingSilhouette() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = ref.current;
    const footer = image?.closest("footer");
    const terrain = footer?.querySelector<HTMLElement>("[data-ridgeline-scene]");
    const closing = document.getElementById("closing-motto");
    if (!image || !footer || !terrain || !closing) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let near = false;
    let frame = 0;
    let travel = 0;
    let footerHeight = 0;
    let imageWidth = 0;
    const nearby = new Set<Element>();

    const cancel = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const measure = () => {
      // Anchor the bottom of the transparent cutout in the visible ridge field,
      // rather than to a fixed number of pixels below the navigation.
      const destination = terrain.offsetTop + terrain.offsetHeight * .70;
      travel = Math.max(0, destination - image.offsetTop - image.offsetHeight);
      footerHeight = footer.offsetHeight;
      imageWidth = image.offsetWidth;
    };
    const paint = (progress: number) => {
      // No animated layout properties; only the decorative image is transformed.
      image.style.transform = `translate3d(-50%, ${armorScrollOffset(travel, imageWidth, progress).toFixed(2)}px, 0)`;
      // Keep the art restrained behind the links, then restore color near the ridges.
      const arrival = Math.min(1, Math.max(0, (progress - .62) / .38));
      image.style.setProperty("--armor-arrival", arrival.toFixed(3));
    };
    const draw = () => {
      frame = 0;
      if (!near || document.hidden || reduced.matches) return;
      const vh = window.innerHeight;
      const closingTop = closing.getBoundingClientRect().top;
      const footerTop = footer.getBoundingClientRect().top;
      paint(armorScrollProgress(vh, closingTop, footerTop, footerHeight));
    };
    const schedule = () => {
      if (!frame && near && !document.hidden && !reduced.matches) frame = requestAnimationFrame(draw);
    };
    const layoutChange = () => {
      measure();
      if (reduced.matches) paint(1);
      else schedule();
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) nearby.add(entry.target);
        else nearby.delete(entry.target);
      }
      near = nearby.size > 0;
      if (near) layoutChange();
      else cancel();
    }, { rootMargin: "480px 0px" });
    const resize = new ResizeObserver(layoutChange);
    const motionChange = () => {
      cancel();
      layoutChange();
    };
    const visibilityChange = () => {
      if (document.hidden) cancel();
      else layoutChange();
    };

    observer.observe(closing);
    observer.observe(footer);
    resize.observe(closing);
    resize.observe(footer);
    resize.observe(terrain);
    resize.observe(image);
    layoutChange();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", layoutChange, { passive: true });
    reduced.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      cancel();
      observer.disconnect();
      nearby.clear();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", layoutChange);
      reduced.removeEventListener("change", motionChange);
      document.removeEventListener("visibilitychange", visibilityChange);
      image.style.removeProperty("transform");
      image.style.removeProperty("--armor-arrival");
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
      sizes="(max-width: 639px) 142px, 220px"
      loading="lazy"
      unoptimized
    />
  );
}
