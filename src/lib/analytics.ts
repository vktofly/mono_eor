// Google Analytics 4 and Google Tag Manager integration

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics 4
export function initializeGA4(measurementId: string) {
  if (typeof window === 'undefined') return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });
}

// Initialize Google Tag Manager
export function initializeGTM(gtmId: string) {
  if (typeof window === 'undefined') return;

  // Load GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });
}

// Track page views
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
    page_title: title || document.title,
    page_location: url,
  });
}

// Track custom events
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    event_category: parameters?.category || 'engagement',
    event_label: parameters?.label,
    value: parameters?.value,
    ...parameters,
  });
}

// Track conversions
export function trackConversion(conversionId: string, value?: number, currency?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'conversion', {
    send_to: conversionId,
    value: value,
    currency: currency || 'USD',
  });
}

// Track e-commerce events
export function trackPurchase(transactionId: string, value: number, currency: string, items: any[]) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items,
  });
}

// Track form submissions
export function trackFormSubmission(formName: string, formData?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'form_submit', {
    form_name: formName,
    form_data: formData,
  });
}

// Track button clicks
export function trackButtonClick(buttonName: string, location?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'click', {
    event_category: 'button',
    event_label: buttonName,
    location: location,
  });
}

// Track scroll depth
export function trackScrollDepth(depth: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'scroll', {
    event_category: 'engagement',
    event_label: 'scroll_depth',
    value: depth,
  });
}

// Track time on page
export function trackTimeOnPage(timeInSeconds: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'timing_complete', {
    name: 'time_on_page',
    value: timeInSeconds,
  });
}

// Track search queries
export function trackSearch(searchTerm: string, resultsCount?: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

// Track file downloads
export function trackDownload(fileName: string, fileType?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'file_download', {
    file_name: fileName,
    file_type: fileType,
  });
}

// Track video interactions
export function trackVideoInteraction(action: string, videoTitle: string, progress?: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'video_interaction', {
    action: action,
    video_title: videoTitle,
    progress: progress,
  });
}

// Track social media interactions
export function trackSocialInteraction(platform: string, action: string, target?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'social_interaction', {
    social_network: platform,
    social_action: action,
    social_target: target,
  });
}

// Track custom dimensions
export function setCustomDimension(dimensionIndex: number, value: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
    [`custom_map.dimension${dimensionIndex}`]: value,
  });
}

// Track user properties
export function setUserProperties(properties: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
    user_properties: properties,
  });
}

// Track enhanced e-commerce
export function trackEcommerceEvent(eventName: string, parameters: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    ecommerce: parameters,
  });
}

// Track lead generation
export function trackLeadGeneration(leadType: string, value?: number, source?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'generate_lead', {
    currency: 'USD',
    value: value,
    lead_type: leadType,
    lead_source: source,
  });
}

// Track contact form submissions
export function trackContactFormSubmission(formType: string, success: boolean, errorMessage?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'contact_form_submission', {
    form_type: formType,
    success: success,
    error_message: errorMessage,
  });
}

// Track pricing page interactions
export function trackPricingInteraction(action: string, planName?: string, price?: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'pricing_interaction', {
    action: action,
    plan_name: planName,
    price: price,
  });
}

// Track demo requests
export function trackDemoRequest(demoType: string, companySize?: string, industry?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'demo_request', {
    demo_type: demoType,
    company_size: companySize,
    industry: industry,
  });
}

// Track resource downloads
export function trackResourceDownload(resourceType: string, resourceName: string, gated: boolean = false) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'resource_download', {
    resource_type: resourceType,
    resource_name: resourceName,
    gated: gated,
  });
}

// Track newsletter signups
export function trackNewsletterSignup(source: string, success: boolean) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'newsletter_signup', {
    source: source,
    success: success,
  });
}

// Track chat interactions
export function trackChatInteraction(action: string, chatType?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'chat_interaction', {
    action: action,
    chat_type: chatType,
  });
}

// Track A/B test participation
export function trackABTest(testName: string, variant: string, action: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'ab_test', {
    test_name: testName,
    variant: variant,
    action: action,
  });
}

// Track performance metrics
export function trackPerformanceMetric(metricName: string, value: number, unit: string = 'ms') {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'performance_metric', {
    metric_name: metricName,
    metric_value: value,
    metric_unit: unit,
  });
}

// Track error events
export function trackError(errorType: string, errorMessage: string, errorLocation?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'exception', {
    description: errorMessage,
    fatal: false,
    error_type: errorType,
    error_location: errorLocation,
  });
}

// Track user engagement
export function trackEngagement(action: string, element: string, value?: any) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'engagement', {
    action: action,
    element: element,
    value: value,
  });
}

// Track session duration
export function trackSessionDuration(duration: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'session_duration', {
    duration: duration,
  });
}

// Track page load time
export function trackPageLoadTime(loadTime: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_load_time', {
    load_time: loadTime,
  });
}

// Track mobile app events (if applicable)
export function trackMobileAppEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    app_name: 'MonoHR',
    ...parameters,
  });
}

// Track cross-domain tracking
export function trackCrossDomain(source: string, destination: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'cross_domain', {
    source: source,
    destination: destination,
  });
}

// Track custom business events
export function trackBusinessEvent(eventName: string, parameters: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    event_category: 'business',
    ...parameters,
  });
}

// Analytics Events enum for type safety
export enum AnalyticsEvents {
  PAGE_VIEW = 'page_view',
  BUTTON_CLICK = 'button_click',
  FORM_SUBMIT = 'form_submit',
  CONTACT_FORM_SUBMIT = 'contact_form_submit',
  QUOTE_REQUEST = 'quote_request',
  DEMO_REQUEST = 'demo_request',
  NEWSLETTER_SIGNUP = 'newsletter_signup',
  RESOURCE_DOWNLOAD = 'resource_download',
  PRICING_INTERACTION = 'pricing_interaction',
  CALENDLY_INTERACTION = 'calendly_interaction',
  SCROLL_DEPTH = 'scroll_depth',
  TIME_ON_PAGE = 'time_on_page',
  VIDEO_INTERACTION = 'video_interaction',
  SEARCH = 'search',
  EXTERNAL_LINK_CLICK = 'external_link_click',
  ERROR = 'error',
  CONVERSION = 'conversion',
  LEAD_GENERATION = 'lead_generation',
  AB_TEST = 'ab_test',
  ENGAGEMENT = 'engagement',
}

// Export all tracking functions
export const analytics = {
  initializeGA4,
  initializeGTM,
  trackPageView,
  trackEvent,
  trackConversion,
  trackPurchase,
  trackFormSubmission,
  trackButtonClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackSearch,
  trackDownload,
  trackVideoInteraction,
  trackSocialInteraction,
  setCustomDimension,
  setUserProperties,
  trackEcommerceEvent,
  trackLeadGeneration,
  trackContactFormSubmission,
  trackPricingInteraction,
  trackDemoRequest,
  trackResourceDownload,
  trackNewsletterSignup,
  trackChatInteraction,
  trackABTest,
  trackPerformanceMetric,
  trackError,
  trackEngagement,
  trackSessionDuration,
  trackPageLoadTime,
  trackMobileAppEvent,
  trackCrossDomain,
  trackBusinessEvent,
};