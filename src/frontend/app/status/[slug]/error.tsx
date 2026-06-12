"use client"

import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"

import { LandingNavbar } from "@/components/layout/landing-navbar"
import { Button } from "@/components/ui/button"

export default function StatusErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-[#f6faff] text-slate-950">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/bg-userpage-light.jpg')" }}
      />
      <div className="fixed inset-0 z-[1] bg-[linear-gradient(225deg,rgb(255_255_255/0.04)_0%,rgb(255_255_255/0.2)_34%,rgb(255_255_255/0.72)_62%,rgb(246_250_255/0.96)_100%)]" />
      <div className="fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_top_right,rgb(255_255_255/0)_0%,rgb(255_255_255/0.1)_32%,rgb(246_250_255/0.86)_78%)]" />

      <LandingNavbar
        navItems={[
          { href: "/", label: "Home" },
          { href: "/login", label: "Login" },
          { href: "/register", label: "Sign Up" },
        ]}
      />

      <div className="relative z-10 pt-24 md:pt-28">
        <section className="relative z-10 px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:pt-16">
          <div className="mx-auto w-full max-w-3xl rounded-lg border border-white/80 bg-white/85 px-6 py-9 text-center shadow-xl shadow-blue-950/10 backdrop-blur-xl sm:px-12 sm:py-14">
            <div className="mx-auto flex size-32 items-center justify-center rounded-full border border-blue-100 bg-blue-50/70 sm:size-40">
              <Image
                alt="Status page temporarily unavailable"
                className="size-24 object-contain sm:size-32"
                height={128}
                src="/private-img.PNG"
                width={128}
              />
            </div>

            <p className="mt-7 text-sm font-semibold text-blue-700">
              500
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              We could not load this status page
            </h1>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-blue-950/70">
              The backend service may be waking up or temporarily unavailable.
              Try again in a moment.
            </p>

            <Button
              className="mt-7 rounded-lg"
              onClick={() => reset()}
              size="lg"
              type="button"
            >
              <HugeiconsIcon icon={AlertCircleIcon} />
              Try again
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
