import {
  parseAsInteger,
  parseAsNativeArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs"

import type { ApplicationListRequestDto } from "@/lib/api/types"

import { pageSize, sortDirections, sortValues, statuses } from "./application-list-config"

export type ResolvedApplicationListRequest = Required<ApplicationListRequestDto> & {
  pageSize: number
}

export const applicationListParsers = {
  page: parseAsInteger.withDefault(1),
  status: parseAsNativeArrayOf(parseAsStringLiteral(statuses)).withDefault([]),
  search: parseAsString.withDefault(""),
  sortBy: parseAsStringLiteral(sortValues).withDefault("lastUpdated"),
  sortDirection: parseAsStringLiteral(sortDirections).withDefault("desc"),
}

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

export function applicationListQueryKey(request: ApplicationListRequestDto) {
  return [
    "applications",
    {
      page: request.page ?? 1,
      search: request.search?.trim() ?? "",
      sortBy: request.sortBy ?? "lastUpdated",
      sortDirection: request.sortDirection ?? "desc",
      status: request.status ?? [],
    },
  ] as const
}
