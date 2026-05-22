import { PageShell } from "@/components/layout/page-shell"
import { MvpNavigation } from "@/components/layout/mvp-navigation"
import { RoutePlaceholder } from "@/components/layout/route-placeholder"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <PageShell
      eyebrow="NoNeed2Ask"
      title="A calm job-search status tracker"
      description="Share a read-only status page with recruiters and keep the private details of your applications in one focused dashboard."
    >
      <MvpNavigation />

      <section className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold">MVP route map</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This mock-first entry route gives reviewers a product-appropriate
            starting point and links into every target frontend surface.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/status/daniel-job-search">View public status</Link>
            </Button>
          </div>
        </div>

        <RoutePlaceholder
          owner="HOB-46 route scaffold"
          summary="The route names and folders match the architecture docs while feature-specific tickets retain ownership of richer data behavior."
          nextStep="Replace each thin surface as its page ticket lands."
        />
      </section>
    </PageShell>
  )
}
