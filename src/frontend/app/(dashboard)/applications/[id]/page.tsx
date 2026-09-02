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
      className="max-w-none gap-6 px-4 py-4 sm:px-5 md:px-8 xl:px-10 xl:py-6"
    >
      <ApplicationDetail application={application} />
    </PageShell>
  )
}
