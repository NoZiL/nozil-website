export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.formData();

    const firstName = data.get("first-name");
    const lastName = data.get("last-name");
    const email = data.get("email");
    const message = data.get("message");
    const turnstileToken = data.get("cf-turnstile-response");

    if (typeof email !== "string" || !email) {
      return json({ ok: false, error: "Email is required." }, 400);
    }
    if (typeof message !== "string" || !message) {
      return json({ ok: false, error: "Message is required." }, 400);
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? request.headers.get("X-Forwarded-For");
    await verifyTurnstile(turnstileToken, ip, (locals.runtime as any).env.TURNSTILE_SECRET_KEY);

    const kv: KVNamespace = (locals.runtime as any).env.CONTACT;
    await kv.put(
      `${email}:${Date.now()}`,
      JSON.stringify({ firstName, lastName, email, message, createdAt: Date.now() })
    );

    return json({ ok: true }, 200);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error.";
    return json({ ok: false, error: msg }, 500);
  }
};

async function verifyTurnstile(
  token: FormDataEntryValue | null,
  ip: string | null,
  secret: string | undefined
) {
  if (!token) throw new Error("Turnstile token missing.");
  if (!secret) throw new Error("Turnstile not configured.");

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const outcome = await res.json<{ success: boolean }>();
  if (!outcome.success) throw new Error("Turnstile verification failed.");
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
