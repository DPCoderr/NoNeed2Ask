export type ApplicationStatus =
  | "applied"
  | "waiting_response"
  | "interview_planned"
  | "interview_done"
  | "offer"
  | "rejected"
  | "ghosted"
  | "paused"

export type AuthUserDto = {
  id: string
  email: string
  displayName: string
  createdAt: string
  updatedAt: string
}

export type PrivateApplicationDto = {
  id: string
  userId: string
  companyName: string
  jobTitle: string
  status: ApplicationStatus
  publicNote: string | null
  privateNote: string | null
  lastContactAt: string | null
  nextActionAt: string | null
  createdAt: string
  updatedAt: string
}

export type PublicStatusApplicationDto = Pick<
  PrivateApplicationDto,
  "companyName" | "jobTitle" | "status" | "publicNote" | "updatedAt" | "nextActionAt"
>

export type PublicProfileSettingsDto = {
  id: string
  userId: string
  publicSlug: string
  isPublicSharingEnabled: boolean
  createdAt: string
  updatedAt: string
}

export type OwnerDashboardResponseDto = {
  user: AuthUserDto
  publicProfile: PublicProfileSettingsDto
  applications: PrivateApplicationDto[]
}

export type PublicStatusProfileDto = {
  publicSlug: string
  displayName: string
  isPublicSharingEnabled: true
  updatedAt: string
}

export type PublicStatusEnabledResponseDto = {
  kind: "enabled"
  profile: PublicStatusProfileDto
  applications: PublicStatusApplicationDto[]
}

export type PublicStatusDisabledResponseDto = {
  kind: "disabled"
  message: "This status page is currently private."
}

export type PublicStatusResponseDto =
  | PublicStatusEnabledResponseDto
  | PublicStatusDisabledResponseDto

export type MockApiState<TData> =
  | {
      status: "loading"
      data: null
      error: null
    }
  | {
      status: "success"
      data: TData
      error: null
    }
  | {
      status: "error"
      data: null
      error: {
        message: string
        status: number
      }
    }
