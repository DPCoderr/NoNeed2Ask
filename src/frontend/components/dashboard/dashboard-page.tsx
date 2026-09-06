import { getDashboardApplications } from "@/components/dashboard/dashboard-applications";
import { buildDashboardData } from "@/components/dashboard/dashboard-data";
import { getDashboardPublicProfileSettings } from "@/components/dashboard/dashboard-public-profile";
import { OwnerDashboard } from "@/components/dashboard/owner/owner-dashboard";
import { OwnerSharing } from "@/components/dashboard/owner/owner-sharing";
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
    <OwnerDashboard
      data={dashboardData}
      userDisplayName={user.username}
      sharing={
        <OwnerSharing
          isPublicProfileAvailable={publicProfile.isSettingsAvailable}
          isPublicSharingEnabled={publicProfile.isPublicSharingEnabled}
          publicSlug={publicProfile.publicSlug}
        />
      }
      isInterviewPlaceholder
      nextInterview={{
        companyName: reminderApplication?.companyName ?? "Northstar Labs",
        dateLabel: "Sep 12 · 10:30 AM",
        href: reminderApplication
          ? `/applications/${reminderApplication.id}`
          : "/applications",
        jobTitle: reminderApplication?.jobTitle ?? "Senior Frontend Engineer",
      }}
    />
  );
}
