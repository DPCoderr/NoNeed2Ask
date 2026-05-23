import Link from "next/link"

import { PageShell } from "@/components/layout/page-shell"
import { RoutePlaceholder } from "@/components/layout/route-placeholder"
import { Button } from "@/components/ui/button"
import { mockOwnerDashboardResponse } from "@/lib/api/fixtures"

export default function SettingsPage() {
  const profile = mockOwnerDashboardResponse.publicProfile

  return (
    <PageShell
      eyebrow="Private dashboard"
      title="Settings"
      description="A placeholder for public sharing controls, account details, and status-page ownership."
    >
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
          <h2 className="text-base font-semibold">Public profile</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Slug</dt>
              <dd className="font-medium">{profile.publicSlug}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Sharing</dt>
              <dd className="font-medium">
                {profile.isPublicSharingEnabled ? "Enabled" : "Private"}
              </dd>
            </div>
          </dl>
          <div className="mt-5">
            <Button asChild variant="outline">
              <Link href={`/status/${profile.publicSlug}`}>Open public page</Link>
            </Button>
          </div>
        </div>

        <RoutePlaceholder
          owner="Settings feature slice"
          summary="The route is reserved for authenticated settings without pre-deciding the final form model or mutation behavior."
          nextStep="Add validated settings forms and React Query mutations in the settings ticket."
        />
      </section>
    </PageShell>
  )
}
