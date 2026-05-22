type RoutePlaceholderProps = {
  owner: string
  summary: string
  nextStep: string
}

export function RoutePlaceholder({
  owner,
  summary,
  nextStep,
}: RoutePlaceholderProps) {
  return (
    <aside className="rounded-lg border border-dashed bg-muted/40 p-5">
      <p className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
        Placeholder ownership
      </p>
      <h2 className="mt-2 text-base font-semibold text-foreground">{owner}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{summary}</p>
      <p className="mt-4 text-sm font-medium text-foreground">{nextStep}</p>
    </aside>
  )
}
