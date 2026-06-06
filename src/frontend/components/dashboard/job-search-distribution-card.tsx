import { Button } from "@/components/ui/button";
import {
  pipelineStages,
  pipelineTotal,
} from "@/components/dashboard/dashboard-data";
import { DashboardIcon } from "@/components/dashboard/dashboard-icon";

export function JobSearchDistributionCard() {
  return (
    <article className="rounded-xl border border-white/80 bg-white/78 p-4 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-3 xl:items-center xl:gap-4">
        <div className="flex min-w-0 items-center gap-2.5 xl:gap-3">
          <DashboardIcon
            alt=""
            className="size-8 shrink-0 text-blue-800 xl:size-9"
            name="MountainMark.svg"
          />
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-normal text-slate-950 xl:text-xl">
              Job Search Distribution
            </h2>
            <p className="mt-0.5 text-xs font-medium text-blue-950/75 xl:mt-1 xl:text-sm">
              Where all your applications stand right now.
            </p>
          </div>
        </div>
        <Button
          className="h-8 rounded-lg border-blue-100 bg-white/70 px-3 text-xs font-semibold text-slate-950 hover:bg-white xl:h-9 xl:px-4 xl:text-sm"
          size="sm"
          variant="outline"
        >
          All time
          <span aria-hidden="true" className="ml-2 text-blue-900">
            v
          </span>
        </Button>
      </div>

      <div className="mt-5 space-y-4 xl:mt-7 xl:space-y-5">
        {pipelineStages.map((stage) => (
          <div
            className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-x-2 gap-y-2 xl:grid-cols-[3rem_9.5rem_minmax(10rem,1fr)_2rem_2.75rem] xl:gap-3"
            key={stage.label}
          >
            <DashboardIcon
              alt=""
              className="size-8 text-blue-700 xl:size-9"
              name={stage.icon}
            />
            <p className="min-w-0 text-sm font-semibold text-slate-950">
              {stage.label}
            </p>
            <div className="col-span-2 h-2 overflow-hidden rounded-full bg-blue-950/10 xl:col-span-1 xl:h-2.5">
              <div
                aria-label={`${stage.label}: ${stage.percent}%`}
                className={`h-full rounded-full ${stage.barClassName}`}
                role="img"
                style={{ width: `${stage.percent}%` }}
              />
            </div>
            <div className="col-span-2 flex items-center justify-between px-1 xl:contents">
              <p className="text-base font-semibold tracking-normal text-slate-950 xl:text-right xl:text-lg">
                {stage.count}
              </p>
              <p className="text-xs font-semibold text-blue-950/70 xl:text-right xl:text-sm">
                {stage.percent}%
              </p>
            </div>
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
