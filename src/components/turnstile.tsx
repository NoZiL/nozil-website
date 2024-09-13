import { headers } from "next/headers";
import Script from "next/script";

export function Turnstile() {
  "use client";
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></Script>
      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-callback="javascriptCallback"
      ></div>
    </>
  );
}

export async function verifyTurnstile(
  cfTurnstileResponse: FormDataEntryValue | null
) {
  "use server";
  if (!cfTurnstileResponse) {
    console.log(cfTurnstileResponse);

    throw new Error("no cfTurnstileResponse");
  }
  const ip = headers().get("CF-Connecting-IP") || "82.64.96.232";

  if (!ip) {
    throw new Error("ip is missing");
  }

  if (!process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY)
    throw new Error("missing secret key");

  const formData = new FormData();
  formData.append("secret", process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY);
  formData.append("response", cfTurnstileResponse);
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  try {
    const result = await fetch(url, {
      body: formData,
      method: "POST",
    });

    const outcome = await result.json<{ success: boolean }>();

    if (!outcome.success) {
      throw Error("Turnstile failed");
    }
  } catch (err) {
    throw Error("Request failed");
  }
}
