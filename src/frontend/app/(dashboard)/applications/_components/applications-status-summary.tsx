"use client"

import Image from "next/image"
import { useRef, useState } from "react"

import { normalizeApplicationStatus } from "@/lib/api/application-status"
import type { PrivateApplicationDto } from "@/lib/api/types"

import { statusDetails, statuses } from "../application-list-config"

type StatusCard = {
  icon: string | null
  label: string
  shortLabel?: string
  value: number
}

const iconPath = "/dashboard-icons"

// Renders a configured status icon from the dashboard asset folder.
function StatusIcon({ name }: { name: string }) {
  return (
    <Image
      alt=""
      className="size-8 text-blue-700 sm:size-11 xl:size-14"
      height={80}
      src={`${iconPath}/${name}`}
      width={80}
    />
  )
}

// Converts the current page of applications into the six summary cards.
function getStatusCards(applications: PrivateApplicationDto[]): StatusCard[] {
  return statuses.slice(0, 6).map((status) => ({
    icon: statusDetails[status].icon,
    label: statusDetails[status].label,
    shortLabel: statusDetails[status].shortLabel,
    value: applications.filter(
      (application) => normalizeApplicationStatus(application.status) === status
    ).length,
  }))
}

// Shows quick status counts, with horizontal scrolling on smaller screens.
export function ApplicationsStatusSummary({
  applications,
}: {
  applications: PrivateApplicationDto[]
}) {
  const cards = getStatusCards(applications)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAtEnd, setIsAtEnd] = useState(false)

  // Tracks which side the jump button should point toward.
  function updateScrollState() {
    const scroller = scrollRef.current

    if (!scroller) {
      return
    }

    const endThreshold = 8
    setIsAtEnd(
      scroller.scrollLeft + scroller.clientWidth >=
        scroller.scrollWidth - endThreshold
    )
  }

  // Moves the status cards to the far end or back to the start.
  function handleJump() {
    const scroller = scrollRef.current

    if (!scroller) {
      return
    }

    scroller.scrollTo({
      behavior: "smooth",
      left: isAtEnd ? 0 : scroller.scrollWidth,
    })
  }

  return (
    <section className="relative -mx-4 px-4 pb-1 sm:mx-0 sm:px-0">
      <div
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={updateScrollState}
        ref={scrollRef}
      >
        <div className="grid auto-cols-[5rem] grid-flow-col gap-2 sm:auto-cols-[8.5rem] sm:gap-3 md:auto-cols-[8.8rem] xl:grid-flow-row xl:grid-cols-6">
          {cards.map((card) => (
            <article
              className="rounded-lg border border-white/80 bg-white/84 p-2 shadow-lg shadow-blue-950/8 backdrop-blur-xl sm:rounded-xl sm:p-3 xl:p-5"
              key={card.label}
            >
              <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left xl:gap-4">
                {card.icon ? (
                  <StatusIcon name={card.icon} />
                ) : (
                  <span className="flex size-8 items-center justify-center rounded-lg border-2 border-blue-950/70 text-xl text-blue-950/70 sm:size-11 xl:size-14 xl:text-3xl">
                    |
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold leading-3 text-blue-950 sm:text-xs xl:text-sm">
                    {card.shortLabel ?? card.label}
                  </p>
                  <p className="mt-0.5 text-xl font-semibold tracking-normal text-slate-950 sm:text-2xl xl:text-3xl">
                    {card.value}
                  </p>
                  <p className="mt-1 hidden text-sm font-medium text-blue-950/70 xl:block">
                    applications
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        aria-label={isAtEnd ? "Scroll status cards back" : "Scroll status cards forward"}
        className={`absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-blue-100 bg-white/90 text-xl font-semibold text-blue-800 shadow-lg shadow-blue-950/12 backdrop-blur transition hover:bg-white xl:hidden ${
          isAtEnd ? "left-2" : "right-2"
        }`}
        onClick={handleJump}
        type="button"
      >
        {isAtEnd ? "<" : ">"}
      </button>
    </section>
  )
}
