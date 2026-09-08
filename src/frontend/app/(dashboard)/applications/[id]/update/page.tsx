import { ApplicationEditorLayout } from "../../_components/application-editor-layout"
import { ApplicationForm } from "../../_components/application-form/application-form"
import { loadApplication } from "../../_lib/load-application"
export default async function UpdateApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const application = await loadApplication(id)
  return <ApplicationEditorLayout companyName={application.companyName} backHref={"/applications/" + id}>
    <ApplicationForm application={application} mode="update" />
  </ApplicationEditorLayout>
}
