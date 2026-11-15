# Success Stories Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A password-protected `/admin` where the developer and the client add, edit, reorder
and delete success stories, stored in Vercel Blob. The Success Stories section moves to
directly after the hero on the home page.

**Architecture:**
- The pure logic sits in two dependency-free modules, each unit-tested with `node --test`:
  - `lib/storyList.ts`: story list operations, validation and seeding
  - `lib/adminSession.ts`: HMAC session tokens and password comparison
- `lib/storyStore.ts` is the only module that talks to Blob. It stores photos, plus a JSON
  manifest that gets a new URL on every save.
- The public pages stay static and are refreshed only by `revalidatePath` from admin
  server actions.
- `middleware.ts` guards `/admin`, and each admin server action also checks the session
  itself.

**Tech Stack:** Next.js 14.2 App Router, React 18, TypeScript, Tailwind, `@vercel/blob`
2.9.0 (already installed), `next/image`, Node 24 built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-15-success-stories-admin-design.md`

## Global Constraints

- Blob keys always start with `success-stories/<env>/`. `<env>` is `production` or `preview`
  when `VERCEL_ENV` says so, and `development` otherwise.
- Photo key: `success-stories/<env>/photos/<id>.jpg`. Manifest key:
  `success-stories/<env>/manifest-<random>.json`. Every save writes a new manifest; nothing
  is ever overwritten.
- `list()` runs only at build time, on admin page loads, and in admin actions. There is no
  timed `revalidate` on the public pages.
- Once a manifest exists, the repo seed photos are **never** shown in its place. A manifest
  read error throws.
- Env vars: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, and `BLOB_READ_WRITE_TOKEN` (or
  `BLOB_STORE_ID`).
- Session cookie: `admin_session`, httpOnly, secure in production, sameSite `lax`, path
  `/admin`, 30-day lifetime.
- Upload limits: JPEG, PNG or WebP only, at most 4 MB after the browser resize. The browser
  resizes to a 1600 px long edge, JPEG quality 0.85.
- Name and country: trimmed, blank means absent, maximum 80 characters.
- Home page shows the first 8 stories (`HOME_STORY_LIMIT = 8`).
- The admin UI is English only and mobile-first, with `robots: noindex`. The public nav,
  floating CTA and footer are not rendered on `/admin`.
- Visitors never load raw Blob URLs directly. Every story image renders through
  `next/image`.
- Commit on branch `feature/success-stories-admin`. Never push.

## Review Focus

1. **Oversized or non-image upload** (a 15 MB photo, or a PDF picked by mistake): rejected
   with a clear message, and nothing is written to Blob. → Task 1, `validatePhoto` tests.
2. **Whitespace-only or very long name/country:** a blank becomes "no name", which falls
   back to "Successful Client #N", and long text is cut to 80 characters. → Task 1,
   `cleanField` tests.
3. **Stale admin page** (the other admin already deleted or moved the story): editing,
   moving or deleting a missing id gives "This story no longer exists — refresh the page",
   and the list is not corrupted. → Task 1, missing-id tests. Task 6 maps that error to the
   message.
4. **Expired, tampered or malformed cookie, or a missing secret:** treated as logged out,
   never as logged in. → Task 2, `verifySessionToken` tests.
5. **First-ever save:** the new manifest includes all 9 seed stories plus the change. →
   Task 1, `seedStories` test (9 items, stable ids). Task 6 runs a browser check after the
   first add.

---

### Task 1: Story list logic, seeds, test runner, docs commit

**Files:**
- Create: `lib/storyList.ts`, `lib/storyList.test.ts`, `lib/seedStories.ts`
- Modify: `package.json` (scripts), `tsconfig.json` (exclude)
- Commit also: `docs/superpowers/specs/...design.md`, `docs/superpowers/plans/...admin.md`,
  `package.json`/`package-lock.json` (the `@vercel/blob` install)

**Interfaces:**
- Produces, from `lib/storyList.ts` (no imports at all, so Node can run it directly):
  - `type Story = { id: string; src: string; name?: string; country?: string; createdAt: string }`
  - `const HOME_STORY_LIMIT = 8`
  - `const MAX_FIELD_LENGTH = 80`
  - `const MAX_PHOTO_BYTES = 4 * 1024 * 1024`
  - `const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"]`
  - `cleanField(value: unknown): string | undefined`
  - `parseStoryFilename(file: string): { name?: string; country?: string }`
  - `seedStories(files: string[]): Story[]`
  - `parseManifest(json: unknown): Story[]` (throws `Error("Invalid manifest")`)
  - `addStory(list: Story[], story: Story): Story[]` (prepends)
  - `updateStory(list: Story[], id: string, fields: { name?: unknown; country?: unknown }): Story[]`
  - `removeStory(list: Story[], id: string): { list: Story[]; removed: Story }`
  - `moveStory(list: Story[], id: string, direction: "up" | "down"): Story[]`
  - `class StoryNotFoundError extends Error`: thrown by the update, remove and move
    functions for an unknown id
  - `validatePhoto(file: { type: string; size: number }): string | null`: the error message,
    or null if OK
  - `blobPrefix(vercelEnv: string | undefined): string`
