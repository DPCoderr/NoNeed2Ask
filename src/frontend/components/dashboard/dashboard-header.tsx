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
  "h-11 min-w-0 w-full justify-between rounded-xl border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-800 shadow-none hover:border-blue-300 hover:bg-blue-100 hover:text-blue-950";

function PreviewPublicPageButton({
  isAvailable,
  publicSlug,
}: {
  isAvailable: boolean;
  publicSlug: string;
}) {
  const content = (
    <>
      <span className="truncate">Preview page</span>
      <HugeiconsIcon
        aria-hidden="true"
        className="size-4"
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
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-blue-100 bg-white px-6 py-7 shadow-[0_28px_80px_-58px_rgb(30_64_175_/_0.55)] before:absolute before:left-10 before:top-0 before:h-1 before:w-20 before:rounded-b-full before:bg-blue-600 sm:px-9 sm:py-8 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-10 lg:py-9">
      <div aria-hidden="true" className="absolute -right-20 -top-28 -z-10 size-64 rounded-full border-2 border-blue-200/80" />
      <div aria-hidden="true" className="absolute right-8 top-8 -z-10 size-28 rounded-full border border-blue-200/70" />

      <header className="min-w-0 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl text-balance break-words text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-[2.8rem] lg:text-5xl">
          {headerTitle}
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {headerDescription}
        </p>
      </header>

      {headerActions ? (
        <div className="mt-4 w-full shrink-0 sm:mt-6 lg:mt-0 lg:max-w-sm">
          <p className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-900/55">
            Sharing
          </p>
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-3 rounded-2xl border border-blue-100 bg-white p-3 text-sm font-semibold text-slate-900 shadow-[0_18px_55px_-40px_rgb(30_64_175_/_0.55)]">
            {headerActions}
          </div>
        </div>
      ) : null}
    </section>
  );
}
