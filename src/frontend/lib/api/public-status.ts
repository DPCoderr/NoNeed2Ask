import { apiFetch, type ApiRequestOptions } from "./client"
import type { PublicStatusResponseDto } from "./types"

const proxiedPublicStatusBaseUrl = "/api/status"

export function createPublicStatusUrl(
  slug: string,
  baseUrl = proxiedPublicStatusBaseUrl
) {
  const url = new URL(baseUrl, "http://localhost")
  url.pathname = `${url.pathname.replace(/\/$/, "")}/${encodeURIComponent(slug)}`

  if (baseUrl.startsWith("/")) {
    return `${url.pathname}${url.search}`
  }

  return url.toString()
}

export async function getPublicStatus(
  slug: string,
  options?: ApiRequestOptions & { baseUrl?: string }
) {
  const { baseUrl, ...fetchOptions } = options ?? {}

  return apiFetch<PublicStatusResponseDto>(
    createPublicStatusUrl(slug, baseUrl),
    {
      method: "GET",
      cache: "no-store",
      ...fetchOptions,
    }
  )
}
