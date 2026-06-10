import { apiFetch, type ApiRequestOptions } from "./client"
import type { PublicProfileSettingsDto } from "./types"

const proxiedPublicProfileSettingsUrl = "/api/settings/public-profile"

export type UpdatePublicProfileSettingsRequestDto = {
  isPublicSharingEnabled: boolean
}

export async function getPublicProfileSettings(
  options?: ApiRequestOptions & { url?: string }
) {
  const { url = proxiedPublicProfileSettingsUrl, ...fetchOptions } =
    options ?? {}

  return apiFetch<PublicProfileSettingsDto>(url, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    ...fetchOptions,
  })
}

export async function updatePublicProfileSettings(
  request: UpdatePublicProfileSettingsRequestDto,
  options?: ApiRequestOptions & { url?: string }
) {
  const { url = proxiedPublicProfileSettingsUrl, ...fetchOptions } =
    options ?? {}
  const headers = new Headers(fetchOptions.headers)

  headers.set("Content-Type", "application/json")

  return apiFetch<PublicProfileSettingsDto>(url, {
    method: "PATCH",
    credentials: "include",
    cache: "no-store",
    ...fetchOptions,
    headers,
    body: JSON.stringify(request),
  })
}