- Produces, from `lib/seedStories.ts`: `SEED_STORIES: Story[]`, built by calling
  `seedStories` on the 9 filenames currently in `public/passport/`. It imports with
  `import { seedStories, type Story } from "./storyList"`.

- [ ] **Step 1: Wire the test runner.** In `package.json` add the script
  `"test": "node --test \"lib/**/*.test.ts\""`. In `tsconfig.json` set
  `"exclude": ["node_modules", "**/*.test.ts"]`. Test files import `./storyList.ts` with
  the `.ts` extension, which Node needs and Next's type-check would reject.

- [ ] **Step 2: Write the failing tests** in `lib/storyList.test.ts`, using `node:test` and
  `node:assert/strict` and importing from `./storyList.ts`:
  - `cleanField`:
    - `"  Rahim  "` → `"Rahim"`
    - `"   "` → `undefined`
    - `undefined` → `undefined`
    - `123` → `undefined`
    - `"x".repeat(100)` gives length 80
  - `parseStoryFilename`:
    - `"Rahim Uddin - Poland.jpg"` → `{ name: "Rahim Uddin", country: "Poland" }`
    - `"WhatsApp Image 2026-09-22 at 17.37.53.jpeg"` → `{}`
  - `seedStories`, called with `["b.jpg", "a - Malta.png", "notes.txt"]`:
    - returns 2 items, `"a - Malta.png"` first (numeric locale sort)
    - `src === "/passport/a%20-%20Malta.png"` and `country === "Malta"`
    - ids are stable: calling it twice gives equal ids
    - `createdAt` is a fixed ISO string, not `Date.now`
  - `SEED_STORIES` (imported from `./seedStories.ts`): length 9, all ids unique
  - `parseManifest`:
    - accepts `[{ id: "a", src: "/x.jpg", createdAt: "2026-01-01T00:00:00.000Z", name: "N" }]`
    - drops unknown keys
    - throws on: `null`, `{}`, `[{ src: "/x" }]` (no id), `[{ id: "a" }]` (no src)
  - `addStory` puts the new story at index 0
  - `updateStory`:
    - with `{ name: "  ", country: "Italy " }` the name is cleared and the country becomes
      `"Italy"`
    - an unknown id throws `StoryNotFoundError`
  - `removeStory` returns `removed` and the list without it; an unknown id throws
    `StoryNotFoundError`
  - `moveStory`:
    - in `[a, b, c]`, moving `b` up gives `[b, a, c]`, and moving `b` down gives `[a, c, b]`
    - moving `a` up and moving `c` down leave the list unchanged
    - an unknown id throws `StoryNotFoundError`
  - Inputs are never mutated (`deepEqual` against a copy made before the call)
  - `validatePhoto`:
    - `{ type: "image/jpeg", size: 1000 }` → `null`
    - `{ type: "application/pdf", size: 1000 }` → a message containing "JPEG, PNG or WebP"
    - `{ type: "image/jpeg", size: 5_000_000 }` → a message containing "4 MB"
    - `size: 0` → a message
  - `blobPrefix`:
    - `"production"` → `"success-stories/production/"`
    - `"preview"` → `"success-stories/preview/"`
    - `undefined` → `"success-stories/development/"`
    - `"weird"` → `"success-stories/development/"`

