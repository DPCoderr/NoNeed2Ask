import { ArrowRight } from "lucide-react"

import { DashboardGlyph } from "@/components/dashboard/dashboard-glyph"
import type { InterviewReminder } from "@/components/dashboard/dashboard-types"

export function InterviewReminderContent({
  companyName,
  dateLabel,
  isLinked,
  jobTitle,
}: InterviewReminder & { isLinked: boolean }) {
  return (
    <>
      <span className="flex items-center justify-between gap-4">
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
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

      <span className="mt-auto block min-w-0 border-t border-blue-100 pt-5">
        <span className="block truncate text-lg font-semibold tracking-[-0.02em] text-slate-950">
          {companyName}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-slate-600">
          {jobTitle}
        </span>
      </span>
    </>
  )
}
