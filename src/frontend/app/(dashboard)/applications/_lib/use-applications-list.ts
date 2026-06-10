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

import { pageSize } from "../application-list-config"
import {
  applicationListParsers,
  applicationListQueryKey,
  toApplicationListRequest,
  type ResolvedApplicationListRequest,
} from "./application-list-query"

type SortChange = {
  sortBy?: ApplicationListSortBy
  sortDirection?: ApplicationListSortDirection
}

// Lets the UI render immediately while the first page is still loading.
function emptyApplicationPage(page: number): ApplicationListResponseDto {
  return {
    items: [],
    page,
    pageSize,
    totalItems: 0,
    totalPages: 0,
  }
}

// Owns the URL state, API request, and list actions used by the page component.
export function useApplicationsList() {
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

  // Changing a filter or sort resets to page 1 unless a page is passed in.
  function updateRequest(
    next: Partial<Omit<ResolvedApplicationListRequest, "pageSize">>
  ) {
    void setQuery({
      ...next,
      page: next.page ?? 1,
    })
  }

  // Warms the cache for nearby pages when users hover or focus pagination.
  function prefetchPage(page: number) {
    if (page === request.page || page < 1) {
      return
    }

    const nextRequest = {
      ...request,
      page,
    }

    void queryClient.prefetchQuery({
      queryKey: applicationListQueryKey(nextRequest),
      queryFn: () => listApplications(nextRequest),
    })
  }

  return {
    applications: applicationsQuery.data ?? emptyApplicationPage(request.page),
    isError: applicationsQuery.isError,
    request,
    actions: {
      changePage: (page: number) => updateRequest({ page }),
      changeSearch: (search: string) => updateRequest({ search: search.trim() }),
      changeSort: (sort: SortChange) => updateRequest(sort),
      changeStatus: (status: ApplicationStatus[]) => updateRequest({ status }),
      prefetchPage,
    },
  }
}
