import type { Metadata } from "next";

import { Layout } from "@/components/layout";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Nicolas Zilli",
    default:
      "Nicolas Zilli - Software designer, founder, and amateur astronaut",
  },
  description:
    "I’m Nico an Experienced Software Developer, specialist in React & React Native. I’m currently doing freelancing work for Paris based clients..",
  // alternates: {
  //   types: {
  //     'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
  //   },
  // },
  verification: {
    google: "_Iya2lnPaFQyb2W708vuP6iPYiFtrWq7P9Ygsb_01pI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <div className="flex w-full">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
