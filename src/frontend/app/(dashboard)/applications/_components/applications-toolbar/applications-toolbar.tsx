"use client";

import type { ApplicationStatus } from "@/lib/api/types";
import type { ResolvedApplicationListRequest } from "../../_lib/application-list-query";
import { ApplicationsSearchField } from "./search-field";
import { ApplicationsSortControls } from "./sort-controls";
import { ApplicationsStatusFilters } from "./status-filters";
import type { SortChange } from "./types";

export function ApplicationsToolbar({ onSearchChange, onSortChange, onStatusChange, request }: {
  onSearchChange: (search: string) => void;
  onSortChange: (next: SortChange) => void;
  onStatusChange: (status: ApplicationStatus[]) => void;
  request: ResolvedApplicationListRequest;
}) {
  return (
    <div className="space-y-4 px-4 pb-4 pt-5 sm:px-6">
      <div className="grid min-w-0 gap-3 @min-[740px]:grid-cols-[minmax(0,1fr)_auto]">
        <ApplicationsSearchField key={request.search} onSearchChange={onSearchChange} request={request} />
        <ApplicationsSortControls onSortChange={onSortChange} sortBy={request.sortBy} sortDirection={request.sortDirection} />
      </div>
      <ApplicationsStatusFilters onStatusChange={onStatusChange} request={request} />
    </div>
  );
}
