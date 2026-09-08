import { ArrowLeft, CalendarClock, Clock3, Edit3, LockKeyhole, Share2, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PrivateApplicationDto } from "@/lib/api/types"
import { formatApplicationDate, formatApplicationDateTime, getCompanyInitial } from "@/lib/applications/presentation"
import { StatusBadge } from "../../_components/applications-results/status-badge"
import { ApplicationDetailItem } from "./application-detail-item"
import { ApplicationNoteBlock } from "./application-note-block"

export function ApplicationDetail({ application }: { application: PrivateApplicationDto }) {
  return (
    <div className="mx-auto w-full max-w-[1120px] space-y-7 text-slate-800">
      <Button asChild variant="ghost" className="-ml-3 h-11 text-slate-600">
        <Link href="/applications"><ArrowLeft aria-hidden="true" />All applications</Link>
      </Button>
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="flex min-w-0 gap-4">
          <span aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl font-semibold text-[#315e96]">{getCompanyInitial(application.companyName)}</span>
          <div className="min-w-0">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-600">Application overview</p>
            <h1 className="break-words text-3xl font-semibold tracking-tight sm:text-4xl">{application.companyName}</h1>
            <p className="mt-2 break-words text-base leading-7 text-slate-600">{application.jobTitle}</p>
            <div className="mt-4"><StatusBadge status={application.status} /></div>
          </div>
        </div>
        <Button asChild className="h-11 shrink-0 bg-[#315e96] px-5 text-white hover:bg-[#264b79]">
          <Link href={`/applications/${application.id}/update`}><Edit3 aria-hidden="true" className="size-4" />Edit application</Link>
        </Button>
      </header>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="min-w-0 gap-0 border-slate-200 bg-white shadow-none">
          <CardHeader className="border-b border-slate-200 pb-5"><CardTitle className="text-base">Notes & context</CardTitle><p className="text-sm leading-6 text-slate-600">The details to carry into your next conversation.</p></CardHeader>
          <CardContent className="space-y-7 pt-6">
            <ApplicationNoteBlock icon={LockKeyhole} label="Private note" value={application.privateNote} />
            <ApplicationNoteBlock icon={Share2} label="Public note" value={application.publicNote} />
          </CardContent>
        </Card>
        <Card className="gap-0 border-slate-200 bg-white shadow-none">
          <CardHeader className="pb-5"><CardTitle className="text-base">Keep things moving</CardTitle></CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <ApplicationDetailItem icon={Clock3} label="Next action" value={formatApplicationDateTime(application.nextActionAt)} />
              <ApplicationDetailItem icon={CalendarClock} label="Last contact" value={formatApplicationDateTime(application.lastContactAt)} />
            </dl>
            <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-slate-500"><LockKeyhole aria-hidden="true" className="size-3.5 shrink-0" />Only you can see your private notes.</p>
          </CardContent>
        </Card>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
        <dl className="flex flex-wrap gap-x-5 gap-y-2 text-xs leading-5 text-slate-500">
          <div><dt className="inline">Created </dt><dd className="inline">{formatApplicationDate(application.createdAt)}</dd></div>
          <div><dt className="inline">Updated </dt><dd className="inline">{formatApplicationDate(application.updatedAt)}</dd></div>
        </dl>
        <Button asChild variant="ghost" className="h-11 text-xs text-red-700 hover:bg-red-50 hover:text-red-800">
          <Link href={`/applications/${application.id}?delete=true`}><Trash2 aria-hidden="true" className="size-3.5" />Delete application</Link>
        </Button>
      </footer>
    </div>
  )
}
