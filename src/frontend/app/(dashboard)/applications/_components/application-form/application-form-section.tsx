import type { ReactNode } from "react"

import {
  FieldDescription,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

export function ApplicationFormSection({
  children,
  description,
  title,
}: {
  children: ReactNode
  description?: string
  title: string
}) {
  return (
    <FieldSet className="gap-4">
      <div>
        <FieldLegend>{title}</FieldLegend>
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
      </div>
      {children}
    </FieldSet>
  )
}
