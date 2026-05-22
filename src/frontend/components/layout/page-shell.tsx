import { cn } from "@/lib/utils"

type PageShellProps = React.ComponentProps<"main"> & {
  eyebrow?: string
  title?: string
  description?: string
}

export function PageShell({
  children,
  className,
  eyebrow,
  title,
  description,
  ...props
}: PageShellProps) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-10 md:px-8 md:py-14",
        className
      )}
      {...props}
    >
      {(eyebrow || title || description) && (
        <header className="max-w-2xl space-y-3">
          {eyebrow && (
            <p className="text-sm font-medium text-muted-foreground">
              {eyebrow}
            </p>
          )}
          {title && (
            <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-base leading-7 text-muted-foreground">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </main>
  )
}
