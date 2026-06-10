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
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <header className="max-w-2xl pt-1 lg:pt-2">
        <p className="text-sm font-semibold text-blue-700">
          Private dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl lg:mt-4 lg:text-5xl">
          Welcome back, {userDisplayName}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-blue-950/75 sm:text-base sm:leading-8 lg:mt-5">
          A private command center for the job search: pipeline health,
          follow-ups, and public status visibility.
        </p>
      </header>

      <div className="flex shrink-0 flex-wrap items-center justify-start gap-3 pr-1 text-sm font-semibold text-slate-950 lg:justify-end lg:gap-4 ">
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
      </div>
    </div>
  );
}
