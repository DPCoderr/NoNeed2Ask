import { PrivateStatusContent } from "@/components/status/private-status-content";
import { PublicStatusContent } from "@/components/status/public-status-content";
import { PublicStatusError } from "@/components/status/public-status-error";
import { PublicStatusFrame } from "@/components/status/public-status-frame";
import { PublicStatusLoading } from "@/components/status/public-status-loading";
import { PublicStatusNotFound } from "@/components/status/public-status-not-found";
import { getPublicPreviewData, publicPreviewDate, type PublicPreviewScenario } from "../_lib/public-page-preview-data";

export function PublicPagePreviewContent({ scenario, onRetry }: { scenario: PublicPreviewScenario; onRetry: () => void }) {
  const isPrivate = scenario === "Private" || scenario === "Private · signed in";
  const isAuthenticated = scenario === "Private · signed in";
  const { applications, profile } = getPublicPreviewData(scenario);
  let content = <PublicStatusContent applications={applications} profile={profile} now={publicPreviewDate} />;
  if (isPrivate) content = <PrivateStatusContent isAuthenticated={isAuthenticated} slug={profile.publicSlug} />;
  if (scenario === "Loading") content = <PublicStatusLoading />;
  if (scenario === "Error") content = <PublicStatusError onRetry={onRetry} />;
  if (scenario === "Not found") content = <PublicStatusNotFound />;
  return <PublicStatusFrame isAuthenticated={isAuthenticated} navigation={scenario !== "Loading"}>{content}</PublicStatusFrame>;
}