- [ ] **Step 3: Run `npm test`.** Expected: FAIL, module not found.

- [ ] **Step 4: Implement `lib/storyList.ts` and `lib/seedStories.ts`** to the interfaces
  above.
  - **Seed id:** `seed-` plus the filename lowercased, with every run of characters outside
    `a-z0-9` replaced by `-`.
  - **Seed `createdAt`:** `"2026-09-22T00:00:00.000Z"`.
  - **`parseStoryFilename`:** move the logic over from `lib/passports.ts`.
  - **`SEED_STORY_FILES`:** the exact output of `ls public/passport`, in a typed array.

- [ ] **Step 5: Run `npm test`.** Expected: all tests pass.

- [ ] **Step 6: Commit.**
  `git add docs package.json package-lock.json tsconfig.json lib/storyList.ts lib/storyList.test.ts lib/seedStories.ts`,
  then commit with message `feat: story list logic, seeds and test runner (+ design & plan docs)`.

### Task 2: Admin session tokens

**Files:**
- Create: `lib/adminSession.ts`, `lib/adminSession.test.ts`

**Interfaces:**
- Produces, from `lib/adminSession.ts` (no imports; uses `globalThis.crypto.subtle`, so it
  runs in both Node and the Edge runtime):
  - `const SESSION_COOKIE = "admin_session"`
  - `const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000`
  - `createSessionToken(secret: string, nowMs: number): Promise<string>`. The format is
    `<expiryMs>.<base64url HMAC-SHA256 of String(expiryMs)>`.
  - `verifySessionToken(token: string | undefined, secret: string, nowMs: number): Promise<boolean>`
  - `passwordsMatch(input: string, expected: string, secret: string): Promise<boolean>`.
    It HMACs both strings and compares the digests in constant time, so the input length
    doesn't leak.

- [ ] **Step 1: Write the failing tests** in `lib/adminSession.test.ts`:
  - A token made at `now` verifies at `now + 1000`.
  - The same token fails at `now + SESSION_TTL_MS + 1`.
  - It fails when verified with a different secret.
  - It fails with one character of the signature changed.
  - It fails with the expiry changed (e.g. `"9999999999999" + token.slice(13)`).
  - It fails for `undefined`, `""`, `"abc"` and `"1.2.3"`.
  - It fails when `secret === ""`: both create and verify must refuse an empty secret.
    Verify returns false, create throws.
  - `passwordsMatch("pw", "pw", s)` is true. `("pw", "pW", s)`, `("", "pw", s)` and
    `("pw", "", s)` are all false.

- [ ] **Step 2: Run `npm test`.** Expected: the new tests fail.

- [ ] **Step 3: Implement `lib/adminSession.ts`.**

- [ ] **Step 4: Run `npm test`.** Expected: all tests pass.

- [ ] **Step 5: Commit** with message `feat: signed admin session tokens`.

### Task 3: Blob store and public pages read from it

**Files:**
- Create: `lib/storyStore.ts`
- Modify:
  - `next.config.mjs`
  - `app/page.tsx`, `app/success-stories/page.tsx`
  - `components/PageClient.tsx`, `components/SuccessfulClients.tsx`,
    `components/SuccessStoriesPageClient.tsx`
  - `components/PassportCard.tsx`, `components/PassportLightbox.tsx`
