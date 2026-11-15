import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createSessionToken,
  MIN_PASSWORD_LENGTH,
  passwordLongEnough,
  sessionKey,
  passwordsMatch,
  SESSION_TTL_MS,
  verifySessionToken,
} from "./adminSession.ts";

const SECRET = "test-secret-0123456789";
const NOW = 1_800_000_000_000;

test("a fresh token verifies before it expires", async () => {
  const token = await createSessionToken(SECRET, NOW);
  assert.equal(await verifySessionToken(token, SECRET, NOW + 1000), true);
});

test("a token fails after its 30-day lifetime", async () => {
  const token = await createSessionToken(SECRET, NOW);
  assert.equal(await verifySessionToken(token, SECRET, NOW + SESSION_TTL_MS + 1), false);
});

test("a token fails with a different secret", async () => {
  const token = await createSessionToken(SECRET, NOW);
  assert.equal(await verifySessionToken(token, "other-secret", NOW + 1000), false);
});

test("a token fails when its signature is altered", async () => {
  const token = await createSessionToken(SECRET, NOW);
  const last = token.at(-1) === "A" ? "B" : "A";
  assert.equal(await verifySessionToken(token.slice(0, -1) + last, SECRET, NOW + 1000), false);
});

test("a token fails when its expiry is altered", async () => {
  const token = await createSessionToken(SECRET, NOW);
  const forged = "9999999999999" + token.slice(token.indexOf("."));
  assert.equal(await verifySessionToken(forged, SECRET, NOW + 1000), false);
});

test("malformed tokens fail", async () => {
  for (const bad of [undefined, "", "abc", "1.2.3"]) {
    assert.equal(await verifySessionToken(bad, SECRET, NOW), false, String(bad));
  }
});

test("an empty secret never creates or verifies a session", async () => {
  const token = await createSessionToken(SECRET, NOW);
  assert.equal(await verifySessionToken(token, "", NOW + 1000), false);
  await assert.rejects(() => createSessionToken("", NOW));
});

test("passwordsMatch only for identical non-empty passwords", async () => {
  assert.equal(await passwordsMatch("pw", "pw", SECRET), true);
  assert.equal(await passwordsMatch("pw", "pW", SECRET), false);
  assert.equal(await passwordsMatch("", "pw", SECRET), false);
  assert.equal(await passwordsMatch("pw", "", SECRET), false);
});

test("passwordLongEnough requires at least 12 characters", () => {
  assert.equal(MIN_PASSWORD_LENGTH, 12);
  assert.equal(passwordLongEnough("a".repeat(12)), true);
  assert.equal(passwordLongEnough("a".repeat(11)), false);
  assert.equal(passwordLongEnough(""), false);
  assert.equal(passwordLongEnough(undefined), false);
});

test("sessionKey changes when the password changes, so old sessions stop working", async () => {
  const key = sessionKey(SECRET, "first-password-123");
  const token = await createSessionToken(key, NOW);
  assert.equal(await verifySessionToken(token, sessionKey(SECRET, "first-password-123"), NOW + 1000), true);
  assert.equal(await verifySessionToken(token, sessionKey(SECRET, "second-password-456"), NOW + 1000), false);
});

test("sessionKey is empty when the secret or password is missing", () => {
  assert.equal(sessionKey("", "first-password-123"), "");
  assert.equal(sessionKey(SECRET, ""), "");
  assert.equal(sessionKey(undefined, undefined), "");
});
