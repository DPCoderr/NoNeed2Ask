import Link from "next/link"

import { PageShell } from "@/components/layout/page-shell"
import { Button } from "@/components/ui/button"

import { ApplicationForm } from "../../_components/application-form/application-form"
import { loadApplication } from "../../_lib/load-application"

type UpdateApplicationPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function UpdateApplicationPage({
  params,
}: UpdateApplicationPageProps) {
  const { id } = await params
  const application = await loadApplication(id)

  return (
    <PageShell
      background="landing"
      className="max-w-5xl gap-5 px-4 py-4 sm:px-5 md:px-8 xl:px-10 xl:py-6"
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-blue-700">Applications</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
            Update application
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-blue-950/70 sm:text-base">
            Update the role, status, dates, and notes for {application.companyName}.
          </p>
        </div>

        <Button asChild className="h-10 rounded-lg px-4" variant="outline">
          <Link href={`/applications/${application.id}`}>Back to details</Link>
        </Button>
      </header>

      <ApplicationForm application={application} mode="update" />
    </PageShell>
  )
}
