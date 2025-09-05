"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ReadingProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cta-500 to-brand-500"
      style={{ 
        transformOrigin: 'left',
        transform: `scaleX(${scrollProgress})`
      }}
      transition={{ duration: 0.1 }}
    />
  );
}
