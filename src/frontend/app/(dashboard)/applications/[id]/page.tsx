import Link from "next/link"

import { PageShell } from "@/components/layout/page-shell"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { ApplicationStatus } from "@/lib/api/types"

import { loadApplication } from "../_lib/load-application"

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

type ApplicationDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params
  const application = await loadApplication(id)

  return (
    <PageShell
      className="max-w-4xl"
      eyebrow="Private application"
      title={application.companyName}
      description={application.jobTitle}
    >
      <section className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-base font-semibold">Application details</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Edit and delete controls live here for the selected application.
            </p>
          </div>
          <span
            className={`inline-flex w-fit items-center rounded-md border px-2 py-1 text-xs font-medium ${statusClasses[application.status]}`}
          >
            {statusLabels[application.status]}
          </span>
        </div>
        <Separator />
        <dl className="grid gap-0 sm:grid-cols-2">
          <div className="border-b p-5 sm:border-r">
            <dt className="text-sm text-muted-foreground">Last contact</dt>
            <dd className="mt-2 font-medium">
              {formatDate(application.lastContactAt)}
            </dd>
          </div>
          <div className="border-b p-5">
            <dt className="text-sm text-muted-foreground">Next action</dt>
            <dd className="mt-2 font-medium">
              {formatDate(application.nextActionAt)}
            </dd>
          </div>
          <div className="border-b p-5 sm:border-r">
            <dt className="text-sm text-muted-foreground">Created</dt>
            <dd className="mt-2 font-medium">{formatDate(application.createdAt)}</dd>
          </div>
          <div className="border-b p-5">
            <dt className="text-sm text-muted-foreground">Updated</dt>
            <dd className="mt-2 font-medium">{formatDate(application.updatedAt)}</dd>
          </div>
          <div className="border-b p-5 sm:col-span-2">
            <dt className="text-sm text-muted-foreground">Public note</dt>
            <dd className="mt-2 leading-6">
              {application.publicNote ?? "Not shared publicly."}
            </dd>
          </div>
          <div className="p-5 sm:col-span-2">
            <dt className="text-sm text-muted-foreground">Private note</dt>
            <dd className="mt-2 leading-6">
              {application.privateNote ?? "No private note."}
            </dd>
          </div>
        </dl>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/applications">Back to applications</Link>
        </Button>
        <Button asChild>
          <Link href={`/applications/${application.id}/update`}>
            Edit application
          </Link>
        </Button>
        <Button asChild variant="destructive">
          <Link href={`/applications/${application.id}?delete=true`}>
            Delete application
          </Link>
        </Button>
      </div>
    </PageShell>
  )
}
