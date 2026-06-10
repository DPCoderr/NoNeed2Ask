import Link from "next/link"

import type { ApplicationListResponseDto } from "@/lib/api/types"

import {
  CompanyMark,
  formatDate,
  MoreButton,
  StatusBadge,
} from "./application-list-ui"
import { ApplicationsPagination } from "./applications-pagination"

// Desktop table view for the current page of applications.
export function ApplicationsTable({
  applications,
  onPageChange,
  onPagePrefetch,
}: {
  applications: ApplicationListResponseDto
  onPageChange: (page: number) => void
  onPagePrefetch: (page: number) => void
}) {
  return (
    <section className="hidden overflow-hidden rounded-xl border border-white/80 bg-white/84 shadow-lg shadow-blue-950/8 backdrop-blur-xl lg:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] table-fixed border-collapse text-left text-sm text-blue-950">
          <thead>
            <tr className="border-b border-blue-950/10 text-xs font-semibold text-blue-950/75">
              <th className="w-[27%] px-4 py-5 xl:px-5">Company</th>
              <th className="w-[24%] px-4 py-5 xl:px-5">Role</th>
              <th className="w-[17%] px-4 py-5 xl:px-5">Status</th>
              <th className="w-[16%] px-4 py-5 xl:px-5">Last updated</th>
              <th className="w-[12%] px-4 py-5 xl:px-5">Next action</th>
              <th className="w-[4%] px-4 py-5 text-right xl:px-5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-950/10">
            {applications.items.map((application) => (
              <tr className="hover:bg-blue-50/45" key={application.id}>
                <td className="px-4 py-4 xl:px-5">
                  <Link
                    className="flex min-w-0 items-center gap-4 font-semibold text-slate-950 hover:underline"
                    href={`/applications/${application.id}`}
                  >
                    <CompanyMark companyName={application.companyName} />
                    <span className="min-w-0 truncate">{application.companyName}</span>
                  </Link>
                </td>
                <td className="truncate px-4 py-4 text-blue-950/80 xl:px-5">
                  {application.jobTitle}
                </td>
                <td className="px-4 py-4 xl:px-5">
                  <StatusBadge status={application.status} />
                </td>
                <td className="truncate px-4 py-4 text-blue-950/80 xl:px-5">
                  {formatDate(application.updatedAt)}
                </td>
                <td className="truncate px-4 py-4 text-blue-950/80 xl:px-5">
                  {application.nextActionAt ? formatDate(application.nextActionAt) : "-"}
                </td>
                <td className="px-4 py-4 xl:px-5">
                  <div className="flex justify-end">
                    <MoreButton />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {applications.items.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm font-medium text-blue-950/70">
          No applications match these filters.
        </div>
      ) : null}
      <ApplicationsPagination
        applications={applications}
        onPageChange={onPageChange}
        onPagePrefetch={onPagePrefetch}
      />
    </section>
  )
}
