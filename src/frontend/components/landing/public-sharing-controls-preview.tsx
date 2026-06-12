"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Switch } from "@/components/ui/switch";

export function PublicSharingControlsPreview() {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-950">
        <div className="flex h-9 items-center gap-2 rounded-lg border border-blue-100 bg-white/75 px-3 shadow-sm shadow-blue-950/5">
          <span>Public page {isEnabled ? "on" : "off"}</span>
          <Switch
            aria-label="Preview public page visibility"
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
            size="sm"
          />
        </div>
        {isEnabled ? (
          <Link
            className="flex h-9 items-center rounded-lg border border-blue-100 bg-white/75 px-4 shadow-sm shadow-blue-950/5 transition-colors hover:bg-white"
            href="/status/daan-job-search"
          >
            Preview public page
            <HugeiconsIcon
              aria-hidden="true"
              className="ml-2 size-4"
              icon={ArrowUpRight01Icon}
              strokeWidth={2}
            />
          </Link>
        ) : null}
      </div>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        {isEnabled
          ? "The read-only public page is visible to anyone with the link."
          : "The public page is hidden while your private dashboard stays untouched."}
      </p>
    </div>
  );
}
