import type { ReactNode } from "react";

export function OwnerSharingPanel({ children }: { children: ReactNode }) {
  return (
    <section aria-label="Public page sharing" className="flex max-w-full flex-wrap items-center gap-x-1 gap-y-1 sm:gap-x-4 xl:justify-end">
      {children}
    </section>
  );
}
