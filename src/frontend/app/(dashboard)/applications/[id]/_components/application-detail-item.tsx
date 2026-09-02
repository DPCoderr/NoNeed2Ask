import type { LucideIcon } from "lucide-react"

export function ApplicationDetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-white/75 p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
        <dt className="text-xs font-semibold uppercase tracking-normal">
          {label}
        </dt>
      </div>
      <dd className="mt-3 text-sm font-semibold leading-6 text-foreground">
        {value}
      </dd>
    </div>
  )
}
