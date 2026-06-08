import Image from "next/image"
import Link from "next/link"

import { PageShell } from "@/components/layout/page-shell"
import { Button } from "@/components/ui/button"

import { StatusCardCarousel } from "./status-card-carousel"

const iconPath = "/dashboard-icons"

const statusCards = [
  { label: "Applied", value: 48, icon: "AppliedStatusIcon.svg" },
  { label: "Waiting", value: 31, icon: "WaitingStatusIcon.svg" },
  { label: "Planned", value: 12, icon: "PlannedStatusIcon.svg" },
  { label: "Done", value: 7, icon: "DoneStatusIcon.svg" },
  { label: "Offer", value: 2, icon: "OfferStatusIcon.svg" },
  { label: "Paused / Rejected", shortLabel: "Paused", value: 8, icon: null },
]

const applications = [
  {
    id: "app_001",
    company: "Northstar Labs",
    role: "Senior Frontend Engineer",
    status: "Planned",
    statusIcon: "PlannedStatusIcon.svg",
    statusClass: "bg-blue-50 text-blue-700",
    companyIcon: "AppliedStatusIcon.svg",
    companyMark: null,
    updated: "May 24, 2025",
    nextStep: "Interview May 24, 2:30 PM",
    source: "LinkedIn",
  },
  {
    id: "app_003",
    company: "Atlas Works",
    role: "Full Stack Developer",
    status: "Waiting",
    statusIcon: "WaitingStatusIcon.svg",
    statusClass: "bg-orange-50 text-orange-700",
    companyIcon: null,
    companyMark: "triangle",
    updated: "May 21, 2025",
    nextStep: "Follow up in 3 days",
    source: "Company Site",
  },
  {
    id: "app_004",
    company: "Orbit Systems",
    role: "Backend Engineer",
    status: "Waiting",
    statusIcon: "WaitingStatusIcon.svg",
    statusClass: "bg-orange-50 text-orange-700",
    companyIcon: null,
    companyMark: "orbit",
    updated: "May 20, 2025",
    nextStep: "Follow up in 5 days",
    source: "LinkedIn",
  },
  {
    id: "app_002",
    company: "Summit Agency",
    role: "UI/UX Designer",
    status: "Applied",
    statusIcon: "AppliedStatusIcon.svg",
    statusClass: "bg-blue-50 text-blue-700",
    companyIcon: null,
    companyMark: "bridge",
    updated: "May 19, 2025",
    nextStep: null,
    source: "Referral",
  },
  {
    id: "app_001",
    company: "Pine Technologies",
    role: "Frontend Developer",
    status: "Applied",
    statusIcon: "AppliedStatusIcon.svg",
    statusClass: "bg-blue-50 text-blue-700",
    companyIcon: "OfferStatusIcon.svg",
    companyMark: null,
    updated: "May 18, 2025",
    nextStep: null,
    source: "Indeed",
  },
  {
    id: "app_003",
    company: "Nova Health",
    role: "Product Designer",
    status: "Planned",
    statusIcon: "PlannedStatusIcon.svg",
    statusClass: "bg-blue-50 text-blue-700",
    companyIcon: null,
    companyMark: "wave",
    updated: "May 17, 2025",
    nextStep: "Interview May 26",
    source: "LinkedIn",
  },
  {
    id: "app_004",
    company: "Linear",
    role: "Full Stack Engineer",
    status: "Done",
    statusIcon: "DoneStatusIcon.svg",
    statusClass: "bg-emerald-50 text-emerald-700",
    companyIcon: null,
    companyMark: "disc",
    updated: "May 16, 2025",
    nextStep: "Interview May 30",
    source: "Company Site",
  },
  {
    id: "app_002",
    company: "Vertex Studio",
    role: "Full Stack Developer",
    status: "Waiting",
    statusIcon: "WaitingStatusIcon.svg",
    statusClass: "bg-orange-50 text-orange-700",
    companyIcon: null,
    companyMark: "hex",
    updated: "May 15, 2025",
    nextStep: "Follow up in 2 days",
    source: "AngelList",
  },
]

function AppIcon({
  alt = "",
  className,
  name,
}: {
  alt?: string
  className?: string
  name: string
}) {
  return (
    <Image
      alt={alt}
      className={className}
      height={80}
      src={`${iconPath}/${name}`}
      width={80}
    />
  )
}

