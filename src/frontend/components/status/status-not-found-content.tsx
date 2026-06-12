import { DashboardSquare01Icon, Home01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

type StatusNotFoundContentProps = {
  actionHref?: string
  actionLabel?: string
  description?: string
  eyebrow?: string
  isAuthenticated: boolean
  title?: string
}

export function StatusNotFoundContent({
  actionHref,
  actionLabel,
  description = "The link may be incorrect, expired, or the owner may have removed this public status page.",
  eyebrow = "404",
  isAuthenticated,
  title = "This status page could not be found",
}: StatusNotFoundContentProps) {
  const resolvedActionHref = actionHref ?? (isAuthenticated ? "/" : "/login")
  const resolvedActionLabel =
    actionLabel ?? (isAuthenticated ? "Return to dashboard" : "Go to login")

  return (
    <section className="relative z-10 px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:pt-16">
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-white/80 bg-white/85 px-6 py-9 text-center shadow-xl shadow-blue-950/10 backdrop-blur-xl sm:px-12 sm:py-14">
        <div className="mx-auto flex size-32 items-center justify-center rounded-full border border-blue-100 bg-blue-50/70 sm:size-40">
          <Image
            alt="Status page not found"
            className="size-24 object-contain sm:size-32"
            height={128}
            src="/private-img.PNG"
            width={128}
          />
        </div>

        <p className="mt-7 text-sm font-semibold text-blue-700">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-blue-950/70">
          {description}
        </p>

        <Button asChild className="mt-7 rounded-lg" size="lg">
          <Link href={resolvedActionHref}>
            <HugeiconsIcon
              icon={isAuthenticated ? DashboardSquare01Icon : Home01Icon}
            />
            {resolvedActionLabel}
          </Link>
        </Button>
      </div>
    </section>
  )
}
