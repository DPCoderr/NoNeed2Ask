import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { RecentApplication } from "@/components/dashboard/dashboard-data";

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
  const StatusIcon = application.statusIcon;

  return (
    <div className="grid grid-cols-[2rem_3.5rem_minmax(0,1fr)] gap-3 md:grid-cols-[2rem_4rem_minmax(0,1fr)_auto]">
      <div className="relative z-10 flex justify-center">
        <span className="mt-7 size-3 rounded-full border-2 border-blue-500 bg-white" />
      </div>

      <div className="flex justify-center py-3">
        <div
          className={`flex size-10 items-center justify-center rounded-full ${application.statusIconBackgroundClassName}`}
        >
          <StatusIcon
            aria-hidden="true"
            className={`size-5 ${application.statusIconClassName}`}
            strokeWidth={2.2}
          />
        </div>
      </div>

      <div
        className={`min-w-0 py-4 ${
          isLast ? "" : "border-b border-blue-950/10"
        }`}
      >
        <h3 className="font-semibold text-slate-950">
          {getUpdateTitle(application)}
        </h3>
        <p className="mt-1 text-sm font-medium text-blue-950/75">
          {application.jobTitle}
        </p>
      </div>

      <time
        className={`col-start-3 pb-4 text-sm font-semibold text-blue-950/75 md:col-start-auto md:py-5 ${
          isLast ? "" : "md:border-b md:border-blue-950/10"
        }`}
        dateTime={application.dateTime}
      >
        <HugeiconsIcon
          className="mr-2 inline size-4 align-[-2px] text-blue-900/80"
          icon={Calendar03Icon}
        />
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
    <div className="relative mt-6 space-y-0 pl-3 md:pl-10">
      {applications.length > 1 ? (
        <span
          aria-hidden="true"
          className="absolute bottom-10 left-[calc(0.75rem+1rem-0.5px)] top-7 w-px bg-blue-200 md:left-[calc(2.5rem+1rem-0.5px)]"
        />
      ) : null}

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
  description,
  showViewAll,
  title,
}: {
  description: string;
  showViewAll: boolean;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
          <HugeiconsIcon
            className="size-8"
            icon={Calendar03Icon}
            strokeWidth={1.8}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-normal text-slate-950">
            {title}
          </h2>
          <p className="mt-1 text-sm font-semibold text-blue-950/80">
            {description}
          </p>
        </div>
      </div>

      {showViewAll ? (
        <Button
          asChild
          className="h-auto w-fit shrink-0 rounded-lg border-blue-100 bg-white/70 px-3 py-1.5 text-xs font-semibold text-blue-950/75 hover:bg-white xl:px-4 xl:py-2 xl:text-sm"
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
  description = "A timeline of your latest tracker updates.",
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
    <article className="rounded-2xl border border-white/80 bg-white/88 p-5 shadow-xl shadow-blue-950/10 backdrop-blur-xl md:p-7">
      <RecentApplicationsHeader
        description={description}
        showViewAll={showViewAll}
        title={title}
      />
      {applications.length > 0 ? (
        <RecentApplicationsTimeline applications={applications} />
      ) : (
        <p className="mt-6 rounded-lg border border-blue-950/10 bg-white/55 p-4 text-sm font-semibold text-blue-950/75">
          {emptyMessage}
        </p>
      )}
    </article>
  );
}
