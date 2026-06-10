import type { ApplicationListResponseDto } from "@/lib/api/types"

import { ApplicationsPagination } from "./applications-pagination"
import { ApplicationsTable } from "./applications-table"
import { MobileApplicationsList } from "./mobile-applications-list"

// Chooses the desktop table, mobile cards, and mobile pagination layout.
export function ApplicationsResults({
  applications,
  onPageChange,
  onPagePrefetch,
}: {
  applications: ApplicationListResponseDto
  onPageChange: (page: number) => void
  onPagePrefetch: (page: number) => void
}) {
  return (
    <>
      <ApplicationsTable
        applications={applications}
        onPageChange={onPageChange}
        onPagePrefetch={onPagePrefetch}
      />
      <MobileApplicationsList applications={applications.items} />

      <div className="lg:hidden">
        <ApplicationsPagination
          applications={applications}
          onPageChange={onPageChange}
          onPagePrefetch={onPagePrefetch}
        />
      </div>
    </>
  )
}
