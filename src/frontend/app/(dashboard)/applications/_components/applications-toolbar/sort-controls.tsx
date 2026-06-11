import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type {
  ApplicationListSortBy,
  ApplicationListSortDirection,
} from "@/lib/api/types"

import { sortOptions } from "../../application-list-config"
import type { SortChange } from "./types"

const sortDirectionOptions = [
  { label: "Descending", value: "desc" },
  { label: "Ascending", value: "asc" },
] satisfies { label: string; value: ApplicationListSortDirection }[]

// Dropdown controls for choosing the server-side sort column and direction.
export function ApplicationsSortControls({
  onSortChange,
  sortBy,
  sortDirection,
}: {
  onSortChange: (next: SortChange) => void
  sortBy: ApplicationListSortBy
  sortDirection: ApplicationListSortDirection
}) {
  return (
    <div className="grid min-w-0 gap-2 sm:grid-cols-2 xl:w-[34rem]">
      <Select
        defaultValue={sortBy}
        onValueChange={(value) =>
          onSortChange({ sortBy: value as ApplicationListSortBy })
        }
      >
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              Sort by: {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={sortDirection}
        onValueChange={(value) =>
          onSortChange({
            sortDirection: value as ApplicationListSortDirection,
          })
        }
      >
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Direction" />
        </SelectTrigger>
        <SelectContent>
          {sortDirectionOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
