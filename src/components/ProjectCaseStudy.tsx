import type { EngineeringCaseStudy } from "@/data/engineeringCaseStudies";

const body = "text-[14px] sm:text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300";
const heading = "mark-section-title mb-3";

export function ProjectCaseStudy({ study }: { study: EngineeringCaseStudy }) {
  return (
    <div data-engineering-case-study className="space-y-8 mt-8">
      <section aria-labelledby="study-principle">
        <h2 id="study-principle" className={heading}>Design principle</h2>
        <p className="text-[16px] sm:text-[18px] leading-relaxed font-medium">{study.premise}</p>
        <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 border-y divide-y sm:divide-y-0 sm:divide-x border-[var(--mark-seam)] divide-[var(--mark-seam)]">
          {study.facts.map(fact => (
            <div key={fact.label} className="flex flex-col gap-1 py-3 sm:px-4 sm:first:pl-0">
              <dt className="order-2 text-xs leading-relaxed mark-muted">{fact.label}</dt>
              <dd className="font-mono tabular-nums text-[25px] font-semibold mark-gold-text">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section aria-labelledby="study-architecture">
        <h2 id="study-architecture" className={heading}>How it works</h2>
        <ol className="border-l border-[var(--mark-seam)] ml-3 space-y-5">
          {study.flow.map((step, index) => (
            <li key={step.title} className="relative pl-6">
              <span aria-hidden="true" className="absolute -left-[11px] top-0 flex size-5 items-center justify-center rounded-full border border-[var(--mark-seam)] mark-surface font-mono text-[10px] mark-reactor-text">{index + 1}</span>
              <h3 className="text-[14px] font-semibold mb-1">{step.title}</h3>
              <p className={body}>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="study-decisions">
        <h2 id="study-decisions" className={heading}>Engineering decisions</h2>
        <dl className="divide-y divide-[var(--mark-seam)]">
          {study.decisions.map(decision => (
            <div key={decision.title} className="py-4 first:pt-0 last:pb-0">
              <dt className="text-[14px] font-semibold mb-1">{decision.title}</dt>
              <dd className={body}>{decision.detail}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section aria-labelledby="study-evidence">
        <h2 id="study-evidence" className={heading}>Verification and evidence</h2>
        <p className={body}>{study.verification}</p>
        <ul className="mt-3 space-y-1">
          {study.sources.map(source => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center text-[13px] mark-reactor-text underline underline-offset-4">{source.label}</a>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="study-limits">
        <h2 id="study-limits" className={heading}>Scope and limitations</h2>
        <p className={body}>{study.limitations}</p>
      </section>
    </div>
  );
}
