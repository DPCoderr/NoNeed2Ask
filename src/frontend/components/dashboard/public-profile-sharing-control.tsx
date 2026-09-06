import { Switch } from "@/components/ui/switch";

export function PublicProfileSharingControl({ enabled, disabled, onCheckedChange, appearance = "default" }: {
  enabled: boolean;
  disabled: boolean;
  onCheckedChange: (checked: boolean) => void;
  appearance?: "default" | "compact";
}) {
  return (
    <div className={appearance === "compact" ? "flex min-h-11 items-center gap-3 text-xs text-slate-600" : "flex h-11 min-w-0 items-center justify-between gap-1 px-1.5 text-sm text-blue-950/70 sm:gap-2 sm:px-3"}>
      <span className="whitespace-nowrap font-medium">
        Public page
        <span className="sr-only"> {enabled ? "on" : "off"}</span>
      </span>
      <Switch aria-label="Toggle public status page" checked={enabled} disabled={disabled} onCheckedChange={onCheckedChange} size="sm" />
    </div>
  );
}
