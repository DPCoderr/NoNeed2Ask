import type { OverviewStat } from "@/components/dashboard/dashboard-types";
import { OverviewStatCard } from "@/components/dashboard/overview-stat-card";

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
        <OverviewStatCard
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
