"use client";

import { Delete02Icon, MoreHorizontalIcon, PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function ApplicationActionsView({ companyName, isDeleteOpen, onDeleteOpenChange, isDeleting, isDeleteError, onDelete, onEdit }: {
  companyName: string;
  isDeleteOpen: boolean;
  onDeleteOpenChange: (open: boolean) => void;
  isDeleting: boolean;
  isDeleteError: boolean;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog open={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button ref={trigger} type="button" aria-label={`Actions for ${companyName}`} className="flex size-11 shrink-0 items-center justify-center rounded-lg text-slate-400 outline-none hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-600">
            <HugeiconsIcon icon={MoreHorizontalIcon} className="size-[18px]" aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44 rounded-lg bg-white p-1 text-slate-700 shadow-lg ring-slate-200 **:data-[slot=dropdown-menu-item]:rounded-md **:data-[slot=dropdown-menu-item]:focus:bg-slate-100">
          <DropdownMenuItem onSelect={onEdit}><HugeiconsIcon icon={PencilEdit02Icon} aria-hidden="true" />Edit application</DropdownMenuItem>
          <DropdownMenuItem disabled={isDeleting} onSelect={() => onDeleteOpenChange(true)} className="text-red-700! focus:text-red-800!"><HugeiconsIcon icon={Delete02Icon} aria-hidden="true" />Delete application</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent className="rounded-xl bg-white text-slate-900" onCloseAutoFocus={(event) => {
        event.preventDefault();
        const target = trigger.current?.isConnected ? trigger.current : document.getElementById("applications-list-title");
        target?.focus();
      }}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this application?</AlertDialogTitle>
          <AlertDialogDescription className="break-words text-slate-500">This will permanently remove {companyName} from your tracker.</AlertDialogDescription>
        </AlertDialogHeader>
        {isDeleteError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">We could not delete this application. Please try again.</p>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} className="h-11 rounded-lg" type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} onClick={(event) => { event.preventDefault(); onDelete(); }} type="button" variant="destructive" className="h-11 rounded-lg">{isDeleting ? "Deleting..." : "Delete"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
