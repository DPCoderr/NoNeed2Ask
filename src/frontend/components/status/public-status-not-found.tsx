import Link from "next/link";
import { PublicStatusMessage } from "./public-status-message";

export function PublicStatusNotFound() {
  return (
    <PublicStatusMessage kind="missing" eyebrow="404 · Page not found" title="This status page could not be found" description="The link may be incorrect, expired, or the owner may have removed this public status page.">
      <Link prefetch={false} href="/" className="inline-flex min-h-11 items-center rounded-lg bg-[#315e96] px-5 text-sm font-medium text-white outline-none hover:bg-[#264b79] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">Return to home</Link>
    </PublicStatusMessage>
  );
}
