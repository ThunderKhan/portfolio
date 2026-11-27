"use client";

import { useEffect, useRef } from "react";
import styles from "./closing.module.css";

// Bounded, original ordered-dither renderer inspired by the supplied reference.
// No dependencies, no network, no animation work while offscreen.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const LAYERS = 6;
const MAX_PIXELS = 80_000;
const REVEAL_MS = 2800;
const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
const smooth = (n: number) => { const x = clamp(n); return x * x * (3 - 2 * x); };

function ridge(x: number, layer: number) {
  const k = layer / (LAYERS - 1);
  const u = x + layer * .137;
  const peaks = .55 * Math.abs(Math.sin(u * (8.2 - k * 3.3) + .6))
    + .29 * Math.abs(Math.sin(u * 19.7 + layer * 1.9))
    + .16 * Math.abs(Math.sin(u * 41.3 + layer * 2.1));
  return .34 + .63 * k - peaks * (.17 + .17 * k)
    - Math.pow(Math.abs(x * 2 - 1), 2) * k * .24;
}

function rgb(hex: string) {
  const n = Number.parseInt(hex.trim().replace(/^#/, ""), 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}

export function RidgelineScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = rootRef.current;
    const surface = canvasRef.current;
    if (!element || !surface) return;
    const context = surface.getContext("2d");
    if (!context) return;
    const root: HTMLDivElement = element;
    const canvas: HTMLCanvasElement = surface;
    const ctx: CanvasRenderingContext2D = context;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0;
    let image: ImageData | null = null;
    let palette: number[][] = [];
    let frame = 0, last = 0, visible = false;
    let start: number | null = null;
    let pointer = 0, target = 0, gust = 0, gustUntil = 0;
    let clearing = 0, clearTarget = 0, pointerY = .5;
    const tops = Array.from({ length: LAYERS }, () => new Float32Array(0));

    const colors = () => {
      const css = getComputedStyle(root);
      palette = Array.from({ length: 7 }, (_, i) => rgb(css.getPropertyValue("--ridge-" + i)));
    };

    function draw(now: number, settled = false) {
      if (!image) return;
      const still = media.matches || settled;
      const age = still ? REVEAL_MS : Math.max(0, now - (start ?? now));
      pointer += (target - pointer) * .13;
      clearing += (clearTarget - clearing) * .13;
      const wind = still ? 0 : gust * Math.max(0, (gustUntil - now) / 900);
      for (let l = 0; l < LAYERS; l++) {
        const k = l / (LAYERS - 1);
        const progress = smooth((age - l * 170) / 1350);
        for (let x = 0; x < width; x++) {
          const u = x / Math.max(1, width - 1);
          tops[l][x] = ridge(u + pointer * .026 * (k + .25), l) + (1 - progress) * .075;
        }
      }
      const data = image.data;
      for (let y = 0; y < height; y++) {
        const v = y / Math.max(1, height - 1);
        const fade = smooth(v / .32);
        for (let x = 0; x < width; x++) {
          const u = x / Math.max(1, width - 1);
          let layer = -1;
          for (let l = LAYERS - 1; l >= 0; l--) {
            if (v >= tops[l][x]) { layer = l; break; }
          }
          let tone = 0;
          if (layer >= 0) {
            const k = layer / (LAYERS - 1);
            const depth = v - tops[layer][x];
            const progress = smooth((age - layer * 170) / 1350);
            const slope = tops[layer][Math.min(width - 1, x + 1)] - tops[layer][Math.max(0, x - 1)];
            const phase = Math.min(age, REVEAL_MS) / 1000;
            const fog = (.5 + .5 * Math.sin(u * 9 + v * 12 + layer + phase * .28 + wind))
              * (.6 + .4 * Math.sin(u * 19 - v * 7 + layer));
            const clear = clearing * Math.exp(-((u - (target + 1) / 2) ** 2 * 35 + (v - pointerY) ** 2 * 12));
            tone = (.24 + k * .67 + clamp(slope * 5, -.1, .1))
              * (1 - smooth(depth / .45) * .30)
              * (1 - fog * (.32 - clear * .25)) * progress;
          }
          const threshold = (BAYER[(y & 3) * 4 + (x & 3)] + .5) / 16;
          const index = Math.min(6, Math.floor(clamp(tone * fade) * 6 + threshold));
          const c = palette[index], offset = (y * width + x) * 4;
          data[offset] = c[0]; data[offset + 1] = c[1]; data[offset + 2] = c[2]; data[offset + 3] = 255;
        }
      }
      ctx.putImageData(image, 0, 0);
      canvas.dataset.ready = "true";
    }

    function stop() { if (frame) cancelAnimationFrame(frame); frame = 0; }
    function wake() {
      if (!frame && visible && !document.hidden && !media.matches) frame = requestAnimationFrame(tick);
    }
    function tick(now: number) {
      frame = 0;
      if (!visible || document.hidden || media.matches) return;
      if (now - last >= 1000 / 24) { draw(now); last = now; }
      if (now - (start ?? now) < REVEAL_MS || Math.abs(target - pointer) > .002
        || Math.abs(clearTarget - clearing) > .002 || now < gustUntil) wake();
      else draw(now);
    }

    function resize() {
      const box = root.getBoundingClientRect();
      const pixel = Math.max(2, Math.sqrt(box.width * box.height / MAX_PIXELS));
      width = Math.max(1, Math.floor(box.width / pixel));
      height = Math.max(1, Math.floor(box.height / pixel));
      canvas.width = width; canvas.height = height;
      image = ctx.createImageData(width, height);
      for (let l = 0; l < LAYERS; l++) tops[l] = new Float32Array(width);
      colors();
      if (visible && !document.hidden) { draw(performance.now(), media.matches); wake(); }
    }

    function move(event: PointerEvent) {
      if (media.matches || event.pointerType === "touch") return;
      const rect = root.getBoundingClientRect();
      target = clamp((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = clamp((event.clientY - rect.top) / rect.height);
      clearTarget = 1; wake();
    }
    function leave() { target = 0; clearTarget = 0; wake(); }
    function gustAt(event: PointerEvent) {
      if (media.matches) return;
      gust = event.clientX < root.getBoundingClientRect().left + root.clientWidth / 2 ? 2 : -2;
      gustUntil = performance.now() + 900; wake();
    }
    function motionChange() {
      stop(); pointer = target = clearing = clearTarget = 0; gustUntil = 0;
      if (visible) { draw(performance.now(), media.matches); wake(); }
    }
    function visibilityChange() { if (document.hidden) stop(); else if (visible) { draw(performance.now(), media.matches); wake(); } }
    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { stop(); return; }
      start ??= performance.now();
      if (!document.hidden) { draw(performance.now(), media.matches); wake(); }
    });
    const theme = new MutationObserver(() => { colors(); if (visible && !document.hidden) draw(performance.now(), media.matches); });
    resize(); resizeObserver.observe(root); intersection.observe(root);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    media.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", visibilityChange);
    root.addEventListener("pointermove", move); root.addEventListener("pointerleave", leave);
    root.addEventListener("pointerdown", gustAt);
    return () => {
      stop(); resizeObserver.disconnect(); intersection.disconnect(); theme.disconnect();
      media.removeEventListener("change", motionChange);
      document.removeEventListener("visibilitychange", visibilityChange);
      root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointerdown", gustAt);
    };
  }, []);
  return <div ref={rootRef} className={styles.scene} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
