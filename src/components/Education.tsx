"use client";

import { useId, useState, type ReactNode } from "react";
import { BookOpen, GraduationCap } from "lucide-react";
import { DisclosureChevron } from "@/components/DisclosureChevron";
import { education, learningPrograms } from "@/data/educationData";
import { EducationLogo } from "@/components/EducationLogo";

const resultDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
});

/** Independent disclosures preserve the original education interaction model. */
function EducationDisclosure({ trigger, children, className, buttonClassName }: {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  buttonClassName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  return (
    <div className={className}>
      <button type="button" aria-expanded={isOpen} aria-controls={panelId}
        onClick={() => setIsOpen(value => !value)}
        className={buttonClassName}>
        {trigger}
        <DisclosureChevron open={isOpen} />
      </button>
      <div id={panelId} inert={!isOpen} aria-hidden={!isOpen} className="mark-disclosure-panel">
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function Education() {
  return (
    <div className="relative pb-2 pt-6">
      <article className="relative rounded-[6px] border mark-panel mark-achievement">
        <div className="flex items-start gap-3 px-4 py-4">
          <EducationLogo src={education.logo}>
            <GraduationCap aria-hidden="true" className="size-5 mark-gold-text" />
          </EducationLogo>
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold leading-snug text-zinc-900 dark:text-zinc-100">{education.school}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">{education.degree}</p>
            <p className="mt-1 text-[12px] leading-relaxed mark-muted">{education.department}</p>
            <p className="mt-1 text-[12px] mark-muted">{education.dates} · {education.location}</p>
          </div>
        </div>
        <dl className="grid grid-cols-3 divide-x divide-zinc-200 border-y border-dashed border-zinc-300 py-3 dark:divide-zinc-800 dark:border-zinc-800">
          <div className="min-w-0 px-2 text-center">
            <dt className="text-[11px] text-zinc-600 dark:text-zinc-400">CGPA</dt>
            <dd className="mt-1 font-mono text-xl font-semibold tabular-nums mark-gold-text">{education.cgpa.toFixed(2)}</dd>
            <dd className="text-[10px] mark-muted">Out of 10</dd>
          </div>
          {education.semesters.map((semester) => (
            <div key={semester.semester} className="min-w-0 px-2 text-center">
              <dt className="text-[11px] text-zinc-600 dark:text-zinc-400">Semester {semester.semester === 1 ? "I" : "II"}</dt>
              <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{semester.sgpa.toFixed(2)}</dd>
              <dd className="text-[10px] mark-muted">SGPA / 10</dd>
            </div>
          ))}
        </dl>
        <div className="px-4">
          {education.semesters.map((semester) => (
            <EducationDisclosure key={semester.semester} className="border-b border-dashed border-zinc-200 last:border-b-0 dark:border-zinc-800"
              buttonClassName="flex w-full cursor-pointer items-center gap-2 rounded py-3 text-left text-[13px] font-medium text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-zinc-300"
              trigger={<>
                <span className="flex-1">Semester {semester.semester === 1 ? "I" : "II"} coursework</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="text-[11px] font-normal mark-muted">{semester.result}</span>
                </span>
              </>}>
              <ul className="mb-3 flex flex-wrap gap-1.5">
                {semester.coursework.map((course) => (
                  <li key={course} className="rounded-[4px] border border-zinc-200 px-2 py-1 text-[12px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">{course}</li>
                ))}
              </ul>
              <p className="pb-3 text-[11px] mark-muted">Result declared {resultDate.format(new Date(semester.declaredOn + "T00:00:00Z"))}</p>
            </EducationDisclosure>
          ))}
        </div>
      </article>

      <div className="mt-5">
        <h3 className="mb-3 text-[12px] font-semibold text-zinc-600 dark:text-zinc-400">Additional learning programs</h3>
        <div className="space-y-3">
          {learningPrograms.map((program) => (
            <article key={program.id} className="rounded-[6px] border mark-panel">
              <EducationDisclosure buttonClassName="flex w-full cursor-pointer items-start gap-3 rounded-[6px] px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                trigger={<>
                  <EducationLogo src={program.logo}>
                    <BookOpen aria-hidden="true" className="size-5 mark-gold-text" />
                  </EducationLogo>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-bold leading-snug text-zinc-900 dark:text-zinc-100">{program.provider}</span>
                    <span className="mt-1 block text-[13px] text-zinc-700 dark:text-zinc-300">{program.name}</span>
                    <span className="mt-1 block text-[11px] leading-relaxed mark-muted">{program.period} · {program.format}</span>
                    <span className="mt-1 block text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{program.status}</span>
                  </span>
                </>}>
                <div className="border-t border-dashed border-zinc-200 px-4 py-3 dark:border-zinc-800">
                  <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{program.description}</p>
                  <p className="mt-3 text-[11px] font-medium mark-muted">Published curriculum</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {program.topics.map((topic) => (
                      <li key={topic} className="rounded-[4px] border border-zinc-200 px-2 py-1 text-[12px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">{topic}</li>
                    ))}
                  </ul>
                  <a href={program.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-zinc-600 underline decoration-dotted underline-offset-4 dark:text-zinc-300">Official curriculum <span className="sr-only"> (opens in a new tab)</span></a>
                </div>
              </EducationDisclosure>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
