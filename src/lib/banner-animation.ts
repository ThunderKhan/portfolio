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
  return 0.24 * wave ** 4;
}
