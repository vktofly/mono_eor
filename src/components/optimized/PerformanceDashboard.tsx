"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  memory: number | null;
  longTasks: number;
}

interface PerformanceDashboardProps {
  show?: boolean;
  onClose?: () => void;
}

export function PerformanceDashboard({ show = false, onClose }: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    memory: null,
    longTasks: 0,
  });

  const [isVisible, setIsVisible] = useState(show);

  const updateMetrics = useCallback(() => {
    // Get Core Web Vitals from Performance API
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    // FCP (First Contentful Paint)
    const fcpEntry = paint.find(entry => entry.name === 'first-contentful-paint');
    const fcp = fcpEntry ? fcpEntry.startTime : null;

    // TTFB (Time to First Byte)
    const ttfb = navigation ? navigation.responseStart - navigation.requestStart : null;

    // Memory usage
    const memory = (performance as any).memory ? 
      Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024) : null;

    setMetrics(prev => ({
      ...prev,
      fcp,
      ttfb,
      memory,
    }));
  }, []);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      updateMetrics();
      
      // Update metrics every 5 seconds
      const interval = setInterval(updateMetrics, 5000);
      
      return () => clearInterval(interval);
    } else {
      setIsVisible(false);
    }
  }, [show, updateMetrics]);

  const getScoreColor = (value: number | null, thresholds: { good: number; poor: number }) => {
    if (value === null) return 'text-gray-500';
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (value: number | null, thresholds: { good: number; poor: number }) => {
    if (value === null) return 'N/A';
    if (value <= thresholds.good) return 'Good';
    if (value <= thresholds.poor) return 'Needs Improvement';
    return 'Poor';
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm z-50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {/* FCP */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">FCP</span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${getScoreColor(metrics.fcp, { good: 1800, poor: 3000 })}`}>
                {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getScoreColor(metrics.fcp, { good: 1800, poor: 3000 })} bg-opacity-10`}>
                {getScoreLabel(metrics.fcp, { good: 1800, poor: 3000 })}
              </span>
            </div>
          </div>

          {/* LCP */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">LCP</span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${getScoreColor(metrics.lcp, { good: 2500, poor: 4000 })}`}>
                {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getScoreColor(metrics.lcp, { good: 2500, poor: 4000 })} bg-opacity-10`}>
                {getScoreLabel(metrics.lcp, { good: 2500, poor: 4000 })}
              </span>
            </div>
          </div>

          {/* FID */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">FID</span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${getScoreColor(metrics.fid, { good: 100, poor: 300 })}`}>
                {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A'}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getScoreColor(metrics.fid, { good: 100, poor: 300 })} bg-opacity-10`}>
                {getScoreLabel(metrics.fid, { good: 100, poor: 300 })}
              </span>
            </div>
          </div>

          {/* CLS */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">CLS</span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${getScoreColor(metrics.cls, { good: 0.1, poor: 0.25 })}`}>
                {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getScoreColor(metrics.cls, { good: 0.1, poor: 0.25 })} bg-opacity-10`}>
                {getScoreLabel(metrics.cls, { good: 0.1, poor: 0.25 })}
              </span>
            </div>
          </div>

          {/* TTFB */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">TTFB</span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${getScoreColor(metrics.ttfb, { good: 800, poor: 1800 })}`}>
                {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A'}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getScoreColor(metrics.ttfb, { good: 800, poor: 1800 })} bg-opacity-10`}>
                {getScoreLabel(metrics.ttfb, { good: 800, poor: 1800 })}
              </span>
            </div>
          </div>

          {/* Memory */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Memory</span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${getScoreColor(metrics.memory, { good: 50, poor: 100 })}`}>
                {metrics.memory ? `${metrics.memory}MB` : 'N/A'}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getScoreColor(metrics.memory, { good: 50, poor: 100 })} bg-opacity-10`}>
                {getScoreLabel(metrics.memory, { good: 50, poor: 100 })}
              </span>
            </div>
          </div>

          {/* Long Tasks */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Long Tasks</span>
            <span className={`text-sm font-medium ${metrics.longTasks > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {metrics.longTasks}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <button
              onClick={updateMetrics}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook for performance monitoring
export function usePerformanceMonitoring() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Show dashboard on Ctrl+Shift+P
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        setShowDashboard(!showDashboard);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDashboard]);

  return {
    showDashboard,
    setShowDashboard,
  };
}
