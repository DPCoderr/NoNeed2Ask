import { apiFetch, type ApiRequestOptions } from "./client"
import type { PublicStatusResponseDto } from "./types"

const proxiedPublicStatusBaseUrl = "/api/status"

export function createPublicStatusUrl(
  publicPageId: string,
  baseUrl = proxiedPublicStatusBaseUrl
) {
  const url = new URL(baseUrl, "http://localhost")
  url.pathname = `${url.pathname.replace(/\/$/, "")}/${encodeURIComponent(publicPageId)}`

  if (baseUrl.startsWith("/")) {
    return `${url.pathname}${url.search}`
  }

  return url.toString()
}

export async function getPublicStatus(
  publicPageId: string,
  options?: ApiRequestOptions & { baseUrl?: string }
) {
  const { baseUrl, ...fetchOptions } = options ?? {}

  return apiFetch<PublicStatusResponseDto>(
    createPublicStatusUrl(publicPageId, baseUrl),
    {
      method: "GET",
      cache: "no-store",
      ...fetchOptions,
    }
  )
}
