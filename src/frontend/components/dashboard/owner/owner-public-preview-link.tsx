import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function OwnerPublicPreviewLink({ href }: { href: string }) {
  return (
    <Link href={href} aria-label="Preview page" title="Preview page" className="flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded text-xs font-medium text-[#315e96] outline-none hover:text-[#193b66] focus-visible:ring-2 focus-visible:ring-blue-600 sm:min-w-0">
      <span className="hidden sm:inline">Preview page</span>
      <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4 sm:size-3.5" aria-hidden="true" />
    </Link>
  );
}
