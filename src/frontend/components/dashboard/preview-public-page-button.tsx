import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const previewButtonClassName =
  "h-11 min-w-0 w-full justify-between rounded-xl border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-800 shadow-none hover:border-blue-300 hover:bg-blue-100 hover:text-blue-950"

export function PreviewPublicPageButton({
  isAvailable,
  publicSlug,
}: {
  isAvailable: boolean
  publicSlug: string
}) {
  const content = (
    <>
      <span className="truncate">Preview page</span>
      <HugeiconsIcon
        aria-hidden="true"
        className="size-4"
        icon={ArrowUpRight01Icon}
        strokeWidth={2}
      />
    </>
  )

  if (!isAvailable) {
    return (
      <Button
        className={previewButtonClassName}
        disabled
        size="sm"
        variant="outline"
      >
        {content}
      </Button>
    )
  }

  return (
    <Button
      asChild
      className={previewButtonClassName}
      size="sm"
      variant="outline"
    >
      <Link href={`/status/${publicSlug}`}>{content}</Link>
    </Button>
  )
}
