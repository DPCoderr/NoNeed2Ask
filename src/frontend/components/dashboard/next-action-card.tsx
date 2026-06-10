import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

type NextActionCardProps = {
  badge?: string;
  contactDetail?: string;
  contactLabel?: string;
  contactName?: string;
  note?: string;
  noteTitle?: string;
  primaryText?: string;
  secondaryText?: string;
  showActions?: boolean;
  timelineDetail?: string;
  timelineLabel?: string;
  timelineValue?: string;
  title?: string;
};

export function NextActionCard({
  badge = "May 24",
  contactDetail = "Northstar Labs",
  contactLabel = "Contact",
  contactName = "Sarah Chen",
  note = "Confirm the agenda, ask who will join the call, and resend your portfolio link.",
  noteTitle = "Suggested follow-up",
  primaryText = "Follow up with Sarah at Northstar Labs",
  secondaryText = "Interview scheduled for Frontend Engineer role.",
  showActions = true,
  timelineDetail = "2 upcoming",
  timelineLabel = "Interview",
  timelineValue = "May 24 at 2:30 PM",
  title = "Next action",
}: NextActionCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 xl:min-h-[22rem] xl:p-6">
      <div className="flex items-start justify-between gap-3 xl:gap-4">
        <div className="flex min-w-0 gap-3 xl:gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100/80 xl:size-14">
            <DashboardIcon
              alt=""
              className="size-8 text-blue-700 xl:size-10"
              name="NextActionIcon.svg"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-950 xl:text-xl">
              {title}
            </h2>
            <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-slate-950 xl:mt-4 xl:text-base xl:leading-7">
              {primaryText}
            </p>
            <p className="mt-1 max-w-xs text-xs font-medium leading-5 text-blue-950/75 xl:mt-2 xl:text-sm xl:leading-6">
              {secondaryText}
            </p>
          </div>
        </div>
        <span className="rounded-lg border border-blue-100 bg-white/70 px-3 py-1.5 text-xs font-semibold text-blue-950/75 xl:px-4 xl:py-2 xl:text-sm">
          {badge}
        </span>
      </div>

      <div className="mt-4 grid gap-3 xl:mt-7 xl:grid-cols-2">
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-3 xl:p-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-950/55">
            {contactLabel}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {contactName}
          </p>
          <p className="mt-1 text-sm font-medium text-blue-950/65">
            {contactDetail}
          </p>
        </div>
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-3 xl:p-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-950/55">
            {timelineLabel}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {timelineValue}
          </p>
          <p className="mt-1 text-sm font-medium text-blue-950/65">
            {timelineDetail}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-blue-950/10 bg-blue-50/45 p-3 xl:mt-4 xl:p-4">
        <p className="text-sm font-semibold text-slate-950">
          {noteTitle}
        </p>
        <p className="mt-2 text-sm font-medium leading-6 text-blue-950/70">
          {note}
        </p>
      </div>

      {showActions ? (
        <div className="mt-auto flex flex-wrap gap-3 pt-4 xl:gap-4 xl:pt-6">
          <Button asChild className="flex-1 rounded-lg px-5 xl:flex-none xl:px-7">
            <Link href="/applications">View details</Link>
          </Button>
          <Button
            className="flex-1 rounded-lg border-blue-100 bg-white/75 px-5 font-semibold text-slate-950 hover:bg-white xl:flex-none xl:px-7"
            variant="outline"
          >
            Mark as done
          </Button>
        </div>
      ) : null}
    </article>
  );
}
