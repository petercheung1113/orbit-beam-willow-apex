import { createHash } from "node:crypto";
import { generateVAPIDKeys, sendNotification, setVapidDetails, WebPushError } from "web-push";
import { getSql } from "@/lib/db";

type Keys = { publicKey: string; privateKey: string };

async function vapidKeys(): Promise<Keys> {
  const sql = await getSql();
  const rows = await sql<{ value: string }>`SELECT value FROM app_secrets WHERE key = 'vapid'`;
  if (rows[0]?.value) return JSON.parse(rows[0].value) as Keys;
  const made = generateVAPIDKeys();
  const value = JSON.stringify(made);
  await sql`INSERT INTO app_secrets (key, value) VALUES ('vapid', ${value}) ON CONFLICT (key) DO NOTHING`;
  const again = await sql<{ value: string }>`SELECT value FROM app_secrets WHERE key = 'vapid'`;
  return JSON.parse(again[0]?.value || value) as Keys;
}

export async function pushPublicKey(): Promise<string> {
  const keys = await vapidKeys();
  return keys.publicKey;
}

async function accountFor(token: string): Promise<string | null> {
  if (!/^[a-f0-9]{48}$/.test(token)) return null;
  const sql = await getSql();
  const rows = await sql<{ account: string }>`
    SELECT account FROM chat_sessions WHERE token = ${token} AND expires_at > now()
  `;
  return rows[0]?.account ?? null;
}

export async function savePushSubscription(
  token: string,
  endpoint: string,
  p256dh: string,
  auth: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const account = await accountFor(token);
  if (!account) return { ok: false, error: "expired" };
  if (!endpoint.startsWith("https://") || !p256dh || !auth) return { ok: false, error: "通知暫時開唔到。" };
  const id = createHash("sha256").update(endpoint).digest("hex").slice(0, 32);
  const sql = await getSql();
  await sql`
    INSERT INTO chat_push (id, account, endpoint, p256dh, auth)
    VALUES (${id}, ${account}, ${endpoint}, ${p256dh}, ${auth})
    ON CONFLICT (endpoint) DO UPDATE SET account = ${account}, p256dh = ${p256dh}, auth = ${auth}
  `;
  return { ok: true };
}

export async function pushInvite(accounts: string[], title: string, body: string, tag: string): Promise<void> {
  const list = [...new Set(accounts.filter(Boolean))];
  if (!list.length) return;
  const keys = await vapidKeys();
  setVapidDetails("mailto:park@example.com", keys.publicKey, keys.privateKey);
  const sql = await getSql();
  const payload = JSON.stringify({ title, body, tag, url: "/" });
  for (const account of list) {
    const rows = await sql<{ id: string; endpoint: string; p256dh: string; auth: string }>`
      SELECT id, endpoint, p256dh, auth FROM chat_push WHERE account = ${account}
    `;
    for (const row of rows) {
      try {
        await sendNotification({ endpoint: row.endpoint, keys: { p256dh: row.p256dh, auth: row.auth } }, payload);
      } catch (error) {
        const status = error instanceof WebPushError ? error.statusCode : 0;
        if (status === 404 || status === 410) await sql`DELETE FROM chat_push WHERE id = ${row.id}`;
      }
    }
  }
}
