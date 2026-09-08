import { ArrowRight, Link2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import heroConversation from "../../public/landing/hero-conversation.png"

export function LandingHeroSection() {
  return (
    <section className="border-b border-slate-200/80 bg-[#f7f8fa] px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
        <div className="min-w-0 max-w-xl">
          <p className="text-sm font-medium text-primary">A little less explaining. A little more focus.</p>
          <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-5xl xl:text-[3.5rem]">
            Your job search.{" "}
            <span className="block text-primary">One link to keep everyone updated.</span>
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Keep track of your applications in a private workspace. Share a
            public status page so friends and family can follow along.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild className="h-12 rounded-xl px-5 text-base" size="lg">
              <Link href="/register">
                Create your tracker
                <ArrowRight aria-hidden="true" className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild className="h-12 rounded-xl border-slate-300 bg-transparent px-5 text-base" size="lg" variant="outline">
              <Link href="#public-status">See what they’ll see</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[29rem] min-w-0">
          <Image
            alt="Friends and family ask a job seeker: Still looking? Any news? How’s the job search going?"
            className="h-auto w-full"
            height={1200}
            preload
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 464px, 44vw"
            src={heroConversation}
            width={1200}
          />
          <div className="ml-auto mt-4 flex w-fit max-w-full items-center gap-3 rounded-2xl rounded-br-sm border border-slate-200 bg-white px-4 py-3">
            <Link2 aria-hidden="true" className="size-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900">Here’s my latest update.</p>
              <p className="mt-0.5 break-all text-xs text-slate-600 sm:text-sm">noneed2ask.app/status/your-name</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
