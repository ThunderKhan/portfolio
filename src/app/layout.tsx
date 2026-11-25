import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { portfolio } from "~/portfolio.config";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlow = Barlow_Semi_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: portfolio.name,
  description: portfolio.description,
  ...(portfolio.referencePreview ? { robots: { index: false, follow: false } } : {}),
  openGraph: {
    title: portfolio.name,
    description: portfolio.tagline,
    url: SITE_URL,
    siteName: portfolio.name,
    type: "website",
  },
  ...(portfolio.googleSiteVerification
    ? { verification: { google: portfolio.googleSiteVerification } }
    : {}),
  twitter: {
    card: "summary_large_image",
    title: portfolio.name,
    description: portfolio.tagline,
    ...(portfolio.handles.x ? { site: `@${portfolio.handles.x}`, creator: `@${portfolio.handles.x}` } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark:bg-black dark:text-zinc-50 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
