import type { Metadata } from "next";
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: "EOR India Resources | Guides, Templates & Insights | MonoHR Knowledge Hub",
  description: "Access comprehensive EOR India resources from MonoHR. Get guides, templates, compliance checklists, and expert insights to navigate India expansion successfully. Free downloads available.",
  keywords: [
    "EOR India resources",
    "India expansion guides",
    "EOR India templates",
    "India hiring resources",
    "EOR India compliance guides",
    "India business setup resources",
    "EOR India checklists",
    "India expansion templates",
    "EOR India knowledge hub",
    "India hiring guides"
  ],
  authors: [{ name: "MonoHR Team" }],
  creator: "MonoHR",
  publisher: "MonoHR",
  alternates: {
    canonical: "https://www.monohr.com/resources",
  },
  openGraph: {
    title: "EOR India Resources | Guides, Templates & Insights | MonoHR Knowledge Hub",
    description: "Access comprehensive EOR India resources from MonoHR. Get guides, templates, compliance checklists, and expert insights to navigate India expansion successfully. Free downloads available.",
    url: "https://www.monohr.com/resources",
    siteName: "MonoHR",
    images: [
      {
        url: "https://www.monohr.com/og-resources.jpg",
        width: 1200,
        height: 630,
        alt: "MonoHR EOR India Resources - Guides, Templates & Insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EOR India Resources | MonoHR Knowledge Hub",
    description: "Access comprehensive EOR India resources from MonoHR. Get guides, templates, compliance checklists, and expert insights.",
    images: ["https://www.monohr.com/og-resources.jpg"],
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

export default function ResourcesPage() {
  return <ResourcesClient />;
}