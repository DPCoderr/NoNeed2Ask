import { getCompanyInitial } from "@/lib/applications/presentation";

export function CompanyMark({ companyName }: { companyName: string }) {
  return <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-[#f8f9fb] text-sm font-semibold text-slate-500">{getCompanyInitial(companyName)}</span>;
}
