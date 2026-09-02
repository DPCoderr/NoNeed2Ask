import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

import { getAppBreadcrumbs } from "./app-breadcrumb-data"

export function AppBreadcrumbs({
  hasLandingBackground,
  isDashboard,
  pathname,
}: {
  hasLandingBackground: boolean
  isDashboard: boolean
  pathname: string
}) {
  const breadcrumbs = getAppBreadcrumbs(pathname)

  return (
    <Breadcrumb>
      <BreadcrumbList className={cn(hasLandingBackground && "text-slate-700")}>
        {isDashboard ? (
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-slate-950">
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink
              className={cn(
                hasLandingBackground &&
                  "font-medium text-slate-700 hover:text-slate-950"
              )}
              href="/"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {breadcrumbs[0]?.href !== "/" && (
          <BreadcrumbSeparator className="hidden text-slate-500 md:block" />
        )}
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          if (breadcrumb.href === "/") {
            return null
          }

          return (
            <Fragment key={breadcrumb.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    className={cn(hasLandingBackground && "text-slate-950")}
                  >
                    {breadcrumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    className={cn(
                      hasLandingBackground &&
                        "font-medium text-slate-700 hover:text-slate-950"
                    )}
                    href={breadcrumb.href}
                  >
                    {breadcrumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="text-slate-500" />
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
