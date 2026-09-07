import { Briefcase01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { RecentApplication } from "@/components/dashboard/dashboard-types";
import { PublicStatusApplicationRow } from "./public-status-application-row";

export function PublicStatusUpdates({ applications }: { applications: RecentApplication[] }) {
  return (
    <section id="updates" aria-labelledby="public-updates-title" className="scroll-mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="px-5 py-5 sm:px-6">
        <h2 id="public-updates-title" className="text-sm font-semibold">Recent applications</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">The latest shared applications, most recently updated first.</p>
      </div>
      {applications.length ? <>
        <div aria-hidden="true" className="hidden grid-cols-[minmax(0,1fr)_11rem_5rem] gap-4 border-t border-slate-100 bg-slate-50/70 px-6 py-2.5 text-[11px] font-medium text-slate-500 sm:grid"><span>Company & role</span><span>Status</span><span className="text-right">Updated</span></div>
        <ul>{applications.map((application, index) => <PublicStatusApplicationRow key={`${application.id}-${index}`} application={application} />)}</ul>
        <p className="border-t border-slate-100 px-5 py-3 text-xs leading-5 text-slate-500 sm:px-6">Showing the {applications.length === 1 ? "latest application" : `latest ${applications.length} applications`} · Public updates only</p>
      </> : <div className="flex flex-col items-center border-t border-slate-100 px-5 py-12 text-center">
        <span className="flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-500"><HugeiconsIcon icon={Briefcase01Icon} className="size-5" aria-hidden="true" /></span>
        <h3 className="mt-4 text-sm font-semibold">No public applications yet</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Shared applications will appear here when there&apos;s an update.</p>
      </div>}
    </section>
  );
}
