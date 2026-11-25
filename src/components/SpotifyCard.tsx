import { ArrowUpRight } from "lucide-react";
import { featuredTrack } from "@/data/featuredTrack";

export function SpotifyCard() {
  const { title, artist, spotifyId } = featuredTrack;
  return (
    <div className="overflow-hidden rounded-[8px] border border-black/10 bg-zinc-50 p-2.5 dark:border-white/10 dark:bg-[#09090b]">
      <iframe
        title={`Spotify player: ${title} by ${artist}`}
        src={`https://open.spotify.com/embed/track/${spotifyId}?theme=0`}
        width="100%"
        height={152}
        loading="lazy"
        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className="block w-full rounded-[6px] border-0"
      />
      <div className="flex items-center justify-end px-1 pt-2">
        <a href={`https://open.spotify.com/track/${spotifyId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded py-1 text-[12px] text-zinc-600 underline-offset-4 hover:underline focus-visible:outline-2 dark:text-zinc-400">
          Open in Spotify <ArrowUpRight aria-hidden="true" className="size-3" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
