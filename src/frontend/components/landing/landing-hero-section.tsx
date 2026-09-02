import { ArrowRight, Link2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import heroConversation from "../../public/landing/hero-conversation.png"

import { LandingReveal } from "./landing-reveal"

export function LandingHeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-blue-100/80 bg-[linear-gradient(145deg,#f8fbff_10%,#edf7ff_52%,#f6faff_100%)]">
      <div
        aria-hidden="true"
        className="absolute -left-36 top-12 -z-10 size-[34rem] rounded-full bg-blue-200/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-28 top-0 -z-10 size-[38rem] rounded-full bg-cyan-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(29_112_168_/_0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(29_112_168_/_0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
      />

      <div className="mx-auto grid min-w-0 w-full max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:pb-24 lg:pt-32 xl:pt-40">
        <div className="relative z-10 min-w-0 max-w-2xl">
          <LandingReveal>
            <h1 className="max-w-3xl text-[2rem] font-semibold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-5xl xl:text-[3.5rem]">
              <span className="block whitespace-nowrap">Track applications</span>
              <span className="block">privately.</span>
              <span className="block text-primary sm:whitespace-nowrap">
                Share progress simply.
              </span>
            </h1>
          </LandingReveal>

          <LandingReveal delay={80}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Track roles, interviews, notes, and next actions in your private
              dashboard. When people ask how it is going, share a read-only
              status page, without sharing private details.
            </p>
          </LandingReveal>

          <LandingReveal
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            delay={160}
          >
            <Button
              asChild
              className="h-12 rounded-xl px-6 text-base shadow-lg shadow-blue-900/15"
              size="lg"
            >
              <Link href="/register">
                Create your tracker
                <ArrowRight aria-hidden="true" className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-xl border-blue-200 bg-white/70 px-6 text-base backdrop-blur hover:bg-white"
              size="lg"
              variant="outline"
            >
              <Link href="#public-status">See how sharing works</Link>
            </Button>
          </LandingReveal>
        </div>

        <LandingReveal
          className="relative mx-auto w-full min-w-0 max-w-2xl lg:mx-0"
          delay={180}
          motion="fade"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-12 bottom-16 h-1/2 rounded-full bg-blue-300/25 blur-3xl"
          />
          <div className="relative mx-auto w-full max-w-[38rem] pb-20 sm:pb-24 lg:pb-20">
            <Image
              alt="A job seeker receives repeated questions about their search from friends and family"
              className="relative z-10 h-auto w-full object-contain"
              height={1200}
              preload
              sizes="(max-width: 639px) 92vw, (max-width: 1023px) 38rem, 48vw"
              src={heroConversation}
              width={1200}
            />
            <div className="absolute bottom-0 right-0 z-20 w-[88%] max-w-sm rounded-2xl rounded-br-sm border border-blue-300 bg-primary px-4 py-3.5 text-primary-foreground shadow-xl shadow-blue-950/20 sm:right-[4%] sm:px-5 sm:py-4">
              <p className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                <Link2 aria-hidden="true" className="size-4 shrink-0" />
                Here you go
              </p>
              <p className="mt-1.5 truncate text-xs text-blue-50/90 sm:text-sm">
                noneed2ask.app/status/your-name
              </p>
            </div>
          </div>
        </LandingReveal>
      </div>
    </section>
  )
}
