import Image from "next/image"
import type { ReactNode } from "react"

import { LandingNavbar } from "@/components/layout/landing-navbar"
import { cn } from "@/lib/utils"

export function AuthPageShell({
  children,
  variant,
}: {
  children: ReactNode
  variant: "login" | "register"
}) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-background text-foreground">
      <Image
        alt=""
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src="/bg-landing-noneed2ask.png"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/25 to-background/70" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-transparent via-background/75 to-background" />
      <LandingNavbar />
      <main
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-6xl flex-1 justify-center px-6 md:px-8",
          variant === "login"
            ? "items-center py-12 md:py-16"
            : "items-start pb-12 pt-32 md:pb-16 md:pt-36 lg:items-center lg:py-28"
        )}
      >
        <div className="flex w-full max-w-sm flex-col gap-5">{children}</div>
      </main>
    </div>
  )
}
