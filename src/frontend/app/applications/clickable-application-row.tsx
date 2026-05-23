"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

type ClickableApplicationRowProps = {
  children: ReactNode
  className?: string
  href: string
}

export function ClickableApplicationRow({
  children,
  className,
  href,
}: ClickableApplicationRowProps) {
  const router = useRouter()

  return (
    <TableRow
      className={cn("cursor-pointer", className)}
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          router.push(href)
        }
      }}
      role="link"
      tabIndex={0}
    >
      {children}
    </TableRow>
  )
}
