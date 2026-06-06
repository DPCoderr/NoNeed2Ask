import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { JobSearchDistributionCard } from "@/components/dashboard/job-search-distribution-card";
import { NextActionCard } from "@/components/dashboard/next-action-card";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { RecentApplicationsCard } from "@/components/dashboard/recent-applications-card";
import { PageShell } from "@/components/layout/page-shell";
import { mockOwnerDashboardResponse } from "@/lib/api/fixtures";

export function DashboardPage() {
  const { publicProfile, user } = mockOwnerDashboardResponse;
  const publicSlug = publicProfile.publicSlug;

  return (
    <PageShell
      background="landing"
      className="max-w-none gap-5 px-4 py-5 sm:px-5 md:gap-5 md:px-8 md:py-8 xl:px-10"
    >
      <DashboardHeader
        publicSlug={publicSlug}
        userDisplayName={user.displayName}
      />

      <OverviewStats />

      <section className="grid gap-4 md:gap-4 xl:grid-cols-[1.08fr_0.94fr]">
        <JobSearchDistributionCard />
        <div className="grid">
          <NextActionCard />
        </div>
      </section>

      <section>
        <RecentApplicationsCard />
      </section>
    </PageShell>
  );
}
