import { PageShell } from "@/components/layout/page-shell"

import { ApplicationsHeader } from "./_components/applications-header"
import { ApplicationsList } from "./_components/applications-list"

export default function ApplicationsPage() {
  return (
    <PageShell background="landing" className="max-w-none gap-4 px-4 py-4 sm:px-5 md:gap-5 md:px-8 xl:gap-6 xl:px-10 xl:py-6">
      <ApplicationsHeader />
      <ApplicationsList />
    </PageShell>
  )
}
