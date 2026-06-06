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
    <div className="grid gap-3 rounded-lg border border-blue-950/10 bg-white/65 p-3.5 shadow-sm shadow-blue-950/5 sm:p-4 xl:rounded-none xl:border-0 xl:bg-transparent xl:px-5 xl:py-3 xl:shadow-none xl:grid-cols-[1.35fr_1fr_auto_auto] xl:items-center xl:gap-4">
      <div className="grid min-w-0 grid-cols-[2.25rem_1fr_auto] items-center gap-3 xl:flex xl:gap-4">
        <DashboardIcon
          alt=""
          className="size-9 shrink-0 text-blue-700 xl:size-11"
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
        <div className="xl:hidden">
          <DotMenu />
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-md bg-blue-50/55 p-3 xl:contents xl:bg-transparent xl:p-0">
        <div className="flex min-w-0 items-center gap-2.5 xl:gap-4">
          <DashboardIcon
            alt=""
            className="size-7 shrink-0 text-blue-700 xl:size-9"
            name={application.statusIcon}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-blue-950/80">
              {application.status}
            </p>
            <p className="mt-0.5 truncate text-xs font-medium text-blue-950/65 xl:mt-1 xl:text-sm">
              {application.detail}
            </p>
          </div>
        </div>

        <p className="self-center whitespace-nowrap text-right text-xs font-semibold text-blue-950/65 xl:text-left xl:text-sm xl:font-medium xl:text-blue-950/70">
          {application.updated}
        </p>
      </div>
      <div className="hidden xl:block">
        <DotMenu />
      </div>
    </div>
  );
}

export function RecentApplicationsCard() {
  const visibleApplications = recentApplications.slice(0, 3);

  return (
    <article className="overflow-hidden rounded-xl border border-white/80 bg-white/78 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3 p-4 sm:gap-4 sm:p-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-950 sm:text-xl">
            Recent applications
          </h2>
          <p className="mt-0.5 text-xs font-medium text-blue-950/75 sm:mt-1 sm:text-sm">
            Latest updates from your private tracker.
          </p>
        </div>
        <Button
          asChild
          className="h-8 rounded-lg border-blue-100 bg-white/75 px-3 text-xs font-semibold text-slate-950 hover:bg-white sm:px-5 sm:text-sm"
          size="sm"
          variant="outline"
        >
          <Link href="/applications">View all</Link>
        </Button>
      </div>
      <Separator className="bg-blue-950/10" />
      <div className="space-y-3 p-3 xl:space-y-0 xl:divide-y xl:divide-blue-950/10 xl:p-0">
        {visibleApplications.map((application) => (
          <RecentApplicationRow
            application={application}
            key={application.companyName}
          />
        ))}
      </div>
    </article>
  );
}
