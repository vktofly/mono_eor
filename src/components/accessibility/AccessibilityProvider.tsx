"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AccessibilityContextType {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: "normal" | "large" | "extra-large";
  setFontSize: (size: "normal" | "large" | "extra-large") => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "extra-large">("normal");

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Load saved preferences
    const savedHighContrast = localStorage.getItem("monohr_high_contrast") === "true";
    const savedFontSize = localStorage.getItem("monohr_font_size") as "normal" | "large" | "extra-large" || "normal";
    
    setHighContrast(savedHighContrast);
    setFontSize(savedFontSize);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem("monohr_high_contrast", newValue.toString());
  };

  const handleSetFontSize = (size: "normal" | "large" | "extra-large") => {
    setFontSize(size);
    localStorage.setItem("monohr_font_size", size);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        highContrast,
        fontSize,
        setFontSize: handleSetFontSize,
        toggleHighContrast,
      }}
    >
      <div
        className={`accessibility-wrapper ${
          highContrast ? "high-contrast" : ""
        } ${fontSize === "large" ? "text-large" : fontSize === "extra-large" ? "text-extra-large" : ""}`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
