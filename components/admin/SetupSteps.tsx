/** One-time Vercel setup instructions, shown when admin or Blob env vars are missing. */
export default function SetupSteps({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm leading-relaxed text-amber-100">
      <p className="mb-3 font-semibold text-amber-200">{title}</p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Vercel dashboard → Storage → Create a <strong>Blob</strong> store (public access) and
          connect it to this project for Production, Preview and Development, with the option
          that adds <code>BLOB_READ_WRITE_TOKEN</code> ticked.
        </li>
        <li>
          Project → Settings → Environment Variables: add <code>ADMIN_PASSWORD</code> (at least
          12 characters; changing it logs everyone out) and <code>ADMIN_SESSION_SECRET</code> (a
          long random string) for all environments.
        </li>
        <li>Redeploy.</li>
        <li>
          Local development: run <code>vercel env pull .env.local</code>.
        </li>
      </ol>
    </div>
  );
}
