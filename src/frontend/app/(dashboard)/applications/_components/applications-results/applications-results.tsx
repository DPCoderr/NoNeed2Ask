import type { ReactNode } from "react";
import type { ApplicationListResponseDto, PrivateApplicationDto } from "@/lib/api/types";
import { ApplicationActionsMenu } from "./application-actions-menu";
import { ApplicationsPagination } from "./applications-pagination";
import { ApplicationsTable } from "./applications-table";
import { MobileApplicationsList } from "./mobile-applications-list";
import { ApplicationsListState } from "./applications-list-state";

export function ApplicationsResults({ applications, onPageChange, onPagePrefetch, hasFilters = false, renderActions = (application) => <ApplicationActionsMenu application={application} /> }: {
  applications: ApplicationListResponseDto;
  onPageChange: (page: number) => void;
  onPagePrefetch: (page: number) => void;
  hasFilters?: boolean;
  renderActions?: (application: PrivateApplicationDto) => ReactNode;
}) {
  return (
    <>
      {applications.items.length ? (
        <>
          <ApplicationsTable applications={applications.items} renderActions={renderActions} />
          <MobileApplicationsList applications={applications.items} renderActions={renderActions} />
        </>
      ) : <ApplicationsListState state={hasFilters ? "no-results" : "empty"} />}
      <ApplicationsPagination applications={applications} onPageChange={onPageChange} onPagePrefetch={onPagePrefetch} />
    </>
  );
}
