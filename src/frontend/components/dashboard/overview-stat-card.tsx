import {
  DashboardGlyph,
  type DashboardGlyphName,
} from "@/components/dashboard/dashboard-glyph"

export function OverviewStatCard({
  detail,
  icon,
  tone = "text-blue-700",
  title,
  value,
}: {
  detail: string[]
  icon: DashboardGlyphName
  tone?: string
  title: string
  value: number
}) {
  return (
    <article className="flex min-w-0 items-center gap-3 px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
        <DashboardGlyph className={`size-5 sm:size-5.5 ${tone}`} name={icon} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="truncate text-xs font-semibold uppercase tracking-[0.08em] text-blue-950/55">
            {title}
          </h2>
          <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
            {value}
          </p>
        </div>
        <p className="mt-1 truncate text-xs font-medium text-blue-950/50">
          {detail.join(" · ")}
        </p>
      </div>
    </article>
  )
}
