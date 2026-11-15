/**
 * Signed admin session tokens and password comparison.
 * No imports: uses Web Crypto, so it runs in Node, the Edge runtime
 * (middleware) and directly under `node --test`.
 *
 * Token format: `<expiryMs>.<base64url HMAC-SHA256(String(expiryMs), secret)>`
 */

export const SESSION_COOKIE = "admin_session";
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
/** There is no rate limiter (no extra storage service), so the password itself must resist guessing. */
export const MIN_PASSWORD_LENGTH = 12;

export function passwordLongEnough(password: string | undefined): boolean {
  return (password ?? "").length >= MIN_PASSWORD_LENGTH;
}

/**
 * The key sessions are signed with. It includes the admin password, so changing
 * ADMIN_PASSWORD (or ADMIN_SESSION_SECRET) logs out every existing session.
 */
export function sessionKey(secret: string | undefined, password: string | undefined): string {
  if (!secret || !password) return "";
  return `${secret}\u0000${password}`;
}

const encoder = new TextEncoder();

async function hmac(message: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(message)));
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function createSessionToken(secret: string, nowMs: number): Promise<string> {
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const expiry = String(nowMs + SESSION_TTL_MS);
  return `${expiry}.${toBase64Url(await hmac(expiry, secret))}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
  nowMs: number
): Promise<boolean> {
  if (!secret || !token) return false;
  const match = /^(\d{1,16})\.([A-Za-z0-9_-]+)$/.exec(token);
  if (!match) return false;
  const [, expiry, signature] = match;
  if (Number(expiry) <= nowMs) return false;
  const expected = toBase64Url(await hmac(expiry, secret));
  return constantTimeEqual(encoder.encode(signature), encoder.encode(expected));
}

/** Compares HMAC digests of both strings so neither content nor length leaks through timing. */
export async function passwordsMatch(
  input: string,
  expected: string,
  secret: string
): Promise<boolean> {
  if (!input || !expected) return false;
  const [a, b] = await Promise.all([hmac(input, secret), hmac(expected, secret)]);
  return constantTimeEqual(a, b);
}