- Delete: `lib/passports.ts`

**Interfaces:**
- Consumes: Task 1 (`Story`, `parseManifest`, `blobPrefix`) and `SEED_STORIES`.
- Produces, from `lib/storyStore.ts` (starts with `import "server-only"` if that package is
  available, otherwise just a comment). These names are used by later tasks:
  - `isBlobConfigured(): boolean`: true when `BLOB_READ_WRITE_TOKEN` or `BLOB_STORE_ID` is
    set.
  - `getStories(): Promise<Story[]>`: the public read. If Blob is not configured, it
    returns `SEED_STORIES`. If there's no manifest, it returns `SEED_STORIES`. If a
    manifest exists, it returns that manifest's stories. Any error **throws**.
  - `loadStoriesForEdit(): Promise<{ stories: Story[]; manifestUrls: string[] }>`: the same
    rules, plus the URLs of every existing manifest (`[]` when seeded). It throws on error.
  - `saveStories(stories: Story[], previousManifestUrls: string[]): Promise<void>`.
    1. `put(\`${prefix}manifest.json\`, JSON.stringify(stories), { access: "public", addRandomSuffix: true, contentType: "application/json" })`.
       The random suffix makes the key `manifest-<random>.json`, so each save has a new URL.
    2. Then `del(previousManifestUrls)` if the list is non-empty. A failed `del` is logged,
       not thrown.
  - `uploadPhoto(id: string, data: Blob): Promise<string>`: puts the photo at
    `${prefix}photos/${id}.jpg` with `{ access: "public", addRandomSuffix: true,
    contentType: "image/jpeg" }` and returns the URL.
  - `deletePhoto(src: string): Promise<void>`: does nothing unless `src` starts with
    `https://` (seed photos are `/passport/...`). Errors are logged, not thrown.
  - `updateStories(mutate: (list: Story[]) => Story[]): Promise<Story[]>`: runs
    `loadStoriesForEdit`, then `mutate`, then `saveStories`, and returns the new list.
- **How the manifest is read:** `list({ prefix: prefix + "manifest" })`, pick the newest
  blob by `uploadedAt`, then `fetch(url)` with the default cache. Each manifest URL is
  unique, so caching it is correct, and this keeps the page static. Then `parseManifest`.
  The SDK uses undici directly, so `list()` is never cached by Next and doesn't make the
  page dynamic.
- **Page props:** `PageClient`, `SuccessfulClients` and `SuccessStoriesPageClient` take
  `stories: Story[]` instead of `passports: PassportItem[]`. `PassportCard` and
  `PassportLightbox` take `Story` / `Story[]`. Card React keys use `item.id`.

- [ ] **Step 1: Write `lib/storyStore.ts`** to the interfaces above. Check `npm ls
  server-only`; if it's missing, don't add it, and put a top comment saying the module is
  server-only instead.

- [ ] **Step 2: `next.config.mjs`.** Set
  `images.remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }]`
  and `experimental.serverActions.bodySizeLimit: "4mb"`.

- [ ] **Step 3: Pages.** Make `app/page.tsx` and `app/success-stories/page.tsx` `async`,
  and pass `stories={await getStories()}`. Don't add `revalidate` or `dynamic` exports.
  Delete `lib/passports.ts`, and update every import from it to `Story` from
  `@/lib/storyList`.

- [ ] **Step 4: `next/image`.**
  - **`PassportCard`:** replace the `<img>` with `<Image fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover …existing hover classes">`.
    Its parent `aspect-[3/4]` div is already `relative`.
  - **`PassportLightbox`:** replace the `motion.img` with a
    `motion.div key={item.id} className="relative h-[85vh] w-full max-w-3xl"` that has the
    same initial and animate values and stops click propagation. Inside it, put
    `<Image fill sizes="(min-width:768px) 768px, 100vw" className="object-contain rounded-xl" alt=… />`.
  - **`SuccessfulClients`:** import `HOME_STORY_LIMIT` from `@/lib/storyList` instead of
    its local constant.

