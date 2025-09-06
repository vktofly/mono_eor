import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/Toaster";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";
import { CoreWebVitals } from "@/components/seo/CoreWebVitals";
import { CriticalCSS } from "@/components/optimized/CriticalCSS";
import { ResourcePreloader } from "@/components/optimized/CriticalCSS";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { PerformanceMonitor } from "@/components/optimized/PerformanceMonitor";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { AccessibilityToolbar } from "@/components/accessibility/AccessibilityToolbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "monospace"],
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
  other: {
    // Performance optimizations
    "format-detection": "telephone=no",
    "theme-color": "#2155CD",
    "color-scheme": "light",
    // Preload critical resources
    "dns-prefetch": "//fonts.googleapis.com",
    "preconnect": "https://fonts.gstatic.com",
  },
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
               <CriticalCSS />
               <ResourcePreloader />
               {/* Preload critical resources */}
               <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
               <link rel="preload" href="/fonts/geist-mono.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
               {/* DNS prefetch for external resources */}
               <link rel="dns-prefetch" href="//www.google-analytics.com" />
               <link rel="dns-prefetch" href="//www.googletagmanager.com" />
               <link rel="dns-prefetch" href="//fonts.googleapis.com" />
               <link rel="dns-prefetch" href="//fonts.gstatic.com" />
               {/* PWA Manifest */}
               <link rel="manifest" href="/manifest.json" />
               <meta name="theme-color" content="#2155CD" />
               <meta name="apple-mobile-web-app-capable" content="yes" />
               <meta name="apple-mobile-web-app-status-bar-style" content="default" />
               <meta name="apple-mobile-web-app-title" content="MonoHR" />
               <link rel="apple-touch-icon" href="/icon-192x192.png" />
             </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AccessibilityProvider>
          {/* Skip Link for Screen Readers */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          
          <HeaderWrapper />
          <main id="main-content" className="pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
          <Toaster />
          <CookieConsent />
          <Analytics />
                 <PerformanceMonitor />
                 <CoreWebVitals />
                 <AccessibilityToolbar />
                 <ExitIntentPopup />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
