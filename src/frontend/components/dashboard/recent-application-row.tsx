import type { RecentApplication } from "@/components/dashboard/dashboard-types"
import { DashboardGlyph } from "@/components/dashboard/dashboard-glyph"

function getUpdateTitle(application: RecentApplication) {
  if (application.status === "interview_planned") {
    return `Interview planned with ${application.companyName}`
  }

  if (application.status === "interview_done") {
    return `Interview completed with ${application.companyName}`
  }

  if (application.status === "applied") {
    return `Application submitted to ${application.companyName}`
  }

  return `${application.statusLabel} at ${application.companyName}`
}

export function RecentApplicationRow({
  application,
  isLast,
}: {
  application: RecentApplication
  isLast: boolean
}) {
  return (
    <div
      className={`group/row grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-x-3 gap-y-1 py-4 sm:grid-cols-[2.25rem_minmax(0,1fr)_7rem] ${
        isLast ? "" : "border-b"
      }`}
    >
      <div className={`flex size-8 items-center justify-center rounded-full ${application.statusIconBackgroundClassName}`}>
        <DashboardGlyph
          className={`size-4.5 ${application.statusIconClassName}`}
          name={application.statusIcon}
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold tracking-[-0.01em] text-slate-950 transition-colors group-hover/row:text-primary sm:text-base">
          {getUpdateTitle(application)}
        </h3>
        <p className="mt-0.5 truncate text-sm font-medium text-blue-950/52">
          {application.jobTitle}
        </p>
      </div>
      <time
        className="col-start-2 text-xs font-semibold uppercase tracking-[0.08em] text-blue-950/42 sm:col-start-auto sm:text-right"
        dateTime={application.dateTime}
      >
        {application.updatedLabel}
      </time>
    </div>
  )
}
