import { archiveMetadata } from "@/lib/seo";

export const metadata = archiveMetadata("/contact");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
