"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Music, Play, X } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { featuredTrack } from "@/data/featuredTrack";

export function SpotifyCard() {
  const { title, artist, spotifyId, cover } = featuredTrack;
  const [coverFailed, setCoverFailed] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const trackUrl = `https://open.spotify.com/track/${spotifyId}`;

  return (
    <article className="overflow-hidden rounded-[8px] border mark-panel p-3">
      <div id="featured-music-player">
      {showPlayer ? (
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
      ) : (
        <div className="flex items-center gap-3">
          <div className="relative grid size-[80px] shrink-0 place-items-center overflow-hidden rounded-[6px] bg-zinc-100 dark:bg-zinc-900">
            {coverFailed ? (
              <Music aria-hidden="true" className="size-6 text-zinc-500" />
            ) : (
              <Image src={cover} alt="" width={160} height={160} unoptimized className="size-full object-contain" onError={() => setCoverFailed(true)} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{artist}</p>
            {!coverFailed && <p className="mt-1 text-[11px] leading-snug mark-muted">Alternate artwork</p>}
          </div>
          <SiSpotify aria-hidden="true" className="size-5 shrink-0 text-[#16833e] dark:text-[#1ED760]" />
        </div>
      )}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={showPlayer}
          aria-controls="featured-music-player"
          onClick={() => setShowPlayer(value => !value)}
          className="inline-flex min-h-10 items-center gap-2 rounded-[6px] border mark-surface mark-control px-3 text-[12px] font-medium focus-visible:outline-2"
        >
          {showPlayer ? <X aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          {showPlayer ? "Close player" : "Listen here"}
        </button>
        <a href={trackUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 rounded text-[12px] font-medium text-zinc-700 underline decoration-dotted underline-offset-4 focus-visible:outline-2 dark:text-zinc-300">
          Open in Spotify <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      {showPlayer && <p className="mt-2 text-[11px] leading-relaxed mark-muted">Press play in the player. Spotify may provide a preview.</p>}
    </article>
  );
}
