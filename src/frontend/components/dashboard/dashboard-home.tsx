import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockOwnerDashboardResponse } from "@/lib/api/fixtures";

const iconPath = "/dashboard-icons";

const pipelineStages = [
  {
    label: "Applied",
    count: 12,
    icon: "AppliedStatusIcon.svg",
    active: false,
  },
  {
    label: "Waiting",
    count: 7,
    icon: "WaitingStatusIcon.svg",
    active: false,
  },
  {
    label: "Planned",
    count: 3,
    icon: "PlannedStatusIcon.svg",
    active: true,
  },
  {
    label: "Done",
    count: 1,
    icon: "DoneStatusIcon.svg",
    active: false,
  },
  {
    label: "Offer",
    count: 0,
    icon: "OfferStatusIcon.svg",
    active: false,
    accent: "text-violet-700",
  },
];

const recentApplications = [
  {
    companyName: "Northstar Labs",
    jobTitle: "Senior Frontend Engineer",
    status: "Interview planned",
    detail: "May 24 at 2:30 PM",
    updated: "Updated May 22",
    icon: "AppliedStatusIcon.svg",
    statusIcon: "InterviewPipelineIcon.svg",
  },
  {
    companyName: "Atlas Works",
    jobTitle: "Full Stack Developer",
    status: "Interview done",
    detail: "May 21",
    updated: "Updated May 21",
    icon: "MountainMark.svg",
    statusIcon: "DoneStatusIcon.svg",
  },
  {
    companyName: "Summit Agency",
    jobTitle: "UI/UX Designer",
    status: "Waiting response",
    detail: "Applied May 19",
    updated: "Updated May 19",
    icon: "PlannedStatusIcon.svg",
    statusIcon: "WaitingStatusIcon.svg",
  },
  {
    companyName: "Pine Technologies",
    jobTitle: "Frontend Developer",
    status: "Paused",
    detail: "On hold",
    updated: "Updated May 18",
    icon: "OfferStatusIcon.svg",
    statusIcon: "NextActionIcon.svg",
  },
];

function DotMenu() {
  return (
    <button
      aria-label="Application actions"
      className="flex size-8 shrink-0 flex-col items-center justify-center gap-0.5 rounded-md text-blue-900/70 hover:bg-blue-50"
      type="button"
    >
      <span className="size-1 rounded-full bg-current" />
      <span className="size-1 rounded-full bg-current" />
      <span className="size-1 rounded-full bg-current" />
    </button>
  );
}

function DashboardIcon({
  alt,
  className,
  name,
  priority,
}: {
  alt: string;
  className?: string;
  name: string;
  priority?: boolean;
}) {
  return (
    <Image
      alt={alt}
      className={className}
      height={96}
      priority={priority}
      src={`${iconPath}/${name}`}
      width={96}
    />
  );
}

