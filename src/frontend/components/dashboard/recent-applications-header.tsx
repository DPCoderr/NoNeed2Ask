import Link from "next/link"

import { DashboardGlyph } from "@/components/dashboard/dashboard-glyph"
import { Button } from "@/components/ui/button"

export function RecentApplicationsHeader({
  showViewAll,
  title,
}: {
  showViewAll: boolean
  title: string
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <DashboardGlyph className="size-4.5" name="activity" />
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
            Activity log
          </p>
          <h2 className="mt-0.5 text-xl font-semibold tracking-[-0.025em] text-slate-950">
            {title}
          </h2>
        </div>
      </div>
      {showViewAll ? (
        <Button
          asChild
          className="h-10 w-fit shrink-0 rounded-xl border-blue-200 bg-white px-4 text-sm font-semibold text-blue-800 shadow-none hover:bg-blue-50"
          variant="outline"
        >
          <Link href="/applications">View all</Link>
        </Button>
      ) : null}
    </div>
  )
}
