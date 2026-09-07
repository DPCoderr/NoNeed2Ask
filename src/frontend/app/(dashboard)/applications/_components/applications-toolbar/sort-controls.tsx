import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ApplicationListSortBy, ApplicationListSortDirection } from "@/lib/api/types";
import { sortOptions } from "../../application-list-config";
import type { SortChange } from "./types";

export function ApplicationsSortControls({ onSortChange, sortBy, sortDirection }: {
  onSortChange: (next: SortChange) => void;
  sortBy: ApplicationListSortBy;
  sortDirection: ApplicationListSortDirection;
}) {
  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-2 @min-[740px]:w-[310px]">
      <Select value={sortBy} onValueChange={(value) => onSortChange({ sortBy: value as ApplicationListSortBy })}>
        <SelectTrigger aria-label="Sort applications by" className="h-11! w-full rounded-lg border-slate-200 bg-white text-xs text-slate-600 shadow-none"><SelectValue /></SelectTrigger>
        <SelectContent className="rounded-lg">
          {sortOptions.map((option) => <SelectItem key={option.value} value={option.value}>Sort: {option.label}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={sortDirection} onValueChange={(value) => onSortChange({ sortDirection: value as ApplicationListSortDirection })}>
        <SelectTrigger aria-label="Sort direction" className="h-11! w-full rounded-lg border-slate-200 bg-white text-xs text-slate-600 shadow-none"><SelectValue /></SelectTrigger>
        <SelectContent className="rounded-lg"><SelectItem value="desc">Descending</SelectItem><SelectItem value="asc">Ascending</SelectItem></SelectContent>
      </Select>
    </div>
  );
}
