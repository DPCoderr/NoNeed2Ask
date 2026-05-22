import Link from "next/link"

import { MvpNavigation } from "@/components/layout/mvp-navigation"
import { PageShell } from "@/components/layout/page-shell"
import { RoutePlaceholder } from "@/components/layout/route-placeholder"
import { Button } from "@/components/ui/button"
import { mockOwnerDashboardResponse } from "@/lib/api/fixtures"

export default function DashboardPage() {
  const activeApplications = mockOwnerDashboardResponse.applications.length
  const publicSlug = mockOwnerDashboardResponse.publicProfile.publicSlug

  return (
    <PageShell
      eyebrow="Private dashboard"
      title={`Welcome back, ${mockOwnerDashboardResponse.user.displayName}`}
      description="A quiet operational overview for the private job-search workspace."
    >
      <MvpNavigation />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Applications tracked</p>
          <p className="mt-3 text-3xl font-semibold">{activeApplications}</p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Public sharing</p>
          <p className="mt-3 text-3xl font-semibold">
            {mockOwnerDashboardResponse.publicProfile.isPublicSharingEnabled
              ? "On"
              : "Off"}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <p className="text-sm text-muted-foreground">Public route</p>
          <p className="mt-3 truncate text-lg font-semibold">/{publicSlug}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <h2 className="text-base font-semibold">Next review</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Applications and settings have dedicated routes so reviewers can
            move through the MVP before the final dashboard interactions exist.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard/applications">Manage applications</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/settings">Open settings</Link>
            </Button>
          </div>
        </div>

        <RoutePlaceholder
          owner="Dashboard feature slice"
          summary="This page reserves the authenticated owner overview without adding CRUD behavior ahead of the application-management ticket."
          nextStep="Wire React Query dashboard reads and mutations in the owning feature ticket."
        />
      </section>
    </PageShell>
  )
}
