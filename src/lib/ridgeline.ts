// Terrain math adapted from the owner-supplied Ridgeline Dither Footer
// reference (Northwall demo, seed 23, seven ridges).
export const RIDGE_SEED = 23;
export const RIDGE_LAYERS = 7;
export const RIDGE_BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
].map(v => (v + .5) / 64);

export function ridgeHash(x: number, y: number, seed: number) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
export function ridgeNoise(x: number, y: number, seed: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = ridgeHash(xi, yi, seed), b = ridgeHash(xi + 1, yi, seed);
  const c = ridgeHash(xi, yi + 1, seed), d = ridgeHash(xi + 1, yi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
export function ridgeFbm(x: number, y: number, seed: number, octaves: number) {
  let sum = 0, amp = .5, norm = 0;
  for (let o = 0; o < octaves; o++) {
    sum += ridgeNoise(x, y, seed + o * 31) * amp;
    norm += amp; x *= 2.03; y *= 2.03; amp *= .5;
  }
  return norm > 0 ? sum / norm : 0;
}
export function ridgeSmooth(a: number, b: number, x: number) {
  const t = a === b ? (x < a ? 0 : 1) : Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
export function ridgeEase(t: number) {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
}
export function ridgeProfile(cols: number, rows: number, i: number, layers: number, seed: number, margin: number) {
  const k = layers > 1 ? i / (layers - 1) : 1;
  const out = new Float32Array(cols + margin * 2);
  const base = rows * (.38 + .66 * Math.pow(k, 1.4));
  const amp = rows * (.2 + .24 * k);
  const freq = 6 - 3.8 * k;
  const flankL = rows * .5 * k ** 3 * (.55 + .6 * ridgeHash(i, 11, seed));
  const flankR = rows * .5 * k ** 3 * (.55 + .6 * ridgeHash(i, 13, seed));
  const ceil = rows * .17;
  const tilt = (ridgeHash(i, 7, seed) - .5) * rows * .34 * (.4 + k);
  const s = (seed | 0) * 13 + i * 101;
  for (let x = 0; x < out.length; x++) {
    const u = (x - margin) / cols;
    const r1 = 1 - Math.abs(ridgeNoise(u * freq + i * 3.7, .5, s) * 2 - 1);
    const r2 = 1 - Math.abs(ridgeNoise(u * freq * 2.3, 3.5, s + 1) * 2 - 1);
    const f = ridgeFbm(u * freq * 4.1, 9.5, s + 2, 3);
    const h = r1 * r1 * .62 + r2 * .24 + f * .14;
    const e = Math.min(1.2, Math.abs(u * 2 - 1));
    const y = base - h * amp + tilt * (u - .5) * 2 - (u < .5 ? flankL : flankR) * e * e * Math.sqrt(e);
    out[x] = y < ceil ? ceil - (ceil - y) * .25 : y;
  }
  return out;
}
export function ridgeDither(tone: number, count: number, threshold: number) {
  return Math.min(count - 1, Math.floor(Math.min(1, Math.max(0, tone)) * (count - 1) + threshold));
}
