import { ArrowRight01Icon, Briefcase02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import type { RecentApplication } from "../dashboard-types";
import { OwnerApplicationRow } from "./owner-application-row";

export function OwnerRecentApplications({ applications }: { applications: RecentApplication[] }) {
  return (
    <section aria-labelledby="recent-applications-title" className="overflow-hidden rounded-xl border border-slate-200/90 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-4 sm:px-6">
        <div>
          <h2 id="recent-applications-title" className="text-sm font-semibold">Recent applications</h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">The latest movement in your search.</p>
        </div>
        <Link href="/applications" className="flex min-h-11 items-center gap-2 rounded text-xs font-medium text-[#315e96] outline-none hover:text-[#193b66] focus-visible:ring-2 focus-visible:ring-blue-600">
          View all <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" aria-hidden="true" />
        </Link>
      </div>
      {applications.length ? (
        <ul aria-label="Recent applications">
          {applications.map((application) => <OwnerApplicationRow key={application.id} application={application} />)}
        </ul>
      ) : (
        <div className="flex flex-col items-center border-t border-slate-100 px-6 py-12 text-center">
          <HugeiconsIcon icon={Briefcase02Icon} className="mb-4 size-7 text-slate-400" aria-hidden="true" />
          <h3 className="text-sm font-semibold">Every next chapter starts somewhere.</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Add your first application to keep your progress in one place.</p>
          <Link href="/applications/create" className="mt-4 flex min-h-11 items-center rounded text-sm font-medium text-[#315e96] outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Add application <span aria-hidden="true" className="ml-2">→</span></Link>
        </div>
      )}
    </section>
  );
}
