import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { RecentApplication } from "@/components/dashboard/dashboard-data";
import { DashboardGlyph } from "@/components/dashboard/dashboard-glyph";

function getUpdateTitle(application: RecentApplication) {
  if (application.status === "interview_planned") {
    return `Interview planned with ${application.companyName}`;
  }

  if (application.status === "interview_done") {
    return `Interview completed with ${application.companyName}`;
  }

  if (application.status === "applied") {
    return `Application submitted to ${application.companyName}`;
  }

  return `${application.statusLabel} at ${application.companyName}`;
}

function RecentApplicationRow({
  application,
  isLast,
}: {
  application: RecentApplication;
  isLast: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-x-3 gap-y-1 py-4 sm:grid-cols-[1.75rem_minmax(0,1fr)_7rem] ${
        isLast ? "" : "border-b"
      }`}
    >
      <div className="flex justify-center">
        <DashboardGlyph
          className={`size-4.5 ${application.statusIconClassName}`}
          name={application.statusIcon}
        />
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold tracking-[-0.01em] text-slate-950 sm:text-base">
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
  );
}

function RecentApplicationsTimeline({
  applications,
}: {
  applications: RecentApplication[];
}) {
  return (
    <div className="mt-3 border-t border-blue-950/12 [&>div]:border-blue-950/8">
      {applications.map((application, index) => (
        <RecentApplicationRow
          application={application}
          isLast={index === applications.length - 1}
          key={application.id}
        />
      ))}
    </div>
  );
}

function RecentApplicationsHeader({
  showViewAll,
  title,
}: {
  showViewAll: boolean;
  title: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center border border-blue-950/12 bg-white text-blue-700">
          <DashboardGlyph className="size-4.5" name="activity" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-[-0.025em] text-slate-950">
            {title}
          </h2>
        </div>
      </div>

      {showViewAll ? (
        <Button
          asChild
          className="h-9 w-fit shrink-0 rounded-xl border-blue-950/10 bg-white px-3 text-sm font-semibold text-blue-800 shadow-none hover:bg-blue-50"
          variant="outline"
        >
          <Link href="/applications">View all</Link>
        </Button>
      ) : null}
    </div>
  );
}

export function RecentApplicationsCard({
  applications,
  description = "Your latest application activity.",
  emptyMessage = "No applications yet.",
  showViewAll = true,
  title = "Recent Updates",
}: {
  applications: RecentApplication[];
  description?: string;
  emptyMessage?: string;
  showViewAll?: boolean;
  title?: string;
}) {
  return (
    <article className="rounded-2xl border border-blue-950/8 bg-white/92 p-5 shadow-[0_18px_55px_-45px_rgb(15_23_42_/_0.35)] backdrop-blur-xl sm:p-6">
      <RecentApplicationsHeader
        showViewAll={showViewAll}
        title={title}
      />
      <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-blue-950/55">
        {description}
      </p>
      {applications.length > 0 ? (
        <RecentApplicationsTimeline applications={applications} />
      ) : (
        <p className="mt-4 border-y border-dashed border-blue-950/15 py-5 text-sm font-medium text-blue-950/60">
          {emptyMessage}
        </p>
      )}
    </article>
  );
}
