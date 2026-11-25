"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ART_WIDTH, canAnimateBanner, coverArtwork, tilePulse, drawFlowTrails } from "@/lib/banner-animation";

// Sampled from the committed 2508 × 627 master. Coordinates are source-image
// tile centers; the inset rectangles preserve the original dark grid seams.
// Last tuple value: 0 = gold, 1 = blue-white.
const TILES = [
  [149,261,0],[71,85,0],[231,303,0],[190,169,1],[210,248,1],[109,126,1],
  [272,322,0],[440,210,0],[377,99,0],[272,274,1],[480,126,1],[377,363,1],
  [648,337,0],[669,274,0],[522,363,0],[543,183,1],[585,85,1],
  [988,210,0],[774,112,0],[861,210,0],[795,287,1],[861,155,1],[839,274,1],
  [1221,261,0],[1019,515,0],[1082,287,0],[1201,363,1],[1180,112,1],[1040,391,1],
  [1284,248,0],[1263,437,0],[1388,541,0],[1388,391,1],[1304,449,1],[1494,350,1],
  [1578,424,0],[1578,287,0],[1741,155,0],[1660,72,1],[1660,303,1],[1720,476,1],
  [1934,99,0],[1911,248,0],[1934,303,0],[1997,99,1],[1997,248,1],[1934,155,1],
  [2248,322,0],[2206,169,0],[2122,337,0],[2102,99,1],[2122,261,1],[2143,408,1],
  [2475,155,0],[2307,287,0],[2390,437,0],[2287,350,1],[2348,72,1],[2454,376,1],
] as const;

const FRAME_MS = 1000 / 30;

export function StarryNightBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!ready || !canvas || !window.IntersectionObserver || !window.ResizeObserver || !window.matchMedia) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inViewport = false;
    let frame: number | null = null;
    let last = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;

    function clear() {
      context!.setTransform(1, 0, 0, 1, 0, 0);
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
    }

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      last = 0;
      clear();
    }

    function eligible() {
      return width > 0 && height > 0 && canAnimateBanner({
        ready, visible: !document.hidden, inViewport,
        reducedMotion: motion.matches, paused,
      });
    }

    function draw(now: number) {
      frame = null;
      if (!eligible()) { stop(); return; }
      if (last === 0 || now - last >= FRAME_MS - 1) {
        if (last !== 0) elapsedRef.current += Math.min(now - last, 100) / 1000;
        last = now;
        clear();
        const { scale, x, y } = coverArtwork(width, height);
        context!.setTransform(ratio * scale, 0, 0, ratio * scale, ratio * x, ratio * y);
        for (const [tx, ty, blue] of TILES) {
          // Gold travels across the composition; blue highlights have a
          // slight phase offset for slow, independent star/core shimmer.
          const phase = tx / ART_WIDTH + (blue ? 0.15 + ty / 1800 : ty / 3000);
          context!.globalAlpha = tilePulse(elapsedRef.current, phase);
          context!.fillStyle = blue ? "#F4FBFF" : "#FBCA03";
          context!.fillRect(tx - 8, ty - 4.5, 16, 9);
        }
        context!.globalAlpha = 1;
        drawFlowTrails(context!, elapsedRef.current);
      }
      frame = requestAnimationFrame(draw);
    }

    function sync() {
      if (!eligible()) stop();
      else if (frame === null) frame = requestAnimationFrame(draw);
    }

    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) { stop(); return; }
      ratio = Math.min(window.devicePixelRatio || 1, 1.5, 1600 / width, 600 / height);
      canvas!.width = Math.max(1, Math.round(width * ratio));
      canvas!.height = Math.max(1, Math.round(height * ratio));
      sync();
    }

    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      setSupported(true);
      sync();
    });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    resize();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      stop();
    };
  }, [ready, paused]);

  return (
    <>
      <Image
        src="/banner/starry-night.png"
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 768px) 40vw, 100vw"
        quality={80}
        className="object-cover object-[75%_50%]"
        onLoad={() => setReady(true)}
        onError={() => setReady(false)}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[4] h-full w-full motion-reduce:hidden"
      />
      {ready && supported && (
        <button
          type="button"
          className="absolute bottom-1 left-1 z-30 grid size-11 place-items-center rounded-md bg-black/85 text-[#F4FBFF] hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67C7EB] motion-reduce:hidden"
          aria-label={paused ? "Play banner animation" : "Pause banner animation"}
          title={paused ? "Play banner animation" : "Pause banner animation"}
          onClick={() => setPaused(value => !value)}
        >
          {paused ? <Play aria-hidden="true" size={15} /> : <Pause aria-hidden="true" size={15} />}
        </button>
      )}
    </>
  );
}
