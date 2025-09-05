"use client";

import { motion } from "framer-motion";

interface FloatingCTAProps {
  onQuoteClick: () => void;
  onDemoClick: () => void;
}

export function FloatingCTA({ onQuoteClick, onDemoClick }: FloatingCTAProps) {
  return (
    <motion.div 
      className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 100 }}
    >
      <div className="container py-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 100 }}
        >
          <motion.p 
            className="text-sm font-medium text-text-primary"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Ready to scale your team in India?
          </motion.p>
          <p className="text-xs text-text-secondary">48-hour setup • 100% compliance • 40% cost savings</p>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4, type: "spring", stiffness: 100 }}
        >
          <motion.button 
            className="inline-flex items-center justify-center rounded-lg bg-cta-500 hover:bg-cta-600 text-white px-8 py-3 text-sm font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cta-300 transition-all duration-200 relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onQuoteClick}
          >
            <motion.span
              className="relative z-10"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Get Free Quote
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
          
          <motion.button 
            className="inline-flex items-center justify-center rounded-lg text-brand-600 hover:text-brand-700 border-2 border-brand-200 hover:border-brand-300 bg-white px-6 py-3 text-sm font-medium hover:bg-brand-50 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-200 transition-all duration-200"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDemoClick}
          >
            Book Demo
          </motion.button>
        </motion.div>
      </div>
      
      {/* Pulse indicator */}
      <motion.div
        className="absolute top-0 left-1/2 w-2 h-2 bg-cta-500 rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
