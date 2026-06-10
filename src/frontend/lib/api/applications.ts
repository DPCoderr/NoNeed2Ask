import { apiFetch, type ApiRequestOptions } from "./client"
import type {
  ApplicationListRequestDto,
  ApplicationListResponseDto,
  CreateApplicationRequestDto,
  PrivateApplicationDto,
  UpdateApplicationRequestDto,
} from "./types"

const proxiedApplicationsBaseUrl = "/api/applications"

function appendApplicationListSearchParams(
  searchParams: URLSearchParams,
  request: ApplicationListRequestDto
) {
  if (request.page) {
    searchParams.set("page", request.page.toString())
  }

  for (const status of request.status ?? []) {
    searchParams.append("status", status)
  }

  if (request.search?.trim()) {
    searchParams.set("search", request.search.trim())
  }

  if (request.sortBy) {
    searchParams.set("sortBy", request.sortBy)
  }

  if (request.sortDirection) {
    searchParams.set("sortDirection", request.sortDirection)
  }
}

export function createApplicationListUrl(
  request: ApplicationListRequestDto = {},
  baseUrl = proxiedApplicationsBaseUrl
) {
  const url = new URL(baseUrl, "http://localhost")
  appendApplicationListSearchParams(url.searchParams, request)

  if (baseUrl.startsWith("/")) {
    return `${url.pathname}${url.search}`
  }

  return url.toString()
}

export async function listApplications(
  request: ApplicationListRequestDto = {},
  options?: ApiRequestOptions & { baseUrl?: string }
) {
  const { baseUrl, ...fetchOptions } = options ?? {}

  return apiFetch<ApplicationListResponseDto>(
    createApplicationListUrl(request, baseUrl),
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      ...fetchOptions,
    }
  )
}

export async function createApplication(
  request: CreateApplicationRequestDto,
  options?: ApiRequestOptions & { baseUrl?: string }
) {
  const { baseUrl = proxiedApplicationsBaseUrl, ...fetchOptions } =
    options ?? {}
  const headers = new Headers(fetchOptions.headers)

  headers.set("Content-Type", "application/json")

  return apiFetch<PrivateApplicationDto>(baseUrl, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    ...fetchOptions,
    headers,
    body: JSON.stringify(request),
  })
}

export async function getApplication(
  id: string,
  options?: ApiRequestOptions & { baseUrl?: string }
) {
  const { baseUrl = proxiedApplicationsBaseUrl, ...fetchOptions } =
    options ?? {}
  const url = new URL(baseUrl, "http://localhost")
  url.pathname = `${url.pathname.replace(/\/$/, "")}/${encodeURIComponent(id)}`
  const input = baseUrl.startsWith("/") ? `${url.pathname}${url.search}` : url.toString()

  return apiFetch<PrivateApplicationDto>(input, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    ...fetchOptions,
  })
}

export async function updateApplication(
  id: string,
  request: UpdateApplicationRequestDto,
  options?: ApiRequestOptions & { baseUrl?: string }
) {
  const { baseUrl = proxiedApplicationsBaseUrl, ...fetchOptions } =
    options ?? {}
  const headers = new Headers(fetchOptions.headers)
  const url = new URL(baseUrl, "http://localhost")

  url.pathname = `${url.pathname.replace(/\/$/, "")}/${encodeURIComponent(id)}`
  headers.set("Content-Type", "application/json")

  const input = baseUrl.startsWith("/") ? `${url.pathname}${url.search}` : url.toString()

  return apiFetch<void>(input, {
    method: "PUT",
    credentials: "include",
    cache: "no-store",
    ...fetchOptions,
    headers,
    body: JSON.stringify(request),
  })
}

export async function deleteApplication(
  id: string,
  options?: ApiRequestOptions & { baseUrl?: string }
) {
  const { baseUrl = proxiedApplicationsBaseUrl, ...fetchOptions } =
    options ?? {}
  const url = new URL(baseUrl, "http://localhost")

  url.pathname = `${url.pathname.replace(/\/$/, "")}/${encodeURIComponent(id)}`
  const input = baseUrl.startsWith("/") ? `${url.pathname}${url.search}` : url.toString()

  return apiFetch<void>(input, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
    ...fetchOptions,
  })
}
