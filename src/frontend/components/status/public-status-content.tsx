import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buildDashboardData } from "@/components/dashboard/dashboard-data";
import { JobSearchDashboard } from "@/components/dashboard/job-search-dashboard";
import type { PublicStatusEnabledResponseDto } from "@/lib/api/types";

const recentApplicationsLimit = 10;

const lastUpdatedDateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

type PublicStatusContentProps = Pick<
  PublicStatusEnabledResponseDto,
  "applications" | "profile"
>;

export function PublicStatusContent({
  applications,
  profile,
}: PublicStatusContentProps) {
  const dashboardData = buildDashboardData(applications, new Date(), {
    recentLimit: recentApplicationsLimit,
  });

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col gap-5 px-4 py-5 sm:px-5 md:gap-5 md:px-8 md:py-8 xl:px-10">
      <JobSearchDashboard
        dashboardData={dashboardData}
        distributionDescription="Where all visible applications stand right now."
        header={{
          actions: (
            <span className="flex items-center gap-2">
              <HugeiconsIcon className="size-5" icon={Calendar03Icon} />
              Last updated {formatLastUpdatedDate(profile.updatedAt)}
            </span>
          ),
          description:
            "A public view of the job search: visible pipeline health, next steps, and recent updates without private notes or edit controls.",
          eyebrow: "Public read-only dashboard",
          title: `${profile.displayName}'s Job Search`,
        }}
        journeyId="journey"
        overviewId="overview"
        recentApplications={{
          description: "A read-only timeline of the latest public updates.",
          emptyMessage: "No public applications yet.",
          showViewAll: false,
          title: "Recent applications",
        }}
        showNextActionControls={false}
        updatesId="updates"
      />
    </div>
  );
}

function formatLastUpdatedDate(value: string | null) {
  if (!value) {
    return "Not scheduled";
  }

  return lastUpdatedDateFormatter.format(new Date(value));
}
