import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import type { RecentApplication } from "../dashboard-types";

export function OwnerApplicationRow({ application }: { application: RecentApplication }) {
  return (
    <li className="border-t border-slate-100">
      <Link href={`/applications/${application.id}`} className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-5 py-4 outline-none transition-colors hover:bg-slate-50/80 focus-visible:bg-blue-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 sm:gap-x-4 sm:px-6 lg:grid-cols-[2.5rem_minmax(0,1fr)_10rem_4rem_1rem]">
        <span aria-hidden="true" className="col-start-1 row-start-1 flex size-10 items-center justify-center rounded-lg border border-slate-200/80 bg-[#f8f9fb] text-sm font-semibold text-slate-500">
          {application.companyName.slice(0, 1).toUpperCase()}
        </span>
        <div className="col-start-2 row-start-1 min-w-0">
          <h3 className="break-words text-[13px] font-semibold text-slate-800">{application.companyName}</h3>
          <p className="mt-1 break-words text-xs leading-5 text-slate-500">{application.jobTitle}</p>
        </div>
        <span className={`col-start-2 row-start-2 flex w-fit max-w-full items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium lg:col-start-3 lg:row-start-1 ${application.statusIconBackgroundClassName} ${application.statusIconClassName}`}>
          <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-current" />
          {application.statusLabel}
        </span>
        <time dateTime={application.dateTime} className="col-start-3 row-start-2 whitespace-nowrap text-right text-xs text-slate-500 tabular-nums lg:col-start-4 lg:row-start-1">{application.updatedLabel}</time>
        <HugeiconsIcon icon={ArrowRight01Icon} aria-hidden="true" className="col-start-3 row-start-1 size-4 justify-self-end text-slate-400 group-hover:text-[#315e96] lg:col-start-5" />
      </Link>
    </li>
  );
}
