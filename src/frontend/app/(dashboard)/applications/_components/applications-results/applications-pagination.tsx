import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ApplicationListResponseDto } from "@/lib/api/types";

function getShowingText(applications: ApplicationListResponseDto) {
  if (!applications.totalItems) return "0 applications";
  const start = (applications.page - 1) * applications.pageSize + 1;
  return `${start}–${start + applications.items.length - 1} of ${applications.totalItems} applications`;
}
const buttonClass = "grid size-8 shrink-0 place-items-center rounded-md text-xs text-slate-600 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-35 disabled:hover:bg-transparent sm:size-9";

export function ApplicationsPagination({ applications, onPageChange, onPagePrefetch }: {
  applications: ApplicationListResponseDto;
  onPageChange: (page: number) => void;
  onPagePrefetch: (page: number) => void;
}) {
  const totalPages = applications.totalPages;
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
    if (totalPages <= 5) return index + 1;
    return Math.min(Math.max(applications.page - 2, 1), totalPages - 4) + index;
  });
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 px-4 py-4 sm:px-6">
      <p role="status" className="text-xs text-slate-500 tabular-nums">{getShowingText(applications)}</p>
      <nav aria-label="Application pages" className="flex items-center gap-0.5 sm:gap-1">
        <button aria-label="Previous page" disabled={applications.page <= 1} className={buttonClass} onFocus={() => onPagePrefetch(Math.max(applications.page - 1, 1))} onMouseEnter={() => onPagePrefetch(Math.max(applications.page - 1, 1))} onClick={() => onPageChange(Math.max(applications.page - 1, 1))} type="button"><HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" aria-hidden="true" /></button>
        {pages.map((page) => <button aria-label={`Page ${page}`} aria-current={page === applications.page ? "page" : undefined} className={`${buttonClass} aria-[current=page]:bg-[#edf3fa] aria-[current=page]:font-semibold aria-[current=page]:text-[#315e96]`} key={page} onFocus={() => onPagePrefetch(page)} onMouseEnter={() => onPagePrefetch(page)} onClick={() => onPageChange(page)} type="button">{page}</button>)}
        <button aria-label="Next page" disabled={applications.page >= totalPages} className={buttonClass} onFocus={() => onPagePrefetch(Math.min(applications.page + 1, Math.max(totalPages, 1)))} onMouseEnter={() => onPagePrefetch(Math.min(applications.page + 1, Math.max(totalPages, 1)))} onClick={() => onPageChange(Math.min(applications.page + 1, Math.max(totalPages, 1)))} type="button"><HugeiconsIcon icon={ArrowRight01Icon} className="size-4" aria-hidden="true" /></button>
      </nav>
      <p className="text-xs text-slate-500">{applications.pageSize} per page</p>
    </footer>
  );
}
