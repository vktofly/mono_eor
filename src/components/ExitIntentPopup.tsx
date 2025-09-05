"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before (using localStorage)
    const hasShownBefore = localStorage.getItem('exitIntentShown');
    if (hasShownBefore) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem('exitIntentShown', 'true');
        trackEvent('exit_intent_popup_shown');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    trackEvent('exit_intent_popup_closed');
  };

  const handleCTAClick = () => {
    trackEvent('exit_intent_popup_cta_clicked');
    window.location.href = '/contact';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cta-500 to-cta-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Wait! Don't Miss Out
              </h3>
              
              <p className="text-gray-600 mb-6">
                Get your <strong>FREE India expansion plan</strong> and save up to <strong>$5,000</strong> with our limited-time offer.
              </p>

              <div className="bg-gradient-to-r from-cta-50 to-brand-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span><strong>Only 47 spots left</strong> for Q1 2024 free setup</span>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={handleCTAClick}
                  className="w-full bg-gradient-to-r from-cta-500 to-cta-600 hover:from-cta-600 hover:to-cta-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get My Free Plan Now
                </motion.button>
                
                <p className="text-xs text-gray-500">
                  ✓ 48-hour setup • ✓ 100% compliance • ✓ No commitment
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
