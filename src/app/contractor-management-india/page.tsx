import type { Metadata } from "next";
import ContractorClient from './ContractorClient';

export const metadata: Metadata = {
  title: "Contractor Management India | Hire & Manage Indian Contractors | MonoHR",
  description: "Streamline contractor management in India with MonoHR. Hire, onboard, and manage Indian contractors with 100% compliance. Fast setup, transparent pricing, and local expertise.",
  keywords: [
    "contractor management India",
    "hire contractors India",
    "India contractor management",
    "manage Indian contractors",
    "contractor onboarding India",
    "India contractor compliance",
    "contractor payroll India",
    "India contractor services",
    "contractor management platform India",
    "hire Indian contractors"
  ],
  authors: [{ name: "MonoHR Team" }],
  creator: "MonoHR",
  publisher: "MonoHR",
  alternates: {
    canonical: "https://www.monohr.com/contractor-management-india",
  },
  openGraph: {
    title: "Contractor Management India | Hire & Manage Indian Contractors | MonoHR",
    description: "Streamline contractor management in India with MonoHR. Hire, onboard, and manage Indian contractors with 100% compliance. Fast setup, transparent pricing, and local expertise.",
    url: "https://www.monohr.com/contractor-management-india",
    siteName: "MonoHR",
    images: [
      {
        url: "https://www.monohr.com/og-contractor-management.jpg",
        width: 1200,
        height: 630,
        alt: "MonoHR Contractor Management India - Hire & Manage Indian Contractors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contractor Management India | MonoHR",
    description: "Streamline contractor management in India with MonoHR. Hire, onboard, and manage Indian contractors with 100% compliance.",
    images: ["https://www.monohr.com/og-contractor-management.jpg"],
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

export default function ContractorManagementPage() {
  return <ContractorClient />;
}