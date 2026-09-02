import { Check } from "lucide-react"
import type { ReactNode } from "react"

export function FeaturePoint({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-primary">
        <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
      </span>
      <span>{children}</span>
    </li>
  )
}
