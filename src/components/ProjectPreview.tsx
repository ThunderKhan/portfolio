"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ProjectPreviewProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  projectTitle: string;
};

/** A missing screenshot must never be replaced by another project's image. */
export function ProjectPreview({ src, projectTitle, ...props }: ProjectPreviewProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-zinc-100 px-3 text-center dark:bg-zinc-900">
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">{projectTitle}</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Project screenshot pending</span>
      </div>
    );
  }

  return <Image {...props} src={src} onError={() => setFailedSrc(src)} />;
}
