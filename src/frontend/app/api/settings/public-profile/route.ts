import type { NextRequest } from "next/server"

import { proxyBackendRequest } from "@/app/api/_lib/proxy-backend-request"

const backendPublicProfileSettingsUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PUBLIC_PROFILE_SETTINGS_URL ??
      "https://noneed2ask.onrender.com/settings/public-profile"
    : process.env.PUBLIC_PROFILE_SETTINGS_URL_DEV ??
      "http://localhost:5273/settings/public-profile"

function proxyPublicProfileSettingsRequest(request: NextRequest) {
  return proxyBackendRequest(
    request,
    new URL(backendPublicProfileSettingsUrl),
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
