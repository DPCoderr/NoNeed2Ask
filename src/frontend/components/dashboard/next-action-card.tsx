import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

type NextActionCardProps = {
  badge?: string;
  contactDetail?: string;
  contactLabel?: string;
  contactName?: string;
  noteTitle?: string;
  notes?: {
    label: string;
    value: string;
  }[];
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
  noteTitle = "Notes",
  notes = [
    {
      label: "Public note",
      value: "Confirm the agenda, ask who will join the call, and resend your portfolio link.",
    },
  ],
  primaryText = "Interview with Sarah at Northstar Labs",
  secondaryText = "Interview scheduled for Frontend Engineer role.",
  showActions = true,
  timelineDetail = "Upcoming",
  timelineLabel = "Planned for",
  timelineValue = "May 24 at 2:30 PM",
  title = "Next planned interview",
}: NextActionCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 xl:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3 xl:gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-100/80 xl:size-12">
            <DashboardIcon
              alt=""
              className="size-7 text-blue-700 xl:size-8"
              name="NextActionIcon.svg"
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-950 xl:text-xl">
              {title}
            </h2>
            <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-slate-950 xl:text-base xl:leading-7">
              {primaryText}
            </p>
            <p className="mt-1 max-w-md text-xs font-medium leading-5 text-blue-950/75 xl:text-sm xl:leading-6">
              {secondaryText}
            </p>
          </div>
        </div>
        <span className="w-fit shrink-0 rounded-lg border border-blue-100 bg-white/70 px-3 py-1.5 text-xs font-semibold text-blue-950/75 xl:px-4 xl:py-2 xl:text-sm">
          {badge}
        </span>
      </div>

      <div className="mt-4 grid gap-3 xl:mt-5 xl:grid-cols-2">
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-3 xl:p-4">
          <div className="flex items-center gap-2 text-blue-950/55">
            <BriefcaseBusiness className="size-4" strokeWidth={2} />
            <p className="text-xs font-semibold uppercase tracking-normal">
              {contactLabel}
            </p>
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {contactName}
          </p>
          <p className="mt-1 text-sm font-medium text-blue-950/65">
            {contactDetail}
          </p>
        </div>
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-3 xl:p-4">
          <div className="flex items-center gap-2 text-blue-950/55">
            <CalendarClock className="size-4" strokeWidth={2} />
            <p className="text-xs font-semibold uppercase tracking-normal">
              {timelineLabel}
            </p>
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {timelineValue}
          </p>
          <p className="mt-1 text-sm font-medium text-blue-950/65">
            {timelineDetail}
          </p>
        </div>
      </div>

      <div className="mt-3 flex min-h-34 min-w-0 flex-1 flex-col rounded-lg border border-blue-950/10 bg-blue-50/45 p-3 xl:mt-4 xl:min-h-0 xl:overflow-hidden xl:p-4">
        <div className="flex items-center gap-2 text-blue-950/70">
          <FileText className="size-4" strokeWidth={2} />
          <p className="text-sm font-semibold text-slate-950">
            {noteTitle}
          </p>
        </div>

        <div
          className={`mt-3 grid min-h-0 flex-1 gap-2 ${
            showActions ? "content-start" : "content-stretch"
          }`}
        >
          {notes.map((note) => (
            <div
              className={`min-h-24 rounded-lg border border-blue-950/10 bg-white/45 px-3 py-3 xl:min-h-28 ${
                showActions ? "" : "flex flex-col"
              }`}
              key={note.label}
            >
              <p className="text-xs font-semibold uppercase tracking-normal text-blue-950/55">
                {note.label}
              </p>
              <p
                className={`mt-2 line-clamp-4 text-sm font-medium leading-6 text-blue-950/70 xl:line-clamp-5 ${
                  showActions ? "" : "flex-1"
                }`}
              >
                {note.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showActions ? (
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row xl:pt-5">
          <Button asChild className="rounded-lg px-5 sm:w-fit xl:px-7">
            <Link href="/applications">
              <ArrowRight className="size-4" />
              View details
            </Link>
          </Button>
          <Button
            className="rounded-lg border-blue-100 bg-white/75 px-5 font-semibold text-slate-950 hover:bg-white sm:w-fit xl:px-7"
            variant="outline"
          >
            <CheckCircle2 className="size-4" />
            Mark as done
          </Button>
        </div>
      ) : null}
    </article>
  );
}
