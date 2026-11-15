# Success Stories Admin — Design

Date: 2026-11-15

## Why

Ihan Tours (the client) keeps sending the developer new visa-success photos to put on the
site. Today that means adding image files to `public/passport/` and redeploying. The
developer and the client both want to manage these stories themselves, from a browser,
without a redeploy.

Success stories are the site's strongest trust signal, but on the home page they sit 7th
(after the hero, packages, tour showcase, fly-anywhere, globe and stats). Visitors should
see them right after the hero.

## Goals

1. A password-protected `/admin` where an admin can:
   - add a story: upload a photo, with an optional client name and country
   - edit a story's name and country
   - delete a story
   - reorder stories (the first 8 appear on the home page)
2. Changes appear on `/` and `/success-stories` within seconds, with no redeploy.
3. The Success Stories section moves to directly after the hero on the home page.
4. Storage is free: Vercel Blob on the Hobby tier, configured from the same Vercel dashboard.

## Non-goals

- Individual user accounts, roles, or an audit log. There are two admins (developer and
  client) who share one password.
- Managing any other content (packages, testimonials, destinations, etc.).
- A Bengali admin UI, or Bengali translations of names and countries. Names and countries
  are shown as typed, in both languages, as they are today.
- A "visa type" field. Cards keep saying "Work Visa".

## Anti-goals (failure even if it "works")

- Anyone without the password can reach admin data or upload files.
- The home page gets slower: no Blob calls per visitor request, and no multi-MB photos.
- The existing 9 stories disappear, or the site breaks when Blob isn't configured
  (local dev, preview deploys).

## Constraints

- Hosted on Vercel, where the filesystem is read-only at runtime, so uploads must go to
  external storage (Vercel Blob).
- Vercel functions accept at most a 4.5 MB request body, and phone photos can be larger.
  Next 14 server actions also default to a 1 MB body limit.
- Stack: Next.js 14.2 App Router, React 18, Tailwind, TypeScript. No database, no test
  framework.
- Vercel Blob Hobby tier: about 10 GB of data transfer and 2,000 "advanced operations"
  (`put`, `list`, ...) a month. Going over **locks Blob for up to 30 days** rather than
  billing. So visitors must never download photos straight from Blob URLs, and `list()`
  must run only when an admin changes something, never on a timer or per visit.
- Vercel's Hobby plan is for non-commercial use only. Whether this client site belongs on
  Pro is the owner's decision; nothing in this design depends on the plan.
- Existing UI to reuse: `PassportCard`, `PassportLightbox`, `SuccessfulClients`,
  `SuccessStoriesPageClient`, and the `PassportItem` type in `lib/passports.ts`.

## Approaches considered

| | Approach | Trade-off |
|---|---|---|
| **A (picked)** | Photos and a JSON story list stored in **Vercel Blob**. A custom `/admin` page inside this app. | Instant updates, everything stays in Vercel and this repo. Needs a new package (`@vercel/blob`) and a one-time Blob store setup. |
| B | The admin page commits each photo to GitHub through the API, and Vercel redeploys. | No new storage, and git history records every change. But each upload is a full rebuild (slow here because of the large image sequences), it needs a GitHub token on the server, and the repo keeps growing. |
| C | A hosted CMS (Sanity, Contentful). | A polished editor with no admin to build. But it means another account and another tool for the client to learn, which is too much for one photo gallery. |

The user picked A: "use any free version for storage".

## Design

### Data

```ts
type Story = {
  id: string;          // random id
  src: string;         // public image URL (Blob URL, or /passport/... for seeded ones)
  name?: string;
  country?: string;
  createdAt: string;   // ISO
};
```

