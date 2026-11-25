import { BookOpen, GraduationCap } from "lucide-react";
import { education, learningPrograms } from "@/data/educationData";
import { EducationLogo } from "@/components/EducationLogo";

const resultDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
});

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
            <p className="mt-1 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">{education.department}</p>
            <p className="mt-1 text-[12px] text-zinc-500 dark:text-zinc-400">{education.dates} · {education.location}</p>
          </div>
        </div>
        <dl className="grid grid-cols-3 divide-x divide-zinc-200 border-y border-dashed border-zinc-300 py-3 dark:divide-zinc-800 dark:border-zinc-800">
          <div className="min-w-0 px-2 text-center">
            <dt className="text-[11px] text-zinc-600 dark:text-zinc-400">CGPA</dt>
            <dd className="mt-1 font-mono text-xl font-semibold tabular-nums mark-gold-text">{education.cgpa.toFixed(2)}</dd>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Out of 10</p>
          </div>
          {education.semesters.map((semester) => (
            <div key={semester.semester} className="min-w-0 px-2 text-center">
              <dt className="text-[11px] text-zinc-600 dark:text-zinc-400">Semester {semester.semester === 1 ? "I" : "II"}</dt>
              <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{semester.sgpa.toFixed(2)}</dd>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">SGPA / 10</p>
            </div>
          ))}
        </dl>
        <div className="px-4">
          {education.semesters.map((semester) => (
            <details key={semester.semester} className="group border-b border-dashed border-zinc-200 last:border-b-0 dark:border-zinc-800">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded py-3 text-[13px] font-medium text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-zinc-300 [&::-webkit-details-marker]:hidden">
                <span>Semester {semester.semester === 1 ? "I" : "II"} coursework</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="text-[11px] font-normal text-zinc-500 dark:text-zinc-400">{semester.result}</span>
                  <span aria-hidden="true" className="inline-block w-4 shrink-0 text-center font-mono mark-muted"><span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span></span>
                </span>
              </summary>
              <ul className="mb-3 flex flex-wrap gap-1.5">
                {semester.coursework.map((course) => (
                  <li key={course} className="rounded-[4px] border border-zinc-200 px-2 py-1 text-[12px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">{course}</li>
                ))}
              </ul>
              <p className="pb-3 text-[11px] text-zinc-500 dark:text-zinc-400">Result declared {resultDate.format(new Date(semester.declaredOn + "T00:00:00Z"))}</p>
            </details>
          ))}
        </div>
      </article>

      <div className="mt-5">
        <h3 className="mb-3 text-[12px] font-semibold text-zinc-600 dark:text-zinc-400">Additional learning programs</h3>
        <div className="space-y-3">
          {learningPrograms.map((program) => (
            <article key={program.id} className="rounded-[6px] border mark-panel">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start gap-3 rounded-[6px] px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
                  <EducationLogo src={program.logo}>
                    <BookOpen aria-hidden="true" className="size-5 mark-gold-text" />
                  </EducationLogo>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-bold leading-snug text-zinc-900 dark:text-zinc-100">{program.provider}</span>
                    <span className="mt-1 block text-[13px] text-zinc-700 dark:text-zinc-300">{program.name}</span>
                    <span className="mt-1 block text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">{program.period} · {program.format}</span>
                    <span className="mt-1 block text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{program.status}</span>
                  </span>
                  <span aria-hidden="true" className="inline-block w-4 shrink-0 text-center font-mono mark-muted"><span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span></span>
                </summary>
                <div className="border-t border-dashed border-zinc-200 px-4 py-3 dark:border-zinc-800">
                  <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{program.description}</p>
                  <p className="mt-3 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Published curriculum</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {program.topics.map((topic) => (
                      <li key={topic} className="rounded-[4px] border border-zinc-200 px-2 py-1 text-[12px] text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">{topic}</li>
                    ))}
                  </ul>
                  <a href={program.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-zinc-600 underline decoration-dotted underline-offset-4 dark:text-zinc-300">Official curriculum <span className="sr-only"> (opens in a new tab)</span></a>
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
