import { cn } from "@/lib/utils"

export function SectionIntro({
  align = "left",
  description,
  eyebrow,
  title,
}: {
  align?: "left" | "center"
  description: string
  eyebrow: string
  title: string
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
          align === "center" && "mx-auto"
        )}
      >
        {description}
      </p>
    </div>
  )
}
