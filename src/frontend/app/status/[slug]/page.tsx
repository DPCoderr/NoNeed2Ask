import Link from "next/link"

import { MvpNavigation } from "@/components/layout/mvp-navigation"
import { PageShell } from "@/components/layout/page-shell"
import { RoutePlaceholder } from "@/components/layout/route-placeholder"
import { Button } from "@/components/ui/button"
import { mockPublicStatusEnabledResponse } from "@/lib/api/fixtures"

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
        <MvpNavigation />
        <RoutePlaceholder
          owner="Public status feature slice"
          summary="The disabled state is represented here so the public route keeps the future response boundary visible."
          nextStep="Replace mock data with the public status query in the owning ticket."
        />
      </PageShell>
    )
  }

  const { profile, applications } = publicStatus

  return (
    <PageShell
      eyebrow={`Public status / ${slug}`}
      title={`${profile.displayName}'s job-search status`}
      description="A read-only page for recruiters and collaborators, intentionally separate from private notes and dashboard controls."
    >
      <MvpNavigation />

      <section className="grid gap-3">
        {applications.map((application) => (
          <article
            className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
            key={`${application.companyName}-${application.jobTitle}`}
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
            {application.publicNote && (
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {application.publicNote}
              </p>
            )}
          </article>
        ))}
      </section>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Owner dashboard</Link>
        </Button>
      </div>

      <RoutePlaceholder
        owner="Public status feature slice"
        summary="This page demonstrates the public DTO boundary and intentionally excludes private notes and owner-only controls."
        nextStep="Replace mock data with the public status query and disabled/empty/error states in the owning ticket."
      />
    </PageShell>
  )
}
