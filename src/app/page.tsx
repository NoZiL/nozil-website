import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import Link from "next/link";

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Freelance Software Developer
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Nico an Experienced Software Developer, specialist in React &
            React Native. I’m currently doing freelancing work for Paris based
            clients.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/nozil/"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/nicolaszilli/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-4">
        <Button
          variant="secondary"
          href="https://docs.google.com/document/d/1Qjl9Y3iRAs3d7-8gb8GQJpfPQ7Qaj3u7BFsj1ohJ1js/export?format=pdf"
        >
          Get my resume
        </Button>
      </Container>
    </>
  );
}
