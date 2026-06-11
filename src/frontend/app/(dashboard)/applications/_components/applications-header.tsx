import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

// Top row for the applications route, including the create shortcut.
export function ApplicationsHeader() {
  return (
    <header className="flex h-10 items-center justify-between xl:h-auto xl:flex-row xl:items-end">
      <div>
        <h1 className="text-lg font-semibold tracking-normal text-slate-950 sm:text-xl xl:text-5xl">
          Applications
        </h1>
        <p className="mt-4 hidden text-base font-medium text-blue-950/75 xl:block">
          Track and manage all your job applications.
        </p>
      </div>

      <Button asChild className="h-10 rounded-lg px-4 sm:col-span-1">
        <Link
          aria-label="Add application"
          href="/applications/create"
          className="flex items-center"
        >
          <Plus className="h-4 w-4" />
          <span> Add application</span>
        </Link>
      </Button>
    </header>
  );
}
