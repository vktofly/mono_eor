import type { Metadata } from "next";
import { ABTestDashboard } from "@/components/ab-testing/ABTestDashboard";

export const metadata: Metadata = {
  title: "A/B Testing Dashboard | MonoHR - Conversion Optimization",
  description: "Monitor and analyze A/B test results for your EOR India website. Track conversion rates, statistical significance, and optimize your marketing campaigns.",
  robots: {
    index: false, // Don't index the dashboard
    follow: false,
  },
};

export default function ABTestingPage() {
  return <ABTestDashboard />;
}
