"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Type, Contrast, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, setFontSize, highContrast, toggleHighContrast, reducedMotion } = useAccessibility();

  // Keyboard shortcut to toggle accessibility toolbar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+A to toggle accessibility toolbar
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
      // Escape to close
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Reset all accessibility settings
  const resetAccessibilitySettings = () => {
    localStorage.removeItem("monohr_high_contrast");
    localStorage.removeItem("monohr_font_size");
    window.location.reload(); // Reload to reset all settings
  };

  const fontSizes = [
    { key: "normal", label: "Normal", icon: "A" },
    { key: "large", label: "Large", icon: "A" },
    { key: "extra-large", label: "Extra Large", icon: "A" },
  ] as const;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Reset Button - Always visible in high contrast mode */}
      {highContrast && (
        <motion.button
          onClick={resetAccessibilitySettings}
          className="mb-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-red-200 border-2 border-white"
          style={{
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            border: '3px solid #FFFFFF',
            boxShadow: '0 0 0 3px #FF0000',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Reset accessibility settings"
          title="Reset accessibility settings (Ctrl+Shift+A to open settings)"
        >
          <RotateCcw className="w-4 h-4" />
        </motion.button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-2 min-w-[280px]"
            role="dialog"
            aria-label="Accessibility options"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Accessibility Options</h3>
            
            {/* Font Size */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Font Size
              </label>
              <div className="flex gap-1">
                {fontSizes.map((size) => (
                  <button
                    key={size.key}
                    onClick={() => setFontSize(size.key)}
                    className={`flex-1 px-3 py-2 text-xs rounded-md border transition-colors ${
                      fontSize === size.key
                        ? "bg-brand-500 text-white border-brand-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                    aria-pressed={fontSize === size.key}
                  >
                    <span className="text-sm font-bold">{size.icon}</span>
                    <span className="block text-xs mt-1">{size.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="mb-4">
              <button
                onClick={toggleHighContrast}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md border transition-colors ${
                  highContrast
                    ? "bg-brand-500 text-white border-brand-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                aria-pressed={highContrast}
              >
                <div className="flex items-center gap-2">
                  <Contrast className="w-4 h-4" />
                  <span className="text-sm">High Contrast</span>
                </div>
                <div className={`w-4 h-4 rounded border-2 ${
                  highContrast ? "bg-white border-white" : "bg-white border-gray-400"
                }`} />
              </button>
            </div>

            {/* Motion Info */}
            {reducedMotion && (
              <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded-md">
                <p>Reduced motion is enabled based on your system preferences.</p>
              </div>
            )}

            {/* Keyboard Shortcuts Info */}
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
              <p><strong>Keyboard Shortcuts:</strong></p>
              <p>• Ctrl+Shift+A: Toggle this panel</p>
              <p>• Escape: Close this panel</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-500 hover:bg-brand-600 text-white p-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-brand-200 border-2 border-white high-contrast:border-black high-contrast:bg-yellow-500 high-contrast:text-black"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close accessibility options" : "Open accessibility options"}
        aria-expanded={isOpen}
        style={{
          // Ensure visibility in high contrast mode
          backgroundColor: highContrast ? '#FFD700' : undefined,
          color: highContrast ? '#000000' : undefined,
          border: highContrast ? '3px solid #000000' : undefined,
          boxShadow: highContrast ? '0 0 0 3px #FFD700' : undefined,
        }}
      >
        <Settings className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
