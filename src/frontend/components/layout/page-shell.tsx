import { cn } from "@/lib/utils"

type PageShellProps = React.ComponentProps<"main"> & {
  background?: "landing"
  eyebrow?: string
  title?: string
  description?: string
}

export function PageShell({
  background,
  children,
  className,
  eyebrow,
  title,
  description,
  ...props
}: PageShellProps) {
  const header = (eyebrow || title || description) && (
    <header className="max-w-2xl space-y-3">
      {eyebrow && (
        <p
          className={cn(
            "text-sm font-medium text-muted-foreground",
            background === "landing" && "text-blue-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h1
          className={cn(
            "text-3xl font-semibold tracking-normal text-foreground md:text-4xl",
            background === "landing" && "text-slate-950"
          )}
        >
          {title}
        </h1>
      )}
      {description && (
        <p
          className={cn(
            "text-base leading-7 text-muted-foreground",
            background === "landing" && "text-slate-700"
          )}
        >
          {description}
        </p>
      )}
    </header>
  )

  return (
    <main
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-10 md:px-8 md:py-14",
        background === "landing" && "relative z-10 min-h-[calc(100svh-4rem)]",
        className
      )}
      {...props}
    >
      {header}
      {children}
    </main>
  )
}
