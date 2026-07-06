export const WINDOW_SEQUENCE_COUNT = 192;
export const ZET_SEQUENCE_COUNT = 118;

/** Hero window sequence — out_XXXX.jpg in public/window-sequences */
export function buildWindowSequencePaths(count: number = WINDOW_SEQUENCE_COUNT): string[] {
  return Array.from(
    { length: count },
    (_, i) =>
      `/window-sequences/out_${String(i + 1).padStart(4, "0")}.jpg`
  );
}

/** Zet plane sequence — out_XXXX.jpg in public/zet-sequences */
export function buildZetSequencePaths(count: number = ZET_SEQUENCE_COUNT): string[] {
  return Array.from(
    { length: count },
    (_, i) =>
      `/zet-sequences/out_${String(i + 1).padStart(4, "0")}.jpg`
  );
}
