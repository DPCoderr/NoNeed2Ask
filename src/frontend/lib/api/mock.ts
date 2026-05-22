import {
  mockAuthUser,
  mockDisabledPublicProfileSettings,
  mockEmptyOwnerDashboardResponse,
  mockOwnerDashboardResponse,
  mockPublicProfileSettings,
  mockPublicStatusDisabledResponse,
  mockPublicStatusEmptyResponse,
  mockPublicStatusEnabledResponse,
} from "./fixtures"
import type {
  AuthUserDto,
  OwnerDashboardResponseDto,
  PublicProfileSettingsDto,
  PublicStatusResponseDto,
} from "./types"

export type MockApiScenario = "ready" | "empty" | "disabled" | "error"

// These helpers mirror the future lib/api endpoint wrappers: keep callers typed
// to DTO responses, then replace each function body with apiFetch<T>() later.
export class MockApiError extends Error {
  readonly status: number

  constructor(message: string, status = 500) {
    super(message)
    this.name = "MockApiError"
    this.status = status
  }
}

const MOCK_API_DELAY_MS = 250

async function resolveMock<TData>(data: TData, delayMs = MOCK_API_DELAY_MS) {
  await new Promise((resolve) => setTimeout(resolve, delayMs))

  return data
}

async function rejectMock(message: string, status = 503): Promise<never> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY_MS))

  throw new MockApiError(message, status)
}

export async function getMockCurrentUser(
  scenario: Extract<MockApiScenario, "ready" | "error"> = "ready"
): Promise<AuthUserDto> {
  if (scenario === "error") {
    return rejectMock("We could not load the current user.")
  }

  return resolveMock(mockAuthUser)
}

export async function getMockOwnerDashboard(
  scenario: Extract<MockApiScenario, "ready" | "empty" | "error"> = "ready"
): Promise<OwnerDashboardResponseDto> {
  if (scenario === "error") {
    return rejectMock("We could not load your applications.")
  }

  if (scenario === "empty") {
    return resolveMock(mockEmptyOwnerDashboardResponse)
  }

  return resolveMock(mockOwnerDashboardResponse)
}

export async function getMockPublicProfileSettings(
  scenario: Extract<MockApiScenario, "ready" | "disabled" | "error"> = "ready"
): Promise<PublicProfileSettingsDto> {
  if (scenario === "error") {
    return rejectMock("We could not load public sharing settings.")
  }

  if (scenario === "disabled") {
    return resolveMock(mockDisabledPublicProfileSettings)
  }

  return resolveMock(mockPublicProfileSettings)
}

export async function getMockPublicStatus(
  slug: string,
  scenario: MockApiScenario = "ready"
): Promise<PublicStatusResponseDto> {
  if (scenario === "error") {
    return rejectMock(`We could not load the public status page for ${slug}.`)
  }

  if (scenario === "disabled") {
    return resolveMock(mockPublicStatusDisabledResponse)
  }

  if (scenario === "empty") {
    return resolveMock(mockPublicStatusEmptyResponse)
  }

  return resolveMock(mockPublicStatusEnabledResponse)
}
