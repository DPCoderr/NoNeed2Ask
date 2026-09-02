import "server-only"

function environmentUrl(
  productionEnvironmentName: string,
  developmentEnvironmentName: string,
  productionFallback: string,
  developmentFallback: string
) {
  return process.env.NODE_ENV === "production"
    ? process.env[productionEnvironmentName] ?? productionFallback
    : process.env[developmentEnvironmentName] ?? developmentFallback
}

export const backendUrls = {
  applications: environmentUrl(
    "APPLICATIONS_BASE_URL",
    "APPLICATIONS_BASE_URL_DEV",
    "https://noneed2ask.onrender.com/applications",
    "http://localhost:5273/applications"
  ),
  auth: environmentUrl(
    "AUTH_BASE_URL",
    "AUTH_BASE_URL_DEV",
    "https://noneed2ask.onrender.com/auth",
    "http://localhost:5273/auth"
  ),
  publicProfileSettings: environmentUrl(
    "PUBLIC_PROFILE_SETTINGS_URL",
    "PUBLIC_PROFILE_SETTINGS_URL_DEV",
    "https://noneed2ask.onrender.com/settings/public-profile",
    "http://localhost:5273/settings/public-profile"
  ),
  publicStatus: environmentUrl(
    "PUBLIC_STATUS_BASE_URL",
    "PUBLIC_STATUS_BASE_URL_DEV",
    "https://noneed2ask.onrender.com/status",
    "http://localhost:5273/status"
  ),
} as const

export function createBackendUrl(baseUrl: string, ...path: string[]) {
  const encodedPath = path.map(encodeURIComponent).join("/")

  return new URL(encodedPath, `${baseUrl.replace(/\/$/, "")}/`)
}
