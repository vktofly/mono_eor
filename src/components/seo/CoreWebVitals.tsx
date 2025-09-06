"use client";

import { useEffect } from 'react';

interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

export function CoreWebVitals() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Function to send metrics to analytics
    const sendToAnalytics = (metric: WebVitalMetric) => {
      // Send to Google Analytics 4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
          custom_map: {
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta,
          },
        });
      }

      // Send to custom analytics endpoint
      if (typeof window !== 'undefined' && window.fetch) {
        fetch('/api/analytics/web-vitals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: metric.name,
            value: metric.value,
            delta: metric.delta,
            id: metric.id,
            navigationType: metric.navigationType,
            url: window.location.href,
            timestamp: Date.now(),
          }),
        }).catch(console.error);
      }
    };

    // Function to get CLS (Cumulative Layout Shift)
    const getCLS = (onPerfEntry: (metric: WebVitalMetric) => void) => {
      let clsValue = 0;
      let clsEntries: PerformanceEntry[] = [];
      let sessionValue = 0;
      let sessionEntries: PerformanceEntry[] = [];

      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Only count layout shifts without recent user input.
          if (!(entry as any).hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            // If the entry occurred less than 1 second after the previous entry
            // and less than 5 seconds after the first entry in the session,
            // include the entry in the current session. Otherwise, start a new session.
            if (
              sessionValue &&
              entry.startTime - (lastSessionEntry as any).startTime < 1000 &&
              entry.startTime - (firstSessionEntry as any).startTime < 5000
            ) {
              sessionValue += (entry as any).value;
              sessionEntries.push(entry);
            } else {
              sessionValue = (entry as any).value;
              sessionEntries = [entry];
            }

            // If the current session value is larger than the current CLS value,
            // update CLS and its entries.
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              clsEntries = [...sessionEntries];
            }
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });

      // Report CLS when the page is hidden
      const reportCLS = () => {
        if (clsValue > 0) {
          onPerfEntry({
            name: 'CLS',
            value: clsValue,
            delta: clsValue,
            id: 'cls-' + Date.now(),
            navigationType: 'navigate',
          });
        }
      };

      // Report CLS on page visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportCLS();
        }
      });

      // Report CLS on page unload
      window.addEventListener('beforeunload', reportCLS);
    };

    // Function to get FID (First Input Delay)
    const getFID = (onPerfEntry: (metric: WebVitalMetric) => void) => {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime;
          onPerfEntry({
            name: 'FID',
            value: fid,
            delta: fid,
            id: 'fid-' + Date.now(),
            navigationType: 'navigate',
          });
        }
      }).observe({ type: 'first-input', buffered: true });
    };

    // Function to get FCP (First Contentful Paint)
    const getFCP = (onPerfEntry: (metric: WebVitalMetric) => void) => {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            onPerfEntry({
              name: 'FCP',
              value: entry.startTime,
              delta: entry.startTime,
              id: 'fcp-' + Date.now(),
              navigationType: 'navigate',
            });
          }
        }
      }).observe({ type: 'paint', buffered: true });
    };

    // Function to get LCP (Largest Contentful Paint)
    const getLCP = (onPerfEntry: (metric: WebVitalMetric) => void) => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        onPerfEntry({
          name: 'LCP',
          value: lastEntry.startTime,
          delta: lastEntry.startTime,
          id: 'lcp-' + Date.now(),
          navigationType: 'navigate',
        });
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    };

    // Function to get TTFB (Time to First Byte)
    const getTTFB = (onPerfEntry: (metric: WebVitalMetric) => void) => {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'navigation') {
            const ttfb = (entry as any).responseStart - (entry as any).requestStart;
            onPerfEntry({
              name: 'TTFB',
              value: ttfb,
              delta: ttfb,
              id: 'ttfb-' + Date.now(),
              navigationType: 'navigate',
            });
          }
        }
      }).observe({ type: 'navigation', buffered: true });
    };

    // Initialize all Core Web Vitals measurements
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);

    // Additional performance monitoring
    const monitorPerformance = () => {
      // Monitor long tasks
      if ('PerformanceObserver' in window) {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration + 'ms');
              // Send to analytics
              if (window.gtag) {
                window.gtag('event', 'long_task', {
                  event_category: 'Performance',
                  value: Math.round(entry.duration),
                  non_interaction: true,
                });
              }
            }
          }
        }).observe({ entryTypes: ['longtask'] });
      }

      // Monitor memory usage
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
          console.warn('High memory usage detected:', memory.usedJSHeapSize / 1024 / 1024 + 'MB');
        }
      }
    };

    monitorPerformance();
  }, []);

  return null; // This component doesn't render anything
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
