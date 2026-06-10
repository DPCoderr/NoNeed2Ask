import type { ApplicationStatus } from "@/lib/api/types"

import { statusDetails, statuses } from "../../application-list-config"
import type { ResolvedApplicationListRequest } from "../../_lib/application-list-query"

// Adds or removes one status from the active filter list.
function toggleStatus(
  currentStatuses: ApplicationStatus[],
  status: ApplicationStatus
) {
  if (currentStatuses.includes(status)) {
    return currentStatuses.filter((currentStatus) => currentStatus !== status)
  }

  return [...currentStatuses, status]
}

// Renders a chip for each status and keeps the selected statuses in URL state.
export function ApplicationsStatusFilters({
  onStatusChange,
  request,
}: {
  onStatusChange: (status: ApplicationStatus[]) => void
  request: ResolvedApplicationListRequest
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const isActive = request.status.includes(status)
        const details = statusDetails[status]

        return (
          <button
            className={`rounded-lg border px-3 py-2 text-xs font-semibold shadow-sm shadow-blue-950/5 ${
              isActive
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-blue-100 bg-white/78 text-blue-950 hover:bg-white"
            }`}
            key={status}
            onClick={() => onStatusChange(toggleStatus(request.status, status))}
            type="button"
          >
            {details.shortLabel ?? details.label}
          </button>
        )
      })}
      {request.status.length > 0 ? (
        <button
          className="ml-1 inline-flex items-center rounded-lg border border-transparent px-3 py-2 text-xs font-semibold text-blue-700 underline-offset-4 hover:bg-white/70 hover:underline"
          onClick={() => onStatusChange([])}
          type="button"
        >
          Clear status filters
        </button>
      ) : null}
    </div>
  )
}
