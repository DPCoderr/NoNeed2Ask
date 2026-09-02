"use client";

import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, type ReactNode } from "react";

import { PublicProfileSharingSwitch } from "@/components/dashboard/public-profile-sharing-switch";
import { Button } from "@/components/ui/button";

export type DashboardHeaderProps = {
  actions?: ReactNode;
  description?: string;
  eyebrow?: string;
  isPublicProfileAvailable?: boolean;
  isPublicSharingEnabled?: boolean;
  publicSlug?: string;
  title?: string;
  userDisplayName?: string;
};

const previewButtonClassName =
  "h-9 rounded-full border-blue-950/10 bg-white px-3.5 text-sm font-semibold text-blue-900 shadow-sm shadow-blue-950/5 hover:bg-blue-50 hover:text-slate-950";

function PreviewPublicPageButton({
  isAvailable,
  publicSlug,
}: {
  isAvailable: boolean;
  publicSlug: string;
}) {
  const content = (
    <>
      Preview public page
      <HugeiconsIcon
        aria-hidden="true"
        className="ml-2 size-4"
        icon={ArrowUpRight01Icon}
        strokeWidth={2}
      />
    </>
  );

  if (!isAvailable) {
    return (
      <Button
        className={previewButtonClassName}
        disabled
        size="sm"
        variant="outline"
      >
        {content}
      </Button>
    );
  }

  return (
    <Button
      asChild
      className={previewButtonClassName}
      size="sm"
      variant="outline"
    >
      <Link href={`/status/${publicSlug}`}>{content}</Link>
    </Button>
  );
}

export function DashboardHeader({
  actions,
  description,
  eyebrow = "Private dashboard",
  isPublicProfileAvailable,
  isPublicSharingEnabled,
  publicSlug,
  title,
  userDisplayName,
}: DashboardHeaderProps) {
  const [isPublicSharingPreviewEnabled, setIsPublicSharingPreviewEnabled] =
    useState(Boolean(isPublicSharingEnabled));
  const headerTitle = title ?? `Welcome back, ${userDisplayName}`;
  const headerDescription =
    description ??
    "Your applications, upcoming interview, and latest progress at a glance.";
  const headerActions =
    actions ??
    (publicSlug ? (
      <>
        <PublicProfileSharingSwitch
          disabled={!isPublicProfileAvailable}
          initialEnabled={Boolean(isPublicSharingEnabled)}
          onEnabledChange={setIsPublicSharingPreviewEnabled}
        />
        {isPublicProfileAvailable && isPublicSharingPreviewEnabled ? (
          <PreviewPublicPageButton
            isAvailable={Boolean(isPublicProfileAvailable)}
            publicSlug={publicSlug}
          />
        ) : null}
      </>
    ) : null);

  return (
    <div className="flex flex-col gap-5 border-b border-blue-950/10 pb-5 lg:flex-row lg:items-end lg:justify-between lg:pb-6">
      <header className="min-w-0 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
          {eyebrow}
        </p>
        <h1 className="mt-2 break-words text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2.8rem] sm:leading-[1.04]">
          {headerTitle}
        </h1>
        <p className="mt-2.5 max-w-2xl text-sm leading-6 text-blue-950/70 sm:text-base">
          {headerDescription}
        </p>
      </header>

      {headerActions ? (
        <div className="flex w-fit shrink-0 flex-wrap items-center gap-2 rounded-full border border-blue-950/8 bg-white/75 p-1.5 text-sm font-semibold text-slate-950 shadow-sm shadow-blue-950/5 backdrop-blur-xl">
          {headerActions}
        </div>
      ) : null}
    </div>
  );
}
