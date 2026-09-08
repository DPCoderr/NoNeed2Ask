import { buildDashboardData } from "@/components/dashboard/dashboard-data";
import type { PublicStatusEnabledResponseDto } from "@/lib/api/types";

import { PublicStatusHeader } from "./public-status-header";
import { PublicStatusJourney } from "./public-status-journey";
import { PublicStatusNextInterview } from "./public-status-next-interview";
import { PublicStatusUpdates } from "./public-status-updates";

type PublicStatusContentProps = Pick<PublicStatusEnabledResponseDto, "applications" | "profile"> & { now?: Date };

export function PublicStatusContent({ applications, profile, now = new Date() }: PublicStatusContentProps) {
  const data = buildDashboardData(applications, now, { recentLimit: 10 });
  return (
    <div className="space-y-6 sm:space-y-8">
      <PublicStatusHeader profile={profile} />
      <div className="grid items-stretch gap-5 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <PublicStatusJourney stages={data.pipelineStages} total={data.pipelineTotal} />
        <PublicStatusNextInterview nextAction={data.nextAction} />
      </div>
      <PublicStatusUpdates applications={data.recentApplications} />
    </div>
  );
}
