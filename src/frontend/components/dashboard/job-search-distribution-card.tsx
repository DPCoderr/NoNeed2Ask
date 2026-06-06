import { Button } from "@/components/ui/button";
import {
  pipelineStages,
  pipelineTotal,
} from "@/components/dashboard/dashboard-data";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

export function JobSearchDistributionCard() {
  return (
    <article className="rounded-xl border border-white/80 bg-white/78 p-6 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <DashboardIcon
            alt=""
            className="size-9 shrink-0 text-blue-800"
            name="MountainMark.svg"
          />
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-normal text-slate-950">
              Job Search Distribution
            </h2>
            <p className="mt-1 text-sm font-medium text-blue-950/75">
              Where all your applications stand right now.
            </p>
          </div>
        </div>
        <Button
          className="h-9 rounded-lg border-blue-100 bg-white/70 px-4 text-sm font-semibold text-slate-950 hover:bg-white"
          size="sm"
          variant="outline"
        >
          All time
          <span aria-hidden="true" className="ml-2 text-blue-900">
            v
          </span>
        </Button>
      </div>

      <div className="mt-7 space-y-5">
        {pipelineStages.map((stage) => (
          <div
            className="grid grid-cols-[2.75rem_minmax(8.5rem,1fr)] items-center gap-3 sm:grid-cols-[3rem_9.5rem_minmax(10rem,1fr)_2rem_2.75rem]"
            key={stage.label}
          >
            <DashboardIcon
              alt=""
              className="size-9 text-blue-700"
              name={stage.icon}
            />
            <p className="min-w-0 text-sm font-semibold text-slate-950">
              {stage.label}
            </p>
            <div className="col-span-2 h-2.5 overflow-hidden rounded-full bg-blue-950/10 sm:col-span-1">
              <div
                aria-label={`${stage.label}: ${stage.percent}%`}
                className={`h-full rounded-full ${stage.barClassName}`}
                role="img"
                style={{ width: `${stage.percent}%` }}
              />
            </div>
            <p className="text-right text-lg font-semibold tracking-normal text-slate-950">
              {stage.count}
            </p>
            <p className="text-right text-sm font-semibold text-blue-950/70">
              {stage.percent}%
            </p>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-blue-950/10 pt-4 text-sm font-semibold text-slate-950">
          <span>Total</span>
          <span>{pipelineTotal} applications</span>
        </div>
      </div>
    </article>
  );
}
