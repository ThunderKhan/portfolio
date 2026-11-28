"use client";
import { useEffect } from "react";

let announced = false;
export function DeveloperClue() {
  useEffect(() => {
    if (announced) return;
    announced = true;
    console.info("%c  .---.\n / (△) \\\n \\     /\n  '---'\nMARK I", "color:#67C7EB;font-family:monospace");
    console.info("Curious engineers: Ctrl/Cmd+K. The reactor has another function.");
  }, []);
  return null;
}
