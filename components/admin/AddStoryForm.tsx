"use client";

import { useEffect, useRef, useState } from "react";
import { addStoryAction } from "@/app/admin/actions";
import { MAX_FIELD_LENGTH } from "@/lib/storyList";
import { resizeImageFile } from "@/lib/resizeImage";

type Status = { kind: "success" | "error"; text: string } | null;

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-base text-white outline-none focus:border-brand-red";

export default function AddStoryForm({ countries }: { countries: string[] }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file) return setStatus({ kind: "error", text: "Please choose a photo." });

    setBusy(true);
    setStatus(null);
    try {
      let resized: Blob;
      try {
        resized = await resizeImageFile(file);
      } catch {
        setStatus({ kind: "error", text: "Couldn't read that photo. Please try a JPEG or PNG." });
        return;
      }
      const formData = new FormData();
      formData.append("photo", new File([resized], "story.jpg", { type: "image/jpeg" }));
      formData.append("name", name);
      formData.append("country", country);

      const result = await addStoryAction(formData);
      if (result.ok) {
        setFile(null);
        setName("");
        setCountry("");
        if (fileRef.current) fileRef.current.value = "";
        setStatus({ kind: "success", text: "Story added — it's live on the site." });
      } else {
        setStatus({ kind: "error", text: result.error });
      }
    } catch {
      setStatus({ kind: "error", text: "Could not save. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6"
    >
      <h2 className="mb-4 text-lg font-semibold">Add a success story</h2>

      <div className="flex flex-col gap-4 sm:flex-row">
        <label className="flex aspect-[3/4] w-40 shrink-0 cursor-pointer flex-col items-center justify-center self-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-black/30 text-center text-sm text-neutral-400 hover:border-brand-red sm:self-start">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
            <img src={preview} alt="Selected photo" className="h-full w-full object-cover" />
          ) : (
            <span className="px-3">Tap to choose the passport / visa photo</span>
          )}
          <input
            ref={fileRef}
            type="file"
            name="photo"
            accept="image/*"
            required
            className="sr-only"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setStatus(null);
            }}
          />
        </label>

        <div className="flex flex-1 flex-col gap-3">
          <label className="block">
            <span className="mb-1 block text-sm text-neutral-300">Client name (optional)</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={MAX_FIELD_LENGTH}
              placeholder="e.g. Rahim Uddin"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-neutral-300">Country (optional)</span>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              maxLength={MAX_FIELD_LENGTH}
              list="country-options"
              placeholder="e.g. Poland"
              className={inputClass}
            />
            <datalist id="country-options">
              {countries.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>

          <button
            type="submit"
            disabled={busy}
            className="mt-auto rounded-lg bg-brand-red px-4 py-3 text-sm font-semibold text-white hover:bg-brand-redDark disabled:opacity-60"
          >
            {busy ? "Uploading…" : "Add story"}
          </button>
          {status && (
            <p
              role={status.kind === "error" ? "alert" : "status"}
              className={`text-sm ${status.kind === "error" ? "text-red-400" : "text-emerald-400"}`}
            >
              {status.text}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