function CompanyMark({ type }: { type: string | null }) {
  const base = "flex size-9 shrink-0 items-center justify-center"

  if (type === "triangle") {
    return (
      <span className={base} aria-hidden="true">
        <span className="h-0 w-0 border-x-[11px] border-b-[20px] border-x-transparent border-b-slate-950" />
      </span>
    )
  }

  if (type === "orbit") {
    return (
      <span className={`${base} rounded-full border-2 border-blue-950`} aria-hidden="true">
        <span className="size-3 rounded-full border-2 border-blue-950" />
      </span>
    )
  }

  if (type === "bridge") {
    return (
      <span className={`${base} text-emerald-700`} aria-hidden="true">
        <span className="h-6 w-8 rounded-t-full border-4 border-b-0 border-current" />
      </span>
    )
  }

  if (type === "wave") {
    return <span className={`${base} text-2xl text-emerald-700`} aria-hidden="true">~</span>
  }

  if (type === "disc") {
    return <span className={`${base} rounded-full bg-slate-950`} aria-hidden="true" />
  }

  return (
    <span className={`${base} rounded-lg border-2 border-violet-700`} aria-hidden="true">
      <span className="size-4 rounded-sm bg-violet-100" />
    </span>
  )
}

function FilterButton({ label }: { label: string }) {
  return (
    <button
      className="flex h-10 min-w-0 items-center justify-between gap-3 rounded-lg border border-blue-100 bg-white/78 px-3 text-sm font-semibold text-blue-950 shadow-sm shadow-blue-950/5 hover:bg-white sm:px-4"
      type="button"
    >
      <span className="truncate">{label}</span>
      <span className="shrink-0 text-blue-950/70" aria-hidden="true">v</span>
    </button>
  )
}

function StatusBadge({
  className,
  icon,
  label,
}: {
  className: string
  icon: string
  label: string
}) {
  return (
    <span className={`inline-flex w-fit items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold ${className}`}>
      <AppIcon className="size-4" name={icon} />
      {label}
    </span>
  )
}

function MoreButton() {
  return (
    <button
      aria-label="Application actions"
      className="flex size-8 items-center justify-center rounded-md text-blue-950 hover:bg-blue-50"
      type="button"
    >
      ...
    </button>
  )
}

function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <label className="flex h-10 min-w-0 items-center gap-3 rounded-lg border border-blue-100 bg-white/86 px-3 text-sm shadow-sm shadow-blue-950/5">
      <span className="relative size-4 shrink-0 rounded-full border-2 border-blue-950/75" aria-hidden="true">
        <span className="absolute -bottom-1 -right-1 h-2 w-0.5 rotate-[-45deg] rounded-full bg-blue-950/75" />
      </span>
      <input
        className="min-w-0 flex-1 bg-transparent text-xs font-medium text-blue-950 outline-none placeholder:text-blue-950/50 sm:text-sm"
        placeholder={placeholder}
        type="search"
      />
    </label>
  )
}

function CompactTopBar() {
  return (
    <div className="flex h-10 items-center justify-between xl:hidden">
      <button
        aria-label="Open navigation"
        className="flex size-9 items-center justify-center rounded-lg text-blue-950 hover:bg-white/70"
        type="button"
      >
        <span className="space-y-1.5" aria-hidden="true">
          <span className="block h-0.5 w-4 rounded-full bg-current" />
          <span className="block h-0.5 w-4 rounded-full bg-current" />
          <span className="block h-0.5 w-4 rounded-full bg-current" />
        </span>
      </button>
      <h1 className="text-lg font-semibold tracking-normal text-slate-950 sm:text-xl">
        Applications
      </h1>
      <Button asChild className="size-9 rounded-lg p-0">
        <Link aria-label="Add application" href="/applications?create=application">
          <span className="text-xl leading-none" aria-hidden="true">+</span>
        </Link>
      </Button>
    </div>
  )
}

