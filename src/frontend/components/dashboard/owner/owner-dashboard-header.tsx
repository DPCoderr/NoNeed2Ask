import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function OwnerDashboardHeader({ userDisplayName, sharing }: { userDisplayName: string; sharing?: ReactNode }) {
  return (
    <header className="flex flex-col items-start justify-between gap-5 xl:flex-row xl:items-center xl:gap-8">
      <div className="min-w-0">
        <p className="mb-2 text-xs font-medium text-slate-600">Your workspace</p>
        <h1 className="break-words text-[1.75rem] font-semibold leading-tight tracking-[-0.035em] sm:text-[2rem]">
          Welcome back, {userDisplayName}.
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">A little clarity on your next chapter.</p>
      </div>
      <div className="flex min-h-11 w-full min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 xl:w-auto xl:max-w-[22rem] xl:shrink-0 xl:flex-col xl:items-end xl:gap-3">
        <Button asChild className="relative h-9 gap-1.5 rounded-lg bg-[#315e96] px-2.5 text-xs shadow-xs after:absolute after:inset-x-0 after:-inset-y-1 hover:bg-[#274d7d] sm:h-11 sm:gap-2 sm:px-4 sm:text-[13px] sm:after:hidden">
          <Link href="/applications/create">
            <HugeiconsIcon icon={Add01Icon} className="hidden sm:block" aria-hidden="true" strokeWidth={2} />
            Add application
          </Link>
        </Button>
        {sharing}
      </div>
    </header>
  );
}
