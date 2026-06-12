import Image from "next/image";
import Link from "next/link";

import { LandingReveal } from "@/components/landing/landing-reveal";
import { PublicSharingControlsPreview } from "@/components/landing/public-sharing-controls-preview";
import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Button } from "@/components/ui/button";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-foreground md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
        {description}
      </p>
    </div>
  );
}

function ScreenshotFrame({
  alt,
  height,
  priority,
  src,
  width,
}: {
  alt: string;
  height: number;
  priority?: boolean;
  src: string;
  width: number;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-white/70 bg-white/20 shadow-[0_26px_80px_-54px_rgb(15_23_42_/_0.65)] ring-1 ring-foreground/5">
      <Image
        alt={alt}
        className="h-auto w-full"
        height={height}
        priority={priority}
        sizes="(min-width: 1280px) 1120px, (min-width: 768px) 90vw, 100vw"
        src={src}
        width={width}
      />
    </figure>
  );
}

function ProductSection({
  children,
  className = "",
  id,
  step,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  step?: string;
}) {
  return (
    <section
      className={`relative scroll-mt-28 px-5 py-28 md:min-h-[760px] md:px-8 md:py-36 xl:min-h-[840px] ${className}`}
      id={id}
    >
      {step ? (
        <div
          className="absolute left-5 top-28 z-10 flex size-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-blue-950/20 md:top-36 xl:left-[calc(50%-38rem)]"
          aria-hidden="true"
        >
          {step}
        </div>
      ) : null}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-background text-foreground">
      <section className="relative flex min-h-[760px] flex-col overflow-hidden md:min-h-svh">
        <Image
          alt=""
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          src="/bg-landing-noneed2ask.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/10 to-white/30 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-white/20 to-white/45 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000" />

        <LandingNavbar />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-5 pb-0 pt-24 text-center sm:px-6 sm:pt-28 md:px-8 md:pt-32">
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
              A calm job-search command center for private tracking, follow-up
              planning, and a public status page you control.
            </p>
          </LandingReveal>
          <LandingReveal
            className="mt-8 flex flex-wrap justify-center gap-3"
            delay={300}
          >
            <Button asChild className="rounded-lg px-7" size="lg">
              <Link href="/register">Create your tracker</Link>
            </Button>
            <Button
              asChild
              className="rounded-lg bg-background/60 px-7 backdrop-blur hover:bg-background/80"
              size="lg"
              variant="secondary"
            >
              <Link href="#dashboard">View public example</Link>
            </Button>
          </LandingReveal>

          <LandingReveal
            className="relative mt-8 w-full max-w-6xl translate-y-8 px-1 sm:mt-10 sm:px-4 md:translate-y-12"
            delay={500}
            motion="fade"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-10 -top-3 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />
            <ScreenshotFrame
              alt="NoNeed2Ask private dashboard showing application totals, interview planning, and job search distribution"
              height={2011}
              priority
              src="/landing/dashboard-overview.png"
              width={2509}
            />
          </LandingReveal>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#eef7ff_0%,#f8fbff_24%,#dfeeff_52%,#f7fbff_76%,#dce8f7_100%)]">
        <Image
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
          fill
          sizes="100vw"
          src="/bg-userpage-light.jpg"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(1.25rem+1.375rem)] top-0 bottom-0 w-px bg-[linear-gradient(180deg,transparent,rgb(11_111_170_/_0.45)_10%,rgb(11_111_170_/_0.22)_72%,transparent)] xl:left-[calc(50%-38rem+1.375rem)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent"
        />

        <ProductSection id="dashboard" step="1">
          <div className="mx-auto grid w-full max-w-6xl gap-10 pl-14 md:pl-20 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <LandingReveal>
              <SectionHeading
                description="The dashboard turns scattered applications into a readable pipeline, with the next interview and recent movement kept close."
                eyebrow="Private dashboard"
                title="Know where every job search thread stands."
              />
            </LandingReveal>

            <LandingReveal delay={160} motion="fade">
              <ScreenshotFrame
                alt="Private dashboard with overview cards and next planned interview"
                height={2011}
                src="/landing/dashboard-overview.png"
                width={2509}
              />
            </LandingReveal>
          </div>
        </ProductSection>

        <ProductSection id="applications" step="2">
          <div className="mx-auto grid w-full max-w-6xl gap-10 pl-14 md:pl-20 lg:grid-cols-[1.16fr_0.84fr] lg:items-center">
            <LandingReveal
              className="order-2 lg:order-1"
              delay={120}
              motion="fade"
            >
              <ScreenshotFrame
                alt="Applications list with search, filters, sorting, statuses, and next actions"
                height={2005}
                src="/landing/applications-list.png"
                width={2539}
              />
            </LandingReveal>

            <LandingReveal className="order-1 lg:order-2">
              <SectionHeading
                description="Search, sort, and act from one page instead of keeping a spreadsheet alive by hand."
                eyebrow="Application management"
                title="Filter the pipeline, then update the next move."
              />
            </LandingReveal>
          </div>
        </ProductSection>

        <ProductSection id="public-status" step="3">
          <div className="mx-auto grid w-full max-w-6xl gap-10 pl-14 md:pl-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <LandingReveal>
              <SectionHeading
                description="Share a clean read-only URL when friends, mentors, or recruiters need the high-level update."
                eyebrow="Public status"
                title="Show progress without showing everything."
              />
              <PublicSharingControlsPreview />
            </LandingReveal>

            <LandingReveal delay={160} motion="fade">
              <ScreenshotFrame
                alt="Public read-only job search dashboard for Daan"
                height={1996}
                src="/landing/public-status-page.png"
                width={2503}
              />
            </LandingReveal>
          </div>
        </ProductSection>

        <ProductSection step="4">
          <LandingReveal className="mx-auto flex w-full max-w-4xl flex-col items-start pl-14 md:pl-20 lg:items-center lg:text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Ready when your search is
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
              Build a tracker that can stay private, public, or both.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              Start with your private pipeline, then share the status page only
              when it makes life easier.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-lg px-7" size="lg">
                <Link href="/register">Create your tracker</Link>
              </Button>
              <Button
                asChild
                className="rounded-lg px-7"
                size="lg"
                variant="outline"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </LandingReveal>
        </ProductSection>
      </div>
    </main>
  );
}
