import { mockPrivateApplications } from "@/lib/api/fixtures"

const segmentLabels: Record<string, string> = {
  dashboard: "Dashboard",
  applications: "Applications",
  settings: "Settings",
  status: "Public status",
  login: "Log in",
  register: "Register",
  "daniel-job-search": "Daniel job search",
}

export function getAppBreadcrumbs(pathname: string) {
  if (pathname === "/") {
    return [{ href: "/", label: "Dashboard" }]
  }

  const segments = pathname.split("/").filter(Boolean)

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`
    const application = mockPrivateApplications.find((item) => item.id === segment)

    return {
      href,
      label:
        application?.companyName ??
        segmentLabels[segment] ??
        decodeURIComponent(segment),
    }
  })
}
