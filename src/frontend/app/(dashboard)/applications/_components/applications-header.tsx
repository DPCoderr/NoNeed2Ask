import Link from "next/link";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

export function ApplicationsHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="mb-2 text-xs font-medium text-slate-600">Your workspace</p>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.035em] sm:text-[2rem]">Applications</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Every opportunity, in one place.</p>
      </div>
      <Button asChild className="relative h-9 gap-1.5 rounded-lg bg-[#315e96] px-2.5 text-xs shadow-xs after:absolute after:inset-x-0 after:-inset-y-1 hover:bg-[#274d7d] sm:h-11 sm:gap-2 sm:px-4 sm:text-[13px] sm:after:hidden">
        <Link href="/applications/create"><HugeiconsIcon icon={Add01Icon} className="hidden sm:block" aria-hidden="true" />Add application</Link>
      </Button>
    </header>
  );
}
