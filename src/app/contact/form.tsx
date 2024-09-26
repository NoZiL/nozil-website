"use client";

import { Button } from "@/components/button";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";
import Script from "next/script";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { sendContactForm, SendContactFormState } from "./actions";

const turnstileClass = "cf-turnstile";

const initialState: SendContactFormState = {
  success: 0,
};

export function ContactForm() {
  const [{ success, error }, formAction] = useFormState(
    sendContactForm,
    initialState
  );

  return (
    <form action={formAction} className="px-6 lg:px-8">
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <Field>
            <Label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6  text-zinc-600 dark:text-zinc-400"
            >
              First name
            </Label>
            <div className="mt-2.5">
              <Input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              />
            </div>
          </Field>
          <Field>
            <Label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400"
            >
              Last name
            </Label>
            <div className="mt-2.5">
              <Input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              />
            </div>
          </Field>
          <Field className="sm:col-span-2">
            <Label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400"
            >
              Email
            </Label>
            <div className="mt-2.5">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              />
            </div>
          </Field>
          <Field className="sm:col-span-2">
            <Label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400"
            >
              Message
            </Label>
            <div className="mt-2.5">
              <Textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-zinc-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </Field>
          <div className="sm:col-span-2">
            <Turnstile />
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-end items-center gap-4">
          {(success ?? 0) > 0 && (
            <p className="text-base text-zinc-600 dark:text-zinc-400 mr-auto">
              Message sent successfully{success > 1 && ` (${success})`}
            </p>
          )}
          <Submit />
        </div>

        {error && (
          <p className="text-base text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (pending) {
      // @ts-ignore
      window.turnstile.reset(".cf-turnstile");
    }
  }, [pending]);

  return (
    <Button
      variant="primary"
      type="submit"
      disabled={pending}
      className={clsx(
        "rounded-md bg-teal-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:pointer-events-none select-none"
      )}
    >
      {pending ? "Sending..." : "Send message"}
    </Button>
  );
}

function Turnstile() {
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></Script>
      <div
        className={turnstileClass}
        data-sitekey="0x4AAAAAAAkefG8I1oCOwV3T"
        data-size="flexible"
        data-callback="javascriptCallback"
      ></div>
    </>
  );
}