- The display order is the array order. New stories go to the top.
- **Environment prefix (developer's call):** every Blob key starts with
  `success-stories/<env>/`, where `<env>` is `VERCEL_ENV` (`production`, `preview`), or
  `development` locally. Production data is only ever touched by production. Preview
  deploys and local dev each get their own copy, seeded from the repo, so the admin can be
  tested anywhere without changing the live site.
- **Photos:** stored in Blob at `success-stories/<env>/photos/<id>.jpg` with public access.
  They are already public on the site today.
- **Story list (manifest):** stored in Blob as `success-stories/<env>/manifest-<random>.json`.
  Each save writes a *new* manifest file with a new URL (this avoids Blob's CDN serving a
  stale cached copy), then deletes the older manifests, except the one it just read, which
  stays as a one-step backup. To read: `list({ prefix: "success-stories/<env>/manifest" })`,
  take the newest by `uploadedAt`, and fetch it with Next's default fetch caching. That's safe
  because a manifest URL is never rewritten, and `cache: "no-store"` would make the home page
  dynamic.
- **Seeding (no migration step):** if Blob has no manifest yet, or Blob isn't configured,
  the site shows the 9 photos in `public/passport/`. They come from a fixed list of those
  filenames in code (`lib/seedStories.ts`), parsed with the same "Name - Country.jpg" rule.
  It's a list rather than a folder scan because on Vercel a server action can't reliably
  read `public/` at runtime, and a failed scan would make the first save drop all 9. The first admin save writes a manifest that includes these seeded
  entries, with their `src` kept as `/passport/...`. Deleting a seeded story removes it from
  the manifest only; the file stays in the repo and is still reachable at its URL. If a
  client asks to be taken down completely, the developer also deletes the file from
  `public/passport/`. Deleting an uploaded story deletes its Blob photo.
- If two admins save at the same moment, the last write wins. This is acceptable with
  two admins.

### Reading stories on the site

- The home page and `/success-stories` stay static and fast. Their server components call
  a single `getStories()` (it replaces `getPassportImages()`) at build time and on
  revalidation.
- After each admin change, the server action calls `revalidatePath("/")` and
  `revalidatePath("/success-stories")`, so the pages update within seconds. There's no
  timed revalidation; pages change only on build or admin save. This keeps `list()` calls
  to roughly one per admin action.
- **Fallback rule (developer's call; it protects deleted passport photos from coming back):**
  - **Blob not configured, or configured with no manifest yet:** use the `public/passport/`
    stories.
  - **A manifest exists but reading it fails:** `getStories()` throws. During a
    revalidation, Next keeps serving the last good page. During a build, the build fails
    rather than publishing a wrong list.
  - The repo photos are **never** shown in place of a real manifest.
  - The admin page never falls back on a read error either. It shows the error and blocks
    saving, so a save can't overwrite the real list with the seed list.
- **Images go through Vercel's image CDN, not raw Blob URLs.** Cards and the lightbox use
  `next/image`, with the Blob host in `images.remotePatterns`. Visitors get resized,
  CDN-cached images (small for cards, larger in the lightbox). Blob is read only on a cache
  miss, which keeps Blob transfer near zero, makes the home page lighter, and also applies
  to the 9 repo photos.

### Auth

- Env vars: `ADMIN_PASSWORD` (shared by both admins) and `ADMIN_SESSION_SECRET` (a long
  random string).
- `/admin/login` has a password form. A server action compares the password in constant
  time and, on success, sets an `admin_session` cookie: httpOnly, secure, sameSite=lax,
  30-day expiry. The cookie value is `<expiry>.<HMAC-SHA256(expiry, secret)>`.
- `middleware.ts` matches `/admin/:path*` except `/admin/login`. It verifies the cookie with
  Web Crypto and redirects to the login page if the check fails.
- **Every** admin server action verifies the session itself as well, and does not rely on
  the middleware.
- A wrong password gets a ~1 s delay to slow down guessing.
- A logout button clears the cookie.
- If the env vars are missing, the admin shows a clear "admin not configured" message
  rather than allowing access.

### Admin UI (`/admin`)

- English only, plain, and **mobile-first**: the client gets these photos on WhatsApp and
  will likely add them from a phone.
- **Add story:** a photo picker (opens the camera roll on a phone), Name (optional), Country
  (optional, suggesting countries already used), then Save. Before upload, the browser
  resizes the photo to at most 1600 px on the long edge and re-encodes it as JPEG (~0.85),
  keeping it well under the body limit and keeping the site fast. Set
  `experimental.serverActions.bodySizeLimit` to `"4mb"` as headroom.
- **Story list:** thumbnails in display order. Each has inline-editable name and country,
  up/down move buttons, and delete (with confirmation). A note says "The first 8 appear on
  the home page", with a visual divider after #8.
- Clear success and error messages. When Blob isn't configured, the page says so and shows
  the setup steps instead of the forms.
- The admin pages are excluded from search engines (`robots: noindex`) and don't render
  the public nav or footer.

### Home page placement

- `SuccessfulClients` moves from after `TrustStats` to directly after `HeroScroll`.
- The hero ends with a cloud fade into `luxury-cream` that was designed to blend into the
  light Premium Packages section. So in its new spot the section gets a **light treatment**:
  cream background, dark heading and body text, with the brand-red accents kept. It goes
  inside the existing `lightSectionRef` wrapper so the nav switches to its light theme
  there.
- The cards themselves don't change, since they are photos with their own dark overlay.
- The `/success-stories` page keeps its current dark styling.

### One-time setup (developer, in Vercel)

1. Vercel dashboard → Storage → Create **Blob** store (public access) → connect it to this
   project for Production, Preview **and Development**, and tick the option to add
   `BLOB_READ_WRITE_TOKEN`. The code reads that token; the environment prefix keeps the
   environments' data apart.
2. Add `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` env vars (all environments).
3. Redeploy.
4. For local dev: `vercel env pull .env.local`, or put the three variables in `.env.local`
   by hand.

## Left to the builder

- Component and file structure inside `app/admin/` and `lib/`.
- Server actions or route handlers, whichever fits each operation.
- Exact styling of the admin UI, within "plain, mobile-first, matches site colors".
- Wording of messages.

## How we'll know it works

There is no test framework, so verification is:

- `npm run build` and `npm run lint` pass.
- Run the app and drive it in a browser:
  - logged out, `/admin` redirects to login, and a wrong password is rejected
  - log in, add a story, edit it, reorder it, delete it
  - `/` and `/success-stories` reflect each change
  - the home page shows Success Stories right after the hero, in the light treatment, on
    desktop and on mobile width
- With no Blob token, the site still shows the 9 existing stories and `/admin` shows the
  setup message.
- All admin testing happens locally, under the `development` prefix, or on a preview
  deploy. It never touches production data.
- Production smoke test after deploy: log in, then log out. No data changes.
