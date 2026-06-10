import "server-only"

import { headers } from "next/headers"
import { notFound } from "next/navigation"

import { getApplication } from "@/lib/api/applications"
import { ApiResponseError } from "@/lib/api/errors"

async function getApplicationsApiBaseUrl() {
  const headerStore = await headers()
  const host = headerStore.get("host") ?? "localhost:3000"
  const protocol = headerStore.get("x-forwarded-proto") ?? "http"

  return {
    baseUrl: `${protocol}://${host}/api/applications`,
    cookie: headerStore.get("cookie") ?? undefined,
  }
}

export async function loadApplication(id: string) {
  const { baseUrl, cookie } = await getApplicationsApiBaseUrl()

  try {
    return await getApplication(id, {
      baseUrl,
      headers: cookie ? { cookie } : undefined,
    })
  } catch (error) {
    if (error instanceof ApiResponseError && error.status === 404) {
      notFound()
    }

    throw error
  }
}
