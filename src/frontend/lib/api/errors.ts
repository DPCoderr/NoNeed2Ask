export class ApiResponseError extends Error {
  readonly status: number
  readonly response: Response
  readonly errors?: Record<string, string[]>

  constructor(
    response: Response,
    message?: string,
    errors?: Record<string, string[]>
  ) {
    super(message || response.statusText || "Request failed")
    this.name = "ApiResponseError"
    this.status = response.status
    this.response = response
    this.errors = errors
  }
}

type ErrorBody = {
  detail?: string
  error?: string
  errors?: Record<string, string[]>
  message?: string
  title?: string
}

const rateLimitMessage = "Too many attempts. Please wait a minute and try again."

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

  if (response.status === 429) {
    throw new ApiResponseError(response, rateLimitMessage)
  }

  const contentType = response.headers.get("content-type")

  if (contentType?.includes("json")) {
    const body = (await response.clone().json().catch(() => null)) as
      | ErrorBody
      | null

    if (body) {
      throw new ApiResponseError(response, getErrorBodyMessage(body), body.errors)
    }
  }

  const body = await response
    .clone()
    .text()
    .then((text) => text.trim())
    .catch(() => "")

  throw new ApiResponseError(response, body || undefined)
}
