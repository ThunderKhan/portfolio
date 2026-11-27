import { archiveMetadata } from "@/lib/seo";

export const metadata = archiveMetadata("/experience");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
