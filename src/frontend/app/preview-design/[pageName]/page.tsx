import { notFound } from "next/navigation";

export const metadata = { title: "Design preview · NoNeed2Ask", robots: { index: false, follow: false } };

export default async function PreviewDesignPage({ params }: { params: Promise<{ pageName: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { pageName } = await params;
  if (pageName === "dashboard") {
    const { DashboardPreview } = await import("../_components/dashboard-preview");
    return <DashboardPreview />;
  }
  if (pageName === "applications") {
    const { ApplicationsPreview } = await import("../_components/applications-preview");
    return <ApplicationsPreview />;
  }
  if (pageName === "public-page") {
    const { PublicPagePreview } = await import("../_components/public-page-preview");
    return <PublicPagePreview />;
  }
  notFound();
}
