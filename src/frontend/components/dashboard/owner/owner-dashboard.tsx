import type { ReactNode } from "react";

import type { DashboardData, InterviewReminder } from "../dashboard-types";
import { OwnerDashboardHeader } from "./owner-dashboard-header";
import { OwnerNextInterview } from "./owner-next-interview";
import { OwnerPipeline } from "./owner-pipeline";
import { OwnerRecentApplications } from "./owner-recent-applications";

export type OwnerDashboardProps = {
  data: DashboardData;
  userDisplayName: string;
  nextInterview?: InterviewReminder;
  isInterviewPlaceholder?: boolean;
  sharing: ReactNode;
};

export function OwnerDashboard({
  data,
  userDisplayName,
  nextInterview,
  isInterviewPlaceholder = false,
  sharing,
}: OwnerDashboardProps) {
  return (
    <main id="main-content" className="mx-auto w-full max-w-[1320px] space-y-7 px-5 py-7 text-slate-900 sm:px-8 sm:py-9 xl:px-10 xl:py-10">
      <OwnerDashboardHeader userDisplayName={userDisplayName} sharing={sharing} />
      <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
        <div className="order-2 min-w-0 lg:order-1">
          <OwnerPipeline stages={data.pipelineStages} total={data.pipelineTotal} />
        </div>
        <div className="order-1 min-w-0 lg:order-2">
          <OwnerNextInterview interview={nextInterview} isPlaceholder={isInterviewPlaceholder} />
        </div>
      </div>
      <OwnerRecentApplications applications={data.recentApplications} />
    </main>
  );
}
