import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import SetupSteps from "@/components/admin/SetupSteps";
import { isAdmin, isAdminConfigured } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-12">
      <h1 className="mb-1 text-2xl font-semibold">Ihan Tours admin</h1>
      <p className="mb-8 text-sm text-neutral-400">Manage success stories.</p>
      {isAdminConfigured() ? (
        <LoginForm />
      ) : (
        <SetupSteps title="Admin is not configured yet." />
      )}
    </div>
  );
}
