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
const contractorFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  contractors: z.string().min(1, "Please select number of contractors"),
  interest: z.enum(["onboarding", "payouts", "compliance", "demo", "quote"]),
});

type ContractorFormData = z.infer<typeof contractorFormSchema>;

// Comparison data
const comparisonData = [
  {
    feature: "Setup Time",
    contractor: "Immediate",
    aor: "2-4 weeks",
    eor: "48 hours",
    ourAdvantage: true
  },
  {
    feature: "Compliance Management",
    contractor: "Self-managed",
    aor: "Basic support",
    eor: "Full compliance",
    ourAdvantage: true
  },
  {
    feature: "Payment Processing",
    contractor: "Manual",
    aor: "Semi-automated",
    eor: "Fully automated",
    ourAdvantage: true
  },
  {
    feature: "Tax Documentation",
    contractor: "Self-filing",
    aor: "Basic forms",
    eor: "Complete tax handling",
    ourAdvantage: true
  },
  {
    feature: "Legal Protection",
    contractor: "Limited",
    aor: "Basic",
    eor: "Full protection",
    ourAdvantage: true
  },
  {
    feature: "Cost",
    contractor: "Lowest",
    aor: "Medium",
    eor: "Higher but comprehensive",
    ourAdvantage: false
  }
];

// Process steps data
const processSteps = [
  {
    step: 1,
    title: "Contractor Onboarding",
    description: "Quick 15-minute setup with minimal documentation",
    details: [
      "Digital contract signing",
      "Identity verification",
      "Bank account setup",
      "Tax form completion"
    ],
    icon: "📝",
    duration: "15 minutes"
  },
  {
    step: 2,
    title: "Work Assignment",
    description: "Seamless project assignment and tracking",
    details: [
      "Project brief sharing",
      "Milestone setting",
      "Progress tracking",
      "Communication tools"
    ],
    icon: "🎯",
    duration: "Immediate"
  },
  {
    step: 3,
    title: "Payment Processing",
    description: "Automated payments with full transparency",
    details: [
      "Time tracking integration",
      "Invoice generation",
      "Payment processing",
      "Receipt delivery"
    ],
    icon: "💳",
    duration: "24-48 hours"
  },
  {
    step: 4,
    title: "Compliance & Reporting",
    description: "Complete tax and compliance management",
    details: [
      "Tax document generation",
      "Compliance reporting",
      "Audit support",
      "Record keeping"
    ],
    icon: "📊",
    duration: "Ongoing"
  }
];

// Payment methods data
const paymentMethods = [
  {
    method: "Bank Transfer",
    description: "Direct transfer to Indian bank accounts",
    processingTime: "1-2 business days",
    fees: "Free",
    popular: true
  },
  {
    method: "UPI",
    description: "Instant payments via UPI",
    processingTime: "Instant",
    fees: "Free",
    popular: true
  },
  {
    method: "PayPal",
    description: "International payment processing",
    processingTime: "1-3 business days",
    fees: "2.9% + $0.30",
    popular: false
  },
  {
    method: "Wise (formerly TransferWise)",
    description: "Low-cost international transfers",
    processingTime: "1-2 business days",
    fees: "0.5-1%",
    popular: false
  }
];

// Testimonials data
const testimonials = [
  {
    quote: "The contractor management platform has streamlined our entire process. What used to take weeks now takes minutes, and our contractors love the instant payments.",
    author: "Sarah Chen",
    role: "Head of Operations",
    company: "TechFlow Solutions",
    rating: 5,
    metric: "75% faster onboarding"
  },
  {
    quote: "Finally, a solution that handles all the compliance complexity for us. Our contractors are happy, and we're fully compliant with Indian regulations.",
    author: "Michael Rodriguez",
    role: "CTO",
    company: "InnovateLabs",
    rating: 5,
    metric: "100% compliance rate"
  },
  {
    quote: "The automated payment system has been a game-changer. Our contractors receive payments faster, and we save hours on manual processing.",
    author: "Priya Sharma",
    role: "Finance Director",
    company: "GlobalTech Corp",
    rating: 5,
    metric: "90% time savings"
  }
];

// FAQ data
const faqs = [
  {
    question: "What's the difference between AOR, EOR, and direct contractor management?",
    answer: "AOR (Agent of Record) provides basic administrative support, EOR (Employer of Record) handles full employment, while our contractor management focuses specifically on independent contractor relationships with automated compliance and payments."
  },
  {
    question: "How quickly can we onboard new contractors?",
    answer: "Our streamlined onboarding process takes just 15 minutes. Contractors can complete digital contracts, verify identity, and set up payments in a single session."
  },
  {
    question: "What payment methods do you support?",
    answer: "We support bank transfers, UPI (instant), PayPal, and Wise. Most contractors prefer UPI for instant payments or bank transfers for larger amounts."
  },
  {
    question: "How do you handle tax compliance for contractors?",
    answer: "We automatically generate all required tax documents, handle TDS (Tax Deducted at Source) calculations, and provide contractors with Form 16A for their tax filings."
  },
  {
    question: "Can contractors track their payments and invoices?",
    answer: "Yes, contractors have access to a dedicated portal where they can view payment history, download invoices, track project milestones, and manage their tax documents."
  },
  {
    question: "What happens if there are payment disputes?",
    answer: "We provide dispute resolution support and maintain detailed records of all transactions. Our team mediates between companies and contractors to ensure fair resolution."
  }
];

