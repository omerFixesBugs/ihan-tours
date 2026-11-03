export function drawCoverFrame(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement
) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !img.complete || img.naturalWidth === 0) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = img.width;
  const imgHeight = img.height;

  const imgRatio = imgWidth / imgHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (imgRatio > canvasRatio) {
    drawWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
  } else {
    drawHeight = canvasWidth / imgRatio;
    offsetY = (canvasHeight - drawHeight) / 2;
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

export function progressToFrame(
  progress: number,
  totalFrames: number,
  startAt: number
): number {
  if (progress < startAt || totalFrames === 0) return 0;
  const t = (progress - startAt) / (1 - startAt);
  return Math.min(totalFrames - 1, Math.max(0, Math.floor(t * (totalFrames - 1))));
}

/** Below lg (matches TourShowcase isDesktop): fewer frames, lower canvas resolution, no blur filters. */
export const IS_MOBILE =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 1023px)").matches;

/** Cap backing-store resolution; full DPR (3x on phones) makes every frame draw ~9x the pixels. */
export const CANVAS_DPR =
  typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio, IS_MOBILE ? 1.5 : 2);

/** Blur filters are very expensive on mobile GPUs during scroll — drop them there. */
export const blurFilter = (b: number) => (IS_MOBILE ? "none" : `blur(${b}px)`);
