export class ApiResponseError extends Error {
  readonly status: number
  readonly response: Response

  constructor(response: Response, message?: string) {
    super(message || response.statusText || "Request failed")
    this.name = "ApiResponseError"
    this.status = response.status
    this.response = response
  }
}

type ErrorBody = {
  detail?: string
  error?: string
  errors?: Record<string, string[]>
  message?: string
  title?: string
}

function getErrorBodyMessage(body: ErrorBody) {
  const validationMessages = body.errors
    ? Object.values(body.errors).flat().join(" ")
    : undefined

  return validationMessages ?? body.detail ?? body.message ?? body.error ?? body.title
}

export async function throwIfApiError(response: Response) {
  if (response.ok) {
    return
  }

  const contentType = response.headers.get("content-type")

  if (contentType?.includes("json")) {
    const body = (await response.clone().json().catch(() => null)) as
      | ErrorBody
      | null

    if (body) {
      throw new ApiResponseError(response, getErrorBodyMessage(body))
    }
  }

  const body = await response
    .clone()
    .text()
    .then((text) => text.trim())
    .catch(() => "")

  throw new ApiResponseError(response, body || undefined)
}
