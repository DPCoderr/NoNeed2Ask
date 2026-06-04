import Image from "next/image";
import Link from "next/link";

import { LandingReveal } from "@/components/landing/landing-reveal";
import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-background text-foreground">
      <section className="relative flex min-h-[760px] flex-col overflow-hidden md:min-h-svh">
        <Image
          src="/bg-landing-noneed2ask.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/10 to-white/30 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-white/20 to-white/45 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000" />

        <LandingNavbar />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-5 pb-0 pt-9 text-center sm:px-6 md:px-8 md:pt-16">
          <LandingReveal>
            <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[1.03] tracking-normal text-foreground sm:text-6xl md:mt-9 md:text-7xl">
              <span className="block md:inline">Track jobs,</span>{" "}
              <span className="relative mt-1 inline-block whitespace-nowrap px-3 pb-2 text-primary sm:mt-2 sm:px-4 md:mt-0">
                <span className="relative z-10">share status.</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-2 h-5 rounded-full bg-primary/15 sm:h-7 md:h-8"
                />
              </span>
            </h1>
          </LandingReveal>
          <LandingReveal delay={150}>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-xl md:leading-8">
              Keep your job search organized. Share a public URL when you want,
              and turn it off anytime.
            </p>
          </LandingReveal>
          <LandingReveal
            className="mt-8 flex flex-wrap justify-center gap-3"
            delay={300}
          >
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href="/register">Create your tracker</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full bg-background/60 px-7 backdrop-blur hover:bg-background/80"
            >
              <Link href="/status/daniel-job-search">View public example</Link>
            </Button>
          </LandingReveal>

          <LandingReveal
            className="landing-hero-perspective relative mt-7 w-full max-w-6xl translate-y-10 px-1 sm:mt-9 sm:px-4 md:translate-y-14"
            delay={500}
            motion="fade"
          >
            <div className="landing-hero-mist" aria-hidden="true" />
            <div className="landing-hero-card relative overflow-hidden rounded-2xl border border-white/65 bg-white/10 shadow-2xl shadow-slate-950/20 ring-1 ring-white/50 backdrop-blur-sm">
              <Image
                src="/landingpage-hero-img.png"
                alt="NoNeed2Ask applications dashboard with sidebar and tracked job applications"
                width={1920}
                height={930}
                priority
                className="landing-hero-image h-auto w-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-white/30"
              />
            </div>
          </LandingReveal>
        </div>
      </section>

      <section
        className="relative mx-auto grid w-full max-w-6xl gap-4 px-6 pb-16 pt-24 md:grid-cols-3 md:px-8 md:pt-28"
        id="features"
      >
        {[
          [
            "private-pipeline",
            "Private pipeline",
            "Track company, role, stage, notes, contact dates, and the next thing to do.",
          ],
          [
            "public-page",
            "Public status URL",
            "Share a clean page for friends, recruiters, or coaches without exposing private notes.",
          ],
          [
            "control",
            "Instant off switch",
            "Turn sharing on or off whenever your search gets sensitive or simply needs quiet.",
          ],
        ].map(([id, title, description], index) => (
          <LandingReveal
            className="rounded-lg border bg-card p-5 shadow-sm hover:-translate-y-1 hover:shadow-md"
            delay={index * 120}
            id={id}
            key={title}
          >
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </LandingReveal>
        ))}
      </section>
    </main>
  );
}
