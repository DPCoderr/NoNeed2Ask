import Link from "next/link";

import type { InterviewReminder } from "@/components/dashboard/dashboard-types";
import { InterviewReminderContent } from "@/components/dashboard/interview-reminder-content";
import { cn } from "@/lib/utils";

export function NextInterviewCard({
  companyName,
  dateLabel,
  href,
  jobTitle,
}: InterviewReminder) {
  const className = cn(
    "group/reminder relative isolate flex min-h-64 min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white p-6 shadow-[0_28px_80px_-58px_rgb(30_64_175_/_0.55)] before:absolute before:right-7 before:top-0 before:h-1 before:w-16 before:rounded-b-full before:bg-blue-600 after:absolute after:-right-12 after:-top-12 after:-z-10 after:size-32 after:rounded-full after:border-2 after:border-blue-200/80 sm:p-7 lg:h-full lg:min-h-0",
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
        <InterviewReminderContent
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
      <InterviewReminderContent
        companyName={companyName}
        dateLabel={dateLabel}
        isLinked={false}
        jobTitle={jobTitle}
      />
    </article>
  );
}
