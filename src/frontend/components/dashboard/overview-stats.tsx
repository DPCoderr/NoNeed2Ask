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
    <article className="flex min-w-0 items-center gap-3 px-4 py-4 sm:px-5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <DashboardGlyph
          className={`size-5 sm:size-5.5 ${tone}`}
          name={icon}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="truncate text-sm font-semibold text-blue-950/75">
            {title}
          </h2>
          <p className="text-2xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <p className="mt-0.5 truncate text-xs font-medium text-blue-950/55">
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
      className="grid overflow-hidden rounded-2xl border border-blue-950/8 bg-white/88 shadow-[0_18px_55px_-42px_rgb(15_23_42_/_0.32)] backdrop-blur-xl sm:grid-cols-2 xl:grid-cols-4 [&>article:not(:first-child)]:border-t [&>article]:border-blue-950/7 sm:[&>article:nth-child(2)]:border-t-0 sm:[&>article:nth-child(even)]:border-l xl:[&>article]:border-l xl:[&>article]:border-t-0 xl:[&>article:first-child]:border-l-0"
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
