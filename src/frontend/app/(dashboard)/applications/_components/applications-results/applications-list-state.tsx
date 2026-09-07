import Link from "next/link";
import { Briefcase02Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

export function ApplicationsListState({ state, onRetry }: { state: "loading" | "error" | "empty" | "no-results"; onRetry?: () => void }) {
  if (state === "loading") {
    return (
      <div aria-busy="true" aria-label="Loading applications" className="divide-y divide-slate-100 border-t border-slate-200/80">
        <p role="status" className="sr-only">Loading applications…</p>
        {[0, 1, 2, 3, 4].map((row) => <div key={row} aria-hidden="true" className="flex animate-pulse items-center gap-4 px-6 py-5 motion-reduce:animate-none"><div className="size-10 rounded-lg bg-slate-100" /><div className="flex-1 space-y-3"><div className="h-3 w-2/5 rounded bg-slate-100" /><div className="h-2 w-3/5 rounded bg-slate-100" /></div><div className="hidden h-5 w-24 rounded bg-slate-100 sm:block" /></div>)}
      </div>
    );
  }
  const title = state === "error" ? "Your applications couldn’t be loaded." : state === "empty" ? "Your next chapter starts here." : "No applications found.";
  const description = state === "error" ? "Please try again in a moment." : state === "empty" ? "Add your first application to keep opportunities, conversations and next steps together." : "Try another company or role, or adjust the status filters above.";
  return (
    <div role={state === "error" ? "alert" : "status"} className="flex flex-col items-center border-t border-slate-200/80 px-6 py-16 text-center">
      <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400"><HugeiconsIcon icon={state === "no-results" ? Search01Icon : Briefcase02Icon} className="size-6" aria-hidden="true" /></span>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
      {state === "empty" && <Button asChild className="mt-5 h-11 rounded-lg bg-[#315e96] text-xs hover:bg-[#274d7d]"><Link href="/applications/create">Add application</Link></Button>}
      {state === "error" && <Button onClick={onRetry} variant="outline" className="mt-5 h-11 rounded-lg text-xs">Try again</Button>}
    </div>
  );
}
