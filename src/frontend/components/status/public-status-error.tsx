"use client";

import { PublicStatusMessage } from "./public-status-message";

export function PublicStatusError({ onRetry }: { onRetry: () => void }) {
  return (
    <PublicStatusMessage kind="error" eyebrow="Temporarily unavailable" title="We could not load this status page" description="Something went wrong while loading this update. Please try again in a moment.">
      <button type="button" onClick={onRetry} className="min-h-11 rounded-lg bg-[#315e96] px-5 text-sm font-medium text-white outline-none hover:bg-[#264b79] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">Try again</button>
    </PublicStatusMessage>
  );
}
