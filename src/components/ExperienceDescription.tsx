import type { ExperienceData } from "@/data/experienceData";

function Description({ description }: { description: string }) {
  const points = description.split("\n").map((point) => point.trim()).filter(Boolean);
  if (!points.length) return null;

  return (
    <ul className="space-y-2 text-[13px] leading-relaxed">
      {points.map((point, index) => (
        <li key={index} className="flex items-start gap-1.5">
          <span aria-hidden="true" className="mt-[2px] text-[14px] leading-none text-zinc-400 dark:text-zinc-500">•</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExperienceDescription({ item }: { item: ExperienceData }) {
  return (
    <div className="mb-4">
      {item.assignments?.length ? (
        <div className="space-y-4">
          {item.assignments.map((assignment) => (
            <section key={assignment.role} className="border-l border-zinc-200 pl-3 dark:border-zinc-800">
              <h3 className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">{assignment.role}</h3>
              <p className="mb-2 text-[12px] mark-muted">{assignment.dates}</p>
              <Description description={assignment.description} />
            </section>
          ))}
        </div>
      ) : (
        <Description description={item.description} />
      )}
    </div>
  );
}
