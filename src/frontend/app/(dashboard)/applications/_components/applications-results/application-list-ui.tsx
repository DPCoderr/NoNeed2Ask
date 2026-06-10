import Image from "next/image"

import { normalizeApplicationStatus } from "@/lib/api/application-status"
import type { ApplicationStatus } from "@/lib/api/types"

import { statusDetails } from "../../application-list-config"

const iconPath = "/dashboard-icons"

// Small wrapper for dashboard icons used inside table badges.
function AppIcon({
  alt = "",
  className,
  name,
}: {
  alt?: string
  className?: string
  name: string
}) {
  return (
    <Image
      alt={alt}
      className={className}
      height={80}
      src={`${iconPath}/${name}`}
      width={80}
    />
  )
}

// Uses the company initial when there is no uploaded company logo.
export function CompanyMark({ companyName }: { companyName: string }) {
  const initial = companyName.trim().charAt(0).toUpperCase() || "?"

  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-sm font-semibold text-blue-800">
      {initial}
    </span>
  )
}

// Keeps date display consistent between desktop and mobile rows.
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

// Displays the configured color, label, and optional icon for a status.
export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const details = statusDetails[normalizeApplicationStatus(status)]

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold ${details.className}`}
    >
      {details.icon ? <AppIcon className="size-4" name={details.icon} /> : null}
      {details.shortLabel ?? details.label}
    </span>
  )
}
