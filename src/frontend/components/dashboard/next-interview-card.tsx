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
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <DashboardGlyph className="size-5" name="signpost" />
      </span>

      <span className="min-w-0">
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-blue-700">
          Next interview
        </span>
        <span className="mt-1 block text-base font-semibold tabular-nums text-slate-950">
          {dateLabel}
        </span>
      </span>

      <span className="col-start-2 col-span-2 min-w-0 flex-1 border-t border-blue-950/10 pt-3">
        <span className="block truncate text-base font-semibold tracking-[-0.015em] text-slate-950">
          {companyName}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-blue-950/52">
          {jobTitle}
        </span>
      </span>

      {isLinked ? (
        <ArrowRight
          aria-hidden="true"
          className="col-start-3 row-start-1 size-4 shrink-0 self-center text-blue-700 transition-transform group-hover/reminder:translate-x-0.5"
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
    "group/reminder grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-3 rounded-3xl border border-blue-950/8 bg-white/92 px-5 py-5 shadow-[0_20px_65px_-48px_rgb(15_23_42_/_0.4)] backdrop-blur-xl sm:px-6 sm:py-6",
    href &&
      "outline-none transition-colors hover:border-blue-700/30 hover:bg-white focus-visible:border-blue-700 focus-visible:ring-3 focus-visible:ring-blue-600/18"
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
