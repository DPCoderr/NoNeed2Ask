"use client";

import { PublicStatusError } from "@/components/status/public-status-error";
import { PublicStatusFrame } from "@/components/status/public-status-frame";

export default function StatusErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <PublicStatusFrame><PublicStatusError onRetry={reset} /></PublicStatusFrame>;
}
