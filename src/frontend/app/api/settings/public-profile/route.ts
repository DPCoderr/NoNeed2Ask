import type { NextRequest } from "next/server"

import { proxyBackendRequest } from "@/app/api/_lib/proxy-backend-request"
import { backendUrls } from "@/lib/server/backend-urls"

function proxyPublicProfileSettingsRequest(request: NextRequest) {
  return proxyBackendRequest(
    request,
    new URL(backendUrls.publicProfileSettings),
    "Public profile settings service is unavailable."
  )
}

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  return proxyPublicProfileSettingsRequest(request)
}

export async function PATCH(request: NextRequest) {
  return proxyPublicProfileSettingsRequest(request)
}
