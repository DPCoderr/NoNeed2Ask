import type { RecentApplication } from "@/components/dashboard/dashboard-types"
import { RecentApplicationsHeader } from "@/components/dashboard/recent-applications-header"
import { RecentApplicationsTimeline } from "@/components/dashboard/recent-applications-timeline"

export function RecentApplicationsCard({
  applications,
  description = "Your latest application activity.",
  emptyMessage = "No applications yet.",
  showViewAll = true,
  title = "Recent Updates",
}: {
  applications: RecentApplication[]
  description?: string
  emptyMessage?: string
  showViewAll?: boolean
  title?: string
}) {
  return (
    <article className="rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-[0_24px_70px_-55px_rgb(30_64_175_/_0.5)] sm:p-7 lg:p-8">
      <RecentApplicationsHeader showViewAll={showViewAll} title={title} />
      <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-blue-950/55">
        {description}
      </p>
      {applications.length > 0 ? (
        <RecentApplicationsTimeline applications={applications} />
      ) : (
        <p className="mt-4 border-y border-dashed border-blue-950/15 py-5 text-sm font-medium text-blue-950/60">
          {emptyMessage}
        </p>
      )}
    </article>
  )
}
