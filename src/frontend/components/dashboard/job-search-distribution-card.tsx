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
      className="min-w-0 scroll-mt-28 rounded-3xl border border-blue-950/8 bg-white/92 p-5 shadow-[0_22px_70px_-50px_rgb(15_23_42_/_0.38)] backdrop-blur-xl sm:p-7 lg:p-8"
      id={id}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
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
        className="mt-7 flex h-2.5 w-full overflow-hidden rounded-full bg-blue-950/8"
        role="img"
      >
        {stages.map((stage) => (
          <span
            className={stage.barClassName}
            key={stage.label}
            style={{ width: `${stage.percent}%` }}
          />
        ))}
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {stages.map((stage) => {
          return (
            <div
              className="min-w-0 overflow-hidden rounded-2xl border border-blue-950/8 bg-white"
              key={stage.label}
            >
              <div
                className={`flex min-h-14 items-center gap-2.5 border-b border-black/5 px-3 py-3 sm:px-4 ${stage.headerClassName}`}
              >
                <DashboardGlyph
                  className={`size-5 shrink-0 ${stage.iconClassName}`}
                  name={stage.icon}
                />
                <p className="min-w-0 text-sm font-semibold leading-5">
                  {stage.label}
                </p>
              </div>
              <div className="flex items-baseline gap-2 px-3 py-4 tabular-nums sm:px-4 sm:py-5">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">
                  {stage.count}
                </p>
                <p className="text-xs font-semibold text-blue-950/42">
                  {stage.percent}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
