import { notFound } from "next/navigation"

import { PrivateStatusContent } from "@/components/status/private-status-content"
import { PublicStatusContent } from "@/components/status/public-status-content"
import { StatusPageFrame } from "@/components/status/status-page-frame"
import { ApiResponseError } from "@/lib/api/errors"
import { getPublicStatus } from "@/lib/api/public-status"
import { getCurrentUserServer } from "@/lib/auth/get-current-user-server"
import type { PublicStatusResponseDto } from "@/lib/api/types"

const backendPublicStatusBaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PUBLIC_STATUS_BASE_URL ??
      "https://noneed2ask.onrender.com/status"
    : process.env.PUBLIC_STATUS_BASE_URL_DEV ??
      "http://localhost:5273/status"

type PublicStatusPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function PublicStatusPage({
  params,
}: PublicStatusPageProps) {
  const { slug } = await params
  const currentUser = await getCurrentUserServer()
  const isAuthenticated = Boolean(currentUser)
  let publicStatus: PublicStatusResponseDto

  try {
    publicStatus = await getPublicStatus(slug, {
      baseUrl: backendPublicStatusBaseUrl,
    })
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      notFound()
    }

    throw error
  }

  if (publicStatus.kind === "disabled") {
    return (
      <StatusPageFrame isAuthenticated={isAuthenticated}>
        <PrivateStatusContent
          isAuthenticated={isAuthenticated}
          slug={slug}
        />
      </StatusPageFrame>
    )
  }

  return (
    <StatusPageFrame isAuthenticated={isAuthenticated}>
      <PublicStatusContent
        applications={publicStatus.applications}
        profile={publicStatus.profile}
      />
    </StatusPageFrame>
  )
}
