import type { DashboardData } from "@/components/dashboard/dashboard-data";
import {
  DashboardHeader,
  type DashboardHeaderProps,
} from "@/components/dashboard/dashboard-header";
import { JobSearchDistributionCard } from "@/components/dashboard/job-search-distribution-card";
import { NextInterviewCard } from "@/components/dashboard/next-interview-card";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { RecentApplicationsCard } from "@/components/dashboard/recent-applications-card";
import { cn } from "@/lib/utils";

type RecentApplicationsOptions = {
  description?: string;
  emptyMessage?: string;
  showViewAll?: boolean;
  title?: string;
};

type JobSearchDashboardProps = {
  dashboardData: DashboardData;
  distributionDescription?: string;
  header: DashboardHeaderProps;
  journeyId?: string;
  overviewId?: string;
  recentApplications?: RecentApplicationsOptions;
  showNextActionControls?: boolean;
  updatesId?: string;
};

export function JobSearchDashboard({
  dashboardData,
  distributionDescription,
  header,
  journeyId,
  overviewId,
  recentApplications,
  showNextActionControls = true,
  updatesId,
}: JobSearchDashboardProps) {
  const nextAction = {
    ...dashboardData.nextAction,
    showActions: dashboardData.nextAction.showActions && showNextActionControls,
  };

  return (
    <>
      <DashboardHeader {...header} />

      <OverviewStats id={overviewId} stats={dashboardData.overviewStats} />

      <section
        className={cn(
          "grid gap-4 md:gap-4 xl:grid-cols-[1.08fr_0.94fr]",
          journeyId && "scroll-mt-28"
        )}
        id={journeyId}
      >
        <JobSearchDistributionCard
          description={distributionDescription}
          stages={dashboardData.pipelineStages}
          total={dashboardData.pipelineTotal}
        />
        <div className="grid">
          <NextInterviewCard {...nextAction} />
        </div>
      </section>

      <section className={cn(updatesId && "scroll-mt-28")} id={updatesId}>
        <RecentApplicationsCard
          applications={dashboardData.recentApplications}
          {...recentApplications}
        />
      </section>
    </>
  );
}
