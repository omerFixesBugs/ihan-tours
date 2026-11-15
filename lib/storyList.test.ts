import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addStory,
  blobPrefix,
  cleanField,
  moveStory,
  parseManifest,
  parseStoryFilename,
  photoExtension,
  splitManifests,
  removeStory,
  seedStories,
  StoryNotFoundError,
  updateStory,
  validatePhoto,
  type Story,
} from "./storyList.ts";
import { SEED_STORY_FILES } from "./seedStories.ts";

const story = (id: string, extra: Partial<Story> = {}): Story => ({
  id,
  src: `/x/${id}.jpg`,
  createdAt: "2026-01-01T00:00:00.000Z",
  ...extra,
});

test("cleanField trims, blanks to undefined, rejects non-strings, caps at 80", () => {
  assert.equal(cleanField("  Rahim  "), "Rahim");
  assert.equal(cleanField("   "), undefined);
  assert.equal(cleanField(undefined), undefined);
  assert.equal(cleanField(123), undefined);
  assert.equal(cleanField("x".repeat(100))?.length, 80);
});

test("parseStoryFilename reads 'Name - Country' and ignores other names", () => {
  assert.deepEqual(parseStoryFilename("Rahim Uddin - Poland.jpg"), {
    name: "Rahim Uddin",
    country: "Poland",
  });
  assert.deepEqual(parseStoryFilename("WhatsApp Image 2026-09-22 at 17.37.53.jpeg"), {});
});

test("seedStories keeps images only, sorts, encodes src and parses country", () => {
  const seeded = seedStories(["b.jpg", "a - Malta.png", "notes.txt"]);
  assert.equal(seeded.length, 2);
  assert.equal(seeded[0].src, "/passport/a%20-%20Malta.png");
  assert.equal(seeded[0].country, "Malta");
  assert.equal(seeded[0].name, "a");
  assert.equal(seeded[1].src, "/passport/b.jpg");
});

test("seedStories ids and createdAt are stable across calls", () => {
  const files = ["b.jpg", "a - Malta.png"];
  const first = seedStories(files);
  const second = seedStories(files);
  assert.deepEqual(
    first.map((s) => s.id),
    second.map((s) => s.id)
  );
  assert.equal(first[0].createdAt, "2026-09-22T00:00:00.000Z");
  assert.equal(second[1].createdAt, first[1].createdAt);
});

test("seed files produce the 9 repo photos with unique ids", () => {
  const SEED_STORIES = seedStories(SEED_STORY_FILES);
  assert.equal(SEED_STORIES.length, 9);
  assert.equal(new Set(SEED_STORIES.map((s) => s.id)).size, 9);
  assert.ok(SEED_STORIES.every((s) => s.src.startsWith("/passport/")));
});

test("parseManifest accepts valid stories and drops unknown keys", () => {
  const parsed = parseManifest([
    { id: "a", src: "/x.jpg", createdAt: "2026-01-01T00:00:00.000Z", name: "N", extra: 1 },
  ]);
  assert.deepEqual(parsed, [
    { id: "a", src: "/x.jpg", createdAt: "2026-01-01T00:00:00.000Z", name: "N" },
  ]);
});

test("parseManifest rejects malformed input", () => {
  assert.throws(() => parseManifest(null), /Invalid manifest/);
  assert.throws(() => parseManifest({}), /Invalid manifest/);
  assert.throws(() => parseManifest([{ src: "/x" }]), /Invalid manifest/);
  assert.throws(() => parseManifest([{ id: "a" }]), /Invalid manifest/);
});

test("addStory prepends without mutating", () => {
  const list = [story("a")];
  const before = structuredClone(list);
  const result = addStory(list, story("new"));
  assert.deepEqual(result.map((s) => s.id), ["new", "a"]);
  assert.deepEqual(list, before);
});

test("updateStory cleans fields without mutating", () => {
  const list = [story("a", { name: "Old", country: "Malta" })];
  const before = structuredClone(list);
  const [updated] = updateStory(list, "a", { name: "  ", country: "Italy " });
  assert.equal(updated.name, undefined);
  assert.equal(updated.country, "Italy");
  assert.deepEqual(list, before);
});

test("updateStory throws StoryNotFoundError for unknown id", () => {
  assert.throws(() => updateStory([story("a")], "zzz", { name: "x" }), StoryNotFoundError);
});

test("removeStory returns removed story and the remaining list", () => {
  const list = [story("a"), story("b")];
  const before = structuredClone(list);
  const { list: rest, removed } = removeStory(list, "a");
  assert.equal(removed.id, "a");
  assert.deepEqual(rest.map((s) => s.id), ["b"]);
  assert.deepEqual(list, before);
  assert.throws(() => removeStory(list, "zzz"), StoryNotFoundError);
});

test("moveStory swaps with neighbour and is a no-op at the edges", () => {
  const list = [story("a"), story("b"), story("c")];
  const before = structuredClone(list);
  const ids = (l: Story[]) => l.map((s) => s.id);
  assert.deepEqual(ids(moveStory(list, "b", "up")), ["b", "a", "c"]);
  assert.deepEqual(ids(moveStory(list, "b", "down")), ["a", "c", "b"]);
  assert.deepEqual(ids(moveStory(list, "a", "up")), ["a", "b", "c"]);
  assert.deepEqual(ids(moveStory(list, "c", "down")), ["a", "b", "c"]);
  assert.throws(() => moveStory(list, "zzz", "up"), StoryNotFoundError);
  assert.deepEqual(list, before);
});

test("validatePhoto accepts small images and rejects other types and sizes", () => {
  assert.equal(validatePhoto({ type: "image/jpeg", size: 1000 }), null);
  assert.match(validatePhoto({ type: "application/pdf", size: 1000 }) ?? "", /JPEG, PNG or WebP/);
  assert.match(validatePhoto({ type: "image/jpeg", size: 5_000_000 }) ?? "", /4 MB/);
  assert.notEqual(validatePhoto({ type: "image/jpeg", size: 0 }), null);
});

test("blobPrefix separates environments and defaults to development", () => {
  assert.equal(blobPrefix("production"), "success-stories/production/");
  assert.equal(blobPrefix("preview"), "success-stories/preview/");
  assert.equal(blobPrefix(undefined), "success-stories/development/");
  assert.equal(blobPrefix("weird"), "success-stories/development/");
});

test("photoExtension maps allowed image types and defaults to jpg", () => {
  assert.equal(photoExtension("image/jpeg"), "jpg");
  assert.equal(photoExtension("image/png"), "png");
  assert.equal(photoExtension("image/webp"), "webp");
  assert.equal(photoExtension("application/octet-stream"), "jpg");
});

test("splitManifests picks the newest manifest and lists only older ones for deletion", () => {
  const blobs = [
    { url: "m2", uploadedAt: new Date("2026-01-02") },
    { url: "m3", uploadedAt: new Date("2026-01-03") },
    { url: "m1", uploadedAt: new Date("2026-01-01") },
  ];
  assert.deepEqual(splitManifests(blobs), { newest: "m3", older: ["m2", "m1"] });
  assert.deepEqual(splitManifests([{ url: "only", uploadedAt: new Date() }]), { newest: "only", older: [] });
  assert.equal(splitManifests([]), null);
});
