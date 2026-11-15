// Server-only: talks to Vercel Blob with the read-write token. Never import from client components.
import { del, list, put } from "@vercel/blob";
import { blobPrefix, parseManifest, photoExtension, seedStories, type Story } from "@/lib/storyList";
import { SEED_STORY_FILES } from "@/lib/seedStories";

const prefix = () => blobPrefix(process.env.VERCEL_ENV);

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

/**
 * Reads the newest manifest. Returns null when none exists yet.
 * Throws on any Blob or parse error — callers must never fall back to the seed
 * list once a manifest exists (deleted passport photos must not come back).
 */
async function readManifest(): Promise<{ stories: Story[]; urls: string[] } | null> {
  const { blobs } = await list({ prefix: `${prefix()}manifest` });
  if (blobs.length === 0) return null;
  const newest = blobs.reduce((a, b) => (b.uploadedAt > a.uploadedAt ? b : a));
  // Each manifest URL is unique and never rewritten, so Next's default fetch caching is safe here
  // and keeps the public pages static.
  const res = await fetch(newest.url);
  if (!res.ok) throw new Error(`Manifest fetch failed: ${res.status}`);
  return { stories: parseManifest(await res.json()), urls: blobs.map((b) => b.url) };
}

/** Public read for the home and success-stories pages. Throws on error (see readManifest). */
export async function getStories(): Promise<Story[]> {
  if (!isBlobConfigured()) return seedStories(SEED_STORY_FILES);
  const manifest = await readManifest();
  return manifest ? manifest.stories : seedStories(SEED_STORY_FILES);
}

/** Admin read: the current list plus every existing manifest URL (to clean up after a save). */
export async function loadStoriesForEdit(): Promise<{ stories: Story[]; manifestUrls: string[] }> {
  const manifest = await readManifest();
  return manifest
    ? { stories: manifest.stories, manifestUrls: manifest.urls }
    : { stories: seedStories(SEED_STORY_FILES), manifestUrls: [] };
}

/** Writes a new manifest (fresh URL every time), then removes the previous ones. */
export async function saveStories(stories: Story[], previousManifestUrls: string[]): Promise<void> {
  await put(`${prefix()}manifest.json`, JSON.stringify(stories), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
  });
  if (previousManifestUrls.length > 0) {
    try {
      await del(previousManifestUrls);
    } catch (error) {
      console.error("Failed to delete old success-story manifests", error);
    }
  }
}

export async function uploadPhoto(id: string, data: Blob): Promise<string> {
  const type = data.type || "image/jpeg";
  const { url } = await put(`${prefix()}photos/${id}.${photoExtension(type)}`, data, {
    access: "public",
    addRandomSuffix: true,
    contentType: type,
  });
  return url;
}

/** Deletes an uploaded photo. Repo seed photos (/passport/...) are left alone. */
export async function deletePhoto(src: string): Promise<void> {
  if (src.startsWith("/")) return;
  try {
    await del(src);
  } catch (error) {
    console.error("Failed to delete success-story photo", error);
  }
}

export async function updateStories(mutate: (list: Story[]) => Story[]): Promise<Story[]> {
  const { stories, manifestUrls } = await loadStoriesForEdit();
  const next = mutate(stories);
  await saveStories(next, manifestUrls);
  return next;
}
