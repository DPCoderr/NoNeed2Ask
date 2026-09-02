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
      className="min-w-0 scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-[0_28px_80px_-58px_rgb(30_64_175_/_0.55)] sm:p-7 lg:p-8"
      id={id}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <DashboardGlyph className="size-5" name="contour" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">Your route</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">
              Application pipeline
            </h2>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">{total}</p>
          <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-blue-950/42">in total</p>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-blue-950/58">
        {description}
      </p>

      <div className="mt-7 rounded-2xl bg-[#f5faff] p-3 ring-1 ring-inset ring-blue-100 sm:p-4">
        <div
        aria-label={`${total} applications distributed across ${stages.length} statuses`}
        className="flex h-2.5 w-full overflow-hidden rounded-full bg-blue-950/8"
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
      </div>

      <div className="relative mt-7 grid grid-cols-2 gap-x-5 gap-y-0 md:grid-cols-3 xl:grid-cols-6 xl:gap-x-3">
        {stages.map((stage) => {
          return (
            <div
              className="relative min-w-0 border-t border-blue-100 py-4 xl:border-t-0 xl:pt-1"
              key={stage.label}
            >
              <div
                className="flex min-h-10 items-center gap-2"
              >
                <span className={`size-2.5 shrink-0 rounded-full ${stage.barClassName}`} />
                <DashboardGlyph
                  className={`hidden size-4 shrink-0 sm:block ${stage.iconClassName}`}
                  name={stage.icon}
                />
                <p className="min-w-0 text-xs font-semibold leading-4 text-blue-950/65">
                  {stage.label}
                </p>
              </div>
              <div className="flex items-baseline gap-2 pl-[1.125rem] tabular-nums sm:pl-6">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                  {stage.count}
                </p>
                <p className="text-[0.68rem] font-semibold text-blue-950/38">
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
