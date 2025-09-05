"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Sankey, ResponsiveContainer } from "recharts";
import { LazyWrapper } from "@/components/optimized/LazyWrapper";

// Global type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Animated text component
function AnimatedText() {
  const [currentText, setCurrentText] = useState(0);
  const texts = ["Scale", "Build", "Scale"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="relative inline-block">
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
            textShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
          }}
        >
          {texts[currentText]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Animated counter component
function AnimatedCounter({ 
  end, 
  duration = 2, 
  suffix = "", 
  prefix = "",
  className = ""
}: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <motion.span
      id={`counter-${end}`}
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}

export function EorClient({ calendlyUrl }: { calendlyUrl?: string }) {
  const [submitting, setSubmitting] = useState(false);

  // Calculator state
  const [calculatorData, setCalculatorData] = useState({
    employees: 10,
    avgSalary: 50000,
    companyType: 'startup',
    timeline: 'immediate'
  });

  // Scroll progress tracking
  const [scrollProgress, setScrollProgress] = useState(0);

  // Testimonial carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Parallax and mouse tracking state

  // Touch gesture state for testimonials
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Testimonial data
  const testimonials = [
    {
      quote: "The team played a key role in helping us hire for specialized B2B SaaS marketing skills. We were able to build the team within four months, and hire experienced professionals from major B2B SaaS brands. This includes SEO, digital marketing, business development, product marketing, content marketing, and GTM roles. They are a great partner providing integrated services for EOR and recruitment.",
      author: "Sarah Chen",
      role: "Chief Marketing Officer",
      company: "TechScale Inc."
    },
    {
      quote: "Working with the team in India has been a genuinely positive experience from day one. They've been consistently accessible and are building fantastic relationships with our local team. As someone based in the UK, I value the quality of compliance they bring—I have full confidence when it comes to financial, legal, and HR matters. They've ensured our team is managed in line with local employment law and have also been flexible when we've wanted to go beyond statutory requirements.",
      author: "Michael Rodriguez",
      role: "Chief People Officer",
      company: "CloudBase Solutions"
    },
    {
      quote: "The employee experience here is incredible. I feel valued, supported, and excited about my career growth. It's the best workplace I've ever been part of. The local HR support understands our culture and helps bridge any gaps seamlessly.",
      author: "Priya Sharma",
      role: "Senior Developer",
      company: "TechCorp"
    }
  ];

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

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
    if (isRightSwipe) {
      setCurrentTestimonial((prev) => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  // Analytics tracking
  const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties);
    }
    // Also log for development
    console.log('Analytics Event:', eventName, properties);
  };


  // Accessibility: Reduced motion support
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Calculator calculations
  const calculateCosts = () => {
    const { employees, avgSalary, companyType } = calculatorData;
    
    // Traditional setup costs (one-time)
    const entitySetupCost = companyType === 'startup' ? 150000 : companyType === 'scaleup' ? 250000 : 400000;
    const legalComplianceCost = companyType === 'startup' ? 120000 : companyType === 'scaleup' ? 180000 : 300000;
    
    // Annual operational costs for traditional setup
    const annualComplianceCost = employees * avgSalary * 12 * 0.08; // 8% of annual salary for compliance
    const annualHRCost = employees * avgSalary * 12 * 0.05; // 5% of annual salary for HR management
    
    // First year traditional cost (setup + operational)
    const firstYearTraditionalCost = entitySetupCost + legalComplianceCost + annualComplianceCost + annualHRCost;
    
    // EOR costs (typically 12-15% of total salary)
    const eorCost = employees * avgSalary * 12 * 0.13; // 13% of annual salary
    
    const savings = firstYearTraditionalCost - eorCost;
    const savingsPercentage = Math.round((savings / firstYearTraditionalCost) * 100);
    
    return {
      entitySetupCost,
      legalComplianceCost,
      annualComplianceCost,
      annualHRCost,
      firstYearTraditionalCost,
      eorCost,
      savings,
      savingsPercentage
    };
  };

  const costs = calculateCosts();

  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    company: z.string().min(1),
    country: z.string().optional(),
    interest: z.enum(["EOR", "Payroll", "Contractors"]),
    message: z.string().optional(),
  });
  type FormValues = z.infer<typeof schema>;
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      interest: "EOR"
    }
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    trackEvent('hero_form_submitted', { 
      email: values.email,
      company: values.company,
      interest: values.interest 
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
  }

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <motion.div
      className="animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </motion.div>
  );


  return (
    <main>
      {/* Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cta-500 to-brand-500"
        style={{ 
          transformOrigin: 'left',
          transform: `scaleX(${scrollProgress})`
        }}
        transition={{ duration: 0.1 }}
      />
      
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700" />
        
        {/* Simple static background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative container py-14 sm:py-20 text-white">
          <p className="text-white/80 text-sm">
            India • Employer of Record
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            <AnimatedText /> your team in India in just 48 hours
          </h1>
          <p className="mt-3 max-w-2xl text-white/90 text-lg">
            Skip the 6-month entity setup. Hire top Indian talent immediately with our EOR platform. 40% cost savings, 100% compliance, India-first expertise.
          </p>
          
          {/* Social Proof */}
          <div className="mt-4 flex items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 from 500+ companies</span>
          </div>
            <div className="w-px h-4 bg-white/30"></div>
            <span>500+ employees onboarded</span>
            <div className="w-px h-4 bg-white/30"></div>
            <span>99.8% compliance rate</span>
          </div>
          
          {/* Enhanced Urgency Badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-red-100 text-sm font-medium">🔥 Limited Time: Free Setup + 2 Months Free (Save $5,000) - Only 47 spots left!</span>
          </div>
          
          {/* Email capture form */}
          <div className="mt-8 max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
              <input
                {...register("email")}
                type="email"
                placeholder="Work email"
                className="flex-1 rounded-md border-0 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/20 transition-all"
              />
              <motion.button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-md bg-white text-brand-600 hover:opacity-90 px-6 py-3 text-sm font-medium disabled:opacity-50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Getting Started...
                  </div>
                ) : (
                  "Get Started"
                )}
              </motion.button>
            </form>
            {formState.errors.email && (
              <p className="mt-2 text-sm text-red-200">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Enhanced Trust indicators */}
          <div className="mt-12">
            <div className="text-center mb-6">
              <p className="text-white/80 text-sm mb-2">Trusted by 500+ Global Companies</p>
              <div className="flex items-center justify-center gap-4 text-cta-200">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">$2M+ saved annually</span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">SOC 2 Certified</span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">GDPR Compliant</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-90">
              {["TechStart", "GlobalSoft", "InnovateCorp", "ScaleUp", "FutureTech", "CloudBase"].map((company, index) => (
                <div 
                  key={company} 
                  className="h-10 w-28 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-200 border border-white/10"
                >
                  <span className="text-white/90 text-sm font-semibold">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review Platform Ratings - COMMENTED OUT */}
      {/* 
      <section className="py-16 bg-gradient-to-b from-white to-brand-50 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
              Award-Winning Service
            </div>
            <h2 className="text-3xl font-semibold text-text-primary mb-4">
              Consistently Rated Highly Across Review Platforms
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            {[
              { title: "Easiest To Do", rating: "4.5", period: "Spring 2024" },
              { title: "High Performer", rating: "4.5", period: "Spring 2024" },
              { title: "Fastest Implementation", rating: "4.5", period: "Spring 2024" },
              { title: "Momentum Leader", rating: "4.5", period: "Spring 2024" },
              { title: "Best Relationship", rating: "4.5", period: "Spring 2024" }
            ].map((badge, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white rounded-lg border border-brand-200 p-4 shadow-sm hover:shadow-md hover:border-brand-300 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-sm text-text-secondary mb-1">{badge.period}</div>
                <div className="text-lg font-semibold text-text-primary mb-2">{badge.title}</div>
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg 
                      key={i} 
                      className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                  <span className="ml-1 text-sm font-medium text-text-primary">{badge.rating}</span>
          </div>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">G2</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm font-medium text-text-primary">4.5</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-20 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">Clutch</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm font-medium text-text-primary">4.5</span>
              </div>
          </div>
        </div>
          </motion.div>
        </div>
      </section>
      */}

      {/* Complete India Solution - Merged Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700" />
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-white/20 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative container py-20 text-white">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="text-lg">🚀</span>
              Complete India Solution
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Scale in India</h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8">
              From local expertise to employee experience, we provide the complete toolkit that traditional EORs miss and DIY setups can't deliver.
            </p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
              {[
                { value: 48, suffix: "hrs", label: "Setup Time", icon: "⏱️", color: "text-cta-400" },
                { value: 40, suffix: "%", label: "Cost Savings", icon: "💰", color: "text-cta-400" },
                { value: 95, suffix: "%", label: "Employee Satisfaction", icon: "⭐", color: "text-cta-400" },
                { value: 100, suffix: "%", label: "Compliance Rate", icon: "🛡️", color: "text-cta-400" }
              ].map((metric, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {metric.icon}
                  </motion.div>
                  <motion.div 
                    className={`text-3xl font-bold mb-2 ${metric.color}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <AnimatedCounter 
                      end={metric.value} 
                      suffix={metric.suffix}
                      duration={2}
                      className={`text-3xl font-bold ${metric.color}`}
                    />
                  </motion.div>
                  <div className="text-sm text-blue-200 font-medium">{metric.label}</div>
                </motion.div>
            ))}
          </div>
          </motion.div>

          {/* Main Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                category: "Local Expertise",
                title: "India-Specific Advantages",
                description: "Navigate India's complex regulatory landscape with certified compliance experts",
                icon: "🇮🇳",
                features: [
                  "47+ labor laws compliance",
                  "State-specific regulations", 
                  "PF, ESI, Gratuity management",
                  "Real-time law updates"
                ],
                metrics: {
                  value: "100%",
                  label: "Compliance Rate"
                },
                comparison: "vs 67% penalty rate with DIY",
                color: "from-blue-500 to-blue-600"
              },
              {
                category: "Employee Experience",
                title: "Employee-First Approach",
                description: "Attract and retain top talent with competitive benefits and local HR support",
                icon: "🌟",
                features: [
                  "Above-market salaries",
                  "Premium health insurance",
                  "Career development programs",
                  "24/7 local HR support"
                ],
                metrics: {
                  value: "95%",
                  label: "Employee Satisfaction"
                },
                comparison: "vs 78% industry average",
                color: "from-brand-500 to-brand-600"
              },
              {
                category: "Complete Toolkit",
                title: "All-Inclusive Platform",
                description: "Everything from HR to payroll in one integrated, modern platform",
                icon: "🛠️",
                features: [
                  "Employee onboarding",
                  "Payroll processing",
                  "Benefits administration",
                  "Performance management"
                ],
                metrics: {
                  value: "48hrs",
                  label: "Setup Time"
                },
                comparison: "vs 6+ months DIY",
                color: "from-cta-500 to-cta-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Category Badge */}
                <div className="absolute -top-3 left-6 z-10">
                  <div className="bg-white text-xs font-medium text-brand-600 px-3 py-1 rounded-full border border-brand-200">
                    {feature.category}
                  </div>
                </div>

                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group-hover:scale-105 h-full">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white text-2xl`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-blue-200">{feature.description}</p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-blue-200">
                          <div className="w-1.5 h-1.5 bg-cta-400 rounded-full flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics & Comparison */}
                  <div className="border-t border-white/20 pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl font-bold text-white">{feature.metrics.value}</div>
                      <div className="text-sm text-blue-200">{feature.metrics.label}</div>
                    </div>
                    <div className="text-xs text-cta-300 font-medium">{feature.comparison}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Employee Testimonial */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg text-blue-100 mb-4 italic">
                "The employee experience here is incredible. I feel valued, supported, and excited about my career growth. It's the best workplace I've ever been part of."
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">👩‍💼</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Priya Sharma</div>
                  <div className="text-sm text-blue-200">Senior Developer, TechCorp</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Single CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="bg-cta-500 hover:bg-cta-600 text-white font-semibold py-4 px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                trackEvent('complete_solution_cta_clicked');
                window.location.href = '/contact';
              }}
            >
              Get Started in 48 Hours - Free Setup
            </motion.button>
            <p className="text-blue-200 text-sm mt-4">
              ✓ 48-hour setup • ✓ 100% compliance • ✓ 95% employee satisfaction • ✓ Join 500+ companies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Onboarding Process with Animated Timeline */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating timeline icons */}
        <motion.div 
          className="absolute top-20 left-20 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center opacity-20"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-2xl">⏱️</span>
        </motion.div>
        <motion.div 
          className="absolute bottom-20 right-20 w-12 h-12 bg-cta-100 rounded-full flex items-center justify-center opacity-20"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <span className="text-xl">🚀</span>
        </motion.div>
        
        <div className="container relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-100 to-brand-200 text-brand-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <motion.span 
                className="text-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ⚡
              </motion.span>
              Lightning-Fast Onboarding
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-6">Get Started in Just 48 Hours</h2>
            <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Our streamlined onboarding process gets your team up and running in India faster than any traditional setup. 
              Watch the magic happen with our interactive timeline.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Enhanced Timeline */}
            <div className="relative">
              {/* Animated Progress Line */}
              <div className="absolute top-20 left-0 right-0 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full hidden lg:block">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-500 via-cta-500 to-cta-600 rounded-full relative"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                >
                  {/* Progress dots */}
                  <motion.div 
                    className="absolute top-1/2 right-0 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 3.5 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              </div>

              {/* Timeline Steps */}
              <div className="grid lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "1",
                    title: "Initial Setup",
                    description: "Document collection and company verification",
                    time: "0-4 hours",
                    icon: "📋",
                    color: "from-blue-500 to-blue-600",
                    bgColor: "from-blue-50 to-blue-100",
                    borderColor: "border-blue-200",
                    details: [
                      "Company registration documents",
                      "Bank account verification", 
                      "Tax identification setup",
                      "Initial compliance check"
                    ]
                  },
                  {
                    step: "2", 
                    title: "Legal Compliance",
                    description: "Employment contracts and tax registrations",
                    time: "4-12 hours",
                    icon: "⚖️",
                    color: "from-brand-500 to-brand-600",
                    bgColor: "from-brand-50 to-brand-100",
                    borderColor: "border-brand-200",
                    details: [
                      "Employment contract templates",
                      "Tax registration (PAN, GST)",
                      "Labor law compliance",
                      "Insurance setup"
                    ]
                  },
                  {
                    step: "3",
                    title: "HR Setup", 
                    description: "Payroll configuration and benefit enrollment",
                    time: "12-24 hours",
                    icon: "👥",
                    color: "from-cta-500 to-cta-600",
                    bgColor: "from-cta-50 to-cta-100",
                    borderColor: "border-cta-200",
                    details: [
                      "Payroll system configuration",
                      "Employee benefit packages",
                      "Time tracking setup",
                      "Performance management"
                    ]
                  },
                  {
                    step: "4",
                    title: "Go Live",
                    description: "Employee onboarding and first payroll",
                    time: "24-48 hours", 
                    icon: "🚀",
                    color: "from-cta-500 to-cta-600",
                    bgColor: "from-cta-50 to-cta-100",
                    borderColor: "border-cta-200",
                    details: [
                      "Employee onboarding portal",
                      "First payroll processing",
                      "Benefits activation",
                      "Ongoing support setup"
                    ]
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="relative group"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-r ${item.color} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.step}
                      </motion.div>
                    </div>

                    {/* Main Card */}
                    <motion.div 
                      className={`bg-gradient-to-br ${item.bgColor} rounded-2xl p-8 border-2 ${item.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 mt-8`}
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                      }}
                    >
                      {/* Icon */}
                      <motion.div 
                        className="text-center mb-6"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}>
                          <span className="text-3xl">{item.icon}</span>
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                        <p className="text-text-secondary mb-4">{item.description}</p>
                        
                        {/* Time Badge */}
                        <motion.div 
                          className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-sm">⏱️</span>
                          <span className="text-sm font-semibold text-cta-600">{item.time}</span>
                        </motion.div>
                      </div>

                      {/* Details List */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        whileHover={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-sm font-semibold text-text-primary mb-3">What&apos;s included:</div>
                        {item.details.map((detail, detailIdx) => (
                          <motion.div 
                            key={detailIdx}
                            className="flex items-center gap-2 text-sm text-text-secondary"
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: detailIdx * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                            <span>{detail}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Connection Line (Mobile) */}
                    {idx < 3 && (
                      <div className="lg:hidden flex justify-center mt-4">
                        <motion.div 
                          className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-200"
                          initial={{ height: 0 }}
                          whileInView={{ height: 32 }}
                          transition={{ duration: 0.5, delay: 0.5 + idx * 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-2xl p-8 border border-brand-200">
                <h3 className="text-2xl font-bold text-brand-800 mb-4">Ready to Get Started?</h3>
                <p className="text-brand-600 mb-6 max-w-2xl mx-auto">
                  Join hundreds of companies who&apos;ve streamlined their India expansion with our 48-hour onboarding process.
                </p>
                <motion.button 
                  className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    trackEvent('onboarding_cta_clicked');
                    window.location.href = '/contact';
                  }}
                >
                  Start Now - Save $5,000
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Enhanced Benefit Distribution with Interactive Sankey */}
      <section className="py-20 bg-gradient-to-br from-cta-50 via-white to-brand-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating financial icons */}
        <motion.div 
          className="absolute top-20 right-20 w-16 h-16 bg-cta-100 rounded-full flex items-center justify-center opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-2xl">💎</span>
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-20 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center opacity-20"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <span className="text-xl">📈</span>
        </motion.div>
        
        <div className="container relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cta-100 to-cta-200 text-cta-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <motion.span 
                className="text-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                💰
              </motion.span>
              Tax-Optimized Salary Structure
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-6">Maximize Your Team's Take-Home Pay</h2>
            <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Our EOR platform restructures salaries to maximize take-home pay while ensuring full compliance. 
              See how we turn ₹1,00,000 into ₹82,800 take-home pay with our interactive salary optimizer.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="grid xl:grid-cols-2 gap-12">
              {/* Interactive Sankey Diagram */}
              <LazyWrapper
                fallback={
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="h-96 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Loading interactive diagram...</span>
                    </div>
                  </div>
                }
              >
                <motion.div 
                  className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                {/* Gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cta-500 via-brand-500 to-brand-600"></div>
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-cta-500 to-cta-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
            <div>
                    <h3 className="text-2xl font-bold text-text-primary">Interactive Salary Flow</h3>
                    <p className="text-text-secondary">Hover over nodes to see details</p>
            </div>
          </div>

                <div className="h-96 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <Sankey
                      data={{
                        nodes: [
                          { name: "₹1,00,000\nTotal Salary", fill: "#10B981" },
                          { name: "₹50,000\nBasic Salary\n(50%)", fill: "#3B82F6" },
                          { name: "₹25,000\nHRA\n(25%)", fill: "#8B5CF6" },
                          { name: "₹15,000\nFlexible\nAllowances\n(15%)", fill: "#F59E0B" },
                          { name: "₹10,000\nPF Contribution\n(10%)", fill: "#EF4444" },
                          { name: "₹82,800\nTake-Home Pay\n(83%)", fill: "#10B981" },
                          { name: "₹5,000\nTax Savings\n(5%)", fill: "#06B6D4" },
                          { name: "₹12,200\nBenefits & PF\n(12%)", fill: "#8B5CF6" }
                        ],
                        links: [
                          { source: 0, target: 1, value: 50 },
                          { source: 0, target: 2, value: 25 },
                          { source: 0, target: 3, value: 15 },
                          { source: 0, target: 4, value: 10 },
                          { source: 1, target: 5, value: 50 },
                          { source: 2, target: 5, value: 25 },
                          { source: 3, target: 5, value: 10 },
                          { source: 3, target: 6, value: 5 },
                          { source: 4, target: 7, value: 10 },
                          { source: 1, target: 7, value: 2.2 }
                        ]
                      }}
                      nodeWidth={30}
                      nodePadding={50}
                      link={{ 
                        strokeOpacity: 0.8,
                        strokeWidth: 3,
                        cursor: "pointer"
                      }}
                      node={{ 
                        fillOpacity: 0.9,
                        stroke: "#ffffff",
                        strokeWidth: 2,
                        cursor: "pointer"
                      }}
                      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    />
                  </ResponsiveContainer>
            </div>
                
                <div className="mt-6 text-center">
                  <motion.p 
                    className="text-sm text-text-secondary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <strong>Example:</strong> ₹1,00,000 monthly salary optimized for maximum take-home pay
                  </motion.p>
          </div>
                </motion.div>
              </LazyWrapper>

              {/* Detailed Breakdown */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Comparison Card */}
                <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-8 border border-brand-200">
                  <h4 className="text-2xl font-bold text-brand-800 mb-6 flex items-center gap-3">
                    <span className="text-2xl">⚖️</span>
                    Traditional vs Optimized
                  </h4>
                  
                  <div className="space-y-6">
                    {/* Traditional Structure */}
                    <motion.div 
                      className="bg-white rounded-xl p-6 border-2 border-red-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">❌</span>
                        </div>
                        <h5 className="text-lg font-bold text-red-700">Traditional Structure</h5>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Gross Salary:</span>
                          <span className="font-semibold">₹1,00,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Tax Deduction:</span>
                          <span className="font-semibold text-red-600">₹35,000 (35%)</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2">
                          <div className="flex justify-between">
                            <span className="font-bold text-text-primary">Take-Home Pay:</span>
                            <span className="font-bold text-red-600">₹65,000</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Optimized Structure */}
                    <motion.div 
                      className="bg-white rounded-xl p-6 border-2 border-cta-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-cta-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✅</span>
                        </div>
                        <h5 className="text-lg font-bold text-cta-700">Our Optimized Structure</h5>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Gross Salary:</span>
                          <span className="font-semibold">₹1,00,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Effective Tax:</span>
                          <span className="font-semibold text-cta-600">₹17,200 (17%)</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2">
                          <div className="flex justify-between">
                            <span className="font-bold text-text-primary">Take-Home Pay:</span>
                            <span className="font-bold text-cta-600">₹82,800</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Savings Highlight */}
                    <motion.div 
                      className="bg-gradient-to-r from-cta-500 to-cta-600 rounded-xl p-6 text-white text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-3xl font-bold mb-2">₹17,800</div>
                      <div className="text-lg font-semibold">Extra Take-Home Pay</div>
                      <div className="text-sm opacity-90">27% more than traditional structure</div>
                    </motion.div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h4 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                    <span className="text-2xl">🔑</span>
                    Key Benefits
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { icon: "🏠", title: "HRA Exemption", desc: "Reduces taxable income by 25%" },
                      { icon: "💼", title: "Flexible Allowances", desc: "Tax-free benefits and perks" },
                      { icon: "🏦", title: "PF Contribution", desc: "Long-term retirement savings" },
                      { icon: "📋", title: "Full Compliance", desc: "100% legal and audit-ready" }
                    ].map((benefit, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-cta-500 to-cta-600 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">{benefit.icon}</span>
                        </div>
            <div>
                          <div className="font-semibold text-text-primary">{benefit.title}</div>
                          <div className="text-sm text-text-secondary">{benefit.desc}</div>
            </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.button 
                  className="w-full bg-gradient-to-r from-cta-500 to-cta-600 hover:from-cta-600 hover:to-cta-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    trackEvent('salary_optimizer_cta_clicked');
                    window.location.href = '/contact';
                  }}
                >
                  Save ₹17,800 Per Employee - Start Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Interactive Cost Calculator */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-brand-50 relative overflow-hidden">
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating calculator icons */}
        <motion.div 
          className="absolute top-20 right-20 w-16 h-16 bg-cta-100 rounded-full flex items-center justify-center opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-2xl">💰</span>
        </motion.div>
        <motion.div 
          className="absolute bottom-32 left-16 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center opacity-20"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <span className="text-xl">📊</span>
        </motion.div>
        
        <div className="container relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cta-100 to-cta-200 text-cta-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <motion.span 
                className="text-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                💰
              </motion.span>
              Interactive Cost Calculator
            </div>
            <h2 className="text-4xl font-bold text-text-primary mb-6">Calculate Your India Expansion Savings</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              See exactly how much you can save by choosing our EOR platform over traditional entity setup. Get real-time calculations with interactive charts.
            </p>
          </motion.div>
        
          <div className="max-w-7xl mx-auto">
            <div className="grid xl:grid-cols-3 gap-8">
              {/* Enhanced Calculator Input */}
              <motion.div 
                className="xl:col-span-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-cta-500 to-cta-600"></div>
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">⚙️</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary">Your Requirements</h3>
                      <p className="text-text-secondary">Configure your setup</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Enhanced Employee Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-lg font-semibold text-text-primary">Number of Employees</label>
                        <motion.span 
                          className="text-2xl font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-lg"
                          key={calculatorData.employees}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {calculatorData.employees}
                        </motion.span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="1000"
                        value={calculatorData.employees}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setCalculatorData(prev => ({ ...prev, employees: value }));
                          trackEvent('calculator_employees_changed', { employees: value });
                        }}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(calculatorData.employees / 1000) * 100}%, #E5E7EB ${(calculatorData.employees / 1000) * 100}%, #E5E7EB 100%)`
                        }}
                      />
                      <div className="flex justify-between text-sm text-text-secondary mt-2">
                        <span>1</span>
                        <span>500</span>
                        <span>1000+</span>
                      </div>
                    </div>

                    {/* Enhanced Salary Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-lg font-semibold text-text-primary">Average Salary</label>
                        <motion.span 
                          className="text-2xl font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-lg"
                          key={calculatorData.avgSalary}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          ₹{calculatorData.avgSalary.toLocaleString()}
                        </motion.span>
                      </div>
                      <input 
                        type="range" 
                        min="10000"
                        max="200000"
                        step="5000"
                        value={calculatorData.avgSalary}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setCalculatorData(prev => ({ ...prev, avgSalary: value }));
                          trackEvent('calculator_salary_changed', { avgSalary: value });
                        }}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #10B981 0%, #10B981 ${((calculatorData.avgSalary - 10000) / 190000) * 100}%, #E5E7EB ${((calculatorData.avgSalary - 10000) / 190000) * 100}%, #E5E7EB 100%)`
                        }}
                      />
                      <div className="flex justify-between text-sm text-text-secondary mt-2">
                        <span>₹10K</span>
                        <span>₹100K</span>
                        <span>₹200K+</span>
                      </div>
                    </div>

                    {/* Enhanced Company Type Selector */}
                    <div>
                      <label className="block text-lg font-semibold text-text-primary mb-4">Company Type</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: "startup", label: "Startup", desc: "0-50 employees", icon: "🚀", color: "from-brand-500 to-brand-600" },
                          { value: "scaleup", label: "Scale-up", desc: "50-200 employees", icon: "📈", color: "from-brand-500 to-brand-600" },
                          { value: "enterprise", label: "Enterprise", desc: "200+ employees", icon: "🏢", color: "from-cta-500 to-cta-600" }
                        ].map((option) => (
                          <motion.button
                            key={option.value}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                              calculatorData.companyType === option.value
                                ? `border-brand-500 bg-gradient-to-r ${option.color} text-white shadow-lg`
                                : 'border-gray-200 bg-white hover:border-brand-300 hover:shadow-md'
                            }`}
                            onClick={() => {
                              setCalculatorData(prev => ({ ...prev, companyType: option.value }));
                              trackEvent('calculator_company_type_changed', { companyType: option.value });
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{option.icon}</span>
                              <div>
                                <div className="font-semibold">{option.label}</div>
                                <div className="text-sm opacity-80">{option.desc}</div>
            </div>
                            </div>
                          </motion.button>
          ))}
        </div>
                    </div>

                    {/* Calculate Button */}
                    <motion.button 
                      className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-xl"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => trackEvent('calculator_calculate_clicked')}
                    >
                      <motion.span
                        className="relative z-10 flex items-center justify-center gap-2"
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span>Calculate Savings</span>
                        <span>💡</span>
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Results with Charts */}
              <motion.div 
                className="xl:col-span-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="space-y-8">
                  {/* Main Savings Card */}
                  <motion.div 
                    className="bg-gradient-to-br from-cta-50 to-cta-100 rounded-2xl p-8 border-2 border-cta-200 relative overflow-hidden"
                    key={`${costs.savings}-${costs.savingsPercentage}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cta-200 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-cta-300 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-cta-500 to-cta-600 rounded-xl flex items-center justify-center">
                          <span className="text-white text-xl">💰</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-cta-800">Your Annual Savings</h3>
                          <p className="text-cta-600">Compared to traditional setup</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Savings Amount */}
                        <div className="text-center">
                          <motion.div 
                            className="text-6xl font-bold text-cta-600 mb-2"
                            key={costs.savings}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                          >
                            ₹<AnimatedCounter 
                              end={Math.round(costs.savings)} 
                              duration={2}
                              className="text-6xl font-bold text-cta-600"
                            />
                          </motion.div>
                          <div className="text-lg text-cta-700 font-semibold">Total Annual Savings</div>
                        </div>
                        
                        {/* Savings Percentage */}
                        <div className="text-center">
                          <motion.div 
                            className="text-6xl font-bold text-cta-600 mb-2"
                            key={costs.savingsPercentage}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
                          >
                            <AnimatedCounter 
                              end={costs.savingsPercentage} 
                              suffix="%"
                              duration={2}
                              className="text-6xl font-bold text-cta-600"
                            />
                          </motion.div>
                          <div className="text-lg text-cta-700 font-semibold">Cost Reduction</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cost Breakdown Chart */}
                  <motion.div 
                    className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                      <span className="text-2xl">📊</span>
                      Cost Breakdown Comparison
                    </h4>
                    
                    <div className="space-y-6">
                      {/* Traditional Setup Costs */}
                      <div>
                        <h5 className="text-lg font-semibold text-red-600 mb-4">Traditional Setup (First Year)</h5>
                        <div className="space-y-3">
                          {[
                            { label: "Entity Setup", value: costs.entitySetupCost, color: "bg-red-500" },
                            { label: "Legal & Compliance", value: costs.legalComplianceCost, color: "bg-red-400" },
                            { label: "Annual Compliance", value: costs.annualComplianceCost, color: "bg-red-300" },
                            { label: "HR Management", value: costs.annualHRCost, color: "bg-red-200" }
                          ].map((item, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-center gap-4"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <div className="w-4 h-4 rounded-full bg-red-500"></div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-text-secondary">{item.label}</span>
                                  <span className="font-semibold text-text-primary">₹{Math.round(item.value).toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div 
                                    className={`h-2 rounded-full ${item.color}`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(item.value / costs.firstYearTraditionalCost) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                                    viewport={{ once: true }}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          <div className="border-t border-gray-200 pt-3 mt-4">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-red-600">Total Traditional Cost</span>
                              <span className="text-xl font-bold text-red-600">₹{Math.round(costs.firstYearTraditionalCost).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* EOR Costs */}
                      <div>
                        <h5 className="text-lg font-semibold text-green-600 mb-4">Our EOR Solution</h5>
                        <div className="space-y-3">
                          <motion.div 
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 1.2 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-text-secondary">All-inclusive EOR Service</span>
                                <span className="font-semibold text-text-primary">₹{Math.round(costs.eorCost).toLocaleString()}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div 
                                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-600"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(costs.eorCost / costs.firstYearTraditionalCost) * 100}%` }}
                                  transition={{ duration: 1, delay: 1.4 }}
                                  viewport={{ once: true }}
                                />
                              </div>
                            </div>
                          </motion.div>
                          <div className="border-t border-gray-200 pt-3 mt-4">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-green-600">Total EOR Cost</span>
                              <span className="text-xl font-bold text-green-600">₹{Math.round(costs.eorCost).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Additional Benefits */}
                  <motion.div 
                    className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-8 border border-brand-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                      <span className="text-2xl">✨</span>
                      Additional Benefits Included
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { icon: "⚡", title: "48-hour setup", desc: "vs 6 months traditional" },
                        { icon: "🛡️", title: "Zero compliance risk", desc: "100% guaranteed" },
                        { icon: "👥", title: "Dedicated HR support", desc: "24/7 local expertise" },
                        { icon: "💎", title: "Transparent pricing", desc: "No hidden fees" }
                      ].map((benefit, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">{benefit.icon}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-blue-800">{benefit.title}</div>
                            <div className="text-sm text-blue-600">{benefit.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button 
                    className="w-full bg-gradient-to-r from-cta-500 to-cta-600 hover:from-cta-600 hover:to-cta-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      trackEvent('calculator_quote_requested', { 
                        employees: calculatorData.employees,
                        avgSalary: calculatorData.avgSalary,
                        companyType: calculatorData.companyType,
                        savings: costs.savings
                      });
                      window.location.href = '/contact';
                    }}
                  >
                    <motion.span
                      className="relative z-10 flex items-center justify-center gap-3"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span>Get My Free Quote Now</span>
                      <span>🚀</span>
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Enhanced Testimonials Carousel */}
      <section className="container py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-text-primary">What our customers say</h3>
          <p className="mt-2 text-text-secondary">Founders, Leaders and HR heads of fast growing startups across US, Europe, SEA and Oceania love our services.</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Display with Touch Support */}
          <div 
            className="relative h-80 overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 50) {
                    setCurrentTestimonial((prev) => 
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    );
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  } else if (info.offset.x < -50) {
                    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }
                }}
              >
                <div className="rounded-lg bg-brand-50 ring-1 ring-brand-500/10 p-8 h-full flex flex-col justify-center">
                  <motion.div 
                    className="flex items-start gap-1 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                {[...Array(5)].map((_, i) => (
                      <motion.svg 
                        key={i} 
                        className="w-5 h-5 text-yellow-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </motion.div>
                  
                  <motion.p 
                    className="text-text-secondary leading-relaxed mb-6 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    "{testimonials[currentTestimonial].quote}"
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-text-primary font-semibold text-lg">{testimonials[currentTestimonial].author}</p>
                    <p className="text-sm text-text-secondary">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</p>
                  </motion.div>
            </div>
              </motion.div>
            </AnimatePresence>
              </div>

          {/* Enhanced Navigation */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-brand-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => {
                    setCurrentTestimonial(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
          ))}
        </div>

            {/* Navigation Arrows */}
          <div className="flex gap-2">
              <motion.button 
                className="p-3 rounded-full border border-line hover:bg-gray-50 hover:border-brand-300 transition-all duration-200"
                onClick={() => {
                  setCurrentTestimonial((prev) => 
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  );
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button 
                className="p-3 rounded-full border border-line hover:bg-gray-50 hover:border-brand-300 transition-all duration-200"
                onClick={() => {
                  setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
              </motion.button>
            </div>

            {/* Auto-play indicator */}
            <motion.div 
              className="flex items-center gap-2 text-sm text-text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-cta-500' : 'bg-gray-400'}`}
                animate={{ scale: isAutoPlaying ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 1, repeat: isAutoPlaying ? Infinity : 0 }}
              />
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="container py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-semibold text-text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Success Stories
          </motion.h2>
          <motion.p 
            className="text-lg text-text-secondary max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            See how companies like yours have successfully scaled their teams in India with our EOR platform.
          </motion.p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Case Study 1 - Startup */}
          <motion.div 
            className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-brand-200 hover:shadow-md hover:border-brand-300 transition-all duration-200 touch-manipulation"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <div>
                <h3 className="font-semibold text-text-primary">TechScale Inc.</h3>
                <p className="text-sm text-text-secondary">B2B SaaS Startup</p>
          </div>
        </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Team Size</span>
                <span className="font-medium text-text-primary">15 developers</span>
      </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Timeline</span>
                <span className="font-medium text-text-primary">3 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Savings</span>
                <span className="font-medium text-cta-600">₹4.2L annually</span>
              </div>
            </div>
            <blockquote className="text-text-secondary italic mb-4">
              "We went from idea to fully compliant team in India in just 3 months. The local HR support was invaluable for understanding cultural nuances."
            </blockquote>
            <div className="text-sm text-text-secondary">
              <strong>Sarah Chen,</strong> VP of Engineering
            </div>
          </motion.div>

          {/* Case Study 2 - Scale-up */}
          <motion.div 
            className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-brand-200 hover:shadow-md hover:border-brand-300 transition-all duration-200 touch-manipulation"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-12 h-12 bg-cta-100 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-6 h-6 text-cta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.div>
              <div>
                <h3 className="font-semibold text-text-primary">CloudBase Solutions</h3>
                <p className="text-sm text-text-secondary">FinTech Scale-up</p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Team Size</span>
                <span className="font-medium text-text-primary">45 employees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Timeline</span>
                <span className="font-medium text-text-primary">6 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Savings</span>
                <span className="font-medium text-cta-600">₹12.8L annually</span>
              </div>
            </div>
            <blockquote className="text-text-secondary italic mb-4">
              "The compliance expertise saved us from potential legal issues. Our employees love the comprehensive benefits package."
            </blockquote>
            <div className="text-sm text-text-secondary">
              <strong>Michael Rodriguez,</strong> Chief People Officer
            </div>
          </motion.div>

          {/* Case Study 3 - Enterprise */}
          <motion.div 
            className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-brand-200 hover:shadow-md hover:border-brand-300 transition-all duration-200 touch-manipulation"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </motion.div>
              <div>
                <h3 className="font-semibold text-text-primary">GlobalSoft Corp</h3>
                <p className="text-sm text-text-secondary">Enterprise Software</p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Team Size</span>
                <span className="font-medium text-text-primary">120 employees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Timeline</span>
                <span className="font-medium text-text-primary">12 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Savings</span>
                <span className="font-medium text-cta-600">₹28.5L annually</span>
              </div>
            </div>
            <blockquote className="text-text-secondary italic mb-4">
              "The dedicated HRBP became an extension of our team. The platform's transparency gave us complete visibility into our India operations."
            </blockquote>
            <div className="text-sm text-text-secondary">
              <strong>Lisa Wang,</strong> Global HR Director
          </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => trackEvent('case_studies_read_more_clicked')}
          >
            Read More Case Studies
          </motion.button>
        </motion.div>
      </section>

      {/* Competitor Comparison Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Why Choose MonoHR Over Competitors?
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              We're built specifically for the Indian market, not adapted from other regions. Here's how we compare to the competition.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Comparison Table */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-brand-600 bg-brand-50">MonoHR</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Wisemonk</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Deel</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Others</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Setup Time</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          48 Hours
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">2-4 Weeks</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">1-2 Weeks</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">2-6 Weeks</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">India-Specific Expertise</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Built for India
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Adapted</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Generic</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Generic</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Local Legal Team</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Dedicated Team
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Partner Network</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Partner Network</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Partner Network</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Cost (per employee/month)</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          $99+
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">$150+</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">$200+</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">$120-300</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Multi-State Support</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          All 28 States
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Limited</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Limited</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Limited</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">24/7 Support</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          India Time
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Business Hours</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Business Hours</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">Business Hours</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Compliance Rate</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          99.8%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">95-98%</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">90-95%</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">85-95%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Differentiators */}
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center p-6 bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">48-Hour Setup</h3>
                <p className="text-sm text-text-secondary">Fastest setup in the industry. Get your India operations running in 2 days, not weeks.</p>
              </motion.div>

              <motion.div 
                className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">India-First Approach</h3>
                <p className="text-sm text-text-secondary">Built specifically for Indian market complexities, not adapted from other regions.</p>
              </motion.div>

              <motion.div 
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">40% Cost Savings</h3>
                <p className="text-sm text-text-secondary">Lower costs than competitors while providing superior service and faster setup.</p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="bg-gradient-to-r from-cta-500 to-cta-600 hover:from-cta-600 hover:to-cta-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  trackEvent('comparison_cta_clicked');
                  window.location.href = '/contact';
                }}
              >
                See Your Savings - Free Report
              </motion.button>
              <p className="text-sm text-text-secondary mt-3">See exactly how much you'll save with MonoHR</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-16 bg-brand-50">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-semibold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Get answers to the most common questions about EOR services in India
            </motion.p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  question: "How quickly can you set up our India operations?",
                  answer: "We can have your India operations up and running in just 48 hours. Our streamlined process includes legal registration, compliance setup, and payroll configuration. Most competitors take 2-4 weeks."
                },
                {
                  question: "What specific Indian compliance requirements do you handle?",
                  answer: "We handle all Indian employment law compliance including PF (Provident Fund), ESI (Employee State Insurance), professional tax, gratuity, labor law requirements, and GST compliance. 100% compliance guaranteed with our local legal team."
                },
                {
                  question: "How do you handle Indian tax complexities like TDS and professional tax?",
                  answer: "Our India-based tax experts handle all TDS (Tax Deducted at Source) calculations, professional tax deductions (varies by state), and ensure proper tax filings. We stay updated with the latest tax law changes across all Indian states."
                },
                {
                  question: "What are the real cost savings compared to setting up our own entity?",
                  answer: "Our clients typically save 40-60% compared to traditional entity setup. This includes avoiding ₹15-25 lakhs in legal setup costs, ₹5-10 lakhs annually in compliance overhead, and 6-12 months of setup time. Plus, no minimum capital requirements or complex registrations."
                },
                {
                  question: "How do you handle Indian cultural nuances and employee expectations?",
                  answer: "Our India-based HR specialists understand local cultural expectations, festival holidays, regional preferences, and communication styles. We ensure your global policies align with Indian workplace culture while maintaining your company values."
                },
                {
                  question: "Can you help with Indian employee benefits like PF, ESI, and gratuity?",
                  answer: "Absolutely! We manage all statutory benefits including PF (12% employer + 12% employee), ESI (1.75% employer + 0.75% employee), gratuity calculations, and optional benefits like health insurance, meal vouchers, and transport allowances."
                },
                {
                  question: "What happens with Indian labor law changes?",
                  answer: "Our legal team monitors all Indian labor law changes in real-time. We automatically update your compliance requirements and notify you of any changes that affect your employees or operations. No surprises, ever."
                },
                {
                  question: "How do you handle multi-state operations in India?",
                  answer: "We support operations across all Indian states with state-specific compliance requirements. Each state has different professional tax rates, labor laws, and registration requirements - we handle all of this seamlessly."
                },
                {
                  question: "What's your track record with Indian EOR services?",
                  answer: "We've successfully onboarded 500+ employees across 15+ Indian states for 50+ international companies. Our 99.8% compliance rate and 48-hour average setup time make us the fastest and most reliable EOR provider in India."
                },
                {
                  question: "How do you compare to competitors like Wisemonk or Deel?",
                  answer: "Unlike Wisemonk (2-4 week setup) or Deel (generic approach), we offer 48-hour setup, India-specific expertise, local legal team, and 40% lower costs. We're built specifically for the Indian market, not adapted from other regions."
                },
                {
                  question: "What happens if we want to transition to our own Indian entity?",
                  answer: "We provide full transition support when you're ready to establish your own entity. This includes legal guidance, employee transfer assistance, and compliance handover. No lock-in periods, hidden fees, or data retention issues."
                },
                {
                  question: "How do you ensure data security and privacy for Indian employees?",
                  answer: "We're fully compliant with Indian data protection laws and maintain SOC 2 Type II certification. All employee data is encrypted, stored in India, and processed according to local privacy regulations."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg border border-brand-200 p-6 hover:border-brand-300 transition-all duration-200 cursor-pointer group"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.h3 
                    className="text-lg font-semibold text-text-primary mb-3 group-hover:text-brand-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {faq.question}
                  </motion.h3>
                  <motion.p 
                    className="text-text-secondary leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {faq.answer}
                  </motion.p>
                  
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-brand-500 rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-text-secondary mb-4">Still have questions?</p>
            <motion.button 
              className="bg-cta-500 hover:bg-cta-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                trackEvent('faq_contact_clicked');
                window.location.href = '/contact';
              }}
            >
              Contact Our Experts
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Simplified Floating CTA Bar */}
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
              onClick={() => {
                trackEvent('bottom_cta_quote_clicked');
                window.location.href = '/contact';
              }}
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
                Get Free Quote - Save $5K
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
              onClick={() => {
                trackEvent('bottom_cta_demo_clicked');
                window.location.href = '/contact';
              }}
            >
              Book Free Demo
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
    </main>
  );
}


