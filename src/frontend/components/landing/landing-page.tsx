import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Link2,
  LockKeyhole,
} from "lucide-react";

import { LandingReveal } from "@/components/landing/landing-reveal";
import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroConversation from "../../public/landing/hero-conversation.png";

const workflowSteps = [
  {
    description:
      "Keep every role, contact moment, note, and next action in one calm workspace.",
    label: "Track privately",
    number: "01",
  },
  {
    description:
      "See what needs attention next without rebuilding a spreadsheet every week.",
    label: "Stay ahead",
    number: "02",
  },
  {
    description:
      "Give trusted people one read-only link instead of repeating the same update.",
    label: "Share calmly",
    number: "03",
  },
];

function BrowserFrame({
  alt,
  children,
  className,
  height,
  imageClassName,
  preload = false,
  sizes,
  src,
  width,
}: {
  alt: string;
  children?: React.ReactNode;
  className?: string;
  height: number;
  imageClassName?: string;
  preload?: boolean;
  sizes: string;
  src: string;
  width: number;
}) {
  return (
    <figure
      className={cn(
        "min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_30px_90px_-45px_rgb(15_45_75_/_0.45)] ring-1 ring-slate-950/5",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex h-9 items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 sm:h-11 sm:px-4"
      >
        <div className="flex shrink-0 gap-1.5">
          <span className="size-2 rounded-full bg-[#ff6b63] sm:size-2.5" />
          <span className="size-2 rounded-full bg-[#f7bf45] sm:size-2.5" />
          <span className="size-2 rounded-full bg-[#39b85a] sm:size-2.5" />
        </div>
        <div className="mx-auto h-5 w-[55%] rounded-md border border-slate-200 bg-white sm:h-6" />
        <div className="w-8 shrink-0" />
      </div>
      <div className="relative overflow-hidden">
        <Image
          alt={alt}
          className={cn("h-auto w-full", imageClassName)}
          height={height}
          preload={preload}
          sizes={sizes}
          src={src}
          width={width}
        />
        {children}
      </div>
    </figure>
  );
}

function PhoneFrame({
  alt,
  className,
  height,
  src,
  width,
}: {
  alt: string;
  className?: string;
  height: number;
  src: string;
  width: number;
}) {
  return (
    <figure
      className={cn(
        "relative isolate rounded-[3rem] bg-[linear-gradient(115deg,#d4d4d8_0%,#52525b_18%,#18181b_48%,#71717a_78%,#e4e4e7_100%)] p-[2px] shadow-[0_38px_85px_-34px_rgb(15_23_42_/_0.8)] ring-1 ring-black/40",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[18%] h-8 w-[3px] rounded-l-sm bg-gradient-to-b from-zinc-400 via-zinc-700 to-zinc-950 shadow-sm"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[28%] h-12 w-[3px] rounded-l-sm bg-gradient-to-b from-zinc-400 via-zinc-700 to-zinc-950 shadow-sm"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[39%] h-12 w-[3px] rounded-l-sm bg-gradient-to-b from-zinc-400 via-zinc-700 to-zinc-950 shadow-sm"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-[29%] h-24 w-[3px] rounded-r-sm bg-gradient-to-b from-zinc-400 via-zinc-700 to-zinc-950 shadow-sm"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-[1px] z-20 h-px rounded-full bg-white/55"
      />
      <div className="rounded-[2.88rem] bg-[#050505] p-[6px] shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.08)]">
        <div className="relative overflow-hidden rounded-[2.48rem] bg-white ring-1 ring-black/80">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-2.5 z-20 flex h-5 w-[35%] max-w-24 -translate-x-1/2 items-center justify-end rounded-full bg-black px-2 shadow-[0_1px_2px_rgb(255_255_255_/_0.12)]"
          >
            <span className="size-1.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#2563eb_0%,#071120_45%,#000_75%)] ring-1 ring-white/10" />
          </span>
          <Image
            alt={alt}
            className="h-auto w-full"
            height={height}
            sizes="(max-width: 639px) 48vw, 260px"
            src={src}
            width={width}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[2.48rem] ring-1 ring-inset ring-white/20"
          />
        </div>
      </div>
    </figure>
  );
}

function SectionIntro({
  align = "left",
  description,
  eyebrow,
  title,
}: {
  align?: "left" | "center";
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center")}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p
        className={cn(
          "mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8",
          align === "center" && "mx-auto",
        )}
      >
        {description}
      </p>
    </div>
  );
}

function FeaturePoint({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-primary">
        <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[#f8fbff] text-slate-950">
      <LandingNavbar />

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
                <span className="block text-primary sm:whitespace-nowrap">Share progress simply.</span>
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

      <section
        className="scroll-mt-24 bg-white px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
        id="dashboard"
      >
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-blue-100 bg-[radial-gradient(circle_at_85%_20%,rgb(186_230_253_/_0.7),transparent_32%),linear-gradient(135deg,#f7fbff_0%,#eaf5ff_100%)] shadow-[0_35px_100px_-65px_rgb(30_64_175_/_0.55)] lg:grid-cols-[0.9fr_1.1fr]">
          <LandingReveal className="p-7 sm:p-10 lg:p-14">
            <SectionIntro
              description="NoNeed2Ask connects the three moments that normally live in separate tools: tracking, planning, and sharing."
              eyebrow="One calm workflow"
              title="From private tracking to a shareable update."
            />

            <ol className="mt-9 grid gap-0">
              {workflowSteps.map(({ description, label, number }, index) => (
                <li className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-7 last:pb-0" key={label}>
                  {index < workflowSteps.length - 1 && (
                    <span aria-hidden="true" className="absolute bottom-0 left-[1.35rem] top-11 w-px bg-blue-200" />
                  )}
                  <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-blue-200 bg-white text-xs font-bold text-primary shadow-sm">
                    {number}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">{label}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </LandingReveal>

          <LandingReveal className="relative min-h-[500px] overflow-hidden border-t border-blue-100 px-5 pb-0 pt-10 sm:min-h-[620px] sm:px-10 lg:min-h-0 lg:border-l lg:border-t-0" delay={100} motion="fade">
            <div aria-hidden="true" className="absolute -right-24 top-10 size-80 rounded-full bg-blue-300/35 blur-3xl" />
            <p className="relative z-10 text-center text-xs font-semibold uppercase tracking-[0.18em] text-blue-900/60">
              The same search, two useful views
            </p>
            <div className="relative z-10 mx-auto mt-7 flex max-w-[31rem] items-end justify-center gap-3 sm:gap-6">
              <div className="w-[47%] max-w-[14.5rem] -rotate-2">
                <p className="mb-3 text-center text-xs font-semibold text-slate-700 sm:text-sm">Private dashboard</p>
                <PhoneFrame alt="NoNeed2Ask private dashboard on mobile" height={844} src="/landing/dashboard-mobile.webp" width={375} />
              </div>
              <div className="w-[47%] max-w-[14.5rem] translate-y-10 rotate-2 sm:translate-y-14">
                <p className="mb-3 text-center text-xs font-semibold text-slate-700 sm:text-sm">Application pipeline</p>
                <PhoneFrame alt="NoNeed2Ask application list on mobile" height={844} src="/landing/applications-mobile.webp" width={375} />
              </div>
            </div>
          </LandingReveal>
        </div>
      </section>

      <section
        className="scroll-mt-24 border-y border-blue-100/80 bg-[linear-gradient(180deg,#f2f8ff_0%,#f8fbff_100%)] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
        id="applications"
      >
        <div className="mx-auto grid min-w-0 max-w-6xl gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-16">
          <LandingReveal className="min-w-0 order-2 lg:order-1" motion="fade">
            <BrowserFrame
              alt="Applications list with search, status filters, sorting, and next actions"
              height={1000}
              imageClassName="max-sm:h-[390px] max-sm:w-auto max-sm:max-w-none max-sm:object-cover max-sm:object-left-top"
              sizes="(max-width: 639px) 640px, (max-width: 1023px) 90vw, 55vw"
              src="/landing/applications-list.webp"
              width={1585}
            />
          </LandingReveal>

          <LandingReveal className="order-1 lg:order-2">
            <SectionIntro
              description="Turn scattered applications into one readable pipeline and always know what deserves your attention next."
              eyebrow="Your private workspace"
              title="Keep the search moving without keeping a spreadsheet alive."
            />
            <ul className="mt-7 grid gap-3.5">
              <FeaturePoint>Search and filter every application in seconds.</FeaturePoint>
              <FeaturePoint>Keep private notes separate from shareable updates.</FeaturePoint>
              <FeaturePoint>Bring upcoming interviews and follow-ups into view.</FeaturePoint>
            </ul>
          </LandingReveal>
        </div>
      </section>

      <section
        className="scroll-mt-24 bg-white px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
        id="public-status"
      >
        <div className="mx-auto grid min-w-0 max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <LandingReveal>
            <SectionIntro
              description="Share a quiet, read-only summary with people you trust. They see the update—not your private notes or account details."
              eyebrow="A status page you control"
              title="Answer “How is it going?” once."
            />

            <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Public page</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                    Visible to anyone with your link
                  </p>
                </div>
                <div
                  aria-label="Public sharing enabled"
                  className="flex h-7 w-12 items-center justify-end rounded-full bg-primary p-1 shadow-inner"
                  role="img"
                >
                  <span className="size-5 rounded-full bg-white shadow-sm" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-xs font-medium text-slate-600 sm:text-sm">
                <Link2 aria-hidden="true" className="size-4 shrink-0 text-primary" />
                <span className="truncate">noneed2ask.app/status/your-name</span>
              </div>
            </div>

            <ul className="mt-6 grid gap-3.5">
              <FeaturePoint>You decide when the page is live.</FeaturePoint>
              <FeaturePoint>Private notes always stay private.</FeaturePoint>
              <FeaturePoint>Visitors never need an account.</FeaturePoint>
            </ul>
          </LandingReveal>

          <LandingReveal className="relative min-w-0 py-4" motion="fade" delay={100}>
            <div aria-hidden="true" className="absolute inset-8 rounded-full bg-blue-200/55 blur-3xl" />
            <div className="relative mx-auto max-w-[18rem] sm:max-w-[21rem]">
              <PhoneFrame
                alt="Read-only public job search page on mobile showing a calm progress summary"
                height={812}
                src="/landing/public-status-mobile.webp"
                width={360}
              />
              <div className="absolute -right-4 top-24 rounded-2xl border border-emerald-100 bg-white px-3.5 py-3 shadow-xl shadow-slate-900/10 sm:-right-20 sm:px-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-emerald-700 sm:text-sm">
                  <span className="size-2 rounded-full bg-emerald-500" /> Read-only and live
                </p>
              </div>
              <div className="absolute -bottom-3 -left-4 rounded-2xl border border-blue-100 bg-white px-3.5 py-3 shadow-xl shadow-slate-900/10 sm:-left-20 sm:px-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-slate-700 sm:text-sm">
                  <LockKeyhole aria-hidden="true" className="size-4 text-primary" /> Private notes stay hidden
                </p>
              </div>
            </div>
          </LandingReveal>
        </div>
      </section>

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

      <footer className="border-t border-slate-200 bg-white px-5 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <Link className="flex items-center gap-2 font-semibold text-slate-800" href="/">
            <Image alt="" height={28} src="/logo-mark.webp" width={28} />
            NoNeed2Ask
          </Link>
          <p>A calm place for the job search.</p>
        </div>
      </footer>
    </main>
  );
}
