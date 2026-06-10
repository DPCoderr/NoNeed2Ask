import type {
  ApplicationListSortBy,
  ApplicationListSortDirection,
} from "@/lib/api/types"

export type SortChange = {
  sortBy?: ApplicationListSortBy
  sortDirection?: ApplicationListSortDirection
}
