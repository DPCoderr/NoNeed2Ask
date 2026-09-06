import { ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import type { InterviewReminder } from "../dashboard-types";

export function OwnerNextInterview({ interview, isPlaceholder = false }: { interview?: InterviewReminder; isPlaceholder?: boolean }) {
  return (
    <section aria-labelledby="next-interview-title" className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 id="next-interview-title" className="text-sm font-semibold">Up next</h2>
        <HugeiconsIcon icon={Calendar03Icon} className="size-[18px] text-slate-400" aria-hidden="true" />
      </div>
      {interview ? (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md bg-[#edf3fa] px-2 py-1 font-medium text-[#315e96]">Interview</span>
            {isPlaceholder && <span className="text-slate-500">Example appointment</span>}
          </div>
          <h3 className="mt-4 break-words text-xl font-semibold tracking-tight">{interview.companyName}</h3>
          <p className="mt-1 break-words text-sm leading-6 text-slate-500">{interview.jobTitle}</p>
          <p className="mb-5 mt-5 flex items-start gap-2 text-sm font-medium text-slate-700">
            <HugeiconsIcon icon={Calendar03Icon} className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden="true" />
            {interview.dateLabel}
          </p>
          {interview.href && (
            <Link href={interview.href} className="mt-auto flex min-h-11 items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs font-medium text-[#315e96] outline-none hover:text-[#193b66] focus-visible:rounded focus-visible:ring-2 focus-visible:ring-blue-600">
              View application
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" aria-hidden="true" />
            </Link>
          )}
        </>
      ) : (
        <div className="flex flex-1 flex-col justify-center py-8">
          <span className="mb-4 flex size-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
            <HugeiconsIcon icon={Calendar03Icon} className="size-5" aria-hidden="true" />
          </span>
          <h3 className="text-base font-semibold">A little breathing room.</h3>
          <p className="mt-2 max-w-64 text-sm leading-6 text-slate-500">No upcoming interview scheduled. Your next conversation will appear here.</p>
        </div>
      )}
    </section>
  );
}
