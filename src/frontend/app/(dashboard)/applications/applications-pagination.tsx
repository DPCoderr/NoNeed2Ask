"use client"

import type { ApplicationListResponseDto } from "@/lib/api/types"

function getShowingText(applications: ApplicationListResponseDto) {
  if (applications.totalItems === 0) {
    return "Showing 0 applications"
  }

  const start = (applications.page - 1) * applications.pageSize + 1
  const end = start + applications.items.length - 1

  return `Showing ${start}-${end} of ${applications.totalItems} applications`
}

export function ApplicationsPagination({
  applications,
  onPageChange,
  onPagePrefetch,
}: {
  applications: ApplicationListResponseDto
  onPageChange: (page: number) => void
  onPagePrefetch: (page: number) => void
}) {
  const totalPages = applications.totalPages
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
    if (totalPages <= 5) {
      return index + 1
    }

    const start = Math.min(Math.max(applications.page - 2, 1), totalPages - 4)

    return start + index
  })

  return (
    <div className="flex flex-col gap-3 border-t border-blue-950/10 px-5 py-4 text-sm font-medium text-blue-950/75 sm:flex-row sm:items-center sm:justify-between">
      <p>{getShowingText(applications)}</p>
      <div className="flex items-center gap-2">
        <button
          aria-disabled={applications.page <= 1}
          className={`grid size-9 place-items-center rounded-lg border border-blue-100 bg-white text-blue-950 ${
            applications.page <= 1 ? "pointer-events-none opacity-45" : ""
          }`}
          onFocus={() => onPagePrefetch(Math.max(applications.page - 1, 1))}
          onMouseEnter={() => onPagePrefetch(Math.max(applications.page - 1, 1))}
          onClick={() => onPageChange(Math.max(applications.page - 1, 1))}
          type="button"
        >
          {"<"}
        </button>
        {pages.map((page) => (
          <button
            className={`grid size-9 place-items-center rounded-lg ${
              page === applications.page ? "bg-blue-700 text-white" : "text-blue-950"
            }`}
            key={page}
            onFocus={() => onPagePrefetch(page)}
            onMouseEnter={() => onPagePrefetch(page)}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        ))}
        <button
          aria-disabled={applications.page >= totalPages}
          className={`grid size-9 place-items-center rounded-lg border border-blue-100 bg-white text-blue-950 ${
            applications.page >= totalPages ? "pointer-events-none opacity-45" : ""
          }`}
          onFocus={() =>
            onPagePrefetch(Math.min(applications.page + 1, Math.max(totalPages, 1)))
          }
          onMouseEnter={() =>
            onPagePrefetch(Math.min(applications.page + 1, Math.max(totalPages, 1)))
          }
          onClick={() =>
            onPageChange(Math.min(applications.page + 1, Math.max(totalPages, 1)))
          }
          type="button"
        >
          {">"}
        </button>
      </div>
      <p>10 per page</p>
    </div>
  )
}
