import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact MonoHR | Get Your Free India Expansion Plan | EOR Services",
  description: "Ready to scale your team in India? Get your free consultation and see how we can help you hire in India in just 48 hours. Contact our EOR experts today.",
  keywords: [
    "contact EOR India",
    "India expansion consultation", 
    "EOR India quote",
    "hire in India consultation",
    "India business setup help",
    "EOR India contact form"
  ],
  openGraph: {
    title: "Contact MonoHR | Get Your Free India Expansion Plan",
    description: "Ready to scale your team in India? Get your free consultation and see how we can help you hire in India in just 48 hours.",
    url: "https://www.monohr.com/contact",
  },
  alternates: {
    canonical: "https://www.monohr.com/contact",
  },
};

export default function Contact() {
  return <ContactPage />;
}


