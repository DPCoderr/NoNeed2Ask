import type { NextRequest } from "next/server"

import { proxyBackendRequest } from "@/app/api/_lib/proxy-backend-request"
import { backendUrls, createBackendUrl } from "@/lib/server/backend-urls"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

async function proxyApplicationRequest(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params

  return proxyBackendRequest(
    request,
    createBackendUrl(backendUrls.applications, id),
    "Applications service is unavailable."
  )
}

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyApplicationRequest(request, context)
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxyApplicationRequest(request, context)
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyApplicationRequest(request, context)
}
