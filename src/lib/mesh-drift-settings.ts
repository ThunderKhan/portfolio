export const MESH_PALETTE = ["#000000", "#6A0C0B", "#861F0D", "#B97D10"] as const;
export const MESH_SPEED = 0.84;
export const MESH_FRAME_MS = 1000 / 30;
export const MESH_MAX_PIXELS = 900_000;
export const MESH_MIN_WIDTH = 1280;

export function meshResolution(width: number, height: number, dpr: number) {
  if (width < MESH_MIN_WIDTH || height <= 0) return null;
  const scale = Math.min(Math.max(dpr, 1), 2, Math.sqrt(MESH_MAX_PIXELS / (width * height)));
  return {
    width: Math.max(1, Math.floor(width * scale)),
    height: Math.max(1, Math.floor(height * scale)),
  };
}

export function canAnimateMesh({ dark, wide, visible, reduced, paused }: {
  dark: boolean; wide: boolean; visible: boolean; reduced: boolean; paused: boolean;
}) {
  return dark && wide && visible && !reduced && !paused;
}


// Use wall-clock frame deltas, independently of the 30 FPS draw throttle.
// Reset the previous timestamp whenever animation stops so hidden time is excluded.
export function meshDelta(previous: number | null, now: number) {
  return previous === null ? 0 : Math.max(0, Math.min(now - previous, 100)) / 1000;
}

// Convert the CSS fade boundary to backing-buffer pixels. Round outward and
// include two extra pixels for interpolation at fractional canvas scales.
// Invalid measurements or overlapping strips must retain full-frame rendering.
export function meshEdgePixels(bufferWidth: number, cssWidth: number, cssEdge: number) {
  if (!Number.isFinite(bufferWidth) || !Number.isFinite(cssWidth) || !Number.isFinite(cssEdge) ||
      bufferWidth <= 0 || cssWidth <= 0 || cssEdge <= 0) return bufferWidth;
  const edge = Math.min(bufferWidth, Math.ceil(cssEdge / cssWidth * bufferWidth) + 2);
  return edge * 2 >= bufferWidth ? bufferWidth : edge;
}
