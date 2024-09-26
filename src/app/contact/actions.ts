"use server";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { headers } from "next/headers";

export type SendContactFormState = {
  success: number;
  error?: string;
};

export async function sendContactForm(
  prevState: SendContactFormState,
  formData: FormData
): Promise<SendContactFormState> {
  try {
    const rawFormData = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      message: formData.get("message"),
      createdAt: Date.now(),
    };

    if (prevState.success >= 3) {
      throw new Error("Too many submissions.");
    }

    if (typeof rawFormData.email !== "string") {
      throw new Error("Email is invalid.");
    }

    await verifyTurnstile(formData.get("cf-turnstile-response"));

    const myKv = getRequestContext().env.CONTACT;

    await myKv.put(
      rawFormData.email + rawFormData.createdAt,
      JSON.stringify(rawFormData)
    );

    return { success: prevState.success + 1, error: undefined };
  } catch (e) {
    if (e instanceof Error) {
      return { ...prevState, error: e.message };
    }
    return { ...prevState, error: "An unknown error has occurred, try again." };
  }
}

async function verifyTurnstile(cfTurnstileResponse: FormDataEntryValue | null) {
  if (!cfTurnstileResponse) {
    throw new Error("Turnstile is missing.");
  }
  const ip = headers().get("X-Forwarded-For");

  if (!ip) {
    throw new Error("Can’t verify ip.");
  }

  if (!process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY) {
    throw new Error("Turnstile not configured.");
  }

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
      throw Error("Failed to verify Turnstile.");
    }
  } catch {
    throw Error("Failed to verify Turnstile.");
  }
}
