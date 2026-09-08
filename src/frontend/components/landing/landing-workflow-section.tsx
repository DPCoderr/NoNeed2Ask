const workflowSteps = [
  {
    lead: "Add your",
    emphasis: "applications",
    description: "Save the company, role, and where you are in the process.",
  },
  {
    lead: "Keep your",
    emphasis: "progress updated",
    description: "Change a status or add a note as your search moves forward.",
  },
  {
    lead: "Share your",
    emphasis: "status link",
    description: "Turn on your public page and send the link to friends and family.",
  },
]

export function LandingWorkflowSection() {
  return (
    <section aria-labelledby="workflow-heading" className="scroll-mt-28 border-b border-slate-200/80 bg-white px-5 py-16 sm:px-8 sm:py-20" id="dashboard">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold tracking-[-0.035em] text-[#102b46] sm:text-4xl" id="workflow-heading">
          How it works
        </h2>
        <ol className="mx-auto mt-12 grid max-w-md gap-14 md:mt-16 md:max-w-none md:grid-cols-3 md:gap-12">
          {workflowSteps.map(({ description, lead, emphasis }, index) => (
            <li className="relative grid grid-cols-[2.75rem_1fr] gap-x-5 md:block md:text-center" key={emphasis}>
              <span className="flex size-10 items-center justify-center rounded-full border border-[#b8ccd9] text-sm font-medium tabular-nums text-primary md:mx-auto">
                <span className="sr-only">Step </span>0{index + 1}
              </span>
              <div className="min-w-0 md:mt-6">
                <h3 className="text-xl font-semibold leading-snug tracking-[-0.025em] text-[#102b46] lg:text-2xl">
                  <span className="block">{lead}{" "}</span>
                  <span className="relative inline-block text-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:-rotate-2 after:bg-[#7aa6be]">
                    {emphasis}
                  </span>
                </h3>
                <p className="mt-4 max-w-[17rem] text-sm leading-6 text-slate-600 md:mx-auto">{description}</p>
              </div>
              {index < workflowSteps.length - 1 && (
                <>
                  <svg aria-hidden="true" className="pointer-events-none absolute -top-2 left-[calc(50%+2.25rem)] hidden h-12 w-[calc(100%-1.5rem)] text-[#7aa6be] md:block" fill="none" preserveAspectRatio="none" viewBox="0 0 240 48">
                    <path d="M2 28C62 0 176 0 236 28M229 18L236 28L224 29" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <svg aria-hidden="true" className="pointer-events-none absolute left-1 top-14 h-[calc(100%-0.5rem)] w-8 text-[#7aa6be] md:hidden" fill="none" preserveAspectRatio="none" viewBox="0 0 32 100">
                    <path d="M16 2C2 36 30 64 16 98M10 90L16 98L23 91" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
                  </svg>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
