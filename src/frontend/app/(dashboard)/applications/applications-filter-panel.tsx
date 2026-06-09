"use client"

import type { ApplicationStatus } from "@/lib/api/types"

import { statusDetails, statuses } from "./application-list-config"
import type { ResolvedApplicationListRequest } from "./application-list-query"
import { ApplicationsSearchField } from "./applications-search-field"
import { ApplicationsSortControls } from "./applications-sort-controls"

function toggleStatus(
  currentStatuses: ApplicationStatus[],
  status: ApplicationStatus
) {
  if (currentStatuses.includes(status)) {
    return currentStatuses.filter((currentStatus) => currentStatus !== status)
  }

  return [...currentStatuses, status]
}

export function ApplicationsFilterPanel({
  onSearchChange,
  onSortChange,
  onStatusChange,
  request,
}: {
  onSearchChange: (search: string) => void
  onSortChange: Parameters<typeof ApplicationsSortControls>[0]["onSortChange"]
  onStatusChange: (status: ApplicationStatus[]) => void
  request: ResolvedApplicationListRequest
}) {
  return (
    <section className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
        <div className="grid min-w-0 gap-3">
          <ApplicationsSearchField
            onSearchChange={onSearchChange}
            placeholder="Search applications, companies, roles..."
            request={request}
          />
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
        </div>

        <ApplicationsSortControls
          onSortChange={onSortChange}
          sortBy={request.sortBy}
          sortDirection={request.sortDirection}
        />
      </div>
    </section>
  )
}
