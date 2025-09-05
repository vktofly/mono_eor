"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return;

    const measurePerformance = () => {
      // Core Web Vitals
      if ("web-vital" in window) {
        // This would require the web-vitals library
        // For now, we'll use basic performance API
      }

      // Basic performance metrics
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const metrics = {
          // First Contentful Paint
          fcp: navigation.domContentLoadedEventEnd - navigation.navigationStart,
          // Largest Contentful Paint (approximation)
          lcp: navigation.loadEventEnd - navigation.navigationStart,
          // Time to Interactive (approximation)
          tti: navigation.domInteractive - navigation.navigationStart,
          // Total Blocking Time (approximation)
          tbt: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        };

        // Track performance metrics
        trackEvent("performance_metrics", {
          fcp: Math.round(metrics.fcp),
          lcp: Math.round(metrics.lcp),
          tti: Math.round(metrics.tti),
          tbt: Math.round(metrics.tbt),
          url: window.location.pathname,
        });

        // Log slow pages
        if (metrics.lcp > 2500) {
          trackEvent("slow_page_detected", {
            lcp: Math.round(metrics.lcp),
            url: window.location.pathname,
          });
        }
      }

      // Memory usage (if available)
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        trackEvent("memory_usage", {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
        });
      }
    };

    // Measure after page load
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
    }

    // Measure on route changes (for SPA behavior)
    const handleRouteChange = () => {
      setTimeout(measurePerformance, 1000);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("load", measurePerformance);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return null; // This component doesn't render anything
}
