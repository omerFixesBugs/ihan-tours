import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, sessionKey, verifySessionToken } from "@/lib/adminSession";

/** Keeps everything under /admin (except the login page) behind the admin session. */
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();

  const valid = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
    sessionKey(process.env.ADMIN_SESSION_SECRET, process.env.ADMIN_PASSWORD),
    Date.now()
  );
  if (valid) return NextResponse.next();

  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
