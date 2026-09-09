import { PublicStatusNotFound } from "@/components/status/public-status-not-found"
import { PublicStatusFrame } from "@/components/status/public-status-frame"
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server"

export default async function StatusNotFoundPage() {
  const currentUser = await getCurrentUserServer()
  const isAuthenticated = Boolean(currentUser)

  return (
    <PublicStatusFrame isAuthenticated={isAuthenticated}>
      <PublicStatusNotFound />
    </PublicStatusFrame>
  )
}
