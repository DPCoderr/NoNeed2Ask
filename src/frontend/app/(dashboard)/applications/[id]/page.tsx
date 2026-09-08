import { PageShell } from "@/components/layout/page-shell"

import { loadApplication } from "../_lib/load-application"
import { ApplicationDetail } from "./_components/application-detail"

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
      background="landing"
      className="max-w-[1200px] gap-6 px-5 py-7 sm:px-8 lg:py-10"
    >
      <ApplicationDetail application={application} />
    </PageShell>
  )
}
