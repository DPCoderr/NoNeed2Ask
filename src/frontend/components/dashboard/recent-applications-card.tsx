import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  recentApplications,
  type RecentApplication,
} from "@/components/dashboard/dashboard-data";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

function getUpdateTitle(application: RecentApplication) {
  if (application.status === "Interview planned") {
    return `Interview planned with ${application.companyName}`;
  }

  if (application.status === "Interview done") {
    return `Interview completed with ${application.companyName}`;
  }

  if (
    application.status === "Waiting response" ||
    application.status === "Applied"
  ) {
    return `Application submitted to ${application.companyName}`;
  }

  return `${application.status} at ${application.companyName}`;
}

function getUpdateDate(value: string) {
  const date = value.replace(/^Updated\s+/i, "");

  return /\d{4}/.test(date) ? date : `${date}, 2026`;
}

function getDateTimeAttribute(value: string) {
  const date = value.replace(/^Updated\s+/i, "");
  const parsedDate = new Date(`${date}, 2026`);

  return Number.isNaN(parsedDate.getTime())
    ? undefined
    : parsedDate.toISOString();
}

function RecentApplicationRow({
  application,
  isLast,
}: {
  application: RecentApplication;
  isLast: boolean;
}) {
  return (
    <div className="grid grid-cols-[2rem_3.5rem_minmax(0,1fr)] gap-3 md:grid-cols-[2rem_4rem_minmax(0,1fr)_auto]">
      <div className="relative z-10 flex justify-center">
        <span className="mt-7 size-3 rounded-full border-2 border-blue-500 bg-white" />
      </div>

      <div className="flex justify-center py-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-blue-50">
          <DashboardIcon
            alt=""
            className="size-9 text-blue-700"
            name={application.statusIcon}
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
        dateTime={getDateTimeAttribute(application.updated)}
      >
        <HugeiconsIcon
          className="mr-2 inline size-4 align-[-2px] text-blue-900/80"
          icon={Calendar03Icon}
        />
        {getUpdateDate(application.updated)}
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
          key={`${application.companyName}-${application.jobTitle}`}
        />
      ))}
    </div>
  );
}

function RecentApplicationsHeader() {
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
            Recent Updates
          </h2>
          <p className="mt-1 text-sm font-semibold text-blue-950/80">
            A timeline of your latest tracker updates.
          </p>
        </div>
      </div>

      <Button
        asChild
        className="h-9 w-fit rounded-lg border-blue-100 bg-white/75 px-4 text-sm font-semibold text-slate-950 hover:bg-white"
        size="sm"
        variant="outline"
      >
        <Link href="/applications">View all</Link>
      </Button>
    </div>
  );
}

export function RecentApplicationsCard() {
  const visibleApplications = recentApplications;

  return (
    <article className="rounded-2xl border border-white/80 bg-white/88 p-5 shadow-xl shadow-blue-950/10 backdrop-blur-xl md:p-7">
      <RecentApplicationsHeader />
      <RecentApplicationsTimeline applications={visibleApplications} />
    </article>
  );
}
