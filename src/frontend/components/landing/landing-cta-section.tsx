import Link from "next/link"

import { Button } from "@/components/ui/button"

export function LandingCtaSection() {
  return (
    <section className="bg-[#102b46] px-5 py-16 text-white sm:px-8 sm:py-20">
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
          <span className="block">Next time they ask,</span>
          <span className="block">
            send{" "}
            <span className="relative inline-block text-[#acd9ef] after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:-rotate-2 after:bg-[#acd9ef]/70">
              your link.
            </span>
          </span>
        </h2>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(50%+5rem)] top-[4.25rem] hidden h-20 w-20 text-[#acd9ef]/80 min-[360px]:block sm:left-[calc(50%+5.75rem)] sm:top-20 sm:h-24 sm:w-26"
          fill="none"
          viewBox="0 0 104 96"
        >
          <path d="M12 6C112 8 107 78 40 84M48 76L40 84L51 88" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
        <Button asChild className="relative mt-12 h-12 rounded-xl bg-white px-6 text-base text-[#102b46] hover:bg-slate-100 focus-visible:border-white focus-visible:ring-white/60" size="lg">
          <Link href="/register">Create your tracker</Link>
        </Button>
      </div>
    </section>
  )
}
