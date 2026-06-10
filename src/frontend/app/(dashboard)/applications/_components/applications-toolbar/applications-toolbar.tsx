"use client"

import type { ApplicationStatus } from "@/lib/api/types"

import type { ResolvedApplicationListRequest } from "../../_lib/application-list-query"
import { ApplicationsSearchField } from "./search-field"
import { ApplicationsSortControls } from "./sort-controls"
import { ApplicationsStatusFilters } from "./status-filters"
import type { SortChange } from "./types"

// Groups all list controls: search, status filtering, and sorting.
export function ApplicationsToolbar({
  onSearchChange,
  onSortChange,
  onStatusChange,
  request,
}: {
  onSearchChange: (search: string) => void
  onSortChange: (next: SortChange) => void
  onStatusChange: (status: ApplicationStatus[]) => void
  request: ResolvedApplicationListRequest
}) {
  return (
    <section className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
        <div className="grid min-w-0 gap-3">
          <ApplicationsSearchField
            onSearchChange={onSearchChange}
            request={request}
          />
          <ApplicationsStatusFilters
            onStatusChange={onStatusChange}
            request={request}
          />
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
