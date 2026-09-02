import type { LucideIcon } from "lucide-react"

export function ApplicationNoteBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string | null
}) {
  return (
    <section className="min-w-0 rounded-lg border border-border/80 bg-white/75 p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
        </span>
        <h2 className="text-sm font-semibold text-foreground">{label}</h2>
      </div>
      <p className="mt-4 min-h-24 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
        {value ?? "No note added yet."}
      </p>
    </section>
  )
}
