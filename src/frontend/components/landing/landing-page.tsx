import Image from "next/image";
import Link from "next/link";

import { LandingReveal } from "@/components/landing/landing-reveal";
import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Button } from "@/components/ui/button";

const featureHighlights = [
  {
    title: "Private tracker",
    description:
      "Keep every company, role, stage, note, deadline, and next action in one calm workspace.",
  },
  {
    title: "Published summary",
    description:
      "Share only the clean status dashboard when you want people to follow along.",
  },
  {
    title: "Total control",
    description:
      "Update, filter, remove, publish, or hide information without rebuilding your tracker.",
  },
];

const applicationRows = [
  {
    company: "Northstar Labs",
    role: "Product Designer",
    status: "Interview",
    next: "Portfolio review",
    accent: "bg-primary",
  },
  {
    company: "Evergreen AI",
    role: "Frontend Engineer",
    status: "Applied",
    next: "Follow up",
    accent: "bg-[#28c840]",
  },
  {
    company: "Harbor Studio",
    role: "UX Researcher",
    status: "Offer",
    next: "Compare package",
    accent: "bg-[#ffbd2e]",
  },
];

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
            className="relative mt-8 w-full max-w-6xl translate-y-8 px-1 sm:mt-10 sm:px-4 md:translate-y-12"
            delay={500}
            motion="fade"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-10 -top-3 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />
            <div className="relative overflow-hidden rounded-xl border border-border/80 bg-background/95 p-1 shadow-[0_24px_80px_-36px_rgb(15_23_42_/_0.45)] ring-1 ring-foreground/5 backdrop-blur">
              <div className="flex h-9 items-center gap-1.5 border-b border-border/70 bg-muted/60 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] ring-1 ring-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] ring-1 ring-black/10" />
                <div className="ml-3 flex h-5 min-w-0 flex-1 items-center rounded-md bg-background/85 px-3 text-left text-[11px] leading-none text-muted-foreground ring-1 ring-border/70">
                  <span className="truncate">
                    https://no-need2-ask.vercel.app/
                  </span>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-b-lg bg-card">
                <Image
                  src="/landingpage-hero-img.png"
                  alt="NoNeed2Ask applications dashboard with sidebar and tracked job applications"
                  width={1920}
                  height={930}
                  priority
                  className="h-auto w-full"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/45"
              />
            </div>
          </LandingReveal>
        </div>
      </section>

      <section
        id="features"
        className="min-h-[680px] bg-white px-5 py-24 md:min-h-[780px] md:px-8 md:py-32"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <LandingReveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Features
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Everything your search needs, without oversharing.
            </h2>
          </LandingReveal>
          <LandingReveal delay={120}>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              NoNeed2Ask separates your private application pipeline from the
              public view you choose to publish. Your details stay organized,
              and your shared page stays clean.
            </p>
          </LandingReveal>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-6xl gap-4 md:grid-cols-3">
          {featureHighlights.map((feature, index) => (
          <LandingReveal
            className="rounded-lg border bg-card p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            delay={index * 120}
            key={feature.title}
          >
            <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
              {index + 1}
            </div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {feature.description}
            </p>
          </LandingReveal>
          ))}
        </div>
      </section>

      <section
        className="min-h-[680px] bg-muted/40 px-5 py-24 md:min-h-[780px] md:px-8 md:py-32"
        id="dashboard-summary"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <LandingReveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Published summary
            </p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight md:text-5xl">
              A clean dashboard for the updates you actually want to share.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              Publish only the high-level status view. Keep your private notes,
              contacts, and sensitive details in your own dashboard.
            </p>
            <div className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <p className="font-semibold text-foreground">Public-safe view</p>
                <p className="mt-1 leading-6">
                  Share progress without exposing every application detail.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <p className="font-semibold text-foreground">Publish control</p>
                <p className="mt-1 leading-6">
                  Decide when your page is visible and when it should be quiet.
                </p>
              </div>
            </div>
          </LandingReveal>

          <LandingReveal delay={180} motion="fade">
            <div className="relative overflow-hidden rounded-xl border border-border/80 bg-background p-1 shadow-[0_28px_90px_-42px_rgb(15_23_42_/_0.55)] ring-1 ring-foreground/5">
              <div className="flex h-9 items-center gap-1.5 border-b border-border/70 bg-muted/60 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] ring-1 ring-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] ring-1 ring-black/10" />
                <div className="ml-3 flex h-5 min-w-0 flex-1 items-center rounded-md bg-background/85 px-3 text-left text-[11px] leading-none text-muted-foreground ring-1 ring-border/70">
                  <span className="truncate">published status dashboard</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-b-lg bg-card">
                <Image
                  src="/landingpage-hero-img.png"
                  alt="Published NoNeed2Ask summary dashboard mockup"
                  width={1920}
                  height={930}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </LandingReveal>
        </div>
      </section>

      <section
        className="min-h-[680px] bg-white px-5 py-24 md:min-h-[780px] md:px-8 md:py-32"
        id="applications"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <LandingReveal className="order-2 lg:order-1" delay={120} motion="fade">
            <div className="overflow-hidden rounded-xl border border-border/80 bg-background shadow-[0_28px_90px_-42px_rgb(15_23_42_/_0.48)]">
              <div className="border-b bg-muted/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Applications
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      24 tracked roles
                    </p>
                  </div>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Add application
                  </span>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
                  <div className="rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground">
                    Search company or role
                  </div>
                  <div className="flex gap-2">
                    {["All", "Interview", "Offer"].map((filter, index) => (
                      <span
                        className={
                          index === 0
                            ? "rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background"
                            : "rounded-full border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground"
                        }
                        key={filter}
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {applicationRows.map((application) => (
                  <div
                    className="grid gap-3 p-4 text-sm sm:grid-cols-[1fr_0.9fr_0.7fr_auto] sm:items-center"
                    key={application.company}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`size-9 shrink-0 rounded-lg ${application.accent}`}
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground">
                          {application.company}
                        </p>
                        <p className="truncate text-muted-foreground">
                          {application.role}
                        </p>
                      </div>
                    </div>
                    <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {application.status}
                    </span>
                    <p className="text-muted-foreground">{application.next}</p>
                    <div className="flex gap-2 text-xs font-semibold">
                      <span className="rounded-full border px-3 py-1 text-foreground">
                        Update
                      </span>
                      <span className="rounded-full border px-3 py-1 text-muted-foreground">
                        Remove
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </LandingReveal>

          <LandingReveal className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Application management
            </p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight md:text-5xl">
              See every application clearly, then filter, update, or remove it.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              The applications page keeps the work practical: scan your list,
              filter by status, update the next step, and remove anything that no
              longer belongs in your search.
            </p>
          </LandingReveal>
        </div>
      </section>

      <section
        className="min-h-[640px] bg-muted/40 px-5 py-24 md:min-h-[720px] md:px-8 md:py-32"
        id="contact"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <LandingReveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Contact
            </p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight md:text-5xl">
              A simple contact area ready for your real details.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              Placeholder copy and fields are here so you can swap in the final
              contact information manually.
            </p>
          </LandingReveal>

          <LandingReveal delay={140}>
            <div className="grid gap-4 rounded-xl border bg-background p-5 shadow-sm md:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Name
                  </label>
                  <div className="mt-2 rounded-lg border bg-muted/40 px-3 py-3 text-sm text-muted-foreground">
                    Your name
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Email
                  </label>
                  <div className="mt-2 rounded-lg border bg-muted/40 px-3 py-3 text-sm text-muted-foreground">
                    hello@example.com
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Message
                </label>
                <div className="mt-2 min-h-32 rounded-lg border bg-muted/40 px-3 py-3 text-sm leading-6 text-muted-foreground">
                  Replace this block with your final contact text, availability,
                  or a real form action when you are ready.
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Manual edit placeholder
                </p>
                <span className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
                  Contact
                </span>
              </div>
            </div>
          </LandingReveal>
        </div>
      </section>
    </main>
  );
}
