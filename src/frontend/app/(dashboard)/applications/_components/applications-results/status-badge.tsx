import { normalizeApplicationStatus } from "@/lib/api/application-status";
import type { ApplicationStatus } from "@/lib/api/types";
import { dashboardStatusMeta } from "@/components/dashboard/dashboard-status-meta";

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const details = dashboardStatusMeta[normalizeApplicationStatus(status)];
  return (
    <span className={`inline-flex max-w-full items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${details.iconBackgroundClassName} ${details.iconClassName}`}>
      <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-current" />
      {details.label}
    </span>
  );
}
