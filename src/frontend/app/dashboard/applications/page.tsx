import Link from "next/link"

import { MvpNavigation } from "@/components/layout/mvp-navigation"
import { PageShell } from "@/components/layout/page-shell"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockPrivateApplications } from "@/lib/api/fixtures"
import type { ApplicationStatus } from "@/lib/api/types"

import { ClickableApplicationRow } from "./clickable-application-row"

const statusLabels: Record<ApplicationStatus, string> = {
  applied: "Applied",
  waiting_response: "Waiting response",
  interview_planned: "Interview planned",
  interview_done: "Interview done",
  offer: "Offer",
  rejected: "Rejected",
  ghosted: "Ghosted",
  paused: "Paused",
}

const statusClasses: Record<ApplicationStatus, string> = {
  applied: "border-sky-200 bg-sky-50 text-sky-700",
  waiting_response: "border-amber-200 bg-amber-50 text-amber-700",
  interview_planned: "border-blue-200 bg-blue-50 text-blue-700",
  interview_done: "border-indigo-200 bg-indigo-50 text-indigo-700",
  offer: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-rose-200 bg-rose-50 text-rose-700",
  ghosted: "border-zinc-200 bg-zinc-50 text-zinc-700",
  paused: "border-stone-200 bg-stone-50 text-stone-700",
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not scheduled"
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

export default function ApplicationsPage() {
  const sortedApplications = [...mockPrivateApplications].sort(
    (first, second) =>
      new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime()
  )

  return (
    <PageShell
      className="max-w-6xl"
      eyebrow="Private dashboard"
      title="Applications"
      description="A clean private table for scanning companies, stages, contact dates, and notes without digging into each record."
    >
      <MvpNavigation />

      <section className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold">Tracked applications</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {sortedApplications.length} applications sorted by latest update.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href="/dashboard/applications?create=application">
                Create application
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/status/daniel-job-search">Preview public page</Link>
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[220px]">Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last contact</TableHead>
              <TableHead>Next action</TableHead>
              <TableHead className="min-w-[340px]">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedApplications.map((application) => (
              <ClickableApplicationRow
                className="group focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={`/dashboard/applications/${application.id}`}
                key={application.id}
              >
                <TableCell>
                  <div className="font-medium underline-offset-4 group-hover:underline">
                    {application.companyName}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {application.jobTitle}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex w-fit items-center rounded-md border px-2 py-1 text-xs font-medium ${statusClasses[application.status]}`}
                  >
                    {statusLabels[application.status]}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDate(application.lastContactAt)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDate(application.nextActionAt)}
                </TableCell>
                <TableCell className="max-w-[460px] leading-6 text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">Public: </span>
                    {application.publicNote ?? "Not shared publicly."}
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-foreground">Private: </span>
                    {application.privateNote ?? "No private note."}
                  </div>
                </TableCell>
              </ClickableApplicationRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    </PageShell>
  )
}
