"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set countdown to end of current month
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 mb-6"
    >
      <div className="text-center">
        <p className="text-sm font-medium mb-2">⏰ Limited Time Offer Ends In:</p>
        <div className="flex justify-center gap-4">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[50px]">
                <div className="text-xl font-bold">{item.value.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-90">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs mt-2 opacity-90">Free setup + 2 months free offer expires soon!</p>
      </div>
    </motion.div>
  );
}
