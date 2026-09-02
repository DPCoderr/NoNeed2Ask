import type { NextRequest } from "next/server"

import { proxyBackendRequest } from "@/app/api/_lib/proxy-backend-request"
import { backendUrls, createBackendUrl } from "@/lib/server/backend-urls"

type RouteContext = {
  params: Promise<{
    path: string[]
  }>
}

async function proxyAuthRequest(request: NextRequest, context: RouteContext) {
  const { path } = await context.params

  return proxyBackendRequest(
    request,
    createBackendUrl(backendUrls.auth, ...path),
    "Authentication service is unavailable."
  )
}

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyAuthRequest(request, context)
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyAuthRequest(request, context)
}
