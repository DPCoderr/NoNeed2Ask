import Image from "next/image"
import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <Link className="flex items-center gap-2 font-semibold text-slate-800" href="/">
          <Image alt="" height={28} src="/logo-mark.webp" width={28} />
          NoNeed2Ask
        </Link>
        <p>A calm place for the job search.</p>
      </div>
    </footer>
  )
}
