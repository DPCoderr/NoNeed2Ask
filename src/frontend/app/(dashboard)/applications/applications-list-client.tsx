"use client"

import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useQueryStates } from "nuqs"

import { listApplications } from "@/lib/api/applications"
import type {
  ApplicationListResponseDto,
  ApplicationListSortBy,
  ApplicationListSortDirection,
  ApplicationStatus,
} from "@/lib/api/types"

import { pageSize, statusDetails, statuses } from "./application-list-config"
import {
  applicationListParsers,
  applicationListQueryKey,
  toApplicationListRequest,
  type ResolvedApplicationListRequest,
} from "./application-list-query"
import { ApplicationsFilterPanel } from "./applications-filter-panel"
import { ApplicationsPagination } from "./applications-pagination"
import { ApplicationsTable } from "./applications-table"
import { MobileApplicationsList } from "./mobile-applications-list"
import { StatusCardCarousel } from "./status-card-carousel"

function createEmptyApplications(page: number): ApplicationListResponseDto {
  return {
    items: [],
    page,
    pageSize,
    totalItems: 0,
    totalPages: 0,
  }
}

export function ApplicationsListClient() {
  const queryClient = useQueryClient()
  const [query, setQuery] = useQueryStates(applicationListParsers, {
    history: "push",
    shallow: true,
  })
  const request = toApplicationListRequest(query)
  const applicationsQuery = useQuery({
    queryKey: applicationListQueryKey(request),
    queryFn: () => listApplications(request),
    placeholderData: keepPreviousData,
  })

  const applications =
    applicationsQuery.data ?? createEmptyApplications(request.page)

  function updateQuery(
    next: Partial<Omit<ResolvedApplicationListRequest, "pageSize">>
  ) {
    void setQuery({
      ...next,
      page: next.page ?? 1,
    })
  }

  function handleSearchChange(search: string) {
    updateQuery({ search: search.trim() })
  }

  function handleStatusChange(status: ApplicationStatus[]) {
    updateQuery({ status })
  }

  function handleSortChange(next: {
    sortBy?: ApplicationListSortBy
    sortDirection?: ApplicationListSortDirection
  }) {
    updateQuery(next)
  }

  function handlePageChange(page: number) {
    updateQuery({ page })
  }

  function handlePagePrefetch(page: number) {
    if (page === request.page || page < 1) {
      return
    }

    const adjacentRequest = {
      ...request,
      page,
    }

    void queryClient.prefetchQuery({
      queryKey: applicationListQueryKey(adjacentRequest),
      queryFn: () => listApplications(adjacentRequest),
    })
  }

  const statusCards = statuses.slice(0, 6).map((status) => ({
    icon: statusDetails[status].icon,
    label: statusDetails[status].label,
    shortLabel: statusDetails[status].shortLabel,
    value: applications.items.filter((application) => application.status === status).length,
  }))

  return (
    <>
      <StatusCardCarousel cards={statusCards} />

      {applicationsQuery.isError ? (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          We could not load your applications right now.
        </div>
      ) : null}

      <ApplicationsFilterPanel
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onStatusChange={handleStatusChange}
        request={request}
      />
      <ApplicationsTable
        applications={applications}
        onPageChange={handlePageChange}
        onPagePrefetch={handlePagePrefetch}
      />
      <MobileApplicationsList applications={applications.items} />

      <div className="lg:hidden">
        <ApplicationsPagination
          applications={applications}
          onPageChange={handlePageChange}
          onPagePrefetch={handlePagePrefetch}
        />
      </div>
    </>
  )
}
