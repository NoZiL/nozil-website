import { SimpleLayout } from "@/components/simple-layout";
import { Metadata } from "next";
import { ContactForm } from "./form";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let’s meet.",
};

export default function ContactPage() {
  return (
    <SimpleLayout title="Let’s meet" intro="">
      <ContactForm />
    </SimpleLayout>
  );
}
