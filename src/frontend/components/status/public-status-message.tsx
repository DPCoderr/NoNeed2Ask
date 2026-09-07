import type { ReactNode } from "react";
import { LockKeyIcon, AlertCircleIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const icons = { private: LockKeyIcon, error: AlertCircleIcon, missing: Search01Icon };

export function PublicStatusMessage({ kind, eyebrow, title, description, children }: {
  kind: keyof typeof icons;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="public-state-title" className="mx-auto my-6 max-w-xl rounded-xl border border-slate-200 bg-white px-6 py-12 text-center sm:my-12 sm:px-12 sm:py-16">
      <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[#537298]"><HugeiconsIcon icon={icons[kind]} className="size-6" aria-hidden="true" /></span>
      <p className="mt-6 text-xs font-medium leading-5 text-[#315e96] [overflow-wrap:anywhere]">{eyebrow}</p>
      <h1 id="public-state-title" className="mt-3 text-2xl font-semibold leading-tight tracking-tight [overflow-wrap:anywhere]">{title}</h1>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-600">{description}</p>
      {children && <div className="mt-7">{children}</div>}
    </section>
  );
}
