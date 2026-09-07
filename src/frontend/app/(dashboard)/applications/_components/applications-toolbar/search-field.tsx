import type { FormEvent } from "react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ResolvedApplicationListRequest } from "../../_lib/application-list-query";

export function ApplicationsSearchField({ onSearchChange, request }: {
  onSearchChange: (search: string) => void;
  request: ResolvedApplicationListRequest;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = new FormData(event.currentTarget).get("search");
    onSearchChange(typeof search === "string" ? search : "");
  }
  return (
    <form role="search" aria-label="Search applications" className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-[#fafbfc] pl-3 focus-within:border-[#315e96] focus-within:ring-2 focus-within:ring-blue-600/15" onSubmit={handleSubmit}>
      <HugeiconsIcon icon={Search01Icon} className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
      <input aria-label="Search companies or roles" className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-500 sm:text-sm" defaultValue={request.search} name="search" placeholder="Search companies or roles…" type="search" />
      <button className="h-11 shrink-0 rounded-r-lg px-3 text-xs font-medium text-[#315e96] outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600" type="submit">Search</button>
    </form>
  );
}
