import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type FormState = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    turnstile: { reset: (selector: string) => void };
  }
}

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json<{ ok: boolean; error?: string }>();

      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Submission failed.");
      }

      setState("success");
      formRef.current?.reset();
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "An error occurred, please try again.");
      window.turnstile?.reset(".cf-turnstile");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950 p-8 text-center">
        <svg className="h-10 w-10 text-teal-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-base font-medium text-teal-800 dark:text-teal-200">Message sent — I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            First name
          </label>
          <input
            id="first-name"
            name="first-name"
            type="text"
            autoComplete="given-name"
            required
            className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Last name
          </label>
          <input
            id="last-name"
            name="last-name"
            type="text"
            autoComplete="family-name"
            className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors resize-none"
        />
      </div>

      <div>
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAAkefG8I1oCOwV3T"
          data-size="flexible"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className={clsx(
          "w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors",
          state === "submitting"
            ? "bg-teal-400 dark:bg-teal-700 text-white cursor-not-allowed"
            : "bg-teal-600 text-white hover:bg-teal-500"
        )}
      >
        {state === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
