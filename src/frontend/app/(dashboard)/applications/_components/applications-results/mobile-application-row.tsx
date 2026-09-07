import Link from "next/link";
import type { ReactNode } from "react";
import type { PrivateApplicationDto } from "@/lib/api/types";
import { formatApplicationDate } from "@/lib/applications/presentation";
import { CompanyMark } from "./company-mark";
import { StatusBadge } from "./status-badge";

export function MobileApplicationRow({ application, actions }: { application: PrivateApplicationDto; actions: ReactNode }) {
  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/applications/${application.id}`} className="flex min-w-0 flex-1 items-start gap-3 rounded outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          <CompanyMark companyName={application.companyName} />
          <span className="min-w-0">
            <span className="block break-words text-[13px] font-semibold text-slate-800">{application.companyName}</span>
            <span className="mt-1 block break-words text-xs leading-5 text-slate-500">{application.jobTitle}</span>
          </span>
        </Link>
        {actions}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pl-[52px]">
        <StatusBadge status={application.status} />
        <span className="text-[11px] text-slate-500">Updated <time dateTime={application.updatedAt}>{formatApplicationDate(application.updatedAt)}</time></span>
      </div>
      <p className="mt-2 pl-[52px] text-xs leading-5 text-slate-500">{application.nextActionAt ? <>Next action <time className="font-medium text-slate-600" dateTime={application.nextActionAt}>{formatApplicationDate(application.nextActionAt)}</time></> : "No next action scheduled"}</p>
    </li>
  );
}
