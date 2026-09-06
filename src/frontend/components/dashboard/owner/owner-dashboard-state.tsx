import { Button } from "@/components/ui/button";

import { OwnerDashboardHeader } from "./owner-dashboard-header";

export function OwnerDashboardState({ state, userDisplayName, onRetry }: { state: "Loading" | "Error"; userDisplayName: string; onRetry?: () => void }) {
  return (
    <main id="main-content" className="mx-auto w-full max-w-[1320px] space-y-7 px-5 py-7 text-slate-900 sm:px-8 sm:py-9 xl:px-10 xl:py-10">
      <OwnerDashboardHeader userDisplayName={userDisplayName} />
      {state === "Error" ? (
        <section role="alert" className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
          <h2 className="text-base font-semibold">Your overview couldn’t be loaded.</h2>
          <p className="mt-2 text-sm text-slate-500">Please try again in a moment.</p>
          <Button type="button" onClick={onRetry} variant="outline" className="mt-5 h-11 rounded-lg">Try again</Button>
        </section>
      ) : (
        <section aria-busy="true" aria-label="Loading dashboard" className="space-y-5">
          <p role="status" className="sr-only">Loading your dashboard…</p>
          <div aria-hidden="true" className="grid gap-5 lg:grid-cols-[1.8fr_1fr]">
            {[0, 1].map((item) => <div key={item} className="h-80 animate-pulse rounded-xl border border-slate-200 bg-white p-6 motion-reduce:animate-none"><div className="h-4 w-32 rounded bg-slate-100" /><div className="mt-8 h-10 w-24 rounded bg-slate-100" /><div className="mt-8 h-2 rounded bg-slate-100" /><div className="mt-8 h-12 rounded bg-slate-50" /></div>)}
          </div>
          <div aria-hidden="true" className="h-72 animate-pulse rounded-xl border border-slate-200 bg-white motion-reduce:animate-none" />
        </section>
      )}
    </main>
  );
}
