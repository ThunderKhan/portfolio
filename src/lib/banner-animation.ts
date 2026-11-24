export const ART_WIDTH = 2508;
export const ART_HEIGHT = 627;
export const ART_POSITION_X = 0.75;

export type BannerAnimationState = {
  ready: boolean;
  visible: boolean;
  inViewport: boolean;
  reducedMotion: boolean;
  paused: boolean;
};

export function canAnimateBanner(state: BannerAnimationState): boolean {
  return state.ready && state.visible && state.inViewport && !state.reducedMotion && !state.paused;
}

/** Same geometry as object-fit: cover; object-position: 75% 50%. */
export function coverArtwork(width: number, height: number) {
  const scale = Math.max(width / ART_WIDTH, height / ART_HEIGHT);
  return { scale, x: (width - ART_WIDTH * scale) * ART_POSITION_X, y: (height - ART_HEIGHT * scale) / 2 };
}

/** Smooth periodic highlight, not a strobe. Phase is measured in cycles. */
export function tilePulse(seconds: number, phase: number): number {
  const wave = (1 + Math.sin(2 * Math.PI * (seconds / 10 - phase))) / 2;
  return 0.58 * wave ** 2;
}

// Tile-center paths traced along the approved mosaic at source resolution.
const FLOW_PATHS = [
  { period: 5.4, phase: 0.16, color: "#67C7EB", points: [[52,72],[52,85],[72,85],[72,98],[90,98],[90,112],[110,112],[110,126],[129,126],[129,140],[150,140],[170,155],[190,155],[190,170],[210,170],[210,183],[232,183],[232,196],[252,196],[252,210],[272,210],[294,223],[314,223],[314,236],[336,236],[356,236],[378,236],[398,236],[420,236],[440,223],[460,223],[460,210],[480,210],[480,196],[502,196],[502,183],[522,183]] },
  { period: 7.2, phase: 0.39, color: "#67C7EB", points: [[1222,262],[1222,274],[1243,274],[1264,274],[1284,262],[1304,262],[1304,248],[1304,236],[1326,236],[1326,223],[1326,210],[1326,196],[1326,183],[1304,183],[1304,170],[1304,155],[1284,155],[1284,140],[1264,140],[1264,126],[1243,126],[1243,112],[1222,112],[1201,112],[1201,98],[1180,98],[1160,98],[1160,112],[1142,112],[1123,112],[1123,126],[1103,126],[1082,140],[1082,155],[1062,155],[1062,170],[1062,183],[1040,183],[1040,196],[1040,210],[1040,223],[1040,236],[1040,248],[1040,262],[1040,274],[1062,274],[1062,288],[1062,304],[1082,304],[1082,322],[1103,338],[1103,350],[1123,350],[1142,350],[1160,350],[1160,364],[1180,364],[1201,364]] },
  { period: 8.4, phase: 0.08, color: "#FBCA03", points: [[1600,488],[1620,488],[1640,488],[1640,476],[1660,476],[1679,462],[1700,462],[1700,476],[1720,476],[1742,476],[1742,488],[1762,488],[1783,488],[1804,502],[1825,502],[1846,502],[1868,502],[1888,502],[1888,488],[1911,488],[1911,476],[1934,476],[1956,476],[1956,462],[1976,462],[1976,450],[1998,450],[1998,437],[2018,437],[2018,424],[2040,424],[2040,408],[2060,408],[2082,408],[2082,391],[2102,391],[2123,391],[2123,376],[2144,376],[2164,376],[2164,364],[2186,364],[2206,364],[2206,350],[2228,350],[2248,350],[2268,350],[2287,350],[2287,338],[2307,338],[2328,338],[2348,338],[2348,350],[2370,350],[2390,350],[2412,350],[2434,350],[2434,364],[2454,364],[2475,376],[2496,376],[2496,391]] },
  { period: 6.6, phase: 0.65, color: "#67C7EB", points: [[2018,46],[2040,46],[2060,46],[2082,46],[2082,58],[2102,58],[2102,72],[2123,72],[2123,85],[2144,85],[2144,98],[2144,112],[2164,112],[2164,126],[2164,140],[2164,155],[2186,155],[2186,170],[2186,183],[2186,196],[2186,210],[2186,223],[2186,236],[2186,248],[2164,248],[2164,262],[2164,274],[2164,288],[2144,288],[2144,304],[2144,322],[2123,322],[2102,338],[2102,350],[2082,350],[2060,350],[2060,364],[2040,364],[2018,364],[1998,364],[1976,350],[1956,350],[1956,338],[1934,338],[1934,322],[1911,322],[1911,304],[1888,304],[1888,288],[1888,274],[1868,274],[1868,262],[1868,248],[1868,236],[1868,223],[1868,210],[1868,196],[1868,183],[1868,170],[1868,155],[1868,140],[1888,126],[1888,112],[1888,98],[1911,98],[1911,85],[1911,72],[1934,72],[1934,58],[1956,58],[1956,46],[1976,46],[1998,46]] },
] as const;

const TRAIL_LENGTH = 8;

/** Open paths enter and leave the artwork before wrapping, avoiding a jump. */
export function flowPosition(seconds: number, count: number, period: number, phase: number): number {
  const cycle = ((seconds / period + phase) % 1 + 1) % 1;
  return -2 + cycle * (count + TRAIL_LENGTH + 3);
}

export function flowOpacity(index: number, head: number): number {
  const distance = head - index;
  if (distance < -1 || distance >= TRAIL_LENGTH) return 0;
  return distance < 0 ? 0.92 * (1 + distance) : 0.92 * (1 - distance / TRAIL_LENGTH) ** 1.4;
}

/** Draw only inset tile interiors; use a white leading edge and a colored tail. */
export function drawFlowTrails(context: CanvasRenderingContext2D, seconds: number): void {
  for (const path of FLOW_PATHS) {
    const head = flowPosition(seconds, path.points.length, path.period, path.phase);
    for (let i = 0; i < path.points.length; i++) {
      const opacity = flowOpacity(i, head);
      if (opacity < 0.01) continue;
      const [x, y] = path.points[i];
      context.globalAlpha = opacity;
      context.fillStyle = path.color;
      context.fillRect(x - 8, y - 4.5, 16, 9);
      const leading = Math.max(0, 1 - Math.abs(head - i));
      if (leading > 0) {
        context.globalAlpha = 0.9 * leading;
        context.fillStyle = "#F4FBFF";
        context.fillRect(x - 8, y - 4.5, 16, 9);
      }
    }
  }
  context.globalAlpha = 1;
}
