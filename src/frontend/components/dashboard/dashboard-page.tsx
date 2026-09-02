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
  const reminderApplication = applications[0];

  if (!publicProfile) {
    return null;
  }

  return (
    <PageShell
      background="landing"
      className="max-w-screen-2xl gap-4 px-4 py-4 sm:px-5 md:gap-5 md:px-8 md:py-6 xl:px-10 xl:py-7"
    >
      <JobSearchDashboard
        dashboardData={dashboardData}
        header={{
          isPublicProfileAvailable: publicProfile.isSettingsAvailable,
          isPublicSharingEnabled: publicProfile.isPublicSharingEnabled,
          publicSlug: publicProfile.publicSlug,
          userDisplayName: user.username,
        }}
        nextInterview={{
          companyName: reminderApplication?.companyName ?? "Northstar Labs",
          dateLabel: "Sep 12 · 10:30 AM",
          href: reminderApplication
            ? `/applications/${reminderApplication.id}`
            : "/applications",
          jobTitle:
            reminderApplication?.jobTitle ?? "Senior Frontend Engineer",
        }}
      />
    </PageShell>
  );
}
