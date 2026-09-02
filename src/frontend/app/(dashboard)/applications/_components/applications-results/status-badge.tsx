import Image from "next/image"

import { normalizeApplicationStatus } from "@/lib/api/application-status"
import type { ApplicationStatus } from "@/lib/api/types"

import { statusDetails } from "../../application-list-config"

const iconPath = "/dashboard-icons"

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const details = statusDetails[normalizeApplicationStatus(status)]

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold ${details.className}`}
    >
      {details.icon ? (
        <Image
          alt=""
          className="size-4"
          height={80}
          src={`${iconPath}/${details.icon}`}
          width={80}
        />
      ) : null}
      {details.shortLabel ?? details.label}
    </span>
  )
}
