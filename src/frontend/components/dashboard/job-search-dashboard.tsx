import type {
  DashboardData,
  InterviewReminder,
} from "@/components/dashboard/dashboard-types";
import {
  DashboardHeader,
  type DashboardHeaderProps,
} from "@/components/dashboard/dashboard-header";
import { JobSearchDistributionCard } from "@/components/dashboard/job-search-distribution-card";
import { NextInterviewCard } from "@/components/dashboard/next-interview-card";
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
    <div className="relative">
      <DashboardHeader {...header} />

      <div className="relative z-10 mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.65fr)] lg:items-stretch">
        <JobSearchDistributionCard
          description={distributionDescription}
          id={journeyId}
          stages={dashboardData.pipelineStages}
          total={dashboardData.pipelineTotal}
        />

        <NextInterviewCard {...visibleReminder} />
      </div>

      <section
        className={cn("relative z-10 mt-6", updatesId && "scroll-mt-28")}
        id={updatesId}
      >
        <RecentApplicationsCard
          applications={dashboardData.recentApplications}
          {...recentApplications}
        />
      </section>
    </div>
  );
}
