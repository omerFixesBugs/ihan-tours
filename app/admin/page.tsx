import Link from "next/link";
import AddStoryForm from "@/components/admin/AddStoryForm";
import SetupSteps from "@/components/admin/SetupSteps";
import StoryList from "@/components/admin/StoryList";
import { logoutAction } from "@/app/admin/login/actions";
import { requireAdmin } from "@/lib/adminAuth";
import type { Story } from "@/lib/storyList";
import { isBlobConfigured, loadStoriesForEdit } from "@/lib/storyStore";

export const dynamic = "force-dynamic";

async function load(): Promise<{ stories: Story[] } | { error: true }> {
  try {
    return { stories: (await loadStoriesForEdit()).stories };
  } catch (error) {
    console.error("Failed to load success stories for admin", error);
    return { error: true };
  }
}

export default async function AdminPage() {
  await requireAdmin();

  const configured = isBlobConfigured();
  const data = configured ? await load() : null;
  const stories = data && "stories" in data ? data.stories : null;
  const countries = stories
    ? Array.from(new Set(stories.map((s) => s.country).filter((c): c is string => !!c))).sort()
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Success stories</h1>
          {stories && <p className="text-sm text-neutral-400">{stories.length} on the site</p>}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/success-stories" target="_blank" className="text-neutral-300 underline">
            View site
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-neutral-400 underline hover:text-white">
              Log out
            </button>
          </form>
        </div>
      </header>

      {!configured ? (
        <SetupSteps title="Photo storage is not connected yet." />
      ) : !stories ? (
        <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 p-5 text-sm text-red-200">
          Couldn&apos;t load stories — saving is disabled until this loads. Refresh to try again.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          <AddStoryForm countries={countries} />
          <StoryList stories={stories} />
        </div>
      )}
    </div>
  );
}
