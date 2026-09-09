import "server-only"

import { backendUrls } from "@/lib/server/backend-urls"

export async function warmBackend() {
  try {
    const response = await fetch(new URL("/alive", backendUrls.auth), {
      cache: "no-store",
      signal: AbortSignal.timeout(55_000),
    })

    if (!response.ok) {
      console.warn("Backend warm-up failed.", { status: response.status })
    }
  } catch {
    // Best effort: an unavailable backend must not affect the landing page.
    console.warn("Backend warm-up did not complete.")
  }
}
