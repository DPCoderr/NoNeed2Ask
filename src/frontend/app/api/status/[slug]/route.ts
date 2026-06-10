import type { NextRequest } from "next/server"

import { proxyBackendRequest } from "@/app/api/_lib/proxy-backend-request"

const backendPublicStatusBaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PUBLIC_STATUS_BASE_URL ??
      "https://noneed2ask.onrender.com/status"
    : process.env.PUBLIC_STATUS_BASE_URL_DEV ??
      "http://localhost:5273/status"

type RouteContext = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params
  const upstreamUrl = new URL(
    encodeURIComponent(slug),
    `${backendPublicStatusBaseUrl.replace(/\/$/, "")}/`
  )

  return proxyBackendRequest(
    request,
    upstreamUrl,
    "Public status service is unavailable."
  )
}
