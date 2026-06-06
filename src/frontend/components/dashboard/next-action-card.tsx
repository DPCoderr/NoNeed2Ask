import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

export function NextActionCard() {
  return (
    <article className="flex min-h-[22rem] flex-col rounded-xl border border-white/80 bg-white/78 p-6 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-100/80">
            <DashboardIcon
              alt=""
              className="size-10 text-blue-700"
              name="NextActionIcon.svg"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              Next action
            </h2>
            <p className="mt-4 max-w-sm font-semibold leading-7 text-slate-950">
              Follow up with Sarah at Northstar Labs
            </p>
            <p className="mt-2 max-w-xs text-sm font-medium leading-6 text-blue-950/75">
              Interview scheduled for Frontend Engineer role.
            </p>
          </div>
        </div>
        <span className="rounded-lg border border-blue-100 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-950/75">
          May 24
        </span>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-4">
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
        <div className="rounded-lg border border-blue-950/10 bg-white/55 p-4">
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

      <div className="mt-4 rounded-lg border border-blue-950/10 bg-blue-50/45 p-4">
        <p className="text-sm font-semibold text-slate-950">
          Suggested follow-up
        </p>
        <p className="mt-2 text-sm font-medium leading-6 text-blue-950/70">
          Confirm the agenda, ask who will join the call, and resend your
          portfolio link.
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-4 pt-6">
        <Button asChild className="rounded-lg px-7">
          <Link href="/applications">View details</Link>
        </Button>
        <Button
          className="rounded-lg border-blue-100 bg-white/75 px-7 font-semibold text-slate-950 hover:bg-white"
          variant="outline"
        >
          Mark as done
        </Button>
      </div>
    </article>
  );
}
