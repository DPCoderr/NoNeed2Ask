import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { LandingReveal } from "./landing-reveal"

export function LandingCtaSection() {
  return (
    <section className="bg-white px-5 pb-20 pt-4 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
      <LandingReveal className="mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/15 sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-32 -z-10 size-96 rounded-full bg-blue-500/25 blur-3xl"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Start on your terms
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Your search can stay private, public, or both.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Build the private tracker first. Share your status only when it
              makes the search feel lighter.
            </p>
          </div>
          <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <Button
              asChild
              className="h-12 rounded-xl bg-white px-6 text-base text-slate-950 hover:bg-blue-50"
              size="lg"
            >
              <Link href="/register">
                Create your tracker
                <ArrowRight aria-hidden="true" className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-xl border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
              size="lg"
              variant="outline"
            >
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </LandingReveal>
    </section>
  )
}