// Main ContractorClient component
export default function ContractorClient() {
  const [selectedComparison, setSelectedComparison] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const { register, handleSubmit, formState, setValue } = useForm<ContractorFormData>({
    resolver: zodResolver(contractorFormSchema),
    defaultValues: {
      interest: "onboarding"
    }
  });

  const onSubmit = async (data: ContractorFormData) => {
    try {
      trackEvent(AnalyticsEvents.FORM_SUBMITTED, {
        form_type: 'contractor_management',
        interest: data.interest,
        contractors: data.contractors
      });

      console.log('Contractor form submitted:', data);
      toast.success("Thank you! We'll be in touch within 24 hours.");
    } catch (error) {
      trackEvent(AnalyticsEvents.FORM_ERROR, {
        form_type: 'contractor_management',
        error: 'submission_failed'
      });
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
              Contractor Management in India
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Streamline contractor onboarding, payments, and compliance in one platform
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                className="bg-cta-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cta-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Managing Contractors
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See How It Works
              </motion.button>
            </motion.div>

            <motion.div 
              className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">15 min</div>
                <div className="text-sm text-white/80">Onboarding Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24-48h</div>
                <div className="text-sm text-white/80">Payment Processing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-white/80">Compliance Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AOR vs EOR vs Contractor Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the right approach for your contractor relationships
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Direct Contractor</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">AOR</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-cta-600">Our Solution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">
                        {row.contractor}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">
                        {row.aor}
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        <span className={`font-medium ${row.ourAdvantage ? 'text-cta-600' : 'text-gray-600'}`}>
                          {row.eor}
                        </span>
                        {row.ourAdvantage && (
                          <span className="ml-2 text-cta-500">✓</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From onboarding to payment in 4 simple steps
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Connection line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-brand-400 to-brand-600 transform translate-x-4 z-0" />
                  )}

                  <div className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow z-10">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{step.icon}</div>
                      <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-cta-600 font-medium">{step.duration}</p>
                    </div>

                    <p className="text-gray-600 mb-4 text-center">{step.description}</p>

                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-sm text-gray-600">
                          <svg className="w-4 h-4 text-cta-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Flexible Payment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the payment method that works best for your contractors
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.method}
                  className={`relative bg-white rounded-xl p-6 border-2 transition-all ${
                    method.popular 
                      ? "border-cta-500 shadow-lg" 
                      : "border-gray-200 hover:border-brand-300"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {method.popular && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-cta-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{method.method}</h3>
                    <p className="text-gray-600">{method.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-medium text-gray-900">{method.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fees:</span>
                      <span className="font-medium text-gray-900">{method.fees}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how companies are transforming their contractor management
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cta-600">
                    {testimonials[currentTestimonial].metric}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-cta-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about contractor management
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
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
              Ready to Streamline Your Contractor Management?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies managing contractors efficiently in India
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-cta-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cta-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICKED, { cta_type: 'get_started', page: 'contractor_management' })}
              >
                Get Started Today
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICKED, { cta_type: 'book_demo', page: 'contractor_management' })}
              >
                Book a Demo
              </motion.button>
            </div>

            <p className="text-sm text-white/70 mt-6">
              15-minute setup • Instant payments • Full compliance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Your Contractor Management Solution
              </h2>
              <p className="text-xl text-gray-600">
                Tell us about your contractor needs and we'll provide a customized solution
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
                  Number of Contractors *
                </label>
                <select
                  {...register("contractors")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Select range</option>
                  <option value="1-5">1-5 contractors</option>
                  <option value="6-10">6-10 contractors</option>
                  <option value="11-25">11-25 contractors</option>
                  <option value="26-50">26-50 contractors</option>
                  <option value="50+">50+ contractors</option>
                </select>
                {formState.errors.contractors && (
                  <p className="mt-1 text-sm text-red-600">
                    {formState.errors.contractors.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I'm interested in *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["onboarding", "payouts", "compliance", "demo", "quote"].map((option) => (
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
                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICKED, { cta_type: 'get_solution', page: 'contractor_management' })}
              >
                {formState.isSubmitting ? "Sending..." : "Get My Solution"}
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <FloatingCTA 
        onQuoteClick={() => trackEvent(AnalyticsEvents.QUOTE_REQUESTED, { page: 'contractor_management' })}
        onDemoClick={() => trackEvent(AnalyticsEvents.DEMO_BOOKED, { page: 'contractor_management' })}
      />
    </main>
  );
}
