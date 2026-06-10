import type { OverviewStat } from "@/components/dashboard/dashboard-data";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

function StatCard({
  detail,
  icon,
  tone = "text-blue-700",
  title,
  value,
}: {
  detail: string[];
  icon: string;
  tone?: string;
  title: string;
  value: number;
}) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 lg:p-6">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-3/5 bg-gradient-to-l from-blue-200/90 via-blue-100/55 to-transparent" />
      <DashboardIcon
        alt=""
        className={`pointer-events-none absolute right-3 top-1/2 size-24 -translate-y-1/2 object-contain opacity-95 sm:right-4 sm:size-32 lg:right-2 lg:size-28 xl:right-4 xl:size-32 ${tone}`}
        name={icon}
        priority
      />
      <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-5">
        <div className="min-w-0 pr-24 sm:pr-36 lg:pr-24 xl:pr-32">
          <h2 className="text-sm font-semibold text-blue-950 sm:text-base">
            {title}
          </h2>
          <p className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:mt-4 sm:text-4xl">
            {value}
          </p>
          <div className="mt-1.5 space-y-0.5 text-xs font-medium leading-5 text-blue-950/75 sm:mt-2 sm:space-y-1 sm:text-sm">
            {detail.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function OverviewStats({ stats }: { stats: OverviewStat[] }) {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] gap-3 pt-1 sm:gap-4 sm:pt-2">
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
