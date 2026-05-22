import { throwIfApiError } from "./errors"

export type ApiRequestOptions = RequestInit & {
  accessToken?: string
}

export function withApiHeaders({
  accessToken,
  headers,
  ...init
}: ApiRequestOptions = {}): RequestInit {
  const requestHeaders = new Headers(headers)

  if (accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`)
  }

  return {
    ...init,
    headers: requestHeaders,
  }
}

export async function apiFetch<TResponse>(
  input: RequestInfo | URL,
  options?: ApiRequestOptions
) {
  const response = await fetch(input, withApiHeaders(options))

  await throwIfApiError(response)

  if (response.status === 204) {
    return undefined as TResponse
  }

  return (await response.json()) as TResponse
}
