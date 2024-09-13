"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

type SubmitProps = {
  title: string;
  titlePending?: string;
  titleSubmitted?: string;
};

export function SubmitOnce({
  title,
  titlePending = title,
  titleSubmitted,
}: SubmitProps) {
  const { pending } = useFormStatus();

  const searchParams = useSearchParams();

  const success = (["", "true"] as (string | null)[]).includes(
    searchParams.get("success")
  );

  return (
    <>
      {success && (
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          {titleSubmitted}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        disabled={pending || success}
        tabIndex={-1}
        className={clsx(
          "rounded-md bg-teal-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:pointer-events-none select-none"
        )}
      >
        {pending ? titlePending : title}
      </Button>
    </>
  );
}
