export function PublicStatusLoading() {
  return (
    <div role="status" aria-label="Loading public status" className="space-y-8 py-6">
      <h1 className="sr-only">Loading public status</h1>
      <div aria-hidden="true" className="space-y-4 motion-safe:animate-pulse">
        <div className="h-3 w-36 rounded bg-slate-200" /><div className="h-8 w-3/4 max-w-md rounded bg-slate-200" /><div className="h-4 w-full max-w-lg rounded bg-slate-200" />
        <div className="mt-8 grid gap-5 md:grid-cols-[1.6fr_1fr]">{[0, 1].map((item) => <div key={item} className="h-72 rounded-xl border border-slate-200 bg-white p-6"><div className="h-4 w-32 rounded bg-slate-100" /><div className="mt-8 h-9 w-20 rounded bg-slate-100" /><div className="mt-8 h-16 rounded bg-slate-100" /></div>)}</div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">{[0, 1, 2].map((item) => <div key={item} className="my-5 h-12 rounded bg-slate-100" />)}</div>
      </div>
    </div>
  );
}
