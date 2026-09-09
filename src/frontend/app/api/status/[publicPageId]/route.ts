import type { NextRequest } from "next/server"

import { proxyBackendRequest } from "@/app/api/_lib/proxy-backend-request"
import { backendUrls, createBackendUrl } from "@/lib/server/backend-urls"

type RouteContext = {
  params: Promise<{
    publicPageId: string
  }>
}

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, context: RouteContext) {
  const { publicPageId } = await context.params
  return proxyBackendRequest(
    request,
    createBackendUrl(backendUrls.publicStatus, publicPageId),
    "Public status service is unavailable."
  )
}
