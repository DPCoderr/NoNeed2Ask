import Image from "next/image"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function BrowserFrame({
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
  alt: string
  children?: ReactNode
  className?: string
  height: number
  imageClassName?: string
  preload?: boolean
  sizes: string
  src: string
  width: number
}) {
  return (
    <figure
      className={cn(
        "min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_30px_90px_-45px_rgb(15_45_75_/_0.45)] ring-1 ring-slate-950/5",
        className
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
  )
}
