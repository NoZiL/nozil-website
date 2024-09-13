import { SubmitOnce } from "@/components/form";
import { SimpleLayout } from "@/components/simple-layout";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let’s meet.",
};

export default function ContactPage() {
  async function handleContact(formData: FormData) {
    "use server";

    const rawFormData = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    if (!rawFormData.email) {
      return;
    }

    const myKv = getRequestContext().env.CONTACT;
    if (typeof rawFormData.email === "string") {
      await myKv.put(rawFormData.email, JSON.stringify(rawFormData));
    }
    // try {
    //   await verifyTurnstile(formData.get("cf-turnstile-response"));
    //   console.log("wesh", rawFormData);
    //   redirect("/contact?success=true");
    // } catch (err) {
    //   console.error(err);

    //   redirect("/contact?error=true");
    // }
  }

  return (
    <SimpleLayout title="Let’s meet" intro="">
      <form action={handleContact} className="px-6 lg:px-8">
        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          <Field className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
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
            </div>
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
          </Field>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* <Turnstile /> */}
            <SubmitOnce
              title="Send message"
              titlePending="Sending..."
              titleSubmitted="Message sent"
            />
          </div>
        </div>
      </form>
    </SimpleLayout>
  );
}
