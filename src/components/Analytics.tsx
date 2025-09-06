"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytics';
import { hotjar } from '@/lib/hotjar';
import { calendly } from '@/lib/calendly';
import { getAnalyticsConfig } from '@/lib/config';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const config = getAnalyticsConfig();

    // Initialize Google Analytics 4
    if (config.ga4MeasurementId) {
      analytics.initializeGA4(config.ga4MeasurementId);
    }

    // Initialize Google Tag Manager
    if (config.gtmId) {
      analytics.initializeGTM(config.gtmId);
    }

    // Initialize Hotjar
    if (config.hotjarId) {
      hotjar.initializeHotjar(config.hotjarId, config.hotjarVersion);
    }

    // Setup Calendly event handlers
    calendly.setupCalendlyEventHandlers();

    // Track page view on initial load
    analytics.trackPageView(window.location.href);
    hotjar.trackPageView(pathname);

  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      analytics.trackPageView(window.location.href, document.title);
      hotjar.trackPageView(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track milestone scroll depths
        if (scrollPercent >= 25 && maxScrollDepth < 25) {
          analytics.trackScrollDepth(25);
          hotjar.trackScrollDepth(25, pathname);
        } else if (scrollPercent >= 50 && maxScrollDepth < 50) {
          analytics.trackScrollDepth(50);
          hotjar.trackScrollDepth(50, pathname);
        } else if (scrollPercent >= 75 && maxScrollDepth < 75) {
          analytics.trackScrollDepth(75);
          hotjar.trackScrollDepth(75, pathname);
        } else if (scrollPercent >= 90 && maxScrollDepth < 90) {
          analytics.trackScrollDepth(90);
          hotjar.trackScrollDepth(90, pathname);
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, [pathname]);

  useEffect(() => {
    // Track time on page
    const startTime = Date.now();
    
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      analytics.trackTimeOnPage(timeSpent);
      hotjar.trackTimeOnPage(timeSpent, pathname);
    };

    // Track time on page when user leaves
    const handleBeforeUnload = () => {
      trackTimeOnPage();
    };

    // Track time on page every 30 seconds
    const interval = setInterval(trackTimeOnPage, 30000);

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackTimeOnPage(); // Final tracking
    };
  }, [pathname]);

  useEffect(() => {
    // Track form interactions
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.name || form.id || 'unknown_form';
      
      analytics.trackFormSubmission(formName);
      hotjar.trackFormInteraction(formName, 'submit');
    };

    const handleFormFocus = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const form = input.closest('form');
      const formName = form?.name || form?.id || 'unknown_form';
      
      hotjar.trackFormInteraction(formName, 'focus', input.name);
    };

    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('focusin', handleFormFocus);
    
    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('focusin', handleFormFocus);
    };
  }, []);

  useEffect(() => {
    // Track button clicks
    const handleButtonClick = (event: Event) => {
      const button = event.target as HTMLElement;
      if (button.tagName === 'BUTTON' || button.tagName === 'A') {
        const buttonText = button.textContent?.trim() || button.getAttribute('aria-label') || 'unknown_button';
        const buttonLocation = pathname;
        
        analytics.trackButtonClick(buttonText, buttonLocation);
        hotjar.trackButtonClick(buttonText, buttonLocation);
      }
    };

    document.addEventListener('click', handleButtonClick);
    
    return () => {
      document.removeEventListener('click', handleButtonClick);
    };
  }, [pathname]);

  useEffect(() => {
    // Track external link clicks
    const handleLinkClick = (event: Event) => {
      const link = event.target as HTMLAnchorElement;
      if (link.tagName === 'A' && link.href) {
        const isExternal = !link.href.startsWith(window.location.origin);
        if (isExternal) {
          analytics.trackEvent('external_link_click', {
            link_url: link.href,
            link_text: link.textContent?.trim(),
          });
          hotjar.trackHotjarEvent('external_link_click', {
            link_url: link.href,
            link_text: link.textContent?.trim(),
          });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  useEffect(() => {
    // Track video interactions
    const handleVideoPlay = (event: Event) => {
      const video = event.target as HTMLVideoElement;
      const videoTitle = video.getAttribute('title') || video.getAttribute('data-title') || 'unknown_video';
      
      analytics.trackVideoInteraction('play', videoTitle);
      hotjar.trackVideoInteraction(videoTitle, 'play');
    };

    const handleVideoPause = (event: Event) => {
      const video = event.target as HTMLVideoElement;
      const videoTitle = video.getAttribute('title') || video.getAttribute('data-title') || 'unknown_video';
      
      analytics.trackVideoInteraction('pause', videoTitle);
      hotjar.trackVideoInteraction(videoTitle, 'pause');
    };

    document.addEventListener('play', handleVideoPlay);
    document.addEventListener('pause', handleVideoPause);
    
    return () => {
      document.removeEventListener('play', handleVideoPlay);
      document.removeEventListener('pause', handleVideoPause);
    };
  }, []);

  useEffect(() => {
    // Track search queries
    const handleSearch = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.type === 'search' || input.getAttribute('data-search') === 'true') {
        const searchTerm = input.value.trim();
        if (searchTerm) {
          analytics.trackSearch(searchTerm);
          hotjar.trackSearch(searchTerm);
        }
      }
    };

    document.addEventListener('input', handleSearch);
    
    return () => {
      document.removeEventListener('input', handleSearch);
    };
  }, []);

  useEffect(() => {
    // Track file downloads
    const handleDownload = (event: Event) => {
      const link = event.target as HTMLAnchorElement;
      if (link.download || link.href.includes('.pdf') || link.href.includes('.doc')) {
        const fileName = link.download || link.href.split('/').pop() || 'unknown_file';
        const fileType = fileName.split('.').pop() || 'unknown';
        
        analytics.trackDownload(fileName, fileType);
        hotjar.trackResourceDownload(fileType, fileName);
      }
    };

    document.addEventListener('click', handleDownload);
    
    return () => {
      document.removeEventListener('click', handleDownload);
    };
  }, []);

  useEffect(() => {
    // Track errors
    const handleError = (event: ErrorEvent) => {
      analytics.trackError('javascript_error', event.message, event.filename);
      hotjar.trackError('javascript_error', event.message);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.trackError('unhandled_promise_rejection', event.reason?.toString() || 'Unknown error');
      hotjar.trackError('unhandled_promise_rejection', event.reason?.toString() || 'Unknown error');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null; // This component doesn't render anything
}