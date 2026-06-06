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
    <article className="rounded-xl border border-white/80 bg-white/78 p-6 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-5">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-blue-950">{title}</h2>
          <p className="mt-4 text-4xl font-semibold tracking-normal text-slate-950">
            {value}
          </p>
          <div className="mt-2 space-y-1 text-sm font-medium leading-5 text-blue-950/75">
            {detail.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-blue-100/70">
          <DashboardIcon
            alt=""
            className={`size-16 ${tone}`}
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
    <section className="grid gap-4 pt-2 lg:grid-cols-3">
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
