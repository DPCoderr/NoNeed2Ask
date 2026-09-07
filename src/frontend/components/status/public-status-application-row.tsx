import type { RecentApplication } from "@/components/dashboard/dashboard-types";
import { cn } from "@/lib/utils";

export function PublicStatusApplicationRow({ application }: { application: RecentApplication }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 border-t border-slate-100 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_11rem_5rem] sm:gap-x-4 sm:px-6">
      <div className="col-span-2 flex min-w-0 items-center gap-3 sm:col-span-1">
        <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-[#f8f9fb] text-sm font-semibold text-slate-500">{application.companyName.slice(0, 1).toUpperCase()}</span>
        <div className="min-w-0"><h3 className="text-[13px] font-semibold [overflow-wrap:anywhere]">{application.companyName}</h3><p className="mt-1 text-xs leading-5 text-slate-500 [overflow-wrap:anywhere]">{application.jobTitle}</p></div>
      </div>
      <span className={cn("ml-[52px] flex w-fit max-w-full items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium sm:ml-0", application.statusIconBackgroundClassName, application.statusIconClassName, application.status === "offer" && "text-amber-700", application.status === "rejected" && "text-rose-700")}><span className="size-1 shrink-0 rounded-full bg-current" aria-hidden="true" />{application.statusLabel}</span>
      <time dateTime={application.dateTime} className="whitespace-nowrap text-right text-xs tabular-nums text-slate-500"><span className="sr-only">Updated </span>{application.updatedLabel}</time>
    </li>
  );
}
