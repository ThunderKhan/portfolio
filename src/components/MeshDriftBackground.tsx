"use client";

import { useEffect, useRef, useState } from "react";
import { createMeshRenderer } from "@/lib/mesh-drift";
import { canAnimateMesh, meshDelta, meshEdgePixels, meshResolution, MESH_FRAME_MS, MESH_MIN_WIDTH } from "@/lib/mesh-drift-settings";

export function MeshDriftBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const edge = edgeRef.current;
    if (!layer || !canvas || !edge) return;
    const host = layer;
    const surface = canvas;
    const maskBoundary = edge;
    const wide = window.matchMedia(`(min-width: ${MESH_MIN_WIDTH}px)`);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: ReturnType<typeof createMeshRenderer> = null;
    let failed = false;
    let frame: number | null = null;
    let previous: number | null = null;
    let lastDraw: number | null = null;
    let elapsed = 0;
    let dimensions: ReturnType<typeof meshResolution> = null;
    let edgePixels = 0;
    let measuredDpr = 0;

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previous = null;
      lastDraw = null;
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
    function measure() {
      measuredDpr = window.devicePixelRatio || 1;
      dimensions = meshResolution(surface.clientWidth, surface.clientHeight, measuredDpr);
      if (!dimensions) return;
      const mask = window.getComputedStyle(maskBoundary.parentElement ?? host).maskImage;
      const cssEdge = mask?.includes("linear-gradient") ? maskBoundary.getBoundingClientRect().width : 0;
      edgePixels = meshEdgePixels(dimensions.width, surface.getBoundingClientRect().width, cssEdge);
    }
    function paint() {
      if ((window.devicePixelRatio || 1) !== measuredDpr) measure();
      if (!dimensions || !renderer) return;
      renderer.draw(elapsed, dimensions, edgePixels);
      if (host.dataset.ready !== "true") host.dataset.ready = "true";
    }
    function tick(now: number) {
      frame = null;
      if (!renderer || !canAnimateMesh(conditions())) { stop(); return; }
      elapsed += meshDelta(previous, now);
      previous = now;
      if (lastDraw === null || now - lastDraw >= MESH_FRAME_MS - 1) {
        lastDraw = now;
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
      measure();
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
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(sync);
    resize?.observe(surface);
    resize?.observe(maskBoundary);
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
      resize?.disconnect();
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
        <span ref={edgeRef} className="mark-mesh-edge" />
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
