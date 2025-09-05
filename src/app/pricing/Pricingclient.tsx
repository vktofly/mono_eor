"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ReadingProgress } from "@/components/shared/ReadingProgress";
import { FloatingCTA } from "@/components/shared/FloatingCTA";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

// Global type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Form validation schema
const pricingFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  employees: z.string().min(1, "Please select number of employees"),
  interest: z.enum(["starter", "professional", "enterprise", "demo", "quote"]),
});

type PricingFormData = z.infer<typeof pricingFormSchema>;

// Pricing tiers data
const pricingTiers = [
  {
    name: "Starter",
    tagline: "Perfect for small teams",
    price: 299,
    priceNote: "base + $89/employee",
    employeeRange: "1-10 employees",
    popular: false,
    features: [
      "48-hour setup guarantee",
      "Basic EOR services",
      "Email support",
      "Payroll processing",
      "Compliance management",
      "Employee onboarding",
      "Basic reporting",
      "Standard integrations"
    ],
    cta: "Start Free Trial",
    ctaLink: "#contact",
    ctaVariant: "secondary" as const,
    savings: "Save 40% vs traditional setup"
  },
  {
    name: "Professional",
    tagline: "Most popular for growing teams",
    price: 499,
    priceNote: "base + $79/employee",
    employeeRange: "11-50 employees",
    popular: true,
    features: [
      "Everything in Starter",
      "Priority support",
      "Advanced compliance",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced reporting",
      "Tax optimization",
      "Cultural integration support",
      "24/7 support in India timezone"
    ],
    cta: "Get Started",
    ctaLink: "#contact",
    ctaVariant: "primary" as const,
    savings: "Save 60% vs traditional setup"
  },
  {
    name: "Enterprise",
    tagline: "For large organizations",
    price: "Custom",
    priceNote: "contact for pricing",
    employeeRange: "50+ employees",
    popular: false,
    features: [
      "Everything in Professional",
      "White-glove service",
      "Custom integrations",
      "SLA guarantees",
      "Dedicated support team",
      "Custom reporting",
      "Advanced analytics",
      "Multi-country support",
      "Executive dashboard",
      "Priority feature requests"
    ],
    cta: "Book Demo",
    ctaLink: "#contact",
    ctaVariant: "secondary" as const,
    savings: "Save 70% vs traditional setup"
  }
];

// FAQ data
const faqs = [
  {
    question: "What's included in the base price?",
    answer: "The base price includes all core EOR services: employee onboarding, payroll processing, compliance management, tax filing, and basic support. Additional services like advanced integrations or custom reporting may have extra costs."
  },
  {
    question: "How does the 48-hour setup work?",
    answer: "Once you provide the necessary documentation and employee details, we guarantee to have your employees set up and ready to work within 48 hours. This includes all compliance requirements, payroll setup, and employee onboarding."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees. Our pricing is completely transparent. The only additional costs might be for custom integrations or specialized compliance requirements, which we'll discuss upfront before any work begins."
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. We'll prorate any differences."
  },
  {
    question: "What happens if I need to cancel?",
    answer: "You can cancel your subscription with 30 days notice. We'll help transition your employees to your new EOR provider or assist with entity setup if you decide to go that route."
  },
  {
    question: "Do you offer annual discounts?",
    answer: "Yes! Annual billing saves you 2 months of fees (equivalent to 16.7% discount). This applies to all plans and is our way of rewarding long-term partnerships."
  }
];

