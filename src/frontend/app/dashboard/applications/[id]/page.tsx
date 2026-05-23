import { redirect } from "next/navigation"

type DashboardApplicationRedirectPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function DashboardApplicationRedirectPage({
  params,
}: DashboardApplicationRedirectPageProps) {
  const { id } = await params

  redirect(`/applications/${id}`)
}
