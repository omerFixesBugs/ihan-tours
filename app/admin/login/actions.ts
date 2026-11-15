"use server";

import { redirect } from "next/navigation";
import { passwordsMatch } from "@/lib/adminSession";
import { endSession, isAdminConfigured, startSession } from "@/lib/adminAuth";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) return { error: "Admin is not configured yet." };

  const password = formData.get("password");
  const ok =
    typeof password === "string" &&
    (await passwordsMatch(
      password,
      process.env.ADMIN_PASSWORD ?? "",
      process.env.ADMIN_SESSION_SECRET ?? ""
    ));

  if (!ok) {
    // Slow down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: "Wrong password." };
  }

  await startSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  endSession();
  redirect("/admin/login");
}
