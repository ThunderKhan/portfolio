"use client";

import { useEffect, useRef, useState } from "react";
import { createMeshRenderer } from "@/lib/mesh-drift";
import { canAnimateMesh, meshResolution, MESH_FRAME_MS, MESH_MIN_WIDTH } from "@/lib/mesh-drift-settings";

export function MeshDriftBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    if (!layer || !canvas) return;
    const host = layer;
    const surface = canvas;
    const wide = window.matchMedia(`(min-width: ${MESH_MIN_WIDTH}px)`);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: ReturnType<typeof createMeshRenderer> = null;
    let failed = false;
    let frame: number | null = null;
    let last = 0;
    let elapsed = 0;

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      last = 0;
    }
    function conditions() {
      return {
        dark: document.documentElement.classList.contains("dark"),
        wide: wide.matches,
        visible: !document.hidden,
        reduced: motion.matches,
        paused: pausedRef.current,
      };
    }
    function paint() {
      const dimensions = meshResolution(surface.clientWidth, surface.clientHeight, window.devicePixelRatio || 1);
      if (!dimensions || !renderer) return;
      renderer.draw(elapsed, dimensions);
      host.dataset.ready = "true";
    }
    function tick(now: number) {
      frame = null;
      if (!renderer || !canAnimateMesh(conditions())) { stop(); return; }
      if (last === 0 || now - last >= MESH_FRAME_MS - 1) {
        if (last !== 0) elapsed += Math.min(now - last, 100) / 1000;
        last = now;
        paint();
      }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      const state = conditions();
      if (!state.dark || !state.wide || !state.visible || state.reduced) {
        stop();
        // Hide the WebGL frame for reduced motion; CSS provides the static fallback.
        if (state.reduced || !state.dark || !state.wide) delete host.dataset.ready;
        return;
      }
      if (failed) return;
      if (!renderer) {
        try { renderer = createMeshRenderer(surface); } catch { renderer = null; }
        if (!renderer) { failed = true; return; }
      }
      if (state.paused) {
        stop();
        paint();
      } else if (frame === null) {
        frame = requestAnimationFrame(tick);
      }
    }
    function lost(event: Event) {
      event.preventDefault();
      stop();
      delete host.dataset.ready;
      renderer = null;
      failed = true;
    }
    function restored() {
      failed = false;
      sync();
    }
    const theme = new MutationObserver(sync);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    wide.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    window.addEventListener("resize", sync, { passive: true });
    document.addEventListener("visibilitychange", sync);
    surface.addEventListener("webglcontextlost", lost);
    surface.addEventListener("webglcontextrestored", restored);
    syncRef.current = sync;
    sync();
    return () => {
      stop();
      theme.disconnect();
      wide.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
      document.removeEventListener("visibilitychange", sync);
      surface.removeEventListener("webglcontextlost", lost);
      surface.removeEventListener("webglcontextrestored", restored);
      renderer?.dispose();
      delete host.dataset.ready;
      syncRef.current = () => {};
    };
  }, []);

  return (
    <div ref={layerRef} className="mark-mesh-background">
      <div className="mark-mesh-art" aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>
      <button
        type="button"
        className="mark-mesh-toggle"
        onClick={() => {
          const next = !pausedRef.current;
          pausedRef.current = next;
          setPaused(next);
          syncRef.current();
        }}
      >
        {paused ? "Resume background" : "Pause background"}
      </button>
    </div>
  );
}
