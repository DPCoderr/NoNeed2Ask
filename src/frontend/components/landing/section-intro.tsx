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
      <p className="text-sm font-medium text-primary">
        {eyebrow}
      </p>
      <h2 className={cn("mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[2.75rem]", align === "center" && "mx-auto")}>
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
