import { StatusNotFoundContent } from "@/components/status/status-not-found-content"
import { StatusPageFrame } from "@/components/status/status-page-frame"
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server"

export default async function StatusNotFoundPage() {
  const currentUser = await getCurrentUserServer()
  const isAuthenticated = Boolean(currentUser)

  return (
    <StatusPageFrame isAuthenticated={isAuthenticated}>
      <StatusNotFoundContent
        actionHref="/"
        actionLabel="Return to home"
        isAuthenticated={isAuthenticated}
      />
    </StatusPageFrame>
  )
}
