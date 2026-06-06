import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  recentApplications,
  type RecentApplication,
} from "@/components/dashboard/dashboard-data";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

function DotMenu() {
  return (
    <button
      aria-label="Application actions"
      className="flex size-8 shrink-0 flex-col items-center justify-center gap-0.5 rounded-md text-blue-900/70 hover:bg-blue-50"
      type="button"
    >
      <span className="size-1 rounded-full bg-current" />
      <span className="size-1 rounded-full bg-current" />
      <span className="size-1 rounded-full bg-current" />
    </button>
  );
}

function RecentApplicationRow({
  application,
}: {
  application: RecentApplication;
}) {
  return (
    <div className="grid gap-4 px-5 py-3 sm:grid-cols-[1.35fr_1fr_auto_auto] sm:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <DashboardIcon
          alt=""
          className="size-11 shrink-0 text-blue-700"
          name={application.icon}
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-950">
            {application.companyName}
          </p>
          <p className="mt-1 truncate text-sm font-medium text-blue-950/75">
            {application.jobTitle}
          </p>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-4">
        <DashboardIcon
          alt=""
          className="size-9 shrink-0 text-blue-700"
          name={application.statusIcon}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-blue-950/80">
            {application.status}
          </p>
          <p className="mt-1 truncate text-sm font-medium text-blue-950/65">
            {application.detail}
          </p>
        </div>
      </div>

      <p className="text-sm font-medium text-blue-950/70">
        {application.updated}
      </p>
      <DotMenu />
    </div>
  );
}

export function RecentApplicationsCard() {
  return (
    <article className="overflow-hidden rounded-xl border border-white/80 bg-white/78 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">
            Recent applications
          </h2>
          <p className="mt-1 text-sm font-medium text-blue-950/75">
            Latest updates from your private tracker.
          </p>
        </div>
        <Button
          asChild
          className="rounded-lg border-blue-100 bg-white/75 px-5 font-semibold text-slate-950 hover:bg-white"
          size="sm"
          variant="outline"
        >
          <Link href="/applications">View all</Link>
        </Button>
      </div>
      <Separator className="bg-blue-950/10" />
      <div className="divide-y divide-blue-950/10">
        {recentApplications.map((application) => (
          <RecentApplicationRow
            application={application}
            key={application.companyName}
          />
        ))}
      </div>
    </article>
  );
}