- [ ] **Step 5: Verify.** Make sure no Blob or admin env vars are set in `.env.local`, then
  run `npm test && npm run lint && npm run build`.
  - Expected: everything passes.
  - The build output lists `/` and `/success-stories` as static (○), not dynamic (λ).

- [ ] **Step 6: Verify in the browser.** Run `npm run dev` and open `/success-stories`.
  - Expected: 9 cards; each image request goes through `/_next/image?url=%2Fpassport…`.
  - The lightbox opens, and arrows, Esc and the counter all work.

- [ ] **Step 7: Commit** with message `feat: read success stories from Vercel Blob with seed fallback`.

### Task 4: Success Stories directly after the hero, light treatment

**Files:**
- Modify: `components/PageClient.tsx`, `components/SuccessfulClients.tsx`

- [ ] **Step 1: Move the section.** In `PageClient`, move `<SuccessfulClients stories={stories} />`
  out of the plane-overlay block. Make it the first child inside
  `<div ref={lightSectionRef}>`, before `<PremiumPackages />`. This keeps the nav in light
  theme across it.

- [ ] **Step 2: Restyle `SuccessfulClients` for the light treatment.**
  - Section: `relative z-10 bg-luxury-cream py-16 md:py-24`, with no border.
  - Heading: `text-ink`.
  - Body: `text-neutral-600`.
  - Count pill: `border-black/10 bg-black/5 text-neutral-700`, number `text-ink`.
  - Placeholder tiles: `border-black/15 bg-black/[0.03] text-neutral-500`.
  - Keep the `brand-red` accents and the red "View all" button. Cards stay unchanged.

- [ ] **Step 3: Verify.** Run `npm run lint && npm run build`, then `npm run dev`.
  - Screenshot `/` with Playwright at 1440×900 and 390×844, scrolled to just past the hero.
  - Expected: the cream cloud fade flows into the cream Success Stories section, then into
    Premium Packages.
  - No dark band and no overlap. The nav is in its light theme over the section.
  - Cards are readable at both widths.

- [ ] **Step 4: Commit** with message `feat: show success stories right after the hero`.

### Task 5: Admin auth (login, middleware, logout, chrome)

**Files:**
- Create:
  - `lib/adminAuth.ts`, `middleware.ts`
  - `app/admin/layout.tsx`
  - `app/admin/login/page.tsx`, `app/admin/login/actions.ts`
  - `components/admin/LoginForm.tsx`
  - `components/PublicChrome.tsx`
  - `.env.example`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: Task 2 (everything in `lib/adminSession.ts`).
- Produces, from `lib/adminAuth.ts` (server only, uses `cookies()` from `next/headers`):
  - `isAdminConfigured(): boolean`: both `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` are
    non-empty.
  - `isAdmin(): Promise<boolean>`
  - `requireAdmin(): Promise<void>`: calls `redirect("/admin/login")` when the request is
    not an admin.
  - `startSession(): Promise<void>` and `endSession(): void`: set and clear the cookie,
    following the Global Constraints.
- Produces, from `app/admin/login/actions.ts`:
  `loginAction(prev: { error?: string }, formData: FormData): Promise<{ error?: string }>`.
  - Not configured → `{ error: "Admin is not configured yet." }`.
  - Wrong password → wait about 1000 ms, then return `{ error: "Wrong password." }`.
  - Correct password → `startSession()`, then `redirect("/admin")`.
- Produces: `logoutAction(): Promise<void>` (it lives in `app/admin/login/actions.ts` too)
  → `endSession()`, then `redirect("/admin/login")`.

