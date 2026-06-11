import { PageShell } from "@/components/layout/page-shell";
import { getDashboardApplications } from "@/components/dashboard/dashboard-applications";
import { buildDashboardData } from "@/components/dashboard/dashboard-data";
import { getDashboardPublicProfileSettings } from "@/components/dashboard/dashboard-public-profile";
import { JobSearchDashboard } from "@/components/dashboard/job-search-dashboard";
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
      <JobSearchDashboard
        dashboardData={dashboardData}
        header={{
          isPublicProfileAvailable: publicProfile.isSettingsAvailable,
          isPublicSharingEnabled: publicProfile.isPublicSharingEnabled,
          publicSlug: publicProfile.publicSlug,
          userDisplayName: user.username,
        }}
      />
    </PageShell>
  );
}
