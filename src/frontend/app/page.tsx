import { PageShell } from "@/components/layout/page-shell"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <PageShell
      eyebrow="NoNeed2Ask"
      title="Frontend foundation"
      description="The app shell is ready for the MVP feature slices, with shared providers, typed API utilities, and shadcn/ui styling in place."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {["Providers", "Layout", "Utilities"].map((item) => (
          <div
            className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
            key={item}
          >
            <h2 className="text-sm font-medium">{item}</h2>
            <Separator className="my-4" />
            <p className="text-sm leading-6 text-muted-foreground">
              Ready for feature pages without application data behavior.
            </p>
          </div>
        ))}
      </section>
    </PageShell>
  )
}
