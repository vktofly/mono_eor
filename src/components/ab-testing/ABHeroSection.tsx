"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useABTest, ABTestingService } from "@/lib/ab-testing";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

const heroFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  interest: z.enum(["eor", "contractors", "pricing", "general"]).optional(),
  name: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

type HeroFormData = z.infer<typeof heroFormSchema>;

// Animated Text Component for Scale/Build
const AnimatedText = ({ words, className }: { words: string[]; className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log('AnimatedText mounted with words:', words);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % words.length;
        console.log('AnimatedText changing from', words[prev], 'to', words[next]);
        return next;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [words.length, words]);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
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
          className="inline-block"
          style={{
            textShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export function ABHeroSection() {
  const { variant, trackConversion } = useABTest("hero_headline_v1");
  const [submitting, setSubmitting] = useState(false);
  const [manualVariant, setManualVariant] = useState<string | null>(null);

  // Reset A/B test assignments to ensure Variant B is used
  useEffect(() => {
    const service = ABTestingService.getInstance();
    service.resetUserVariants();
  }, []);

  // Debug: Log current variant
  useEffect(() => {
    console.log('Current A/B test variant:', variant);
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HeroFormData>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      interest: "eor",
      company: "Not provided",
      name: "Not provided",
      message: "Interested in EOR services",
      source: "hero_form",
    },
  });

  // Default configuration (fallback) - Variant B
  const defaultConfig = {
    headline: "Save 40% on India Expansion with EOR Services",
    animatedWords: undefined,
    subheadline: "Hire top Indian talent without the complexity. 48-hour setup, 100% compliance, India-first expertise.",
    ctaText: "Save Money Now",
    ctaColor: "cta-500"
  };

  // Manual variant override for testing
  const getVariantConfig = (variantId: string) => {
    const variants = [
      {
        id: "control",
        config: {
          headline: "Scale your team in India without the complexity",
          animatedWords: ["Scale", "Build"],
          subheadline: "Hire top Indian talent in 48 hours with our EOR services. 40% cost savings, 100% compliance, India-first expertise.",
          ctaText: "Get Started",
          ctaColor: "cta-500"
        }
      },
      {
        id: "variant_b",
        config: {
          headline: "Save 40% on India Expansion with EOR Services",
          subheadline: "Hire top Indian talent without the complexity. 48-hour setup, 100% compliance, India-first expertise.",
          ctaText: "Save Money Now",
          ctaColor: "cta-500"
        }
      }
    ];
    return variants.find(v => v.id === variantId)?.config || defaultConfig;
  };

  // Force control variant as default (disable A/B testing for now)
  const config = manualVariant ? getVariantConfig(manualVariant) : getVariantConfig("control");

  // Debug: Log current config
  useEffect(() => {
    console.log('Using config:', config);
    console.log('Has animatedWords:', 'animatedWords' in config);
    console.log('animatedWords value:', 'animatedWords' in config ? (config as any).animatedWords : 'not found');
  }, [config]);

  const onSubmit = async (values: HeroFormData) => {
    console.log('Form submission started with values:', values);
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
      console.log('Sending request to /api/contact with data:', values);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', errorText);
        throw new Error(`API Error: ${res.status} - ${errorText}`);
      }
      
      const responseData = await res.json();
      console.log('API Response:', responseData);
      
      toast.success("Thanks! We'll reach out shortly.");
      trackEvent('hero_form_success');
      reset();
      // Navigate to contact page with pre-populated email
      window.location.href = `/contact?email=${encodeURIComponent(values.email)}&source=hero_form`;
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong. Please try again.");
      trackEvent('hero_form_error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCTAClick = () => {
    console.log('CTA button clicked');
    trackConversion("cta_click", 1);
    trackEvent('hero_cta_clicked', {
      cta_text: config.ctaText,
      ab_test_variant: variant?.id || 'variant_b'
    });
  };

  // Test function to verify form works
  const testFormSubmission = () => {
    const testData = {
      email: "test@example.com",
      company: "Test Company",
      interest: "eor" as const,
      name: "Test User",
      message: "Test message",
      source: "hero_form"
    };
    console.log('Testing form submission with:', testData);
    onSubmit(testData);
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              {manualVariant 
                ? `Manual: ${manualVariant === 'control' ? 'Control' : 'Variant B'}` 
                : 'Control Variant (Default)'
              }
            </span>
          </motion.div>

          {/* Dynamic Headline */}
          <motion.h1
            key={config.headline} // Force re-render when headline changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            {'animatedWords' in config && config.animatedWords ? (
              <>
                <AnimatedText 
                  words={config.animatedWords as string[]} 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 font-extrabold"
                />{" "}
                your team in India without the complexity
              </>
            ) : (
              config.headline
            )}
          </motion.h1>

          {/* Dynamic Subheadline */}
          <motion.p
            key={config.subheadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            {config.subheadline}
          </motion.p>

          {/* Enhanced Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
          >
            <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-green-400 text-xl font-bold">48</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Hour Setup</h3>
              <p className="text-white/70 text-sm">Start hiring immediately</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-blue-400 text-xl font-bold">40%</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Cost Savings</h3>
              <p className="text-white/70 text-sm">Compared to traditional hiring</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-purple-400 text-xl font-bold">100%</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Compliance</h3>
              <p className="text-white/70 text-sm">Full legal protection</p>
            </div>
          </motion.div>

          {/* Email capture form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 max-w-lg mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Hidden fields for required data */}
              <input type="hidden" {...register("company")} value="Not provided" />
              <input type="hidden" {...register("interest")} value="eor" />
              <input type="hidden" {...register("name")} value="Not provided" />
              <input type="hidden" {...register("message")} value="Interested in EOR services" />
              <input type="hidden" {...register("source")} value="hero_form" />
              
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your work email"
                className="w-full rounded-xl border-0 bg-white/20 px-6 py-4 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/30 focus:bg-white/25 transition-all touch-target text-lg"
                aria-label="Work email address"
                aria-describedby="email-error"
              />
              {errors.email && (
                <span id="email-error" className="text-red-300 text-sm">
                  {errors.email.message}
                </span>
              )}
              <motion.button
                type="submit"
                disabled={submitting}
                onClick={handleCTAClick}
                className={`w-full px-8 py-4 rounded-xl font-bold text-white transition-all touch-target text-lg ${
                  submitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : `bg-gradient-to-r from-${config.ctaColor} to-${config.ctaColor}-600 hover:from-${config.ctaColor}-600 hover:to-${config.ctaColor}-700 shadow-lg hover:shadow-xl`
                }`}
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
              
              <p className="text-white/70 text-sm text-center mt-4">
                Join 500+ companies already using our EOR services
              </p>
            </div>
          </motion.div>

          {/* A/B Test Switcher Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 text-center space-y-4"
          >
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setManualVariant(null)}
                className={`px-4 py-2 rounded text-sm ${
                  manualVariant === null 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                🎲 Random (A/B Test)
              </button>
              <button
                onClick={() => setManualVariant('control')}
                className={`px-4 py-2 rounded text-sm ${
                  manualVariant === 'control' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                📊 Control Variant
              </button>
              <button
                onClick={() => setManualVariant('variant_b')}
                className={`px-4 py-2 rounded text-sm ${
                  manualVariant === 'variant_b' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                💰 Variant B (Cost Focus)
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={testFormSubmission}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
              >
                🧪 Test Form Submission
              </button>
              <button
                onClick={() => setManualVariant('control')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                🎬 Force Control (Animated)
              </button>
            </div>
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
