import { overviewStats } from "@/components/dashboard/dashboard-data";
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
    <article className="rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 lg:p-6">
      <div className="flex items-center justify-between gap-3 sm:gap-5">
        <div className="min-w-0">
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
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-100/70 sm:size-20 lg:size-24">
          <DashboardIcon
            alt=""
            className={`size-10 sm:size-12 lg:size-16 ${tone}`}
            name={icon}
            priority
          />
        </div>
      </div>
    </article>
  );
}

export function OverviewStats() {
  return (
    <section className="grid gap-3 pt-1 sm:gap-4 sm:pt-2 lg:grid-cols-3">
      {overviewStats.map((stat) => (
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
