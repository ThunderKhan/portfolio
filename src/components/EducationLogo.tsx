"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

/** Optional owner-supplied logo; retain the original icon if it cannot load. */
export function EducationLogo({ src, children }: { src: string; children: ReactNode }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  return (
    <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {failedSrc === src ? children : (
        <Image
          src={src}
          alt=""
          width={40}
          height={40}
          unoptimized
          className="size-full rounded-[8px] bg-white object-contain p-1"
          onError={() => setFailedSrc(src)}
        />
      )}
    </span>
  );
}
