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
      <span className="flex items-center justify-between gap-4">
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm ring-1 ring-blue-100">
            <DashboardGlyph className="size-5" name="signpost" />
          </span>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
            Up next
          </span>
        </span>
        {isLinked ? (
          <ArrowRight
            aria-hidden="true"
            className="size-5 shrink-0 text-blue-700 transition-transform group-hover/reminder:translate-x-1"
            strokeWidth={1.8}
          />
        ) : null}
      </span>

      <span className="flex min-w-0 flex-1 flex-col items-center justify-center py-6 text-center">
        <span className="block whitespace-nowrap text-3xl font-semibold tracking-[-0.045em] tabular-nums text-slate-950 xl:text-[2rem]">
          {dateLabel}
        </span>
      </span>

      <span className="mt-auto block min-w-0 border-t border-blue-200/70 pt-5">
        <span className="block truncate text-lg font-semibold tracking-[-0.02em] text-slate-950">
          {companyName}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-slate-600">
          {jobTitle}
        </span>
      </span>

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
    "group/reminder relative flex min-h-64 min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-[radial-gradient(circle_at_100%_0%,rgb(186_230_253_/_0.7),transparent_48%),linear-gradient(145deg,#f8fbff_0%,#eaf5ff_100%)] p-6 shadow-[0_28px_80px_-58px_rgb(30_64_175_/_0.55)] sm:p-7 lg:h-full lg:min-h-0",
    href &&
      "outline-none transition-all hover:-translate-y-0.5 hover:border-blue-300 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-500/20"
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
