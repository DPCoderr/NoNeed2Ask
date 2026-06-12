import { StatusNotFoundContent } from "@/components/status/status-not-found-content"
import { StatusPageFrame } from "@/components/status/status-page-frame"
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server"

export default async function NotFoundPage() {
  const currentUser = await getCurrentUserServer()
  const isAuthenticated = Boolean(currentUser)

  return (
    <StatusPageFrame isAuthenticated={isAuthenticated}>
      <StatusNotFoundContent
        description="The page you are looking for does not exist, may have moved, or the URL may contain a typo."
        eyebrow="404"
        isAuthenticated={isAuthenticated}
        title="This page could not be found"
      />
    </StatusPageFrame>
  )
}
