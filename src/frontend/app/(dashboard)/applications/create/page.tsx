import { ApplicationEditorLayout } from "../_components/application-editor-layout"
import { ApplicationForm } from "../_components/application-form/application-form"
export default function CreateApplicationPage() {
  return <ApplicationEditorLayout backHref="/applications"><ApplicationForm mode="create" /></ApplicationEditorLayout>
}
