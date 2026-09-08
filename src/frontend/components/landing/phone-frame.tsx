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
    <figure className={cn("rounded-[2rem] border border-slate-700 bg-slate-900 p-2 shadow-md shadow-slate-900/10", className)}>
      <Image
        alt={alt}
        className="h-auto w-full rounded-[1.5rem]"
        height={height}
        sizes="(max-width: 359px) calc(100vw - 98px), (max-width: 639px) 294px, (max-width: 767px) 40vw, 294px"
        src={src}
        width={width}
      />
    </figure>
  )
}
