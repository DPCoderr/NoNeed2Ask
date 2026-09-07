import type { ApplicationStatus } from "@/lib/api/types";
import { statusDetails, statuses } from "../../application-list-config";
import type { ResolvedApplicationListRequest } from "../../_lib/application-list-query";

function toggleStatus(current: ApplicationStatus[], status: ApplicationStatus) {
  return current.includes(status) ? current.filter((item) => item !== status) : [...current, status];
}
const filterClass = "min-h-11 rounded-md px-2.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 aria-pressed:bg-[#edf3fa] aria-pressed:text-[#315e96] hover:bg-slate-100";

export function ApplicationsStatusFilters({ onStatusChange, request }: {
  onStatusChange: (status: ApplicationStatus[]) => void;
  request: ResolvedApplicationListRequest;
}) {
  return (
    <div role="group" aria-label="Filter by status" className="flex flex-wrap items-center gap-x-1 gap-y-1 text-slate-600">
      <button className={filterClass} aria-pressed={!request.status.length} onClick={() => onStatusChange([])} type="button">All statuses</button>
      {statuses.map((status) => (
        <button className={filterClass} aria-pressed={request.status.includes(status)} key={status} onClick={() => onStatusChange(toggleStatus(request.status, status))} type="button">{statusDetails[status].label}</button>
      ))}
      {request.status.length > 0 && <button className="min-h-11 rounded px-2.5 text-xs text-slate-500 underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-blue-600" onClick={() => onStatusChange([])} type="button">Clear filters</button>}
    </div>
  );
}
