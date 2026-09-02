import type { OverviewStat } from "@/components/dashboard/dashboard-data";
import {
  DashboardGlyph,
  type DashboardGlyphName,
} from "@/components/dashboard/dashboard-glyph";

function StatCard({
  detail,
  icon,
  tone = "text-blue-700",
  title,
  value,
}: {
  detail: string[];
  icon: DashboardGlyphName;
  tone?: string;
  title: string;
  value: number;
}) {
  return (
    <article className="flex min-w-0 items-center gap-3 px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
        <DashboardGlyph
          className={`size-5 sm:size-5.5 ${tone}`}
          name={icon}
        />
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
  );
}

export function OverviewStats({
  id,
  stats,
}: {
  id?: string;
  stats: OverviewStat[];
}) {
  return (
    <section
      aria-label="Application overview"
      className="grid overflow-hidden rounded-2xl border border-blue-100 bg-white/95 shadow-[0_24px_70px_-48px_rgb(30_64_175_/_0.55)] backdrop-blur lg:grid-cols-2 xl:grid-cols-4 [&>article:not(:first-child)]:border-t [&>article]:border-blue-100 lg:[&>article:nth-child(2)]:border-t-0 lg:[&>article:nth-child(even)]:border-l xl:[&>article]:border-l xl:[&>article]:border-t-0 xl:[&>article:first-child]:border-l-0"
      id={id}
    >
      {stats.map((stat) => (
        <StatCard
          detail={stat.detail}
          icon={stat.icon}
          key={stat.title}
          title={stat.title}
          tone={stat.tone}
          value={stat.value}
        />
      ))}
    </section>
  );
}
