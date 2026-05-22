import Link from "next/link"

import { MvpNavigation } from "@/components/layout/mvp-navigation"
import { PageShell } from "@/components/layout/page-shell"
import { RoutePlaceholder } from "@/components/layout/route-placeholder"
import { Button } from "@/components/ui/button"
import { mockPrivateApplications } from "@/lib/api/fixtures"

const statusLabels: Record<string, string> = {
  applied: "Applied",
  waiting_response: "Waiting response",
  interview_planned: "Interview planned",
  interview_done: "Interview done",
  offer: "Offer",
  rejected: "Rejected",
  ghosted: "Ghosted",
  paused: "Paused",
}

export default function ApplicationsPage() {
  return (
    <PageShell
      eyebrow="Private dashboard"
      title="Applications"
      description="A mock-first list view that preserves the future CRUD surface for tracked job applications."
    >
      <MvpNavigation />

      <section className="grid gap-3">
        {mockPrivateApplications.map((application) => (
          <article
            className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
            key={application.id}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  {application.companyName}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {application.jobTitle}
                </p>
              </div>
              <p className="w-fit rounded-md border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                {statusLabels[application.status]}
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {application.publicNote ?? "No public note is currently shared."}
            </p>
          </article>
        ))}
      </section>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
        <Button asChild>
          <Link href="/status/daniel-job-search">Preview public page</Link>
        </Button>
      </div>

      <RoutePlaceholder
        owner="Applications feature slice"
        summary="This list uses existing mock DTOs only; create, edit, delete, filter, and empty/error states remain owned by the application-management page ticket."
        nextStep="Replace the static list with React Query reads and mutations when the CRUD ticket is implemented."
      />
    </PageShell>
  )
}
