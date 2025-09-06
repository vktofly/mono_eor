// Calendly integration for appointment scheduling

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
      closePopupWidget: () => void;
      showPopupWidget: (url: string) => void;
      hidePopupWidget: () => void;
    };
  }
}

// Initialize Calendly widget
export function initializeCalendly() {
  if (typeof window === 'undefined') return;

  // Load Calendly script if not already loaded
  if (!document.querySelector('script[src*="calendly.com"]')) {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }
}

// Open Calendly popup
export function openCalendlyPopup(calendlyUrl: string) {
  if (typeof window === 'undefined' || !window.Calendly) {
    // Fallback: open in new tab
    window.open(calendlyUrl, '_blank');
    return;
  }

  window.Calendly.initPopupWidget({
    url: calendlyUrl,
  });
}

// Initialize inline Calendly widget
export function initializeInlineCalendly(containerId: string, calendlyUrl: string) {
  if (typeof window === 'undefined' || !window.Calendly) return;

  const container = document.getElementById(containerId);
  if (!container) return;

  window.Calendly.initInlineWidget({
    url: calendlyUrl,
    parentElement: container,
  });
}

// Close Calendly popup
export function closeCalendlyPopup() {
  if (typeof window === 'undefined' || !window.Calendly) return;

  window.Calendly.closePopupWidget();
}

// Show Calendly popup
export function showCalendlyPopup(calendlyUrl: string) {
  if (typeof window === 'undefined' || !window.Calendly) return;

  window.Calendly.showPopupWidget(calendlyUrl);
}

// Hide Calendly popup
export function hideCalendlyPopup() {
  if (typeof window === 'undefined' || !window.Calendly) return;

  window.Calendly.hidePopupWidget();
}

// Get Calendly URL from environment or use default
export function getCalendlyUrl(eventType: string = 'default'): string {
  const baseUrl = process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL || 'https://calendly.com/monohr/eor-consultation';
  
  // You can customize URLs based on event type
  const eventUrls: Record<string, string> = {
    default: baseUrl,
    consultation: baseUrl,
    demo: baseUrl.replace('eor-consultation', 'demo-call'),
    support: baseUrl.replace('eor-consultation', 'support-call'),
  };

  return eventUrls[eventType] || baseUrl;
}

// Track Calendly events
export function trackCalendlyEvent(eventType: string, eventData?: Record<string, any>) {
  // Track with analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calendly_interaction', {
      event_type: eventType,
      ...eventData,
    });
  }

  // Track with Hotjar
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('event', 'calendly_interaction', {
      event_type: eventType,
      ...eventData,
    });
  }
}

// Handle Calendly event callbacks
export function setupCalendlyEventHandlers() {
  if (typeof window === 'undefined') return;

  // Listen for Calendly events
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://calendly.com') return;

    const data = event.data;
    
    switch (data.event) {
      case 'calendly.event_scheduled':
        trackCalendlyEvent('event_scheduled', {
          event_type: data.payload.event_type,
          invitee_email: data.payload.invitee.email,
        });
        break;
        
      case 'calendly.event_type_viewed':
        trackCalendlyEvent('event_type_viewed', {
          event_type: data.payload.event_type,
        });
        break;
        
      case 'calendly.profile_page_viewed':
        trackCalendlyEvent('profile_page_viewed', {
          profile_name: data.payload.profile_name,
        });
        break;
        
      case 'calendly.date_and_time_selected':
        trackCalendlyEvent('date_and_time_selected', {
          event_type: data.payload.event_type,
          start_time: data.payload.start_time,
        });
        break;
        
      case 'calendly.event_scheduled':
        trackCalendlyEvent('event_scheduled', {
          event_type: data.payload.event_type,
          invitee_email: data.payload.invitee.email,
        });
        break;
    }
  });
}

// Create Calendly button component
export function createCalendlyButton(
  text: string,
  calendlyUrl: string,
  className: string = 'calendly-button',
  onClick?: () => void
): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  button.addEventListener('click', () => {
    openCalendlyPopup(calendlyUrl);
    trackCalendlyEvent('button_clicked', { button_text: text });
    onClick?.();
  });
  
  return button;
}

// Create Calendly link component
export function createCalendlyLink(
  text: string,
  calendlyUrl: string,
  className: string = 'calendly-link',
  target: string = '_blank'
): HTMLAnchorElement {
  const link = document.createElement('a');
  link.textContent = text;
  link.href = calendlyUrl;
  link.className = className;
  link.target = target;
  link.addEventListener('click', () => {
    trackCalendlyEvent('link_clicked', { link_text: text });
  });
  
  return link;
}

// Embed Calendly widget in a container
export function embedCalendlyWidget(containerId: string, eventType: string = 'default') {
  const calendlyUrl = getCalendlyUrl(eventType);
  initializeInlineCalendly(containerId, calendlyUrl);
}

// Get available time slots (requires Calendly API)
export async function getAvailableTimeSlots(
  eventType: string,
  startDate?: string,
  endDate?: string
): Promise<any[]> {
  try {
    // This would require Calendly API integration
    // For now, return empty array
    return [];
  } catch (error) {
    console.error('Error fetching Calendly time slots:', error);
    return [];
  }
}

// Check if Calendly is loaded
export function isCalendlyLoaded(): boolean {
  return typeof window !== 'undefined' && !!window.Calendly;
}

// Wait for Calendly to load
export function waitForCalendly(): Promise<void> {
  return new Promise((resolve) => {
    if (isCalendlyLoaded()) {
      resolve();
      return;
    }

    const checkInterval = setInterval(() => {
      if (isCalendlyLoaded()) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      resolve();
    }, 10000);
  });
}

// Export all Calendly functions
export const calendly = {
  initializeCalendly,
  openCalendlyPopup,
  initializeInlineCalendly,
  closeCalendlyPopup,
  showCalendlyPopup,
  hideCalendlyPopup,
  getCalendlyUrl,
  trackCalendlyEvent,
  setupCalendlyEventHandlers,
  createCalendlyButton,
  createCalendlyLink,
  embedCalendlyWidget,
  getAvailableTimeSlots,
  isCalendlyLoaded,
  waitForCalendly,
};
