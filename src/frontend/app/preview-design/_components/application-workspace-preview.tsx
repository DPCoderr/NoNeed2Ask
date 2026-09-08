"use client"

import { useState } from "react"
import { ApplicationDetail } from "@/app/(dashboard)/applications/[id]/_components/application-detail"
import { ApplicationEditorLayout } from "@/app/(dashboard)/applications/_components/application-editor-layout"
import { ApplicationForm } from "@/app/(dashboard)/applications/_components/application-form/application-form"
import { PageShell } from "@/components/layout/page-shell"
import { applicationPreviewRows } from "../_lib/applications-preview-data"
import { PreviewFrame } from "./preview-frame"

const scenarios = ["Populated", "Empty notes", "Long text", "Save error"] as const
export function ApplicationWorkspacePreview({ pageName }: {
  pageName: "application-create" | "application-detail" | "application-update"
}) {
  const [scenario, setScenario] = useState<typeof scenarios[number]>("Populated")
  const [notice, setNotice] = useState("")
  const application = {
    ...applicationPreviewRows[0],
    privateNote: scenario === "Empty notes" ? null : "Discuss the team's approach to accessibility and ask about the first three months in the role.",
    publicNote: scenario === "Empty notes" ? null : "A promising conversation with the team. Preparing for the next round.",
    ...(scenario === "Long text" ? { companyName: "Northstar International Research & Technology Collective", jobTitle: "Senior Frontend Engineer, Accessibility & Design Systems", privateNote: "Interview preparation and follow-up notes. ".repeat(40) } : {}),
  }
  async function savePreview() {
    if (scenario === "Save error") throw new Error("Preview save error")
    setNotice("Application saved locally for this preview. No backend request was made.")
  }
  const create = pageName === "application-create"
  const formProps = { onPreviewSave: savePreview, onCancel: () => setNotice("Cancelled. Navigation stays in this preview.") }
  return (
    <PreviewFrame pageName={pageName} scenarios={scenarios} scenario={scenario} onScenarioChange={setScenario} notice={notice} onNotice={setNotice}>
      {pageName === "application-detail" ? (
        <PageShell className="max-w-[1200px] px-5 py-7 sm:px-8 lg:py-10"><ApplicationDetail application={application} /></PageShell>
      ) : (
        <ApplicationEditorLayout companyName={create ? undefined : application.companyName} backHref="/applications">
          {create ? <ApplicationForm key={scenario} mode="create" {...formProps} /> : <ApplicationForm key={scenario} mode="update" application={application} {...formProps} />}
        </ApplicationEditorLayout>
      )}
    </PreviewFrame>
  )
}
