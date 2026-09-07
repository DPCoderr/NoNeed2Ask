import type { PipelineStage } from "@/components/dashboard/dashboard-types";

export function PublicStatusJourney({ stages, total }: { stages: PipelineStage[]; total: number }) {
  return (
    <section id="journey" aria-labelledby="public-journey-title" className="min-w-0 scroll-mt-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="public-journey-title" className="text-sm font-semibold">The journey so far</h2>
        <span className="text-xs text-slate-500">Shared applications</span>
      </div>
      <p className="mt-6 flex items-baseline gap-3"><span className="text-[2.75rem] font-semibold leading-none tracking-[-0.055em] tabular-nums">{total}</span><span className="text-sm text-slate-500">{total === 1 ? "application" : "applications"}</span></p>
      <div className="mt-6 flex h-2 gap-0.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        {stages.map((stage) => <span key={stage.label} className={`${stage.barClassName} opacity-75`} style={{ flexGrow: stage.count, flexBasis: 0 }} />)}
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage) => <div key={stage.label} className="min-w-0">
          <dt className="flex items-center gap-2 text-xs leading-5 text-slate-600"><span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full opacity-75 ${stage.barClassName}`} />{stage.label}</dt>
          <dd className="mt-1 flex items-baseline gap-2 pl-3.5 tabular-nums"><span className="text-xl font-semibold tracking-tight">{stage.count}</span><span className="text-xs text-slate-500">{stage.percent}%</span></dd>
        </div>)}
      </dl>
    </section>
  );
}
