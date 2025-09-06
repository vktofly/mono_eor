"use client";

import { useEffect } from 'react';

// Critical CSS for above-the-fold content
const criticalCSS = `
  /* Critical styles for immediate rendering */
  * {
    box-sizing: border-box;
  }
  
  html {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.5;
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #111827;
    font-size: 16px;
  }
  
  /* Critical layout styles */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Critical header styles */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #e5e7eb;
  }
  
  /* Critical hero styles */
  .hero {
    background: linear-gradient(135deg, #2155CD 0%, #1e40af 100%);
    color: white;
    padding: 6rem 0 4rem;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1rem;
    line-height: 1.1;
  }
  
  .hero p {
    font-size: 1.25rem;
    margin: 0 0 2rem;
    opacity: 0.9;
  }
  
  /* Critical button styles */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #ffffff;
    color: #2155CD;
  }
  
  .btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  /* Critical loading states */
  .loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #2155CD;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Critical responsive styles */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }
    
    .hero p {
      font-size: 1rem;
    }
    
    .container {
      padding: 0 0.75rem;
    }
  }
  
  /* Critical accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  /* Critical focus styles */
  *:focus {
    outline: 2px solid #2155CD;
    outline-offset: 2px;
  }
  
  /* Critical reduced motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export function CriticalCSS() {
  useEffect(() => {
    // Only inject critical CSS if not already present
    if (!document.querySelector('#critical-css')) {
      const style = document.createElement('style');
      style.id = 'critical-css';
      style.textContent = criticalCSS;
      document.head.insertBefore(style, document.head.firstChild);
    }
  }, []);

  return null;
}

// Component for loading non-critical CSS
export function NonCriticalCSS({ href }: { href: string }) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  }, [href]);

  return null;
}

// Component for preloading critical resources
export function ResourcePreloader() {
  useEffect(() => {
    // Preload critical fonts
    const preloadFont = (href: string, as: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Preload critical images
    const preloadImage = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'image';
      document.head.appendChild(link);
    };

    // Preload critical scripts
    const preloadScript = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'script';
      document.head.appendChild(link);
    };

    // Add your critical resources here
    // preloadFont('/fonts/geist-sans.woff2', 'font');
    // preloadImage('/images/hero-bg.jpg');
    // preloadScript('/js/critical.js');
  }, []);

  return null;
}
