"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Music } from "lucide-react";
import { featuredTrack } from "@/data/featuredTrack";

export function SpotifyCard() {
  const { title, artist, spotifyId, cover } = featuredTrack;
  const [coverFailed, setCoverFailed] = useState(false);

  return (
    <article className="overflow-hidden rounded-[8px] border border-black/10 bg-zinc-50 p-3 dark:border-white/10 dark:bg-[#09090b]">
      <div className="flex items-center gap-3 pb-3">
        <div className="relative grid size-[76px] shrink-0 place-items-center overflow-hidden rounded-[6px] border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          {coverFailed ? (
            <Music aria-hidden="true" className="size-6 text-zinc-500" />
          ) : (
            <Image
              src={cover}
              alt=""
              width={152}
              height={152}
              unoptimized
              className="size-full object-contain"
              onError={() => setCoverFailed(true)}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
          <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{artist}</p>
          {!coverFailed && <p className="mt-1 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">Alternate artwork · Larkinn Remix</p>}
        </div>
      </div>
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
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-2">
        <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">Spotify may play a preview. Adjust device volume before listening.</p>
        <a href={`https://open.spotify.com/track/${spotifyId}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1 rounded text-[12px] font-medium text-zinc-700 underline decoration-dotted underline-offset-4 focus-visible:outline-2 dark:text-zinc-300">
          Open in Spotify <ArrowUpRight aria-hidden="true" className="size-3" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
