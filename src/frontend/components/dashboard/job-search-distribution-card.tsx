import { Button } from "@/components/ui/button";
import {
  pipelineStages,
  pipelineTotal,
} from "@/components/dashboard/dashboard-data";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

export function JobSearchDistributionCard() {
  return (
    <article className="rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-4">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <DashboardIcon
            alt=""
            className="size-8 shrink-0 text-blue-800 sm:size-9"
            name="MountainMark.svg"
          />
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-normal text-slate-950 sm:text-xl">
              Job Search Distribution
            </h2>
            <p className="mt-0.5 text-xs font-medium text-blue-950/75 sm:mt-1 sm:text-sm">
              Where all your applications stand right now.
            </p>
          </div>
        </div>
        <Button
          className="h-8 rounded-lg border-blue-100 bg-white/70 px-3 text-xs font-semibold text-slate-950 hover:bg-white sm:h-9 sm:px-4 sm:text-sm"
          size="sm"
          variant="outline"
        >
          All time
          <span aria-hidden="true" className="ml-2 text-blue-900">
            v
          </span>
        </Button>
      </div>

      <div className="mt-5 space-y-4 sm:mt-7 sm:space-y-5">
        {pipelineStages.map((stage) => (
          <div
            className="grid grid-cols-[2.25rem_minmax(7.5rem,1fr)_1.75rem_2.5rem] items-center gap-x-2 gap-y-2 sm:grid-cols-[3rem_9.5rem_minmax(10rem,1fr)_2rem_2.75rem] sm:gap-3"
            key={stage.label}
          >
            <DashboardIcon
              alt=""
              className="size-8 text-blue-700 sm:size-9"
              name={stage.icon}
            />
            <p className="min-w-0 text-sm font-semibold text-slate-950">
              {stage.label}
            </p>
            <div className="col-span-4 h-2 overflow-hidden rounded-full bg-blue-950/10 sm:col-span-1 sm:h-2.5">
              <div
                aria-label={`${stage.label}: ${stage.percent}%`}
                className={`h-full rounded-full ${stage.barClassName}`}
                role="img"
                style={{ width: `${stage.percent}%` }}
              />
            </div>
            <p className="text-right text-base font-semibold tracking-normal text-slate-950 sm:text-lg">
              {stage.count}
            </p>
            <p className="text-right text-xs font-semibold text-blue-950/70 sm:text-sm">
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
