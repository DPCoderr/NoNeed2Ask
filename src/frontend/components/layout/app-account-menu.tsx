"use client";

import { ArrowDown01Icon, Logout02Icon, Setting07Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { AuthMeResponseDto } from "@/lib/api/auth";

export function AppAccountMenu({ currentUser, isLoggingOut, logoutError, onLogout, onNavigate }: {
  currentUser: AuthMeResponseDto;
  isLoggingOut: boolean;
  logoutError: string | null;
  onLogout: () => void;
  onNavigate: () => void;
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" aria-label="Account menu" className="flex min-h-11 w-full items-center gap-2.5 rounded-lg px-2 text-left outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-600 group-data-[collapsible=icon]/sidebar-wrapper:justify-center group-data-[collapsible=icon]/sidebar-wrapper:px-0">
            <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#edf0f4] text-xs font-semibold text-slate-600">{currentUser.username.slice(0, 2).toUpperCase()}</span>
            <span className="min-w-0 flex-1 group-data-[collapsible=icon]/sidebar-wrapper:sr-only">
              <span className="block truncate text-xs font-semibold text-slate-700">{currentUser.username}</span>
              <span className="mt-0.5 block truncate text-[10px] text-slate-500">{currentUser.email}</span>
            </span>
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-3.5 text-slate-400 group-data-[collapsible=icon]/sidebar-wrapper:hidden" aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="top" sideOffset={8} className="min-w-60 rounded-xl bg-white p-1 text-slate-700 shadow-lg ring-slate-200 **:data-[slot=dropdown-menu-item]:rounded-md **:data-[slot=dropdown-menu-item]:focus:bg-slate-100 **:data-[variant=destructive]:text-red-700!">
          <DropdownMenuLabel className="max-w-64 truncate text-xs text-slate-500">{currentUser.email}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-100" />
          <DropdownMenuItem asChild>
            <Link href="/settings" onClick={onNavigate}><HugeiconsIcon icon={Setting07Icon} />Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isLoggingOut} onClick={onLogout} variant="destructive">
            <HugeiconsIcon icon={Logout02Icon} />{isLoggingOut ? "Logging out..." : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {logoutError && <p role="alert" className="mt-2 px-2 text-xs text-red-700">{logoutError}</p>}
    </>
  );
}
