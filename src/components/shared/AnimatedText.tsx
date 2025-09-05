"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function AnimatedText({ texts, interval = 3000, className = "" }: AnimatedTextProps) {
  const [currentText, setCurrentText] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          initial={{ 
            opacity: 0, 
            y: 20, 
            scale: 0.8,
            rotateX: -90
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0
          }}
          exit={{ 
            opacity: 0, 
            y: -20, 
            scale: 0.8,
            rotateX: 90
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="inline-block bg-gradient-to-r from-cta-400 to-cta-500 bg-clip-text text-transparent font-bold"
          style={{
            textShadow: "0 0 30px rgba(255, 122, 0, 0.3)"
          }}
        >
          {texts[currentText]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
