import { Calendar03Icon, Globe02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { PublicStatusProfileDto } from "@/lib/api/types";

const dateFormatter = new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" });

export function PublicStatusHeader({ profile }: { profile: PublicStatusProfileDto }) {
  return (
    <section id="overview" aria-labelledby="public-title" className="scroll-mt-6 pb-2">
      <p className="flex items-center gap-2 text-xs font-medium text-[#315e96]">
        <HugeiconsIcon icon={Globe02Icon} className="size-4" aria-hidden="true" />Public job search update
      </p>
      <h1 id="public-title" className="mt-4 max-w-3xl text-[1.75rem] font-semibold leading-tight tracking-[-0.035em] [overflow-wrap:anywhere] sm:text-[2.25rem]">{profile.displayName}&apos;s job search</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">The latest on applications and what&apos;s coming next, all in one place.</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs leading-5 text-slate-600">
        <span className="flex items-center gap-2"><HugeiconsIcon icon={Calendar03Icon} className="size-3.5 shrink-0" aria-hidden="true" />Last updated {profile.updatedAt ? <time dateTime={profile.updatedAt}>{dateFormatter.format(new Date(profile.updatedAt))}</time> : "Not scheduled"}</span>
        <span>Shared by the owner · Read only</span>
      </div>
    </section>
  );
}