function StatCard({
  detail,
  icon,
  tone = "text-blue-700",
  title,
  value,
}: {
  detail: string[];
  icon: string;
  tone?: string;
  title: string;
  value: number;
}) {
  return (
    <article className="rounded-xl border border-white/80 bg-white/78 p-6 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-5">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-blue-950">{title}</h2>
          <p className="mt-4 text-4xl font-semibold tracking-normal text-slate-950">
            {value}
          </p>
          <div className="mt-2 space-y-1 text-sm font-medium leading-5 text-blue-950/75">
            {detail.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-blue-100/70">
          <DashboardIcon
            alt=""
            className={`size-16 ${tone}`}
            name={icon}
            priority
          />
        </div>
      </div>
    </article>
  );
}

export function DashboardHome() {
  const { publicProfile, user } = mockOwnerDashboardResponse;
  const publicSlug = publicProfile.publicSlug;

  return (
    <PageShell
      background="landing"
      className="max-w-none gap-5 px-5 py-6 md:px-8 md:py-8 xl:px-10"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <header className="max-w-2xl pt-2">
          <p className="text-sm font-semibold text-blue-700">
            Private dashboard
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">
            Welcome back, {user.displayName}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-blue-950/75">
            A private command center for the job search: pipeline health,
            follow-ups, and public status visibility.
          </p>
        </header>

        <div className="flex shrink-0 items-center gap-7 pr-1 text-sm font-semibold text-slate-950">
          <span
            aria-hidden="true"
            className="relative flex size-5 items-center justify-center rounded-full border border-blue-900/70"
          >
            <span className="size-1.5 rounded-full bg-blue-900" />
            <span className="absolute -top-2 left-1/2 h-1 w-px -translate-x-1/2 bg-blue-900/70" />
            <span className="absolute -bottom-2 left-1/2 h-1 w-px -translate-x-1/2 bg-blue-900/70" />
            <span className="absolute -left-2 top-1/2 h-px w-1 -translate-y-1/2 bg-blue-900/70" />
            <span className="absolute -right-2 top-1/2 h-px w-1 -translate-y-1/2 bg-blue-900/70" />
          </span>
          <time dateTime="2025-05-24">May 24, 2025</time>
        </div>
      </div>

      <section className="grid gap-4 pt-2 lg:grid-cols-3">
        <StatCard
          detail={["4 new this week"]}
          icon="ActiveApplicationsIcon.svg"
          title="Active applications"
          value={12}
        />
        <StatCard
          detail={["2 upcoming", "1 completed"]}
          icon="InterviewPipelineIcon.svg"
          title="Interview pipeline"
          value={3}
        />
        <StatCard
          detail={["Avg. response time", "5.4 days"]}
          icon="WaitingResponsesIcon.svg"
          title="Waiting responses"
          tone="text-orange-600"
          value={7}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.08fr_1fr]">
        <article className="rounded-xl border border-white/80 bg-white/78 p-6 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <DashboardIcon
                alt=""
                className="size-9 shrink-0 text-blue-800"
                name="MountainMark.svg"
              />
              <h2 className="text-xl font-semibold tracking-normal text-slate-950">
                Job Search Pipeline
              </h2>
            </div>
            <Button
              className="h-9 rounded-lg border-blue-100 bg-white/70 px-4 text-sm font-semibold text-slate-950 hover:bg-white"
              size="sm"
              variant="outline"
            >
              All time
              <span aria-hidden="true" className="ml-2 text-blue-900">
                v
              </span>
            </Button>
          </div>

          <div className="mt-7 overflow-x-auto pb-1">
            <div className="relative grid min-w-[560px] grid-cols-5 gap-4 px-2">
              <div className="absolute left-[10%] right-[10%] top-[68px] h-0.5 bg-blue-950/30" />
              {pipelineStages.map((stage) => (
                <div
                  className="relative z-10 flex flex-col items-center text-center"
                  key={stage.label}
                >
                  <DashboardIcon
                    alt=""
                    className="size-14 text-blue-700"
                    name={stage.icon}
                  />
                  <span
                    className={`mt-1 size-4 rounded-full border-2 border-blue-900/45 bg-white ${
                      stage.active
                        ? "border-blue-700 bg-blue-700 shadow-[0_0_0_7px_rgb(219_234_254/0.85)]"
                        : ""
                    }`}
                  />
                  <p className="mt-4 text-sm font-semibold text-slate-950">
                    {stage.label}
                  </p>
                  <p
                    className={`mt-2 text-2xl font-semibold tracking-normal text-slate-950 ${
                      stage.accent ?? ""
                    }`}
                  >
                    {stage.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-xl border border-white/80 bg-white/78 p-6 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-100/80">
                <DashboardIcon
                  alt=""
                  className="size-11 text-blue-700"
                  name="PublicStatusIcon.svg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  Public status
                </h2>
                <p className="mt-2 text-sm font-medium text-blue-950/75">
                  Your public page is live and up to date.
                </p>
              </div>
            </div>
            <span className="rounded-lg border border-blue-100 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-950">
              {publicProfile.isPublicSharingEnabled ? "Visible" : "Private"}
            </span>
          </div>

          <div className="relative z-10 mt-8 grid max-w-xs grid-cols-2 gap-6 text-blue-950">
            <div>
              <div className="flex items-center gap-2">
                <DashboardIcon
                  alt=""
                  className="size-6 text-blue-700"
                  name="ProfileViewsIcon.svg"
                />
                <p className="text-lg font-semibold text-slate-950">24</p>
              </div>
              <p className="mt-2 text-sm font-medium text-blue-950/75">
                Profile views
              </p>
            </div>
            <div className="border-l border-blue-950/10 pl-6">
              <div className="flex items-center gap-2">
                <DashboardIcon
                  alt=""
                  className="size-6 text-emerald-700"
                  name="MessagesIcon.svg"
                />
                <p className="text-lg font-semibold text-slate-950">6</p>
              </div>
              <p className="mt-2 text-sm font-medium text-blue-950/75">
                Messages
              </p>
            </div>
          </div>

          <Button
            asChild
            className="relative z-10 mt-7 rounded-lg border-blue-100 bg-white/75 px-4 font-semibold text-slate-950 hover:bg-white"
            variant="outline"
          >
            <Link href={`/status/${publicSlug}`}>
              Preview public page
              <span aria-hidden="true" className="ml-2">
                -&gt;
              </span>
            </Link>
          </Button>

          <DashboardIcon
            alt=""
            className="absolute bottom-5 right-7 z-0 hidden h-auto w-56 text-blue-700 sm:block"
            name="PineLandscape.svg"
          />
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.68fr_1.32fr]">
        <article className="rounded-xl border border-white/80 bg-white/78 p-6 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-100/80">
                <DashboardIcon
                  alt=""
                  className="size-10 text-blue-700"
                  name="NextActionIcon.svg"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  Next action
                </h2>
                <p className="mt-4 font-semibold text-slate-950">
                  Follow up with Sarah at Northstar Labs
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-blue-950/75">
                  Interview scheduled for Frontend Engineer role.
                </p>
              </div>
            </div>
            <span className="rounded-lg border border-blue-100 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-950/75">
              May 24
            </span>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button asChild className="rounded-lg px-7">
              <Link href="/applications">View details</Link>
            </Button>
            <Button
              className="rounded-lg border-blue-100 bg-white/75 px-7 font-semibold text-slate-950 hover:bg-white"
              variant="outline"
            >
              Mark as done
            </Button>
          </div>
        </article>

        <article className="overflow-hidden rounded-xl border border-white/80 bg-white/78 shadow-lg shadow-blue-950/8 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4 p-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">
                Recent applications
              </h2>
              <p className="mt-1 text-sm font-medium text-blue-950/75">
                Latest updates from your private tracker.
              </p>
            </div>
            <Button
              asChild
              className="rounded-lg border-blue-100 bg-white/75 px-5 font-semibold text-slate-950 hover:bg-white"
              size="sm"
              variant="outline"
            >
              <Link href="/applications">View all</Link>
            </Button>
          </div>
          <Separator className="bg-blue-950/10" />
          <div className="divide-y divide-blue-950/10">
            {recentApplications.map((application) => (
              <div
                className="grid gap-4 px-5 py-3 sm:grid-cols-[1.35fr_1fr_auto_auto] sm:items-center"
                key={application.companyName}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <DashboardIcon
                    alt=""
                    className="size-11 shrink-0 text-blue-700"
                    name={application.icon}
                  />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-950">
                      {application.companyName}
                    </p>
                    <p className="mt-1 truncate text-sm font-medium text-blue-950/75">
                      {application.jobTitle}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-4">
                  <DashboardIcon
                    alt=""
                    className="size-9 shrink-0 text-blue-700"
                    name={application.statusIcon}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-blue-950/80">
                      {application.status}
                    </p>
                    <p className="mt-1 truncate text-sm font-medium text-blue-950/65">
                      {application.detail}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-medium text-blue-950/70">
                  {application.updated}
                </p>
                <DotMenu />
              </div>
            ))}
          </div>
        </article>
      </section>
    </PageShell>
  );
}
