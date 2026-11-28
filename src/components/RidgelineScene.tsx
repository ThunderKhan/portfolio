"use client";

import { useEffect, useRef } from "react";
import styles from "./closing.module.css";
import { RIDGE_BAYER, RIDGE_LAYERS as LAYERS, RIDGE_SEED, ridgeDither, ridgeEase, ridgeFbm, ridgeHash, ridgeNoise, ridgeProfile, ridgeSmooth } from "@/lib/ridgeline";

// Original reference terrain math with a bounded, visibility-aware rendering loop.
const MAX_PIXELS = 80_000;
const REVEAL_MS = 2800;
const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

function rgb(hex: string) {
  const n = Number.parseInt(hex.trim().replace(/^#/, ""), 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}

export function RidgelineScene({ layout = "footer" }: { layout?: "footer" | "viewport" } = {}) {
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
    let margin = 3, fogWidth = 1, fogHeight = 1;
    let fog = new Float32Array(0);
    let profiles: Float32Array[] = [], pools: Float32Array[] = [];
    let tops = new Float32Array(0), slopes = new Float32Array(0), depths = new Float32Array(0);
    const reveal = new Float32Array(LAYERS), toneBase = new Float32Array(LAYERS);

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
      const fogTime = Math.min(age, REVEAL_MS) / 1000 * .045 + wind;
      // Reference: half-resolution warped fractal fog, not periodic sine waves.
      for (let gy = 0; gy < fogHeight; gy++) {
        const ny = gy * 4.4 / height;
        for (let gx = 0; gx < fogWidth; gx++) {
          const nx = gx * 9 / width + fogTime;
          const warp = ridgeNoise(nx * .45 - fogTime * .6, ny * .8, 77) * .6;
          fog[gy * fogWidth + gx] = ridgeSmooth(.3, .74, ridgeFbm(nx + warp, ny + warp * .4, 31, 3));
        }
      }
      for (let l = 0; l < LAYERS; l++) {
        const k = l / (LAYERS - 1);
        reveal[l] = ridgeEase((age - 280 - l * 145) / 1150);
        toneBase[l] = .16 + .76 * Math.pow(k, 1.6);
        const rise = (1 - reveal[l]) * height * .09;
        const shift = Math.round(pointer * (.25 + k) * .75 * (margin - 3));
        const profile = profiles[l], pool = pools[l];
        for (let x = 0; x < width; x++) {
          const at = x + margin + shift;
          const idx = l * width + x;
          tops[idx] = profile[at] + rise;
          slopes[idx] = profile[Math.min(profile.length - 1, at + 2)] - profile[Math.max(0, at - 2)];
          depths[idx] = height * (.08 + .42 * k) * pool[at];
        }
      }
      const lift = 1 - ridgeEase((age - 750) / 1600);
      const px = (target + 1) / 2 * width, py = pointerY * height;
      const radius = Math.max(1, width * .15), r2 = radius * radius;
      const data = image.data;
      for (let y = 0; y < height; y++) {
        const fade = ridgeSmooth(0, height * .30, y);
        const fogRow = (y >> 1) * fogWidth;
        const dy = (y - py) * 1.5;
        for (let x = 0; x < width; x++) {
          let l = -1;
          for (let i = LAYERS - 1; i >= 0; i--) {
            if (y >= tops[i * width + x]) { l = i; break; }
          }
          let tone = 0, mk = .3;
          if (l >= 0) {
            const k = l / (LAYERS - 1), idx = l * width + x;
            const d = y - tops[idx], depth = depths[idx];
            const crest = 1 - ridgeSmooth(0, depth, d) * (.88 - .45 * k);
            tone = toneBase[l] * crest;
            tone += clamp(slopes[idx] * .06, -.2, .2) * (1 - ridgeSmooth(0, depth * .5, d));
            tone += (ridgeHash(x + Math.round(tops[idx] * 7), d | 0, l) - .5) * .07 * k;
            tone *= reveal[l];
            mk = .95 - .5 * k;
          } else {
            tone = .05 * ridgeSmooth(height * .15, height * .6, y);
          }
          let mist = fog[fogRow + (x >> 1)] * .8 * mk;
          if (clearing > .01) {
            const dx = x - px, q = (dx * dx + dy * dy) / r2;
            if (q < 4) {
              const c = clearing * Math.exp(-q);
              mist *= 1 - c * .92;
              if (l >= 0) tone += c * .16 * reveal[l];
            }
          }
          tone = Math.min(.93, tone);
          mist = Math.min(1, mist + lift * .55);
          tone = (tone * (1 - mist) + .09 * mist * (1 - lift)) * fade;
          const index = ridgeDither(tone, palette.length, RIDGE_BAYER[(y & 7) * 8 + (x & 7)]);
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
      margin = Math.ceil(width * .045) + 3;
      fogWidth = (width >> 1) + 2;
      fogHeight = (height >> 1) + 2;
      fog = new Float32Array(fogWidth * fogHeight);
      profiles = []; pools = [];
      for (let l = 0; l < LAYERS; l++) {
        const profile = ridgeProfile(width, height, l, LAYERS, RIDGE_SEED, margin);
        const pool = new Float32Array(profile.length);
        for (let x = 0; x < pool.length; x++) {
          pool[x] = .45 + 1.1 * ridgeFbm(((x - margin) / width) * 4, l * 5.3, RIDGE_SEED + 9, 2);
        }
        profiles.push(profile); pools.push(pool);
      }
      tops = new Float32Array(LAYERS * width);
      slopes = new Float32Array(LAYERS * width);
      depths = new Float32Array(LAYERS * width);
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
  return <div ref={rootRef} className={styles.scene} data-ridgeline-scene data-ridgeline-layout={layout} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
