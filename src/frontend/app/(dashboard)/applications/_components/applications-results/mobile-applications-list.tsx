import Link from "next/link"

import type { PrivateApplicationDto } from "@/lib/api/types"
import { formatApplicationDate } from "@/lib/applications/presentation"

import { ApplicationActionsMenu } from "./application-actions-menu"
import { CompanyMark } from "./company-mark"
import { StatusBadge } from "./status-badge"

// Compact card view used below the desktop table breakpoint.
export function MobileApplicationsList({
  applications,
}: {
  applications: PrivateApplicationDto[]
}) {
  return (
    <section className="grid gap-2.5 lg:hidden">
      {applications.map((application) => (
        <article
          className="rounded-xl border border-white/80 bg-white/86 p-3 shadow-md shadow-blue-950/6 backdrop-blur-xl sm:p-4"
          key={`${application.id}-mobile`}
        >
          <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] items-start gap-3 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(90px,auto)_auto]">
            <div className="flex min-w-0 gap-3">
              <CompanyMark companyName={application.companyName} />
              <div className="min-w-0">
                <Link
                  className="block truncate text-sm font-semibold text-slate-950 hover:underline"
                  href={`/applications/${application.id}`}
                >
                  {application.companyName}
                </Link>
                <p className="mt-1 truncate text-xs font-medium text-blue-950/75 sm:text-sm">
                  {application.jobTitle}
                </p>
              </div>
            </div>
            <div className="min-w-0">
              <StatusBadge status={application.status} />
            </div>
            <div className="hidden min-w-0 text-right text-xs font-medium text-blue-950/75 sm:block">
              <p className="truncate">
                {formatApplicationDate(application.updatedAt)}
              </p>
            </div>
            <ApplicationActionsMenu application={application} />
          </div>
          <div className="mt-3 grid gap-1.5 pl-12 text-xs font-medium text-blue-950/75 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
            <p className="min-w-0 truncate">
              {application.nextActionAt
                ? `Next ${formatApplicationDate(application.nextActionAt)}`
                : "No next action"}
            </p>
            <p className="min-w-0 truncate">
              Updated {formatApplicationDate(application.updatedAt)}
            </p>
          </div>
        </article>
      ))}
      {applications.length === 0 ? (
        <div className="rounded-xl border border-white/80 bg-white/86 p-6 text-center text-sm font-medium text-blue-950/70 shadow-md shadow-blue-950/6 backdrop-blur-xl">
          No applications match these filters.
        </div>
      ) : null}
    </section>
  )
}
