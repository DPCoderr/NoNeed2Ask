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
    <section className="min-w-0">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
        </span>
        <h2 className="text-sm font-semibold text-foreground">{label}</h2>
      </div>
      <p className="mt-3 min-h-20 break-words whitespace-pre-wrap text-sm leading-7 text-slate-600">
        {value ?? "No note added yet."}
      </p>
    </section>
  )
}
