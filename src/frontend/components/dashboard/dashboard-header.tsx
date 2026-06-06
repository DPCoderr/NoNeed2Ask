import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";

export function DashboardHeader({
  publicSlug,
  userDisplayName,
}: {
  publicSlug: string;
  userDisplayName: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <header className="max-w-2xl pt-2">
        <p className="text-sm font-semibold text-blue-700">
          Private dashboard
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">
          Welcome back, {userDisplayName}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-blue-950/75">
          A private command center for the job search: pipeline health,
          follow-ups, and public status visibility.
        </p>
      </header>

      <div className="flex shrink-0 flex-wrap items-center justify-start gap-4 pr-1 text-sm font-semibold text-slate-950 md:justify-end">
        <Button
          asChild
          className="h-9 rounded-lg border-blue-100 bg-white/75 px-4 text-sm font-semibold text-slate-950 shadow-sm shadow-blue-950/5 hover:bg-white"
          size="sm"
          variant="outline"
        >
          <Link href={`/status/${publicSlug}`}>
            Preview public page
            <HugeiconsIcon
              aria-hidden="true"
              className="ml-2 size-4"
              icon={ArrowUpRight01Icon}
              strokeWidth={2}
            />
          </Link>
        </Button>
        <span
          aria-hidden="true"
          className="relative flex size-5 items-center justify-center rounded-full border border-blue-900/70"
        >
          <span className="size-1.5 rounded-full bg-blue-900" />
          <span className="absolute -top-2 left-1/2 h-1 w-px -translate-x-1/2 bg-blue-900/70" />
          <span className="absolute -bottom-2 left-1/2 h-1 w-px -translate-x-1/2 bg-blue-900/70" />
          <span className="absolute -left-2 top-1/2 h-px w-1 -translate-y-1/2 bg-blue-900/70" />
          <span className="absolute -right-2 top-1/2 h-px w-1 -translate-y-1/2 bg-blue-900/70" />
        </span>
        <time dateTime="2025-05-24">May 24, 2025</time>
      </div>
    </div>
  );
}
