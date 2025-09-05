import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/Toaster";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MonoHR | Employer of Record (EOR) India, Payroll & Contractors",
  description: "MonoHR helps you hire in India without an entity. EOR, India payroll & compliance, and contractor payments with scheduling and fast onboarding.",
  metadataBase: new URL("https://www.monohr.com"),
  openGraph: {
    title: "MonoHR | EOR India, Payroll & Contractors",
    description:
      "Hire in India without an entity. EOR, payroll & compliance, contractor management.",
    url: "https://www.monohr.com",
    siteName: "MonoHR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
