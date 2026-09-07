import { notFound } from "next/navigation";

export const metadata = { title: "Dashboard design preview · NoNeed2Ask", robots: { index: false, follow: false } };

export default async function DesignPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const { DashboardPreview } = await import("../preview-design/_components/dashboard-preview");
  return <DashboardPreview />;
}
