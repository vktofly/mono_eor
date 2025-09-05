import type { Metadata } from "next";
import { EorClient } from "./eor-india/EorClient";
import { loadSiteSettings } from "@/lib/config";

export const metadata: Metadata = {
  title: "EOR India | Employer of Record Services | MonoHR - 48 Hour Setup",
  description: "Scale your team in India in just 48 hours with MonoHR's EOR services. 40% cost savings, 100% compliance, India-first expertise. Skip 6-month entity setup. Hire top Indian talent immediately.",
  keywords: [
    "EOR India",
    "Employer of Record India",
    "India EOR services",
    "hire in India",
    "India expansion",
    "India business setup",
    "EOR India 48 hours",
    "India EOR compliance",
    "India talent acquisition",
    "India payroll services",
    "India employment law",
    "India contractor management",
    "India remote work",
    "India business entity",
    "India tax compliance"
  ],
  authors: [{ name: "MonoHR Team" }],
  creator: "MonoHR",
  publisher: "MonoHR",
  alternates: {
    canonical: "https://www.monohr.com",
  },
  openGraph: {
    title: "EOR India | Employer of Record Services | MonoHR - 48 Hour Setup",
    description: "Scale your team in India in just 48 hours with MonoHR's EOR services. 40% cost savings, 100% compliance, India-first expertise. Skip 6-month entity setup. Hire top Indian talent immediately.",
    url: "https://www.monohr.com",
    siteName: "MonoHR",
    images: [
      {
        url: "https://www.monohr.com/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "MonoHR EOR India - 48 Hour Setup, 40% Cost Savings",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EOR India | MonoHR - 48 Hour Setup",
    description: "Scale your team in India in just 48 hours with MonoHR's EOR services. 40% cost savings, 100% compliance, India-first expertise.",
    images: ["https://www.monohr.com/og-home.jpg"],
    creator: "@monohr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function Home() {
  const settings = await loadSiteSettings();
  return <EorClient calendlyUrl={settings.calendlyUrl} />;
}
