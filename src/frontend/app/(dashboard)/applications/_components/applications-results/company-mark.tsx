import { getCompanyInitial } from "@/lib/applications/presentation"

export function CompanyMark({ companyName }: { companyName: string }) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-sm font-semibold text-blue-800">
      {getCompanyInitial(companyName)}
    </span>
  )
}
