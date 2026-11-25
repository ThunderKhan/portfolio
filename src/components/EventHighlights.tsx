import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { eventHighlights } from "@/data/highlightsData";

export function EventHighlights({ archive = false }: { archive?: boolean }) {
  return (
    <div className="space-y-3">
      {eventHighlights.map((event) => {
        const photos = archive ? event.photos : event.photos.slice(0, 1);
        return (
          <article key={event.id} id={archive ? event.id : undefined} className="scroll-mt-6 overflow-hidden rounded-[6px] border mark-panel">
            {photos.length > 0 && (
              <div className={archive ? "grid grid-cols-1 gap-2 p-3 sm:grid-cols-2" : "p-3"}>
                {photos.map((photo) => (
                  <figure key={photo.src}>
                    <a href={photo.src} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] overflow-hidden rounded-[4px] bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-zinc-900">
                      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                    </a>
                    {photo.caption && <figcaption className="mt-2 text-[12px] mark-muted">{photo.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3 px-3 py-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <Camera aria-hidden="true" className="size-4 mark-gold-text" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[14px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">{event.title}</h3>
                <p className="mt-1 text-[12px] mark-muted">{event.category} · {event.photos.length ? `${event.photos.length} photos` : "Photos coming soon"}</p>
              </div>
              {!archive && <Link href={`/highlights#${event.id}`} aria-label={`View ${event.title} highlights`} className="inline-flex min-h-10 shrink-0 items-center rounded-md px-2 text-[12px] font-medium mark-control focus-visible:outline-2">View</Link>}
            </div>
          </article>
        );
      })}
      {!archive && <div className="flex justify-center pt-1"><Link href="/highlights" className="inline-flex items-center gap-1.5 rounded-[6px] border mark-surface mark-control px-4 py-2 text-[13px] font-medium transition-colors">View all highlights </Link></div>}
    </div>
  );
}
