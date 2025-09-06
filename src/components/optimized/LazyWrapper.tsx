"use client";

import { useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  animate?: boolean;
  delay?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyWrapper({
  children,
  fallback = <div className="h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-500">Loading...</div>
  </div>,
  threshold = 0.1,
  rootMargin = "100px",
  className = "",
  animate = true,
  delay = 0,
  onLoad,
  onError,
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleLoad = useCallback(() => {
    setHasLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          // Disconnect observer after triggering
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, hasLoaded, delay]);

  if (hasError) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 text-center ${className}`}>
        <div className="text-red-600 text-sm">
          Failed to load content. Please try again.
        </div>
      </div>
    );
  }

  if (!isVisible) {
    return (
      <div ref={ref} className={className}>
        {fallback}
      </div>
    );
  }

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={className}
        onAnimationComplete={handleLoad}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={className} onLoad={handleLoad}>
      {children}
    </div>
  );
}

// Specialized lazy loading components
export function LazyChart({ children, ...props }: Omit<LazyWrapperProps, 'fallback'>) {
  return (
    <LazyWrapper
      {...props}
      fallback={
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      }
    >
      {children}
    </LazyWrapper>
  );
}

export function LazyVideo({ children, ...props }: Omit<LazyWrapperProps, 'fallback'>) {
  return (
    <LazyWrapper
      {...props}
      fallback={
        <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
          <div className="text-white">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l8-5-8-5z" />
            </svg>
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      }
    >
      {children}
    </LazyWrapper>
  );
}
