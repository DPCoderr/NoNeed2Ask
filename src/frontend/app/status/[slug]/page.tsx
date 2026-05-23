import Link from "next/link"

import { PageShell } from "@/components/layout/page-shell"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockPublicStatusEnabledResponse } from "@/lib/api/fixtures"
import type { ApplicationStatus, PublicStatusApplicationDto } from "@/lib/api/types"

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

const activeStatuses: ApplicationStatus[] = [
  "applied",
  "waiting_response",
  "interview_planned",
  "interview_done",
  "offer",
]

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

function getNextPublicAction(applications: PublicStatusApplicationDto[]) {
  return applications
    .filter((application) => application.nextActionAt)
    .sort(
      (first, second) =>
        new Date(first.nextActionAt ?? "").getTime() -
        new Date(second.nextActionAt ?? "").getTime()
    )[0]
}

type PublicStatusPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function PublicStatusPage({
  params,
}: PublicStatusPageProps) {
  const { slug } = await params
  const publicStatus = mockPublicStatusEnabledResponse

  if (publicStatus.kind === "disabled") {
    return (
      <PageShell
        eyebrow={`Public status / ${slug}`}
        title="This status page is private"
        description={publicStatus.message}
      >
        <section className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <h2 className="text-base font-semibold">Sharing is currently off</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The owner can turn this page back on from the private dashboard.
          </p>
        </section>
      </PageShell>
    )
  }

  const { profile, applications } = publicStatus
  const activeApplications = applications.filter((application) =>
    activeStatuses.includes(application.status)
  ).length
  const interviewCount = applications.filter((application) =>
    ["interview_planned", "interview_done"].includes(application.status)
  ).length
  const nextAction = getNextPublicAction(applications)
  const sortedApplications = [...applications].sort(
    (first, second) =>
      new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime()
  )

  return (
    <PageShell
      className="max-w-6xl"
      eyebrow={`Public status / ${slug}`}
      title={`${profile.displayName}'s job-search status`}
      description="A read-only status board for recruiters and collaborators, with only the updates intended for sharing."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Active applications</p>
          <p className="mt-3 text-3xl font-semibold">{activeApplications}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {applications.length} shared updates
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Interview activity</p>
          <p className="mt-3 text-3xl font-semibold">{interviewCount}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Planned or recently completed
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Next public action</p>
          <p className="mt-3 text-3xl font-semibold">
            {nextAction ? formatDate(nextAction.nextActionAt) : "Clear"}
          </p>
          <p className="mt-2 truncate text-sm text-muted-foreground">
            {nextAction?.companyName ?? "No scheduled follow-up"}
          </p>
        </div>
      </section>

      <section className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold">Shared applications</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Public notes only. Private notes stay in the owner dashboard.
            </p>
          </div>
          <p className="w-fit rounded-md border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            Updated {formatDate(profile.updatedAt)}
          </p>
        </div>
        <Separator />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[220px]">Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next action</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="min-w-[340px]">Public note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedApplications.map((application) => (
              <TableRow key={`${application.companyName}-${application.jobTitle}`}>
                <TableCell>
                  <div className="font-medium">{application.companyName}</div>
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
                  {formatDate(application.nextActionAt)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDate(application.updatedAt)}
                </TableCell>
                <TableCell className="max-w-[460px] leading-6 text-muted-foreground">
                  {application.publicNote ?? "No public note shared yet."}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild>
          <Link href="/">Owner dashboard</Link>
        </Button>
      </div>
    </PageShell>
  )
}