function ViewToggle() {
  return (
    <div className="flex shrink-0 rounded-lg border border-blue-100 bg-white/86 p-1 shadow-sm shadow-blue-950/5">
      <button
        aria-label="List view"
        className="grid size-9 place-items-center rounded-md bg-blue-50 text-blue-700"
        type="button"
      >
        <span className="space-y-1" aria-hidden="true">
          <span className="block h-0.5 w-4 rounded-full bg-current" />
          <span className="block h-0.5 w-4 rounded-full bg-current" />
          <span className="block h-0.5 w-4 rounded-full bg-current" />
        </span>
      </button>
      <button
        aria-label="Grid view"
        className="grid size-9 place-items-center rounded-md text-blue-950"
        type="button"
      >
        <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
          <span className="size-1.5 rounded-sm border border-current" />
          <span className="size-1.5 rounded-sm border border-current" />
          <span className="size-1.5 rounded-sm border border-current" />
          <span className="size-1.5 rounded-sm border border-current" />
        </span>
      </button>
    </div>
  )
}

export default function ApplicationsPage() {
  return (
    <PageShell background="landing" className="max-w-none gap-4 px-4 py-4 sm:px-5 md:gap-5 md:px-8 xl:gap-6 xl:px-10 xl:py-6">
      <CompactTopBar />

      <header className="hidden flex-col gap-5 xl:flex xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl md:text-5xl">
            Applications
          </h1>
          <p className="mt-3 text-sm font-medium text-blue-950/75 sm:mt-4 sm:text-base">
            Track and manage all your job applications.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] lg:w-[620px]">
          <SearchField placeholder="Search applications, companies, roles..." />
          <Button className="h-12 rounded-lg border-blue-100 bg-white/82 px-5 font-semibold text-blue-950 hover:bg-white" variant="outline">
            Filters
          </Button>
          <Button asChild className="h-12 rounded-lg px-5 font-semibold sm:px-6">
            <Link href="/applications?create=application">
              <span className="text-lg leading-none" aria-hidden="true">+</span>
              <span className="hidden sm:inline">Add application</span>
              <span className="sm:hidden">Add</span>
            </Link>
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 xl:hidden">
        <SearchField placeholder="Search applications..." />
        <button
          aria-label="Filters"
          className="grid size-10 place-items-center rounded-lg border border-blue-100 bg-white/86 text-blue-950 shadow-sm shadow-blue-950/5"
          type="button"
        >
          <span className="space-y-1" aria-hidden="true">
            <span className="block h-0.5 w-4 rounded-full bg-current" />
            <span className="ml-1 block h-0.5 w-3 rounded-full bg-current" />
            <span className="block h-0.5 w-4 rounded-full bg-current" />
          </span>
        </button>
      </section>

      <StatusCardCarousel cards={statusCards} />

      <div className="flex justify-center gap-1.5 xl:hidden" aria-hidden="true">
        <span className="size-2 rounded-full bg-blue-700" />
        <span className="size-2 rounded-full bg-blue-200" />
        <span className="size-2 rounded-full bg-blue-200" />
      </div>

      <section className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-[auto_auto_auto_auto] sm:gap-3 xl:grid-cols-[minmax(180px,1fr)_repeat(4,minmax(120px,auto))]">
            <div className="hidden xl:block">
              <SearchField placeholder="Search..." />
            </div>
            <FilterButton label="All statuses" />
            <FilterButton label="All companies" />
            <div className="hidden sm:block">
              <FilterButton label="All roles" />
            </div>
            <button className="h-10 rounded-lg border border-blue-100 bg-white/78 px-4 text-sm font-semibold text-blue-950 shadow-sm shadow-blue-950/5 hover:bg-white" type="button">
              <span className="hidden sm:inline">More filters</span>
              <span className="sm:hidden">Filters</span>
            </button>
          </div>

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
            <FilterButton label="Sort by: Last updated" />
            <ViewToggle />
          </div>
        </div>
      </section>

      <section className="hidden overflow-hidden rounded-xl border border-white/80 bg-white/84 shadow-lg shadow-blue-950/8 backdrop-blur-xl xl:block">
        <table className="w-full table-fixed border-collapse text-left text-sm text-blue-950">
          <thead>
            <tr className="border-b border-blue-950/10 text-xs font-semibold text-blue-950/75">
              <th className="w-[22%] px-5 py-5">Company</th>
              <th className="w-[18%] px-5 py-5">Role</th>
              <th className="w-[13%] px-5 py-5">Status</th>
              <th className="w-[15%] px-5 py-5">Last updated</th>
              <th className="w-[18%] px-5 py-5">Next step</th>
              <th className="w-[10%] px-5 py-5">Source</th>
              <th className="w-[4%] px-5 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-950/10">
            {applications.map((application) => (
              <tr className="hover:bg-blue-50/45" key={`${application.company}-${application.updated}`}>
                <td className="px-5 py-4">
                  <Link className="flex items-center gap-4 font-semibold text-slate-950 hover:underline" href={`/applications/${application.id}`}>
                    {application.companyIcon ? (
                      <AppIcon className="size-9 shrink-0 text-blue-700" name={application.companyIcon} />
                    ) : (
                      <CompanyMark type={application.companyMark} />
                    )}
                    <span className="truncate">{application.company}</span>
                  </Link>
                </td>
                <td className="truncate px-5 py-4 text-blue-950/80">{application.role}</td>
                <td className="px-5 py-4">
                  <StatusBadge className={application.statusClass} icon={application.statusIcon} label={application.status} />
                </td>
                <td className="truncate px-5 py-4 text-blue-950/80">{application.updated}</td>
                <td className="truncate px-5 py-4 text-blue-950/80">{application.nextStep ?? "-"}</td>
                <td className="truncate px-5 py-4 text-blue-950/80">{application.source}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <MoreButton />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-blue-950/10 px-5 py-4 text-sm font-medium text-blue-950/75">
          <p>Showing 1-25 of 100 applications</p>
          <div className="flex items-center gap-2">
            <button className="size-9 rounded-lg border border-blue-100 bg-white text-blue-950" type="button">{"<"}</button>
            <button className="size-9 rounded-lg bg-blue-700 text-white" type="button">1</button>
            <button className="size-9 rounded-lg text-blue-950" type="button">2</button>
            <button className="size-9 rounded-lg text-blue-950" type="button">3</button>
            <button className="size-9 rounded-lg text-blue-950" type="button">4</button>
            <button className="size-9 rounded-lg border border-blue-100 bg-white text-blue-950" type="button">{">"}</button>
          </div>
          <FilterButton label="Rows per page: 25" />
        </div>
      </section>

      <section className="grid gap-2.5 xl:hidden">
        {applications.slice(0, 6).map((application) => (
          <article className="rounded-xl border border-white/80 bg-white/86 p-3 shadow-md shadow-blue-950/6 backdrop-blur-xl sm:p-4" key={`${application.company}-mobile`}>
            <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] items-start gap-3 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(90px,auto)_auto]">
              <div className="flex min-w-0 gap-3">
                {application.companyIcon ? (
                  <AppIcon className="size-10 shrink-0 text-blue-700 sm:size-11" name={application.companyIcon} />
                ) : (
                  <CompanyMark type={application.companyMark} />
                )}
                <div className="min-w-0">
                  <Link className="block truncate text-sm font-semibold text-slate-950 hover:underline" href={`/applications/${application.id}`}>
                    {application.company}
                  </Link>
                  <p className="mt-1 truncate text-xs font-medium text-blue-950/75 sm:text-sm">{application.role}</p>
                </div>
              </div>
              <div className="min-w-0">
                <StatusBadge className={application.statusClass} icon={application.statusIcon} label={application.status} />
              </div>
              <div className="hidden min-w-0 text-right text-xs font-medium text-blue-950/75 sm:block">
                <p className="truncate">{application.source}</p>
              </div>
              <MoreButton />
            </div>
            <div className="mt-3 grid gap-1.5 pl-13 text-xs font-medium text-blue-950/75 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:pl-14">
              <p className="min-w-0 truncate">{application.nextStep ?? "-"}</p>
              <p className="min-w-0 truncate">Updated {application.updated}</p>
              <p className="min-w-0 truncate sm:hidden">{application.source}</p>
            </div>
          </article>
        ))}
        <button className="h-12 rounded-xl border border-blue-100 bg-white/84 text-sm font-semibold text-blue-950 shadow-lg shadow-blue-950/8" type="button">
          Load more
        </button>
      </section>
    </PageShell>
  )
}
