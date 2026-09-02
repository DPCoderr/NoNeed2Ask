import {
  parseAsInteger,
  parseAsNativeArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs"

import type { ApplicationListRequestDto } from "@/lib/api/types"
import { queryKeys } from "@/lib/query-keys"

import {
  pageSize,
  sortDirections,
  sortValues,
  statuses,
} from "../application-list-config"

export type ResolvedApplicationListRequest = Required<ApplicationListRequestDto> & {
  pageSize: number
}

// Keeps URL search params typed and defaulted before we build an API request.
export const applicationListParsers = {
  page: parseAsInteger.withDefault(1),
  status: parseAsNativeArrayOf(parseAsStringLiteral(statuses)).withDefault([]),
  search: parseAsString.withDefault(""),
  sortBy: parseAsStringLiteral(sortValues).withDefault("lastUpdated"),
  sortDirection: parseAsStringLiteral(sortDirections).withDefault("desc"),
}

// Normalizes URL state into the exact request shape expected by the API.
export function toApplicationListRequest(
  query: Omit<ResolvedApplicationListRequest, "pageSize">
): ResolvedApplicationListRequest {
  return {
    ...query,
    page: query.page > 0 ? query.page : 1,
    pageSize,
    search: query.search.trim(),
  }
}

// Gives React Query a stable cache key for each filter/sort/page combination.
export function applicationListQueryKey(request: ApplicationListRequestDto) {
  return queryKeys.applications.list(request)
}
