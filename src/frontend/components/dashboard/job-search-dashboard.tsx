import type { DashboardData } from "@/components/dashboard/dashboard-data";
import {
  DashboardHeader,
  type DashboardHeaderProps,
} from "@/components/dashboard/dashboard-header";
import { JobSearchDistributionCard } from "@/components/dashboard/job-search-distribution-card";
import {
  NextInterviewCard,
  type InterviewReminder,
} from "@/components/dashboard/next-interview-card";
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
  nextInterview?: InterviewReminder;
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
  nextInterview,
  overviewId,
  recentApplications,
  showNextActionControls = true,
  updatesId,
}: JobSearchDashboardProps) {
  const reminder = nextInterview ?? {
    companyName: dashboardData.nextAction.contactDetail,
    dateLabel: dashboardData.nextAction.timelineValue,
    jobTitle: dashboardData.nextAction.contactName,
  };
  const visibleReminder = {
    ...reminder,
    href: showNextActionControls ? reminder.href : undefined,
  };

  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-[minmax(19rem,0.68fr)_minmax(0,1.5fr)] xl:gap-6">
      <div className="grid min-w-0 gap-5 xl:sticky xl:top-5">
        <DashboardHeader {...header} />
        <NextInterviewCard {...visibleReminder} />
      </div>

      <div className="grid min-w-0 gap-5 md:gap-6">
        {overviewId ? (
          <OverviewStats id={overviewId} stats={dashboardData.overviewStats} />
        ) : null}

        <JobSearchDistributionCard
          description={distributionDescription}
          id={journeyId}
          stages={dashboardData.pipelineStages}
          total={dashboardData.pipelineTotal}
        />

        <section className={cn(updatesId && "scroll-mt-28")} id={updatesId}>
          <RecentApplicationsCard
            applications={dashboardData.recentApplications}
            {...recentApplications}
          />
        </section>
      </div>
    </div>
  );
}