- [ ] **Step 1: `middleware.ts`.** Use `matcher: ["/admin/:path*"]`.
  - Let `/admin/login` through.
  - Otherwise, check the `admin_session` cookie with
    `verifySessionToken(token, process.env.ADMIN_SESSION_SECRET ?? "", Date.now())`.
  - If that fails, redirect to `/admin/login`.

- [ ] **Step 2: Layout and login.**
  - **`app/admin/layout.tsx`:** exports `metadata = { title: "Admin | Ihan Tours", robots: { index: false, follow: false } }`
    and renders a plain `min-h-screen bg-neutral-950 text-white` wrapper.
  - **Login page:** a single password field (`autoComplete="current-password"`) and a red
    submit button, built with `useFormState`. It shows the error from the action. When
    `isAdminConfigured()` is false, it shows the setup steps from the spec's
    "One-time setup" instead of the form.

- [ ] **Step 3: `components/PublicChrome.tsx`.** A client component: if `usePathname()`
  starts with `/admin`, it returns `null`; otherwise it renders `<GlobalNav /><FloatingCTA />`.
  In `app/layout.tsx`, use it in place of those two.

- [ ] **Step 4: `.env.example`.** Add the three variables, each with a one-line comment.
  `ADMIN_SESSION_SECRET` gets a note on how to generate it: `openssl rand -hex 32`.

- [ ] **Step 5: Verify.** Run `npm run lint && npm run build`, then `npm run dev` with
  `.env.local` containing `ADMIN_PASSWORD=test-pass` and a random `ADMIN_SESSION_SECRET`.
  Then check, with Playwright:
  - `/admin` redirects to `/admin/login`.
  - A wrong password shows "Wrong password.".
  - The right password lands on `/admin`, which can be a stub page for now.
  - The `admin_session` cookie is HttpOnly.
  - Editing the cookie value, then reloading `/admin`, redirects to login.
  - Neither the public nav nor the floating CTA shows on `/admin`.
  - With `ADMIN_PASSWORD` removed, the login page shows "not configured".

- [ ] **Step 6: Commit** with message `feat: admin login with signed session cookie`.

### Task 6: Admin dashboard (add, edit, reorder, delete)

**Files:**
- Create:
  - `app/admin/page.tsx`, `app/admin/actions.ts`
  - `components/admin/AddStoryForm.tsx`, `components/admin/StoryList.tsx`
  - `lib/resizeImage.ts`

**Interfaces:**
- Consumes:
  - Task 1: `addStory`, `updateStory`, `removeStory`, `moveStory`, `validatePhoto`,
    `cleanField`, `StoryNotFoundError`, `HOME_STORY_LIMIT`
  - Task 3: `isBlobConfigured`, `loadStoriesForEdit`, `updateStories`, `uploadPhoto`,
    `deletePhoto`
  - Task 5: `requireAdmin`, `logoutAction`
- Produces, from `app/admin/actions.ts` (`"use server"`). Each action calls
  `requireAdmin()` first, and every one returns
  `type ActionResult = { ok: true } | { ok: false; error: string }`:
  - `addStoryAction(formData: FormData)`. The form fields are `photo` (File), `name` and
    `country`.
    1. Validate with `validatePhoto`.
    2. `id = crypto.randomUUID()`.
    3. `uploadPhoto`.
    4. `updateStories(l => addStory(l, {...}))`.
    5. If step 4 throws, `deletePhoto` the uploaded URL.
  - `updateStoryAction(id: string, name: string, country: string)`
  - `moveStoryAction(id: string, direction: "up" | "down")`
  - `deleteStoryAction(id: string)`: `updateStories` with `removeStory`, then
    `deletePhoto(removed.src)`.
  - After any success, `revalidatePath("/")`, `revalidatePath("/success-stories")` and
    `revalidatePath("/admin")`.
  - A `StoryNotFoundError` becomes
    `{ ok: false, error: "This story no longer exists — refresh the page." }`.
  - Any other error is logged and becomes
    `{ ok: false, error: "Could not save. Please try again." }`.
