import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageShell } from "@/components/layout/page-shell"
import { Button } from "@/components/ui/button"

export function ApplicationEditorLayout({ children, companyName, backHref }: {
  children: ReactNode
  companyName?: string
  backHref: string
}) {
  return (
    <PageShell className="max-w-[1000px] gap-7 px-5 py-7 text-slate-800 sm:px-8 lg:py-10">
      <header>
        <Button asChild variant="ghost" className="-ml-3 mb-5 h-11 text-slate-600">
          <Link href={backHref}><ArrowLeft aria-hidden="true" />{companyName ? "Back to application" : "All applications"}</Link>
        </Button>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-600">Your job search</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{companyName ? "Edit application" : "A new opportunity"}</h1>
        <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-slate-600">{companyName ? `Keep your progress at ${companyName} up to date.` : "Keep the role, conversations and next steps in one place."}</p>
      </header>
      <div className="min-w-0">{children}</div>
    </PageShell>
  )
}
