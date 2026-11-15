/**
 * Pure success-story list logic. No imports: this module runs in the browser,
 * on the server, and directly under `node --test`.
 */

export type Story = {
  id: string;
  /** Public image URL: a Vercel Blob URL, or /passport/... for the original repo photos */
  src: string;
  name?: string;
  country?: string;
  createdAt: string;
};

export const HOME_STORY_LIMIT = 8;
export const MAX_FIELD_LENGTH = 80;
export const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const SEED_CREATED_AT = "2026-09-22T00:00:00.000Z";

export class StoryNotFoundError extends Error {
  constructor(id: string) {
    super(`Story not found: ${id}`);
    this.name = "StoryNotFoundError";
  }
}

/** Trims text input; blank or non-string becomes undefined; caps the length. */
export function cleanField(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, MAX_FIELD_LENGTH) : undefined;
}

/** "Rahim Uddin - Poland.jpg" → { name: "Rahim Uddin", country: "Poland" } */
export function parseStoryFilename(file: string): { name?: string; country?: string } {
  const parts = file.replace(IMAGE_EXT, "").trim().split(" - ").map((p) => p.trim());
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return { name: parts[0], country: parts[1] };
  }
  return {};
}

/** Builds stories for the photos shipped in /public/passport. Ids are stable per filename. */
export function seedStories(files: string[]): Story[] {
  return files
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => ({
      id: `seed-${file.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      src: `/passport/${encodeURIComponent(file)}`,
      createdAt: SEED_CREATED_AT,
      ...parseStoryFilename(file),
    }));
}

/** Validates the stored manifest JSON and keeps only known fields. */
export function parseManifest(json: unknown): Story[] {
  if (!Array.isArray(json)) throw new Error("Invalid manifest");
  return json.map((entry) => {
    if (!entry || typeof entry !== "object") throw new Error("Invalid manifest");
    const { id, src, createdAt, name, country } = entry as Record<string, unknown>;
    if (typeof id !== "string" || !id || typeof src !== "string" || !src) {
      throw new Error("Invalid manifest");
    }
    const story: Story = {
      id,
      src,
      createdAt: typeof createdAt === "string" ? createdAt : SEED_CREATED_AT,
    };
    if (typeof name === "string" && name) story.name = name;
    if (typeof country === "string" && country) story.country = country;
    return story;
  });
}

function indexOrThrow(list: Story[], id: string): number {
  const index = list.findIndex((s) => s.id === id);
  if (index === -1) throw new StoryNotFoundError(id);
  return index;
}

export function addStory(list: Story[], story: Story): Story[] {
  return [story, ...list];
}

export function updateStory(
  list: Story[],
  id: string,
  fields: { name?: unknown; country?: unknown }
): Story[] {
  const index = indexOrThrow(list, id);
  const { name: _name, country: _country, ...rest } = list[index];
  const updated: Story = { ...rest };
  const name = cleanField(fields.name);
  const country = cleanField(fields.country);
  if (name) updated.name = name;
  if (country) updated.country = country;
  return list.map((s, i) => (i === index ? updated : s));
}

export function removeStory(list: Story[], id: string): { list: Story[]; removed: Story } {
  const index = indexOrThrow(list, id);
  return { list: list.filter((_, i) => i !== index), removed: list[index] };
}

export function moveStory(list: Story[], id: string, direction: "up" | "down"): Story[] {
  const index = indexOrThrow(list, id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= list.length) return [...list];
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** Returns an error message for the admin, or null if the photo is acceptable. */
export function validatePhoto(file: { type: string; size: number }): string | null {
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return "Please choose a JPEG, PNG or WebP photo.";
  }
  if (file.size <= 0) return "That photo looks empty. Please choose it again.";
  if (file.size > MAX_PHOTO_BYTES) return "That photo is larger than 4 MB. Please choose a smaller one.";
  return null;
}

/** Blob key prefix, separated per Vercel environment so tests never touch production data. */
export function blobPrefix(vercelEnv: string | undefined): string {
  const env = vercelEnv === "production" || vercelEnv === "preview" ? vercelEnv : "development";
  return `success-stories/${env}/`;
}
