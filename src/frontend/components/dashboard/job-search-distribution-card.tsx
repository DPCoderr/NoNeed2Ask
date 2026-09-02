import type { PipelineStage } from "@/components/dashboard/dashboard-data";
import { DashboardGlyph } from "@/components/dashboard/dashboard-glyph";

export function JobSearchDistributionCard({
  description = "Where all your applications stand right now.",
  id,
  stages,
  total,
}: {
  description?: string;
  id?: string;
  stages: PipelineStage[];
  total: number;
}) {
  return (
    <section
      className="min-w-0 scroll-mt-28 rounded-2xl border border-blue-950/9 bg-white/90 p-5 shadow-[0_24px_75px_-52px_rgb(15_23_42_/_0.42)] backdrop-blur-xl sm:p-7 lg:p-8"
      id={id}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-950/8">
            <DashboardGlyph className="size-5" name="contour" />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">
              Application pipeline
            </h2>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">{total}</p>
          <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-blue-950/42">Applications</p>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-blue-950/58">
        {description}
      </p>

      <div
        aria-label={`${total} applications distributed across ${stages.length} statuses`}
        className="mt-8 grid gap-0 md:grid-cols-6"
        role="img"
      >
        {stages.map((stage) => {
          return (
            <div
              className="group/stage relative grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 pb-7 last:pb-0 after:absolute after:left-[1.35rem] after:top-10 after:h-[calc(100%-2rem)] after:w-px after:bg-blue-950/12 last:after:hidden md:block md:px-2 md:pb-0 md:text-center md:after:left-[calc(50%+1.4rem)] md:after:top-[1.35rem] md:after:h-px md:after:w-[calc(100%-2.8rem)]"
              key={stage.label}
            >
              <div className={`relative z-10 flex size-11 items-center justify-center rounded-full ring-4 ring-white md:mx-auto ${stage.headerClassName}`}>
                <DashboardGlyph
                  className={`size-5 ${stage.iconClassName}`}
                  name={stage.icon}
                />
              </div>
              <div className="min-w-0 md:mt-4">
                <p className="text-sm font-semibold leading-5 text-slate-950">
                  {stage.label}
                </p>
                <p className="mt-0.5 text-xs font-medium text-blue-950/45 md:hidden">
                  {stage.percent}% of pipeline
                </p>
              </div>
              <div className="flex items-baseline gap-1.5 tabular-nums md:mt-2 md:justify-center">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                  {stage.count}
                </p>
                <p className="hidden text-xs font-semibold text-blue-950/42 md:block">
                  {stage.percent}%
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex h-1.5 w-full overflow-hidden rounded-full bg-blue-950/8">
        {stages.map((stage) => (
          <span
            className={stage.barClassName}
            key={stage.label}
            style={{ width: `${stage.percent}%` }}
          />
        ))}
      </div>
    </section>
  );
}
