import Link from "next/link";
import { PublicStatusMessage } from "./public-status-message";

export function PrivateStatusContent({ isAuthenticated, slug }: { isAuthenticated: boolean; slug: string }) {
  return (
    <PublicStatusMessage kind="private" eyebrow={`Public status / ${slug}`} title="This status page is private" description="The owner has turned off public sharing for this job search. There is nothing visible here right now.">
      {isAuthenticated && <Link prefetch={false} href="/" className="inline-flex min-h-11 items-center rounded-lg bg-[#315e96] px-5 text-sm font-medium text-white outline-none hover:bg-[#264b79] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">Return to dashboard</Link>}
    </PublicStatusMessage>
  );
}
