import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

export function NextActionCard() {
  return (
    <article className="flex flex-col rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 lg:min-h-[22rem] lg:p-6">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 gap-3 sm:gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100/80 sm:size-14">
            <DashboardIcon
              alt=""
              className="size-8 text-blue-700 sm:size-10"
              name="NextActionIcon.svg"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-950 sm:text-xl">
              Next action
            </h2>
            <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-slate-950 sm:mt-4 sm:text-base sm:leading-7">
              Follow up with Sarah at Northstar Labs
            </p>
            <p className="mt-1 max-w-xs text-xs font-medium leading-5 text-blue-950/75 sm:mt-2 sm:text-sm sm:leading-6">
              Interview scheduled for Frontend Engineer role.
            </p>
          </div>
        </div>
        <span className="rounded-lg border border-blue-100 bg-white/70 px-3 py-1.5 text-xs font-semibold text-blue-950/75 sm:px-4 sm:py-2 sm:text-sm">
          May 24
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:mt-7">
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-3 sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-950/55">
            Contact
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            Sarah Chen
          </p>
          <p className="mt-1 text-sm font-medium text-blue-950/65">
            Northstar Labs
          </p>
        </div>
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-3 sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-blue-950/55">
            Interview
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            May 24 at 2:30 PM
          </p>
          <p className="mt-1 text-sm font-medium text-blue-950/65">
            2 upcoming
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-blue-950/10 bg-blue-50/45 p-3 sm:mt-4 sm:p-4">
        <p className="text-sm font-semibold text-slate-950">
          Suggested follow-up
        </p>
        <p className="mt-2 text-sm font-medium leading-6 text-blue-950/70">
          Confirm the agenda, ask who will join the call, and resend your
          portfolio link.
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-4 sm:gap-4 sm:pt-6">
        <Button asChild className="flex-1 rounded-lg px-5 sm:flex-none sm:px-7">
          <Link href="/applications">View details</Link>
        </Button>
        <Button
          className="flex-1 rounded-lg border-blue-100 bg-white/75 px-5 font-semibold text-slate-950 hover:bg-white sm:flex-none sm:px-7"
          variant="outline"
        >
          Mark as done
        </Button>
      </div>
    </article>
  );
}
