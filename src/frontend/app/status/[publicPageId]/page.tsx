import { notFound } from "next/navigation"

import { PrivateStatusContent } from "@/components/status/private-status-content"
import { PublicStatusContent } from "@/components/status/public-status-content"
import { PublicStatusFrame } from "@/components/status/public-status-frame"
import { ApiResponseError } from "@/lib/api/errors"
import { getPublicStatus } from "@/lib/api/public-status"
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server"
import type { PublicStatusResponseDto } from "@/lib/api/types"
import { backendUrls } from "@/lib/server/backend-urls"

type PublicStatusPageProps = {
  params: Promise<{
    publicPageId: string
  }>
}

export default async function PublicStatusPage({
  params,
}: PublicStatusPageProps) {
  const { publicPageId } = await params
  const currentUser = await getCurrentUserServer()
  const isAuthenticated = Boolean(currentUser)
  let publicStatus: PublicStatusResponseDto

  try {
    publicStatus = await getPublicStatus(publicPageId, {
      baseUrl: backendUrls.publicStatus,
    })
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      notFound()
    }

    throw error
  }

  if (publicStatus.kind === "disabled") {
    return (
      <PublicStatusFrame isAuthenticated={isAuthenticated}>
        <PrivateStatusContent
          isAuthenticated={isAuthenticated}
          publicPageId={publicPageId}
        />
      </PublicStatusFrame>
    )
  }

  return (
    <PublicStatusFrame isAuthenticated={isAuthenticated}>
      <PublicStatusContent
        applications={publicStatus.applications}
        profile={publicStatus.profile}
      />
    </PublicStatusFrame>
  )
}
