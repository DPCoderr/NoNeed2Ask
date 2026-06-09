"use client"

import { FormEvent } from "react"

import type { ResolvedApplicationListRequest } from "./application-list-query"

export function ApplicationsSearchField({
  onSearchChange,
  request,
  placeholder,
}: {
  onSearchChange: (search: string) => void
  request: ResolvedApplicationListRequest
  placeholder: string
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const search = formData.get("search")

    onSearchChange(typeof search === "string" ? search : "")
  }

  return (
    <form
      className="flex h-10 min-w-0 items-center gap-3 rounded-lg border border-blue-100 bg-white/86 px-3 text-sm shadow-sm shadow-blue-950/5"
      onSubmit={handleSubmit}
    >
      <span
        className="relative size-4 shrink-0 rounded-full border-2 border-blue-950/75"
        aria-hidden="true"
      >
        <span className="absolute -bottom-1 -right-1 h-2 w-0.5 rotate-[-45deg] rounded-full bg-blue-950/75" />
      </span>
      <input
        className="min-w-0 flex-1 bg-transparent text-xs font-medium text-blue-950 outline-none placeholder:text-blue-950/50 sm:text-sm"
        defaultValue={request.search}
        name="search"
        placeholder={placeholder}
        type="search"
      />
      <button className="text-xs font-semibold text-blue-700" type="submit">
        Search
      </button>
    </form>
  )
}
