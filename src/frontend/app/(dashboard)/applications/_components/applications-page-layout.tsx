import type { ReactNode } from "react";
import { ApplicationsHeader } from "./applications-header";

export function ApplicationsPageLayout({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="mx-auto w-full max-w-[1320px] space-y-7 px-5 py-7 text-slate-900 sm:px-8 sm:py-9 xl:px-10 xl:py-10">
      <ApplicationsHeader />
      {children}
    </main>
  );
}
