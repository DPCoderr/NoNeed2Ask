import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { DashboardGlyph } from "@/components/dashboard/dashboard-glyph";
import { cn } from "@/lib/utils";

export type InterviewReminder = {
  companyName: string;
  dateLabel: string;
  href?: string;
  jobTitle: string;
};

function ReminderContent({
  companyName,
  dateLabel,
  isLinked,
  jobTitle,
}: InterviewReminder & { isLinked: boolean }) {
  return (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-white ring-1 ring-white/15">
        <DashboardGlyph className="size-5" name="signpost" />
      </span>

      <span className="min-w-0 sm:w-48 sm:shrink-0">
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-blue-100/75">
          Next interview
        </span>
        <span className="mt-1.5 block text-lg font-semibold tabular-nums text-white">
          {dateLabel}
        </span>
      </span>

      <span className="col-start-2 min-w-0 flex-1 border-white/15 sm:col-start-auto sm:border-l sm:pl-6">
        <span className="block truncate text-lg font-semibold tracking-[-0.02em] text-white">
          {companyName}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-blue-100/70">
          {jobTitle}
        </span>
      </span>

      {isLinked ? (
        <ArrowRight
          aria-hidden="true"
          className="col-start-3 row-start-1 size-5 shrink-0 self-center text-white transition-transform group-hover/reminder:translate-x-1 sm:col-start-auto sm:row-start-auto"
          strokeWidth={1.8}
        />
      ) : null}
    </>
  );
}

export function NextInterviewCard({
  companyName,
  dateLabel,
  href,
  jobTitle,
}: InterviewReminder) {
  const className = cn(
    "group/reminder grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)_auto] gap-3 overflow-hidden rounded-3xl border border-blue-800/20 bg-[linear-gradient(115deg,#172554_0%,#1d4ed8_100%)] px-5 py-5 shadow-[0_24px_70px_-38px_rgb(30_64_175_/_0.72)] sm:grid-cols-[2.75rem_12rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-7 sm:py-6",
    href &&
      "outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-blue-400/35"
  );

  if (href) {
    return (
      <Link
        aria-label={`View ${companyName} ${jobTitle} application details`}
        className={className}
        href={href}
      >
        <ReminderContent
          companyName={companyName}
          dateLabel={dateLabel}
          isLinked
          jobTitle={jobTitle}
        />
      </Link>
    );
  }

  return (
    <article className={className}>
      <ReminderContent
        companyName={companyName}
        dateLabel={dateLabel}
        isLinked={false}
        jobTitle={jobTitle}
      />
    </article>
  );
}
