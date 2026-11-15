import { requireAdmin } from "@/lib/adminAuth";
import { logoutAction } from "@/app/admin/login/actions";

export const dynamic = "force-dynamic";

// Placeholder until the dashboard lands (Task 6).
export default async function AdminPage() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Success stories</h1>
      <form action={logoutAction}>
        <button type="submit" className="mt-4 text-sm text-neutral-400 underline">
          Log out
        </button>
      </form>
    </div>
  );
}
