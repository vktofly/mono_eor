"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calendly } from '@/lib/calendly';
import { analytics } from '@/lib/analytics';
import { hotjar } from '@/lib/hotjar';

interface CalendlyWidgetProps {
  eventType?: string;
  className?: string;
  buttonText?: string;
  buttonClassName?: string;
  inline?: boolean;
  popup?: boolean;
  onEventScheduled?: () => void;
  onEventTypeViewed?: () => void;
}

export function CalendlyWidget({
  eventType = 'default',
  className = '',
  buttonText = 'Schedule a Call',
  buttonClassName = 'bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors',
  inline = false,
  popup = true,
  onEventScheduled,
  onEventTypeViewed,
}: CalendlyWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetId] = useState(() => `calendly-inline-${eventType}-${Math.random().toString(36).substr(2, 9)}`);
  const calendlyUrl = calendly.getCalendlyUrl(eventType);

  useEffect(() => {
    // Initialize Calendly
    calendly.initializeCalendly();
    
    // Wait for Calendly to load
    calendly.waitForCalendly().then(() => {
      setIsLoaded(true);
    });

    // Listen for Calendly events
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://calendly.com') return;

      const data = event.data;
      
      switch (data.event) {
        case 'calendly.event_scheduled':
          analytics.trackEvent('calendly_event_scheduled', {
            event_type: data.payload.event_type,
            invitee_email: data.payload.invitee.email,
          });
          hotjar.trackCalendlyEvent('event_scheduled', {
            event_type: data.payload.event_type,
            invitee_email: data.payload.invitee.email,
          });
          onEventScheduled?.();
          break;
          
        case 'calendly.event_type_viewed':
          analytics.trackEvent('calendly_event_type_viewed', {
            event_type: data.payload.event_type,
          });
          hotjar.trackCalendlyEvent('event_type_viewed', {
            event_type: data.payload.event_type,
          });
          onEventTypeViewed?.();
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onEventScheduled, onEventTypeViewed]);

  const handleButtonClick = () => {
    if (popup) {
      setIsOpen(true);
      calendly.openCalendlyPopup(calendlyUrl);
      
      // Track button click
      analytics.trackButtonClick(buttonText, 'calendly_widget');
      hotjar.trackButtonClick(buttonText, 'calendly_widget');
    }
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    calendly.closeCalendlyPopup();
  };

  useEffect(() => {
    if (inline && isLoaded && containerRef.current && !isInitialized) {
      // Initialize inline widget only once
      calendly.initializeInlineCalendly(widgetId, calendlyUrl);
      setIsInitialized(true);
    }

    // Cleanup function to prevent multiple widgets
    return () => {
      if (containerRef.current) {
        const existingWidget = containerRef.current.querySelector('.calendly-inline-widget');
        if (existingWidget) {
          existingWidget.remove();
        }
      }
      setIsInitialized(false);
    };
  }, [inline, isLoaded, calendlyUrl, widgetId, isInitialized]);

  if (inline) {
    return (
      <div className={`${className} h-full`}>
        <div
          ref={containerRef}
          id={widgetId}
          className="h-full w-full min-h-[600px]"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.button
        onClick={handleButtonClick}
        disabled={!isLoaded}
        className={`${buttonClassName} ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {!isLoaded ? 'Loading...' : buttonText}
      </motion.button>

      {/* Popup Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClosePopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Schedule a Call</h3>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div id="calendly-popup" className="min-h-[600px]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Pre-configured Calendly components
export function CalendlyButton({ 
  eventType = 'default', 
  children = 'Schedule a Call',
  className = 'bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors',
  ...props 
}: Omit<CalendlyWidgetProps, 'inline' | 'popup'>) {
  return (
    <CalendlyWidget
      eventType={eventType}
      buttonText={children}
      buttonClassName={className}
      popup={true}
      inline={false}
      {...props}
    />
  );
}

export function CalendlyInline({ 
  eventType = 'default', 
  className = 'w-full',
  ...props 
}: Omit<CalendlyWidgetProps, 'buttonText' | 'buttonClassName' | 'popup'>) {
  return (
    <CalendlyWidget
      eventType={eventType}
      className={className}
      inline={true}
      popup={false}
      {...props}
    />
  );
}

export function CalendlyPopup({ 
  eventType = 'default', 
  children,
  className = '',
  ...props 
}: Omit<CalendlyWidgetProps, 'inline'>) {
  return (
    <CalendlyWidget
      eventType={eventType}
      className={className}
      popup={true}
      inline={false}
      {...props}
    >
      {children}
    </CalendlyWidget>
  );
}
