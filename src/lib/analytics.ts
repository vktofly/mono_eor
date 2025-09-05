// Analytics tracking utility
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  // Also log for development
  console.log('Analytics Event:', eventName, properties);
};

// Common event types
export const AnalyticsEvents = {
  // Form events
  FORM_SUBMITTED: 'form_submitted',
  FORM_ERROR: 'form_error',
  FORM_SUCCESS: 'form_success',
  
  // CTA events
  CTA_CLICKED: 'cta_clicked',
  QUOTE_REQUESTED: 'quote_requested',
  DEMO_BOOKED: 'demo_booked',
  
  // Page events
  PAGE_VIEW: 'page_view',
  SECTION_VIEW: 'section_view',
  
  // Calculator events
  CALCULATOR_USED: 'calculator_used',
  CALCULATOR_RESULT: 'calculator_result',
  
  // Content events
  DOWNLOAD_CLICKED: 'download_clicked',
  LINK_CLICKED: 'link_clicked',
} as const;