- Produces: `resizeImageFile(file: File, maxEdge = 1600, quality = 0.85): Promise<Blob>`.
  It uses `createImageBitmap(file)` and a canvas, then `toBlob("image/jpeg", quality)`.
  Images are never upscaled.

- [ ] **Step 1: `app/admin/page.tsx`.**
  - `export const dynamic = "force-dynamic"`, and `await requireAdmin()`.
  - Not `isBlobConfigured()` → show the spec's setup steps, plus the logout button.
  - Otherwise, wrap `loadStoriesForEdit()` in try/catch. On error, show "Couldn't load
    stories — saving is disabled until this loads. Refresh to try again." and render no
    forms.
  - On success, render `<AddStoryForm countries={unique sorted countries} />` and
    `<StoryList stories={stories} />`.
  - The header shows the story count and a Log out button (a form posting to
    `logoutAction`).

- [ ] **Step 2: `AddStoryForm` (client).**
  - Inputs: a photo `input type=file accept="image/*"` (required, with a preview
    thumbnail), then Name and Country text inputs (`maxLength=80`). Country uses a
    `<datalist>` filled from `countries`.
  - On submit, resize the photo with `resizeImageFile`, put the result in `FormData` as
    `photo` (`story.jpg`, `image/jpeg`), and call `addStoryAction` inside `useTransition`.
    The button reads "Uploading…" while pending.
  - On success, clear the form and show "Story added — it's live on the site."
  - On error, show `result.error` in red.

- [ ] **Step 3: `StoryList` (client).**
  - One row per story: a thumbnail (`next/image`, 64×85, `object-cover`), its position
    number, Name and Country inputs, and Save (enabled only when something changed), ↑, ↓
    and Delete buttons.
  - ↑ is disabled on the first row and ↓ on the last.
  - Delete asks `confirm("Delete this story? This can't be undone.")`.
  - After row #8 (`HOME_STORY_LIMIT`), a divider reads "Stories below this line show only
    on the Success Stories page".
  - One `useTransition` controls the whole list; all buttons are disabled while it's
    pending. There's a single status line for success and error messages.
  - Layout is mobile-first: rows stack on narrow screens.

- [ ] **Step 4: Verify (static checks).** Run `npm test && npm run lint && npm run build`.
  Expected: all pass, and `/` and `/success-stories` are still static.

- [ ] **Step 5: Verify (no Blob).** Run `npm run dev` without a Blob token and log in.
  Expected: `/admin` shows the setup steps; the public pages show 9 stories.

- [ ] **Step 6: Verify (with Blob, development prefix).** This needs a real token in
  `.env.local`; ask the developer if it's not there. With Playwright:
  1. Add a story with a photo larger than 1600 px. Expected: the new manifest has 10
     stories, the new one first.
  2. Expected: the Blob photo is ≤ 1600 px wide and under 1 MB.
  3. Expected: `/` shows the new story first, and `/success-stories` shows 10.
  4. Edit its name. Expected: the change shows on `/`.
  5. Move it down. Expected: the order changes on `/`.
  6. Delete it. Expected: it's gone from `/`, and Blob no longer has its photo or the old
     manifests.
  7. Try uploading a `.pdf` by changing the accept filter in devtools. Expected: the
     JPEG/PNG/WebP error, and no Blob write.
  8. Two tabs: delete in tab A, then Save in tab B on the same row. Expected: the
     "no longer exists" message.
  9. At 390 px width, the admin is usable without horizontal scroll.

- [ ] **Step 7: Commit** with message `feat: success stories admin dashboard`.

### Task 7: Final check

- [ ] **Step 1:** Run `npm test && npm run lint && npm run build`. Expected: all pass.
- [ ] **Step 2:** Run `git status`. Expected: clean, and `.env.local` is not tracked.
- [ ] **Step 3:** Request a whole-branch code review (superpowers:requesting-code-review)
  and fix what it confirms.