// ROI Calculator component
function ROICalculator() {
  const [employees, setEmployees] = useState(10);
  const [avgSalary, setAvgSalary] = useState(80000);
  const [companyType, setCompanyType] = useState("startup");

  const calculateSavings = () => {
    const annualSalary = employees * avgSalary;
    
    // Traditional entity setup costs
    const entitySetup = 15000; // One-time
    const legalCompliance = 8000; // Annual
    const hrManagement = employees * 2000; // Annual
    const accounting = employees * 1500; // Annual
    
    const traditionalCosts = entitySetup + legalCompliance + hrManagement + accounting;
    
    // EOR costs
    const eorBase = companyType === "startup" ? 299 : companyType === "midmarket" ? 499 : 999;
    const eorPerEmployee = companyType === "startup" ? 89 : companyType === "midmarket" ? 79 : 69;
    const eorAnnual = (eorBase + (employees * eorPerEmployee)) * 12;
    
    const savings = traditionalCosts - eorAnnual;
    const savingsPercentage = Math.round((savings / traditionalCosts) * 100);
    
    return {
      traditional: traditionalCosts,
      eor: eorAnnual,
      savings: savings,
      percentage: savingsPercentage
    };
  };

  const results = calculateSavings();

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Savings</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Employees
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>1</span>
              <span className="font-medium text-gray-900">{employees} employees</span>
              <span>100</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Annual Salary (USD)
            </label>
            <input
              type="range"
              min="30000"
              max="200000"
              step="5000"
              value={avgSalary}
              onChange={(e) => setAvgSalary(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>$30k</span>
              <span className="font-medium text-gray-900">${avgSalary.toLocaleString()}</span>
              <span>$200k</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["startup", "midmarket", "enterprise"].map((type) => (
                <button
                  key={type}
                  onClick={() => setCompanyType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    companyType === type
                      ? "bg-brand-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-50 to-cta-50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Savings</h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Traditional Setup Cost:</span>
              <span className="font-semibold text-gray-900">${results.traditional.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">EOR Annual Cost:</span>
              <span className="font-semibold text-gray-900">${results.eor.toLocaleString()}</span>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Annual Savings:</span>
                <span className="font-bold text-2xl text-cta-600">${results.savings.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-cta-600 font-medium">{results.percentage}% savings</span>
              </div>
            </div>
          </div>

          <motion.button
            className="w-full mt-6 bg-cta-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-cta-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Your Custom Quote
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Main PricingClient component
export default function PricingClient() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const { register, handleSubmit, formState, setValue, watch } = useForm<PricingFormData>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: {
      interest: "professional"
    }
  });

  const onSubmit = async (data: PricingFormData) => {
    try {
      trackEvent(AnalyticsEvents.FORM_SUBMITTED, {
        form_type: 'pricing_quote',
        interest: data.interest,
        employees: data.employees
      });

      // Here you would typically send to your backend
      console.log('Pricing form submitted:', data);
      
      toast.success("Thank you! We'll be in touch within 24 hours.");
    } catch (error) {
      trackEvent(AnalyticsEvents.FORM_ERROR, {
        form_type: 'pricing_quote',
        error: 'submission_failed'
      });
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleTierSelect = (tierName: string) => {
    setSelectedTier(tierName);
    setValue("interest", tierName.toLowerCase() as "startup" | "professional" | "enterprise");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Reading Progress Indicator */}
      <ReadingProgress />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Transparent EOR Pricing for India
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Scale your team in 48 hours with no hidden fees
            </motion.p>

            {/* Billing Toggle */}
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-white" : "text-white/70"}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === "annual" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === "annual" ? "text-white" : "text-white/70"}`}>
                Annual
              </span>
              {billingCycle === "annual" && (
                <span className="bg-cta-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Save 2 months
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All plans include our 48-hour setup guarantee and transparent pricing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 ${
                  tier.popular 
                    ? "border-cta-500 scale-105" 
                    : "border-gray-200 hover:border-brand-300"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cta-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.tagline}</p>
                  <p className="text-sm text-gray-500 mb-2">{tier.employeeRange}</p>
                  
                  <div className="mb-4">
                    {typeof tier.price === "number" ? (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">
                          ${billingCycle === "annual" ? Math.round(tier.price * 10) : tier.price}
                        </span>
                        <span className="text-gray-600 ml-2">/month</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-1">{tier.priceNote}</p>
                  </div>

                  <p className="text-sm text-cta-600 font-medium">{tier.savings}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-cta-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => {
                    handleTierSelect(tier.name);
                    trackEvent(AnalyticsEvents.CTA_CLICKED, { 
                      cta_type: 'pricing_tier', 
                      tier: tier.name.toLowerCase(),
                      page: 'pricing' 
                    });
                  }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    tier.ctaVariant === "primary"
                      ? "bg-cta-600 text-white hover:bg-cta-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Calculate Your Savings
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how much you can save compared to traditional entity setup
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our pricing and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Scale Your Team in India?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 500+ companies that trust us with their India expansion
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-cta-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cta-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICKED, { cta_type: 'get_started', page: 'pricing' })}
              >
                Get Started Today
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICKED, { cta_type: 'book_demo', page: 'pricing' })}
              >
                Book a Demo
              </motion.button>
            </div>

            <p className="text-sm text-white/70 mt-6">
              Free setup • 48-hour guarantee • No hidden fees
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Your Custom Quote
              </h2>
              <p className="text-xl text-gray-600">
                Tell us about your needs and we'll provide a personalized quote
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="your@company.com"
                  />
                  {formState.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    {...register("company")}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Your Company"
                  />
                  {formState.errors.company && (
                    <p className="mt-1 text-sm text-red-600">
                      {formState.errors.company.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees *
                </label>
                <select
                  {...register("employees")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Select range</option>
                  <option value="1-5">1-5 employees</option>
                  <option value="6-10">6-10 employees</option>
                  <option value="11-25">11-25 employees</option>
                  <option value="26-50">26-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="100+">100+ employees</option>
                </select>
                {formState.errors.employees && (
                  <p className="mt-1 text-sm text-red-600">
                    {formState.errors.employees.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I'm interested in *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["starter", "professional", "enterprise", "demo", "quote"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        {...register("interest")}
                        type="radio"
                        value={option}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{option}</span>
                    </label>
                  ))}
                </div>
                {formState.errors.interest && (
                  <p className="mt-1 text-sm text-red-600">
                    {formState.errors.interest.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full bg-cta-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-cta-700 disabled:opacity-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICKED, { cta_type: 'get_quote', page: 'pricing' })}
              >
                {formState.isSubmitting ? "Sending..." : "Get My Quote"}
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <FloatingCTA 
        onQuoteClick={() => trackEvent(AnalyticsEvents.QUOTE_REQUESTED, { page: 'pricing' })}
        onDemoClick={() => trackEvent(AnalyticsEvents.DEMO_BOOKED, { page: 'pricing' })}
      />
    </main>
  );
}
