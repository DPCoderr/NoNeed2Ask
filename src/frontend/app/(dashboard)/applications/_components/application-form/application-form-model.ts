import type { FieldPath } from "react-hook-form"

import { normalizeApplicationStatus } from "@/lib/api/application-status"
import type {
  CreateApplicationRequestDto,
  PrivateApplicationDto,
  UpdateApplicationRequestDto,
} from "@/lib/api/types"
import type { CreateApplicationFormValues } from "@/lib/validation/applications"

export type ApplicationFormProps =
  | {
      mode: "create"
      application?: never
    }
  | {
      mode: "update"
      application: PrivateApplicationDto
    }

export const applicationFormFieldNames = {
  CompanyName: "companyName",
  JobTitle: "jobTitle",
  Status: "status",
  PublicNote: "publicNote",
  PrivateNote: "privateNote",
  LastContactAt: "lastContactAt",
  NextActionAt: "nextActionAt",
} satisfies Record<string, keyof CreateApplicationFormValues>

export const applicationFormSteps = [
  {
    description: "Add the company and role you want to track.",
    fields: ["companyName", "jobTitle"],
    title: "Application details",
  },
  {
    description: "Choose the current application status.",
    fields: ["status"],
    title: "Progress",
  },
  {
    description: "Add optional dates for contact and follow-up.",
    fields: ["lastContactAt", "nextActionAt"],
    title: "Dates",
  },
  {
    description: "Add any public or private notes.",
    fields: ["publicNote", "privateNote"],
    title: "Notes",
  },
] satisfies {
  description: string
  fields: FieldPath<CreateApplicationFormValues>[]
  title: string
}[]

function optionalTrimmedValue(value: string) {
  const trimmedValue = value.trim()

  return trimmedValue.length > 0 ? trimmedValue : null
}

function optionalDateTimeValue(value: string) {
  return value ? new Date(value).toISOString() : null
}

export function formatDateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function formatTimeInputValue(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${hours}:${minutes}:${seconds}`
}

function toDateTimeInputValue(value: string | null) {
  if (!value) {
    return ""
  }

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? ""
    : `${formatDateInputValue(date)}T${formatTimeInputValue(date)}`
}

export function getApplicationFormDefaultValues(
  application?: PrivateApplicationDto
): CreateApplicationFormValues {
  if (!application) {
    return {
      companyName: "",
      jobTitle: "",
      status: "applied",
      publicNote: "",
      privateNote: "",
      lastContactAt: "",
      nextActionAt: "",
    }
  }

  return {
    companyName: application.companyName,
    jobTitle: application.jobTitle,
    status: normalizeApplicationStatus(application.status),
    publicNote: application.publicNote ?? "",
    privateNote: application.privateNote ?? "",
    lastContactAt: toDateTimeInputValue(application.lastContactAt),
    nextActionAt: toDateTimeInputValue(application.nextActionAt),
  }
}

export function getDateValue(value: string) {
  return value.split("T")[0] ?? ""
}

export function getTimeValue(value: string) {
  return value.split("T")[1]?.slice(0, 8) ?? ""
}

export function getSelectedDate(value: string) {
  const dateValue = getDateValue(value)

  if (!dateValue) {
    return undefined
  }

  const date = new Date(`${dateValue}T00:00`)

  return Number.isNaN(date.getTime()) ? undefined : date
}

export function getDateTimeValue(dateValue: string, timeValue: string) {
  if (!dateValue) {
    return ""
  }

  return `${dateValue}T${timeValue || "09:00:00"}`
}

export function toApplicationRequest(
  values: CreateApplicationFormValues
): CreateApplicationRequestDto | UpdateApplicationRequestDto {
  return {
    companyName: values.companyName.trim(),
    jobTitle: values.jobTitle.trim(),
    status: values.status,
    publicNote: optionalTrimmedValue(values.publicNote),
    privateNote: optionalTrimmedValue(values.privateNote),
    lastContactAt: optionalDateTimeValue(values.lastContactAt),
    nextActionAt: optionalDateTimeValue(values.nextActionAt),
  }
}
