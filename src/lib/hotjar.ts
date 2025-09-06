// Hotjar integration for user behavior analytics

declare global {
  interface Window {
    hj: (...args: any[]) => void;
  }
}

// Initialize Hotjar
export function initializeHotjar(siteId: string, version: number = 6) {
  if (typeof window === 'undefined') return;

  // Create Hotjar script
  const script = document.createElement('script');
  script.innerHTML = `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${siteId},hjsv:${version}};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `;
  
  document.head.appendChild(script);
}

// Track custom events
export function trackHotjarEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', eventName, properties);
}

// Track user identification
export function identifyUser(userId: string, attributes?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('identify', userId, attributes);
}

// Track form interactions
export function trackFormInteraction(formName: string, action: string, fieldName?: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'form_interaction', {
    form_name: formName,
    action: action,
    field_name: fieldName,
  });
}

// Track button clicks
export function trackButtonClick(buttonName: string, location?: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'button_click', {
    button_name: buttonName,
    location: location,
  });
}

// Track page views
export function trackPageView(pageName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'page_view', {
    page_name: pageName,
    ...properties,
  });
}

// Track user journey
export function trackUserJourney(step: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'user_journey', {
    step: step,
    ...properties,
  });
}

// Track conversion events
export function trackConversion(conversionType: string, value?: number, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'conversion', {
    conversion_type: conversionType,
    value: value,
    ...properties,
  });
}

// Track error events
export function trackError(errorType: string, errorMessage: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'error', {
    error_type: errorType,
    error_message: errorMessage,
    ...properties,
  });
}

// Track performance issues
export function trackPerformanceIssue(issueType: string, details?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'performance_issue', {
    issue_type: issueType,
    ...details,
  });
}

// Track user feedback
export function trackUserFeedback(feedbackType: string, rating?: number, comment?: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'user_feedback', {
    feedback_type: feedbackType,
    rating: rating,
    comment: comment,
  });
}

// Track search queries
export function trackSearch(searchTerm: string, resultsCount?: number) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

// Track video interactions
export function trackVideoInteraction(videoTitle: string, action: string, progress?: number) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'video_interaction', {
    video_title: videoTitle,
    action: action,
    progress: progress,
  });
}

// Track scroll depth
export function trackScrollDepth(depth: number, page: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'scroll_depth', {
    depth: depth,
    page: page,
  });
}

// Track time on page
export function trackTimeOnPage(timeInSeconds: number, page: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'time_on_page', {
    time_seconds: timeInSeconds,
    page: page,
  });
}

// Track mobile interactions
export function trackMobileInteraction(interactionType: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'mobile_interaction', {
    interaction_type: interactionType,
    ...properties,
  });
}

// Track A/B test participation
export function trackABTest(testName: string, variant: string, action: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'ab_test', {
    test_name: testName,
    variant: variant,
    action: action,
  });
}

// Track e-commerce events
export function trackEcommerceEvent(eventType: string, productData?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'ecommerce', {
    event_type: eventType,
    ...productData,
  });
}

// Track lead generation
export function trackLeadGeneration(leadType: string, source: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'lead_generation', {
    lead_type: leadType,
    source: source,
    ...properties,
  });
}

// Track newsletter signups
export function trackNewsletterSignup(source: string, success: boolean) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'newsletter_signup', {
    source: source,
    success: success,
  });
}

// Track chat interactions
export function trackChatInteraction(action: string, chatType?: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'chat_interaction', {
    action: action,
    chat_type: chatType,
  });
}

// Track resource downloads
export function trackResourceDownload(resourceType: string, resourceName: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'resource_download', {
    resource_type: resourceType,
    resource_name: resourceName,
  });
}

// Track pricing interactions
export function trackPricingInteraction(action: string, planName?: string, price?: number) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'pricing_interaction', {
    action: action,
    plan_name: planName,
    price: price,
  });
}

// Track demo requests
export function trackDemoRequest(demoType: string, companySize?: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'demo_request', {
    demo_type: demoType,
    company_size: companySize,
  });
}

// Track contact form submissions
export function trackContactFormSubmission(formType: string, success: boolean, errorMessage?: string) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'contact_form_submission', {
    form_type: formType,
    success: success,
    error_message: errorMessage,
  });
}

// Track user engagement
export function trackEngagement(action: string, element: string, value?: any) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'engagement', {
    action: action,
    element: element,
    value: value,
  });
}

// Track session events
export function trackSessionEvent(eventType: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', 'session_event', {
    event_type: eventType,
    ...properties,
  });
}

// Track custom business events
export function trackBusinessEvent(eventName: string, properties: Record<string, any>) {
  if (typeof window === 'undefined' || !window.hj) return;

  window.hj('event', eventName, {
    event_category: 'business',
    ...properties,
  });
}

// Export all Hotjar functions
export const hotjar = {
  initializeHotjar,
  trackHotjarEvent,
  identifyUser,
  trackFormInteraction,
  trackButtonClick,
  trackPageView,
  trackUserJourney,
  trackConversion,
  trackError,
  trackPerformanceIssue,
  trackUserFeedback,
  trackSearch,
  trackVideoInteraction,
  trackScrollDepth,
  trackTimeOnPage,
  trackMobileInteraction,
  trackABTest,
  trackEcommerceEvent,
  trackLeadGeneration,
  trackNewsletterSignup,
  trackChatInteraction,
  trackResourceDownload,
  trackPricingInteraction,
  trackDemoRequest,
  trackContactFormSubmission,
  trackEngagement,
  trackSessionEvent,
  trackBusinessEvent,
};
