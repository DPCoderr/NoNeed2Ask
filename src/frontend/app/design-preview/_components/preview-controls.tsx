"use client";

import { previewScenarios, type PreviewScenario } from "../_lib/preview-data";

export function PreviewControls({ scenario, onScenarioChange, notice, onDismiss }: {
  scenario: PreviewScenario;
  onScenarioChange: (scenario: PreviewScenario) => void;
  notice: string;
  onDismiss: () => void;
}) {
  return (
    <aside aria-label="Design preview controls" className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center gap-3 px-5 pb-8 text-xs text-slate-500 sm:px-8 xl:px-10">
      <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-amber-500" />Design preview · Sample data</span>
      <label className="flex items-center gap-2">
        <span className="sr-only">Preview scenario</span>
        <select value={scenario} onChange={(event) => onScenarioChange(event.target.value as PreviewScenario)} className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          {previewScenarios.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <p className="basis-full leading-5">Local preview. Changes are not saved and no backend requests are made.</p>
      {notice && <div role="status" className="fixed inset-x-4 bottom-4 z-[60] flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-lg sm:left-auto sm:max-w-md">
        <p className="min-w-0 break-words leading-5">{notice}</p>
        <button type="button" onClick={onDismiss} aria-label="Dismiss preview message" className="flex size-11 shrink-0 items-center justify-center rounded-lg text-lg hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600">×</button>
      </div>}
    </aside>
  );
}
