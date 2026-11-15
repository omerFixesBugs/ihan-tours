/**
 * The original success-story photos shipped in /public/passport.
 * They are shown until an admin saves for the first time; after that the
 * Blob manifest is the source of truth (it includes these until deleted).
 *
 * This is a fixed list rather than a folder scan because Vercel server
 * functions cannot reliably read /public at runtime.
 */
export const SEED_STORY_FILES: string[] = [
  "WhatsApp Image 2026-09-22 at 17.37.53 (1).jpeg",
  "WhatsApp Image 2026-09-22 at 17.37.53 (2).jpeg",
  "WhatsApp Image 2026-09-22 at 17.37.53.jpeg",
  "WhatsApp Image 2026-09-22 at 17.39.38.jpeg",
  "WhatsApp Image 2026-09-22 at 17.40.02.jpeg",
  "WhatsApp Image 2026-09-22 at 17.40.47.jpeg",
  "WhatsApp Image 2026-09-22 at 17.42.25.jpeg",
  "WhatsApp Image 2026-09-22 at 17.43.07.jpeg",
  "WhatsApp Image 2026-09-22 at 17.53.00.jpeg",
];
