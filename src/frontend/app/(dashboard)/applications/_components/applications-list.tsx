"use client"

import { useApplicationsList } from "../_lib/use-applications-list"
import { ApplicationsResults } from "./applications-results/applications-results"
import { ApplicationsToolbar } from "./applications-toolbar/applications-toolbar"

// Composes the applications list page from data state and focused view sections.
export function ApplicationsList() {
  const { actions, applications, isError, request } = useApplicationsList()

  return (
    <>
      {/* <ApplicationsStatusSummary applications={applications.items} /> */}

      {isError ? (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          We could not load your applications right now.
        </div>
      ) : null}

      <ApplicationsToolbar
        onSearchChange={actions.changeSearch}
        onSortChange={actions.changeSort}
        onStatusChange={actions.changeStatus}
        request={request}
      />
      <ApplicationsResults
        applications={applications}
        onPageChange={actions.changePage}
        onPagePrefetch={actions.prefetchPage}
      />
    </>
  )
}
