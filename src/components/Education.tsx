import { ChevronDown, GraduationCap } from "lucide-react";
import { education } from "@/data/educationData";

const resultDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
});

export function Education() {
  return (
    <div className="relative pb-2 pt-6">
      <article className="relative rounded-[6px] border border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-[#09090b]">
        <div className="flex items-start gap-3 px-4 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <GraduationCap aria-hidden="true" className="size-5 text-[#B97D10]" />
          </span>
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
            <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-[#6A0C0B] dark:text-[#FBCA03]">{education.cgpa.toFixed(2)}</dd>
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
                  <ChevronDown aria-hidden="true" className="size-4 motion-safe:transition-transform group-open:rotate-180" />
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
    </div>
  );
}
