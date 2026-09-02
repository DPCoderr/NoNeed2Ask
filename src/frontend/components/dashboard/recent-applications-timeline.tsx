import type { RecentApplication } from "@/components/dashboard/dashboard-types"
import { RecentApplicationRow } from "@/components/dashboard/recent-application-row"

export function RecentApplicationsTimeline({
  applications,
}: {
  applications: RecentApplication[]
}) {
  return (
    <div className="mt-5 border-t border-blue-100 [&>div]:border-blue-100">
      {applications.map((application, index) => (
        <RecentApplicationRow
          application={application}
          isLast={index === applications.length - 1}
          key={application.id}
        />
      ))}
    </div>
  )
}
