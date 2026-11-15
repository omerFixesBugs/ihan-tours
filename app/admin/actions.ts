"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import {
  StoryNotFoundError,
  addStory,
  cleanField,
  moveStory,
  removeStory,
  updateStory,
  validatePhoto,
  type Story,
} from "@/lib/storyList";
import { deletePhoto, updateStories, uploadPhoto } from "@/lib/storyStore";

export type ActionResult = { ok: true } | { ok: false; error: string };

function refreshPages() {
  revalidatePath("/");
  revalidatePath("/success-stories");
  revalidatePath("/admin");
}

function failure(error: unknown): ActionResult {
  if (error instanceof StoryNotFoundError) {
    return { ok: false, error: "This story no longer exists — refresh the page." };
  }
  console.error("Success-story admin action failed", error);
  return { ok: false, error: "Could not save. Please try again." };
}

const isId = (value: unknown): value is string => typeof value === "string" && value.length > 0;

export async function addStoryAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const photo = formData.get("photo");
  if (!(photo instanceof File)) return { ok: false, error: "Please choose a photo." };
  const invalid = validatePhoto(photo);
  if (invalid) return { ok: false, error: invalid };

  const id = crypto.randomUUID();
  let src: string;
  try {
    src = await uploadPhoto(id, photo);
  } catch (error) {
    return failure(error);
  }

  const story: Story = { id, src, createdAt: new Date().toISOString() };
  const name = cleanField(formData.get("name"));
  const country = cleanField(formData.get("country"));
  if (name) story.name = name;
  if (country) story.country = country;

  try {
    await updateStories((list) => addStory(list, story));
  } catch (error) {
    await deletePhoto(src);
    return failure(error);
  }
  refreshPages();
  return { ok: true };
}

export async function updateStoryAction(
  id: string,
  name: string,
  country: string
): Promise<ActionResult> {
  await requireAdmin();
  if (!isId(id)) return failure(new StoryNotFoundError(String(id)));
  try {
    await updateStories((list) => updateStory(list, id, { name, country }));
  } catch (error) {
    return failure(error);
  }
  refreshPages();
  return { ok: true };
}

export async function moveStoryAction(id: string, direction: "up" | "down"): Promise<ActionResult> {
  await requireAdmin();
  if (!isId(id)) return failure(new StoryNotFoundError(String(id)));
  if (direction !== "up" && direction !== "down") return { ok: false, error: "Invalid move." };
  try {
    await updateStories((list) => moveStory(list, id, direction));
  } catch (error) {
    return failure(error);
  }
  refreshPages();
  return { ok: true };
}

export async function deleteStoryAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!isId(id)) return failure(new StoryNotFoundError(String(id)));
  let removed: Story | undefined;
  try {
    await updateStories((list) => {
      const result = removeStory(list, id);
      removed = result.removed;
      return result.list;
    });
  } catch (error) {
    return failure(error);
  }
  if (removed) await deletePhoto(removed.src);
  refreshPages();
  return { ok: true };
}
