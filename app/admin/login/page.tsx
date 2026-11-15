import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";
import SetupSteps from "@/components/admin/SetupSteps";
import { isAdmin, isAdminConfigured } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  // No automatic redirect to /admin here: if this page and the middleware ever disagreed
  // about the session (e.g. env vars changed mid-run), they would bounce the browser forever.
  const loggedIn = await isAdmin();

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-12">
      <h1 className="mb-1 text-2xl font-semibold">Ihan Tours admin</h1>
      <p className="mb-8 text-sm text-neutral-400">Manage success stories.</p>
      {!isAdminConfigured() ? (
        <SetupSteps title="Admin is not configured yet." />
      ) : loggedIn ? (
        <Link
          href="/admin"
          className="block w-full rounded-lg bg-brand-red px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-redDark"
        >
          You&apos;re logged in. Go to the dashboard
        </Link>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
