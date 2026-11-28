// Scroll geometry is independent of the DOM so the entry and arrival can be tested.
export function armorScrollProgress(viewportHeight: number, closingTop: number, footerTop: number, footerHeight: number) {
  const startTop = viewportHeight * 1.15 + (footerTop - closingTop);
  const endTop = viewportHeight - footerHeight;
  const raw = Math.min(1, Math.max(0, (startTop - footerTop) / Math.max(1, startTop - endTop)));
  return raw ** 1.7;
}

export function armorScrollOffset(travel: number, imageWidth: number, progress: number) {
  // Give the figure a head start above its former position, not below it.
  const lead = imageWidth * .32;
  return -lead + (travel + lead) * progress;
}
