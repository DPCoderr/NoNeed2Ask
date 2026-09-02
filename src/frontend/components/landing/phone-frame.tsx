import Image from "next/image"

import { cn } from "@/lib/utils"

export function PhoneFrame({
  alt,
  className,
  height,
  src,
  width,
}: {
  alt: string
  className?: string
  height: number
  src: string
  width: number
}) {
  return (
    <figure
      className={cn(
        "relative isolate rounded-[3rem] bg-[linear-gradient(115deg,#d4d4d8_0%,#52525b_18%,#18181b_48%,#71717a_78%,#e4e4e7_100%)] p-[2px] shadow-[0_38px_85px_-34px_rgb(15_23_42_/_0.8)] ring-1 ring-black/40",
        className
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
  )
}
