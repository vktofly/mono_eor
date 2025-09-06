"use client";

import { motion } from "framer-motion";
import { useABTest } from "@/lib/ab-testing";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

const heroFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  interest: z.enum(["eor", "contractors", "pricing", "general"]),
});

type HeroFormData = z.infer<typeof heroFormSchema>;

export function ABHeroSection() {
  const { variant, trackConversion } = useABTest("hero_headline_v1");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroFormSchema),
  });

  // Default configuration (fallback)
  const defaultConfig = {
    headline: "Scale your team in India without the complexity",
    subheadline: "Hire top Indian talent in 48 hours with our EOR services. 40% cost savings, 100% compliance, India-first expertise.",
    ctaText: "Get Started",
    ctaColor: "cta-500"
  };

  const config = variant?.config || defaultConfig;

  const onSubmit = async (values: HeroFormData) => {
    setSubmitting(true);
    
    // Track A/B test conversion
    trackConversion("form_submission", 1);
    
    // Track general analytics
    trackEvent('hero_form_submitted', { 
      email: values.email,
      company: values.company,
      interest: values.interest,
      ab_test_variant: variant?.id || 'control'
    });
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Thanks! We'll reach out shortly.");
      trackEvent('hero_form_success');
      reset();
      // Navigate to contact page after successful submission
      window.location.href = '/contact';
    } catch {
      toast.error("Something went wrong. Please try again.");
      trackEvent('hero_form_error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCTAClick = () => {
    trackConversion("cta_click", 1);
    trackEvent('hero_cta_clicked', {
      cta_text: config.ctaText,
      ab_test_variant: variant?.id || 'control'
    });
  };

  return (
    <section className="bg-gradient-to-br from-brand-500 to-brand-600 text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* A/B Test Badge */}
          {variant && variant.id !== 'control' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Testing: {variant.name}</span>
            </motion.div>
          )}

          {/* Dynamic Headline */}
          <motion.h1
            key={config.headline} // Force re-render when headline changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            {config.headline}
          </motion.h1>

          {/* Dynamic Subheadline */}
          <motion.p
            key={config.subheadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {config.subheadline}
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/80 mb-8"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>48-Hour Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>40% Cost Savings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>100% Compliance</span>
            </div>
          </motion.div>

          {/* Email capture form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 max-w-md mx-auto"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
              <input
                {...register("email")}
                type="email"
                placeholder="Work email"
                className="flex-1 rounded-md border-0 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/20 transition-all touch-target"
                aria-label="Work email address"
                aria-describedby="email-error"
              />
              {errors.email && (
                <span id="email-error" className="text-red-300 text-sm sm:hidden">
                  {errors.email.message}
                </span>
              )}
              <motion.button
                type="submit"
                disabled={submitting}
                onClick={handleCTAClick}
                className={`inline-flex items-center justify-center rounded-md bg-${config.ctaColor} hover:opacity-90 px-6 py-3 text-sm font-medium disabled:opacity-50 transition-all touch-target min-h-[44px] text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`${config.ctaText} with EOR services`}
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Getting Started...
                  </div>
                ) : (
                  config.ctaText
                )}
              </motion.button>
            </form>
            {errors.email && (
              <p className="mt-2 text-sm text-red-200">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Additional Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-90"
          >
            <div className="text-center">
              <div className="text-3xl font-bold">48h</div>
              <div className="text-sm text-white/80">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-white/80">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">40%</div>
              <div className="text-sm text-white/80">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-white/80">Compliance</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
