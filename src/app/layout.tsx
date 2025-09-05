import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/Toaster";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EOR India | Employer of Record Services | MonoHR - 48 Hour Setup",
  description: "Scale your team in India in just 48 hours with MonoHR's EOR services. 40% cost savings, 100% compliance, India-first expertise. Skip 6-month entity setup. Hire top Indian talent immediately.",
  keywords: [
    "EOR India",
    "Employer of Record India", 
    "India EOR services",
    "hire in India without entity",
    "India payroll services",
    "India compliance",
    "India contractor management",
    "India employment services",
    "India HR outsourcing",
    "India talent acquisition",
    "India business setup",
    "India expansion",
    "India remote work",
    "India distributed teams"
  ],
  authors: [{ name: "MonoHR Team" }],
  creator: "MonoHR",
  publisher: "MonoHR",
  metadataBase: new URL("https://www.monohr.com"),
  alternates: {
    canonical: "https://www.monohr.com",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.monohr.com",
    siteName: "MonoHR",
    title: "EOR India | Employer of Record Services | MonoHR - 48 Hour Setup",
    description: "Scale your team in India in just 48 hours with MonoHR's EOR services. 40% cost savings, 100% compliance, India-first expertise. Skip 6-month entity setup.",
    images: [
      {
        url: "https://www.monohr.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MonoHR EOR India Services - 48 Hour Setup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EOR India | Employer of Record Services | MonoHR - 48 Hour Setup",
    description: "Scale your team in India in just 48 hours with MonoHR's EOR services. 40% cost savings, 100% compliance, India-first expertise.",
    images: ["https://www.monohr.com/og-image.jpg"],
    creator: "@monohr",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Business Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderWrapper />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
        <Toaster />
        <CookieConsent />
        <Analytics />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
