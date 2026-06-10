import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { JobSearchDistributionCard } from "@/components/dashboard/job-search-distribution-card";
import { NextActionCard } from "@/components/dashboard/next-action-card";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { RecentApplicationsCard } from "@/components/dashboard/recent-applications-card";
import { PageShell } from "@/components/layout/page-shell";
import { getDashboardApplications } from "@/components/dashboard/dashboard-applications";
import { buildDashboardData } from "@/components/dashboard/dashboard-data";
import { getDashboardPublicProfileSettings } from "@/components/dashboard/dashboard-public-profile";
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server";

export async function DashboardPage() {
  const user = await getCurrentUserServer();

  if (!user) {
    return null;
  }

  const [applications, publicProfile] = await Promise.all([
    getDashboardApplications(),
    getDashboardPublicProfileSettings(user),
  ]);
  const dashboardData = buildDashboardData(applications);

  if (!publicProfile) {
    return null;
  }

  return (
    <PageShell
      background="landing"
      className="max-w-screen-2xl gap-5 px-4 py-5 sm:px-5 md:gap-5 md:px-8 md:py-8 xl:px-10"
    >
      <DashboardHeader
        isPublicProfileAvailable={publicProfile.isSettingsAvailable}
        isPublicSharingEnabled={publicProfile.isPublicSharingEnabled}
        publicSlug={publicProfile.publicSlug}
        userDisplayName={user.username}
      />

      <OverviewStats stats={dashboardData.overviewStats} />

      <section className="grid gap-4 md:gap-4 xl:grid-cols-[1.08fr_0.94fr]">
        <JobSearchDistributionCard
          stages={dashboardData.pipelineStages}
          total={dashboardData.pipelineTotal}
        />
        <div className="grid">
          <NextActionCard {...dashboardData.nextAction} />
        </div>
      </section>

      <section>
        <RecentApplicationsCard applications={dashboardData.recentApplications} />
      </section>
    </PageShell>
  );
}
