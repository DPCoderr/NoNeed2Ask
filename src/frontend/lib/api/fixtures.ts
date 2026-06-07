import type {
  AuthUserDto,
  MockApiState,
  OwnerDashboardResponseDto,
  PrivateApplicationDto,
  PublicProfileSettingsDto,
  PublicStatusApplicationDto,
  PublicStatusResponseDto,
} from "./types"

export const mockAuthUser: AuthUserDto = {
  id: "user_john_01",
  email: "john@example.com",
  displayName: "John",
  createdAt: "2026-05-01T09:00:00.000Z",
  updatedAt: "2026-05-22T13:45:00.000Z",
}

export const mockPublicProfileSettings: PublicProfileSettingsDto = {
  id: "profile_john_01",
  userId: mockAuthUser.id,
  publicSlug: "john-job-search",
  isPublicSharingEnabled: true,
  createdAt: "2026-05-01T09:05:00.000Z",
  updatedAt: "2026-05-22T13:45:00.000Z",
}

export const mockDisabledPublicProfileSettings: PublicProfileSettingsDto = {
  ...mockPublicProfileSettings,
  isPublicSharingEnabled: false,
  updatedAt: "2026-05-22T15:20:00.000Z",
}

export const mockPrivateApplications: PrivateApplicationDto[] = [
  {
    id: "app_001",
    userId: mockAuthUser.id,
    companyName: "Northstar Labs",
    jobTitle: "Senior Frontend Engineer",
    status: "interview_planned",
    publicNote: "Next conversation is scheduled and I am preparing a small case study.",
    privateNote: "Ask about design system ownership and on-call expectations.",
    lastContactAt: "2026-05-20T10:30:00.000Z",
    nextActionAt: "2026-05-27T14:00:00.000Z",
    createdAt: "2026-05-10T08:15:00.000Z",
    updatedAt: "2026-05-22T12:00:00.000Z",
  },
  {
    id: "app_002",
    userId: mockAuthUser.id,
    companyName: "Kindred Health",
    jobTitle: "Product Engineer",
    status: "waiting_response",
    publicNote: "Application sent. Waiting for the first response.",
    privateNote: "Referral from Mira. Follow up after one week if quiet.",
    lastContactAt: "2026-05-18T16:45:00.000Z",
    nextActionAt: "2026-05-25T09:00:00.000Z",
    createdAt: "2026-05-18T16:45:00.000Z",
    updatedAt: "2026-05-18T16:45:00.000Z",
  },
  {
    id: "app_003",
    userId: mockAuthUser.id,
    companyName: "Atlas Works",
    jobTitle: "Full Stack Developer",
    status: "interview_done",
    publicNote: "First round completed. Waiting for feedback.",
    privateNote: "Strong technical fit, salary range needs careful handling.",
    lastContactAt: "2026-05-21T11:15:00.000Z",
    nextActionAt: "2026-05-24T10:00:00.000Z",
    createdAt: "2026-05-12T13:20:00.000Z",
    updatedAt: "2026-05-21T12:05:00.000Z",
  },
  {
    id: "app_004",
    userId: mockAuthUser.id,
    companyName: "Orbit Studio",
    jobTitle: "UI Engineer",
    status: "paused",
    publicNote: null,
    privateNote: "Paused until they confirm remote policy.",
    lastContactAt: "2026-05-14T08:30:00.000Z",
    nextActionAt: null,
    createdAt: "2026-05-09T15:40:00.000Z",
    updatedAt: "2026-05-19T09:10:00.000Z",
  },
]

export const mockEmptyPrivateApplications: PrivateApplicationDto[] = []

export const mockPublicApplications: PublicStatusApplicationDto[] =
  mockPrivateApplications.map(
    ({ companyName, jobTitle, status, publicNote, updatedAt, nextActionAt }) => ({
      companyName,
      jobTitle,
      status,
      publicNote,
      updatedAt,
      nextActionAt,
    })
  )

export const mockOwnerDashboardResponse: OwnerDashboardResponseDto = {
  user: mockAuthUser,
  publicProfile: mockPublicProfileSettings,
  applications: mockPrivateApplications,
}

export const mockEmptyOwnerDashboardResponse: OwnerDashboardResponseDto = {
  user: mockAuthUser,
  publicProfile: mockPublicProfileSettings,
  applications: mockEmptyPrivateApplications,
}

export const mockPublicStatusEnabledResponse: PublicStatusResponseDto = {
  kind: "enabled",
  profile: {
    publicSlug: mockPublicProfileSettings.publicSlug,
    displayName: mockAuthUser.displayName,
    isPublicSharingEnabled: true,
    updatedAt: mockPublicProfileSettings.updatedAt,
  },
  applications: mockPublicApplications,
}

export const mockPublicStatusEmptyResponse: PublicStatusResponseDto = {
  kind: "enabled",
  profile: {
    publicSlug: mockPublicProfileSettings.publicSlug,
    displayName: mockAuthUser.displayName,
    isPublicSharingEnabled: true,
    updatedAt: mockPublicProfileSettings.updatedAt,
  },
  applications: [],
}

export const mockPublicStatusDisabledResponse: PublicStatusResponseDto = {
  kind: "disabled",
  message: "This status page is currently private.",
}

export const mockPublicStatusStates: Record<
  "loading" | "enabled" | "empty" | "disabled" | "error",
  MockApiState<PublicStatusResponseDto>
> = {
  loading: {
    status: "loading",
    data: null,
    error: null,
  },
  enabled: {
    status: "success",
    data: mockPublicStatusEnabledResponse,
    error: null,
  },
  empty: {
    status: "success",
    data: mockPublicStatusEmptyResponse,
    error: null,
  },
  disabled: {
    status: "success",
    data: mockPublicStatusDisabledResponse,
    error: null,
  },
  error: {
    status: "error",
    data: null,
    error: {
      message: "We could not load this public status page.",
      status: 503,
    },
  },
}

export const mockOwnerDashboardStates: Record<
  "loading" | "ready" | "empty" | "error",
  MockApiState<OwnerDashboardResponseDto>
> = {
  loading: {
    status: "loading",
    data: null,
    error: null,
  },
  ready: {
    status: "success",
    data: mockOwnerDashboardResponse,
    error: null,
  },
  empty: {
    status: "success",
    data: mockEmptyOwnerDashboardResponse,
    error: null,
  },
  error: {
    status: "error",
    data: null,
    error: {
      message: "We could not load your applications.",
      status: 503,
    },
  },
}
