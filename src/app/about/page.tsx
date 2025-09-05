import type { Metadata } from "next";
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About MonoHR | India-First EOR Experts | Your Trusted Partner for Global Expansion",
  description: "Meet the MonoHR team - India-first EOR experts with 15+ years of experience. Learn how we help 500+ companies scale globally with 48-hour setup, 100% compliance, and 40% cost savings.",
  keywords: [
    "about MonoHR",
    "EOR India team",
    "India EOR experts",
    "global expansion team",
    "employer of record India",
    "India business setup experts",
    "EOR India leadership",
    "India-first EOR company",
    "global hiring experts India",
    "India expansion consultants"
  ],
  authors: [{ name: "MonoHR Team" }],
  creator: "MonoHR",
  publisher: "MonoHR",
  alternates: {
    canonical: "https://www.monohr.com/about",
  },
  openGraph: {
    title: "About MonoHR | India-First EOR Experts | Your Trusted Partner for Global Expansion",
    description: "Meet the MonoHR team - India-first EOR experts with 15+ years of experience. Learn how we help 500+ companies scale globally with 48-hour setup, 100% compliance, and 40% cost savings.",
    url: "https://www.monohr.com/about",
    siteName: "MonoHR",
    images: [
      {
        url: "https://www.monohr.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "MonoHR Team - India-First EOR Experts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About MonoHR | India-First EOR Experts",
    description: "Meet the MonoHR team - India-first EOR experts with 15+ years of experience. Learn how we help 500+ companies scale globally.",
    images: ["https://www.monohr.com/og-about.jpg"],
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

export default function AboutPage() {
  return <AboutClient />;
}