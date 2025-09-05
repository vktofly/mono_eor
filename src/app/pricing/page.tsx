import type { Metadata } from "next";
import PricingClient from './Pricingclient';

export const metadata: Metadata = {
  title: "EOR India Pricing | Transparent Costs | MonoHR - No Hidden Fees",
  description: "Get transparent EOR India pricing with MonoHR. Starting from $199/month per employee. No setup fees, no hidden costs. Compare our plans and see how you can save 40% on India expansion.",
  keywords: [
    "EOR India pricing",
    "employer of record India cost",
    "India EOR fees",
    "EOR India pricing plans",
    "India expansion cost",
    "hire in India pricing",
    "EOR India rates",
    "India EOR pricing comparison",
    "employer of record India price",
    "India EOR cost calculator"
  ],
  authors: [{ name: "MonoHR Team" }],
  creator: "MonoHR",
  publisher: "MonoHR",
  alternates: {
    canonical: "https://www.monohr.com/pricing",
  },
  openGraph: {
    title: "EOR India Pricing | Transparent Costs | MonoHR - No Hidden Fees",
    description: "Get transparent EOR India pricing with MonoHR. Starting from $199/month per employee. No setup fees, no hidden costs. Compare our plans and see how you can save 40% on India expansion.",
    url: "https://www.monohr.com/pricing",
    siteName: "MonoHR",
    images: [
      {
        url: "https://www.monohr.com/og-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "MonoHR EOR India Pricing - Transparent Costs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EOR India Pricing | Transparent Costs | MonoHR",
    description: "Get transparent EOR India pricing with MonoHR. Starting from $199/month per employee. No setup fees, no hidden costs.",
    images: ["https://www.monohr.com/og-pricing.jpg"],
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

export default function PricingPage() {
  return <PricingClient />;
}