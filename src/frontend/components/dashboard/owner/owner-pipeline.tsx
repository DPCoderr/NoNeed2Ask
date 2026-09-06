import type { PipelineStage } from "../dashboard-types";

export function OwnerPipeline({ stages, total }: { stages: PipelineStage[]; total: number }) {
  return (
    <section aria-labelledby="pipeline-title" className="h-full rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 id="pipeline-title" className="text-sm font-semibold">Application overview</h2>
        <span className="text-xs text-slate-500">All time</span>
      </div>
      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.055em] tabular-nums">{total}</span>
        <span className="text-sm text-slate-500">total applications</span>
      </div>
      <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-slate-100" role="img" aria-label={`${total} applications distributed across ${stages.length} statuses`}>
        {stages.map((stage) => (
          <span key={stage.label} className={`${stage.barClassName} opacity-75`} style={{ flexGrow: stage.count, flexBasis: 0 }} />
        ))}
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.label} className="min-w-0">
            <dt className="flex items-center gap-2 text-xs leading-5 text-slate-600">
              <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full opacity-75 ${stage.barClassName}`} />
              {stage.label}
            </dt>
            <dd className="mt-1 flex items-baseline gap-2 pl-3.5 tabular-nums">
              <span className="text-xl font-semibold tracking-tight">{stage.count}</span>
              <span className="text-xs text-slate-500">{stage.percent}%</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
