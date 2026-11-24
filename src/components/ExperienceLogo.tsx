"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ExperienceLogoProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  fallbackSrc?: string;
};

/** Keep the supplied logo in full color; use the local monogram until it exists. */
export function ExperienceLogo({ src, fallbackSrc, ...props }: ExperienceLogoProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const useFallback = failedSrc === src && Boolean(fallbackSrc);

  return (
    <Image
      {...props}
      src={useFallback ? fallbackSrc! : src}
      onError={() => {
        if (!useFallback && fallbackSrc) setFailedSrc(src);
      }}
    />
  );
}
