"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import {
  deleteStoryAction,
  moveStoryAction,
  updateStoryAction,
  type ActionResult,
} from "@/app/admin/actions";
import { HOME_STORY_LIMIT, MAX_FIELD_LENGTH, type Story } from "@/lib/storyList";

type Status = { kind: "success" | "error"; text: string } | null;

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-base text-white outline-none focus:border-brand-red disabled:opacity-60";
const smallButton =
  "rounded-lg border border-white/15 px-3 py-2 text-sm hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-40";

function StoryRow({
  story,
  position,
  isFirst,
  isLast,
  busy,
  run,
}: {
  story: Story;
  position: number;
  isFirst: boolean;
  isLast: boolean;
  busy: boolean;
  run: (action: () => Promise<ActionResult>, success: string) => void;
}) {
  const [name, setName] = useState(story.name ?? "");
  const [country, setCountry] = useState(story.country ?? "");
  const changed = name !== (story.name ?? "") || country !== (story.country ?? "");

  return (
    <li className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="relative h-[85px] w-16 shrink-0 overflow-hidden rounded-md bg-black/40">
        <Image src={story.src} alt={story.name ?? `Story ${position}`} fill sizes="64px" className="object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="text-xs text-neutral-500">#{position}</span>
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            aria-label="Client name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_FIELD_LENGTH}
            placeholder="Client name"
            disabled={busy}
            className={inputClass}
          />
          <input
            aria-label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            maxLength={MAX_FIELD_LENGTH}
            list="country-options"
            placeholder="Country"
            disabled={busy}
            className={inputClass}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy || !changed}
            onClick={() => run(() => updateStoryAction(story.id, name, country), "Saved.")}
            className="rounded-lg bg-brand-red px-3 py-2 text-sm font-semibold text-white hover:bg-brand-redDark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save
          </button>
          <button
            type="button"
            aria-label="Move up"
            disabled={busy || isFirst}
            onClick={() => run(() => moveStoryAction(story.id, "up"), "Moved.")}
            className={smallButton}
          >
            ↑
          </button>
          <button
            type="button"
            aria-label="Move down"
            disabled={busy || isLast}
            onClick={() => run(() => moveStoryAction(story.id, "down"), "Moved.")}
            className={smallButton}
          >
            ↓
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              if (confirm("Delete this story? This can't be undone.")) {
                run(() => deleteStoryAction(story.id), "Deleted.");
              }
            }}
            className={`${smallButton} ml-auto text-red-400 hover:border-red-400`}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default function StoryList({ stories }: { stories: Story[] }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function run(action: () => Promise<ActionResult>, success: string) {
    setBusy(true);
    setStatus(null);
    try {
      const result = await action();
      setStatus(result.ok ? { kind: "success", text: success } : { kind: "error", text: result.error });
    } catch {
      setStatus({ kind: "error", text: "Could not save. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">All stories</h2>
        <p className="text-xs text-neutral-500">The first {HOME_STORY_LIMIT} appear on the home page.</p>
      </div>

      {status && (
        <p
          role={status.kind === "error" ? "alert" : "status"}
          className={`mb-3 text-sm ${status.kind === "error" ? "text-red-400" : "text-emerald-400"}`}
        >
          {status.text}
        </p>
      )}

      {stories.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-neutral-500">
          No stories yet. Add the first one above.
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {stories.map((story, i) => (
            <Fragment key={story.id}>
              {i === HOME_STORY_LIMIT && (
                <li className="flex items-center gap-3 py-1 text-xs text-neutral-500" aria-hidden>
                  <span className="h-px flex-1 bg-white/15" />
                  Stories below this line show only on the Success Stories page
                  <span className="h-px flex-1 bg-white/15" />
                </li>
              )}
              <StoryRow
                // Remount when the saved values change (e.g. after another admin's edit).
                key={`${story.id}:${story.name ?? ""}:${story.country ?? ""}`}
                story={story}
                position={i + 1}
                isFirst={i === 0}
                isLast={i === stories.length - 1}
                busy={busy}
                run={run}
              />
            </Fragment>
          ))}
        </ol>
      )}
    </section>
  );
}
