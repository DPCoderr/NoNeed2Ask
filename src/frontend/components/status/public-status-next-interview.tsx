import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { DashboardNextAction } from "@/components/dashboard/dashboard-types";

export function PublicStatusNextInterview({ nextAction }: { nextAction: DashboardNextAction }) {
  return (
    <section aria-labelledby="public-next-title" className="flex min-w-0 flex-col rounded-xl border border-[#dce5ef] bg-[#f0f4f9] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3"><h2 id="public-next-title" className="text-sm font-semibold">Up next</h2><HugeiconsIcon icon={Calendar03Icon} className="size-[18px] text-[#537298]" aria-hidden="true" /></div>
      {nextAction.showActions ? <>
        <p className="mt-6 text-xs font-medium text-[#315e96]">Upcoming interview</p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight [overflow-wrap:anywhere]">{nextAction.contactDetail}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600 [overflow-wrap:anywhere]">{nextAction.contactName}</p>
        <p className="mt-5 flex items-start gap-2 text-sm font-medium text-[#315e96]"><HugeiconsIcon icon={Calendar03Icon} className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{nextAction.timelineValue}</p>
        <p className="mt-auto pt-6 text-xs leading-5 text-slate-600">The next conversation in this job search.</p>
      </> : <div className="flex flex-1 flex-col justify-center py-7">
        <h3 className="text-base font-semibold">No upcoming interview</h3>
        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">There isn&apos;t a scheduled interview to share right now. Check back for the next update.</p>
      </div>}
    </section>
  );
}
