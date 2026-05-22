import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const primaryRoutes = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/status/daniel-job-search", label: "Public status" },
]

type MvpNavigationProps = {
  className?: string
}

export function MvpNavigation({ className }: MvpNavigationProps) {
  return (
    <nav
      aria-label="MVP routes"
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm",
        className
      )}
    >
      {primaryRoutes.map((route) => (
        <Button asChild key={route.href} size="sm" variant="ghost">
          <Link href={route.href}>{route.label}</Link>
        </Button>
      ))}
      <div className="ml-auto flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </nav>
  )
}
