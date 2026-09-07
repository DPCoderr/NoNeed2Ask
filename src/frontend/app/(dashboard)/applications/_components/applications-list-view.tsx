import type { ReactNode } from "react";
import type { ApplicationListResponseDto, ApplicationStatus, PrivateApplicationDto } from "@/lib/api/types";
import type { ResolvedApplicationListRequest } from "../_lib/application-list-query";
import type { SortChange } from "./applications-toolbar/types";
import { ApplicationsToolbar } from "./applications-toolbar/applications-toolbar";
import { ApplicationsResults } from "./applications-results/applications-results";
import { ApplicationsListState } from "./applications-results/applications-list-state";

export type ApplicationsListActions = {
  changeSearch: (search: string) => void;
  changeStatus: (status: ApplicationStatus[]) => void;
  changeSort: (sort: SortChange) => void;
  changePage: (page: number) => void;
  prefetchPage: (page: number) => void;
};

export function ApplicationsListView({ applications, request, actions, isLoading = false, isFetching, isError = false, onRetry, renderActions }: {
  applications: ApplicationListResponseDto;
  request: ResolvedApplicationListRequest;
  actions: ApplicationsListActions;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  onRetry: () => void;
  renderActions?: (application: PrivateApplicationDto) => ReactNode;
}) {
  const hasFilters = Boolean(request.search || request.status.length);
  return (
    <section aria-label="Application list" className="@container overflow-hidden rounded-xl border border-slate-200/90 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-5 sm:px-6">
        <h2 id="applications-list-title" tabIndex={-1} className="flex items-center gap-2.5 text-sm font-semibold outline-none">
          {hasFilters ? "Filtered applications" : "All applications"}
          {!isLoading && !isError && <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 tabular-nums">{applications.totalItems}</span>}
        </h2>
        <span role="status" className="text-xs text-slate-500">{isFetching && !isLoading ? "Updating…" : null}</span>
      </div>
      <ApplicationsToolbar request={request} onSearchChange={actions.changeSearch} onStatusChange={actions.changeStatus} onSortChange={actions.changeSort} />
      {isError && applications.items.length > 0 && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 border-t border-amber-100 bg-amber-50 px-6 py-3 text-xs text-amber-900">We couldn’t refresh your applications. Showing the last available results.<button type="button" onClick={onRetry} className="min-h-11 rounded px-2 font-semibold underline focus-visible:ring-2">Try again</button></div>}
      {isLoading || (isError && !applications.items.length) ? (
        <ApplicationsListState state={isLoading ? "loading" : "error"} onRetry={onRetry} />
      ) : (
        <ApplicationsResults applications={applications} onPageChange={actions.changePage} onPagePrefetch={actions.prefetchPage} hasFilters={hasFilters} renderActions={renderActions} />
      )}
    </section>
  );
}
