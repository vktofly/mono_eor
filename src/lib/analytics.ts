import { loadSiteSettings } from './config';

// Analytics tracking utility
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'engagement',
        ...properties
      });
    }

    // Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...properties
      });
    }

    // Hotjar (if available)
    if (window.hj) {
      window.hj('event', eventName);
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, properties);
    }
  }
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
  
  // Conversion events
  CONVERSION: 'conversion',
  LEAD_QUALIFIED: 'lead_qualified',
  PRICING_VIEW: 'pricing_view',
} as const;

// Enhanced page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: url,
      });
    }

    // Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: title,
        page_location: url,
      });
    }
  }
};

// Form tracking with enhanced parameters
export const trackFormSubmission = (formType: string, formData: Record<string, unknown>) => {
  trackEvent(AnalyticsEvents.FORM_SUBMITTED, {
    form_type: formType,
    form_source: window.location.pathname,
    user_company: formData.company,
    user_interest: formData.interest,
    lead_quality: determineLeadQuality(formData),
  });
};

// CTA tracking with context
export const trackCTAClick = (ctaType: string, context: Record<string, unknown>) => {
  trackEvent(AnalyticsEvents.CTA_CLICKED, {
    cta_type: ctaType,
    cta_location: context.location || window.location.pathname,
    cta_text: context.text,
    user_intent: context.intent,
  });
};

// Lead quality scoring
const determineLeadQuality = (formData: Record<string, unknown>): string => {
  const score = calculateLeadScore(formData);
  if (score >= 8) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
};

const calculateLeadScore = (formData: Record<string, unknown>): number => {
  let score = 0;
  
  // Company size scoring
  if (formData.employees) {
    const employeeCount = parseInt(formData.employees);
    if (employeeCount > 200) score += 3;
    else if (employeeCount > 50) score += 2;
    else if (employeeCount > 10) score += 1;
  }
  
  // Interest level scoring
  if (formData.interest) {
    const highValueInterests = ['enterprise', 'quote', 'demo'];
    const mediumValueInterests = ['professional', 'scaleup'];
    if (highValueInterests.includes(formData.interest)) score += 3;
    else if (mediumValueInterests.includes(formData.interest)) score += 2;
    else score += 1;
  }
  
  // Contact completeness
  if (formData.company) score += 1;
  if (formData.phone) score += 1;
  if (formData.message && formData.message.length > 50) score += 1;
  
  return score;
};

// E-commerce tracking for pricing
export const trackPricingView = (tier: string, price: number) => {
  trackEvent(AnalyticsEvents.PRICING_VIEW, {
    currency: 'USD',
    value: price,
    items: [{
      item_id: tier,
      item_name: `${tier} Plan`,
      category: 'EOR Services',
      quantity: 1,
      price: price,
    }]
  });
};

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent(AnalyticsEvents.CONVERSION, {
    conversion_type: conversionType,
    conversion_value: value,
    conversion_source: window.location.pathname,
  });
};

// Initialize analytics on page load
export const initializeAnalytics = async () => {
  if (typeof window === 'undefined') return;
  
  const settings = await loadSiteSettings();
  
  // Initialize Google Analytics 4
  if (settings.ga4Id) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.ga4Id}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', settings.ga4Id);
  }
  
  // Initialize Google Tag Manager
  if (settings.gtmId) {
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${settings.gtmId}');
    `;
    document.head.appendChild(gtmScript);
  }
  
  // Initialize Hotjar
  if (settings.hotjarId) {
    const hotjarScript = document.createElement('script');
    hotjarScript.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${settings.hotjarId},hjsv:${settings.hotjarVersion}};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(hotjarScript);
  }
};

// Type declarations for global analytics objects
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    hj: (...args: unknown[]) => void;
  }
}
