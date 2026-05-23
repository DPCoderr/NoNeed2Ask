import Link from "next/link"

import { PageShell } from "@/components/layout/page-shell"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { mockOwnerDashboardResponse } from "@/lib/api/fixtures"
import type { ApplicationStatus, PrivateApplicationDto } from "@/lib/api/types"

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
  }).format(new Date(value))
}

function getNextAction(applications: PrivateApplicationDto[]) {
  return applications
    .filter((application) => application.nextActionAt)
    .sort(
      (first, second) =>
        new Date(first.nextActionAt ?? "").getTime() -
        new Date(second.nextActionAt ?? "").getTime()
    )[0]
}

export default function DashboardPage() {
  const { applications, publicProfile, user } = mockOwnerDashboardResponse
  const publicSlug = publicProfile.publicSlug
  const activeApplications = applications.filter((application) =>
    activeStatuses.includes(application.status)
  ).length
  const interviewCount = applications.filter((application) =>
    ["interview_planned", "interview_done"].includes(application.status)
  ).length
  const waitingCount = applications.filter(
    (application) => application.status === "waiting_response"
  ).length
  const nextAction = getNextAction(applications)
  const recentlyUpdated = [...applications]
    .sort(
      (first, second) =>
        new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime()
    )
    .slice(0, 3)

  return (
    <PageShell
      eyebrow="Private dashboard"
      title={`Welcome back, ${user.displayName}`}
      description="A private command center for the job search: pipeline health, follow-ups, and public status visibility."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Active applications</p>
          <p className="mt-3 text-3xl font-semibold">{activeApplications}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {applications.length} total tracked
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Interview pipeline</p>
          <p className="mt-3 text-3xl font-semibold">{interviewCount}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Planned or waiting on feedback
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Waiting responses</p>
          <p className="mt-3 text-3xl font-semibold">{waitingCount}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Needs a follow-up cadence
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">Next action</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                The nearest scheduled follow-up across the pipeline.
              </p>
            </div>
            <p className="w-fit rounded-md border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              {nextAction ? formatDate(nextAction.nextActionAt) : "Clear"}
            </p>
          </div>
          {nextAction ? (
            <div className="mt-5">
              <p className="font-medium">{nextAction.companyName}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {nextAction.jobTitle} · {statusLabels[nextAction.status]}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {nextAction.privateNote ?? nextAction.publicNote}
              </p>
            </div>
          ) : (
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              No follow-up is scheduled yet.
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/applications">Manage applications</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/settings">Open settings</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">Public status</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                What recruiters and friends can see from the shared page.
              </p>
            </div>
            <p className="w-fit rounded-md border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              {publicProfile.isPublicSharingEnabled ? "Visible" : "Private"}
            </p>
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Route</dt>
              <dd className="truncate font-medium">/{publicSlug}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Last profile update</dt>
              <dd className="font-medium">{formatDate(publicProfile.updatedAt)}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href={`/status/${publicSlug}`}>Preview public page</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold">Recent applications</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Latest updates from the private tracker.
            </p>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/applications">View all</Link>
          </Button>
        </div>
        <Separator />
        <div className="divide-y">
          {recentlyUpdated.map((application) => (
            <div
              className="grid gap-3 p-5 sm:grid-cols-[1.4fr_1fr_auto] sm:items-center"
              key={application.id}
            >
              <div>
                <p className="font-medium">{application.companyName}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {application.jobTitle}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {statusLabels[application.status]}
              </p>
              <p className="text-sm text-muted-foreground">
                Updated {formatDate(application.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
