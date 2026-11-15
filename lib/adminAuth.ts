// Server-only: reads and writes the admin session cookie.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  createSessionToken,
  verifySessionToken,
} from "@/lib/adminSession";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/admin",
};

const sessionSecret = () => process.env.ADMIN_SESSION_SECRET ?? "";

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export async function isAdmin(): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  return verifySessionToken(cookies().get(SESSION_COOKIE)?.value, sessionSecret(), Date.now());
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function startSession(): Promise<void> {
  const token = await createSessionToken(sessionSecret(), Date.now());
  cookies().set(SESSION_COOKIE, token, { ...COOKIE_OPTIONS, maxAge: SESSION_TTL_MS / 1000 });
}

export function endSession(): void {
  cookies().set(SESSION_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
}
