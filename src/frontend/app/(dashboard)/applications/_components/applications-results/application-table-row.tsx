import Link from "next/link";
import type { ReactNode } from "react";
import type { PrivateApplicationDto } from "@/lib/api/types";
import { formatApplicationDate } from "@/lib/applications/presentation";
import { CompanyMark } from "./company-mark";
import { StatusBadge } from "./status-badge";

export function ApplicationTableRow({ application, actions }: { application: PrivateApplicationDto; actions: ReactNode }) {
  return (
    <tr className="transition-colors hover:bg-slate-50/70 focus-within:bg-slate-50/70">
      <td className="px-6 py-4">
        <Link href={`/applications/${application.id}`} className="flex min-w-0 items-center gap-3 rounded outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          <CompanyMark companyName={application.companyName} />
          <span className="min-w-0">
            <span className="block break-words text-[13px] font-semibold text-slate-800">{application.companyName}</span>
            <span className="mt-1 block break-words text-xs leading-5 text-slate-500">{application.jobTitle}</span>
          </span>
        </Link>
      </td>
      <td className="px-3 py-4"><StatusBadge status={application.status} /></td>
      <td className="px-3 py-4 text-xs text-slate-500 tabular-nums"><time dateTime={application.updatedAt}>{formatApplicationDate(application.updatedAt)}</time></td>
      <td className="px-3 py-4 text-xs text-slate-600 tabular-nums">{application.nextActionAt ? <time dateTime={application.nextActionAt}>{formatApplicationDate(application.nextActionAt)}</time> : <span aria-label="No next action" className="text-slate-400">—</span>}</td>
      <td className="py-4 pr-3">{actions}</td>
    </tr>
  );
}
