import type { NextRequest } from "next/server"

import { proxyBackendRequest } from "@/app/api/_lib/proxy-backend-request"
import { backendUrls } from "@/lib/server/backend-urls"

function proxyApplicationsRequest(request: NextRequest) {
  return proxyBackendRequest(
    request,
    new URL(backendUrls.applications),
    "Applications service is unavailable."
  )
}

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  return proxyApplicationsRequest(request)
}

export async function POST(request: NextRequest) {
  return proxyApplicationsRequest(request)
}
