"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().optional(),
  country: z.string().optional(),
  interest: z.enum(["eor", "contractors", "pricing", "general"], {
    required_error: "Please select your area of interest",
  }),
  employees: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  source: z.string().default("contact_page"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "calendly" | "direct">("form");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      source: "contact_page",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Track form submission
    trackEvent(AnalyticsEvents.FORM_SUBMITTED, {
      form_type: "contact_page",
      form_source: "contact_page",
      user_company: data.company,
      user_interest: data.interest,
      user_employees: data.employees,
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      toast.success("Thank you! We'll get back to you within 24 hours.");
      trackEvent(AnalyticsEvents.FORM_SUCCESS, { form_type: "contact_page" });
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      trackEvent(AnalyticsEvents.FORM_ERROR, { 
        form_type: "contact_page",
        error: "submission_failed" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabClick = (tab: "form" | "calendly" | "direct") => {
    setActiveTab(tab);
    trackEvent(AnalyticsEvents.CTA_CLICKED, {
      cta_type: `contact_tab_${tab}`,
      cta_location: "contact_page",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-500 to-brand-600 text-white py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Ready to Scale Your Team in India?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Get your free consultation and see how we can help you hire in India in just 48 hours.
            </p>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 from 500+ companies</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <span>48-hour setup guarantee</span>
              <div className="w-px h-4 bg-white/30"></div>
              <span>Free consultation</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-200">
              <button
                onClick={() => handleTabClick("form")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "form"
                    ? "bg-brand-500 text-white shadow-md"
                    : "text-gray-600 hover:text-brand-600"
                }`}
              >
                Send Message
              </button>
              <button
                onClick={() => handleTabClick("calendly")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "calendly"
                    ? "bg-brand-500 text-white shadow-md"
                    : "text-gray-600 hover:text-brand-600"
                }`}
              >
                Book a Call
              </button>
              <button
                onClick={() => handleTabClick("direct")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "direct"
                    ? "bg-brand-500 text-white shadow-md"
                    : "text-gray-600 hover:text-brand-600"
                }`}
              >
                Direct Contact
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "form" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Get Your Free India Expansion Plan
                  </h2>
                  <p className="text-gray-600">
                    Tell us about your needs and we'll create a customized plan for your India expansion.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="your.email@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company *
                      </label>
                      <input
                        {...register("company")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        {...register("country")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="Your country"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area of Interest *
                      </label>
                      <select
                        {...register("interest")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      >
                        <option value="">Select your interest</option>
                        <option value="eor">EOR India (Employer of Record)</option>
                        <option value="contractors">Contractor Management</option>
                        <option value="pricing">Pricing & Plans</option>
                        <option value="general">General Inquiry</option>
                      </select>
                      {errors.interest && (
                        <p className="mt-1 text-sm text-red-600">{errors.interest.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select
                      {...register("employees")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about your needs *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="Describe your India expansion plans, team size, timeline, or any specific requirements..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cta-500 to-cta-600 hover:from-cta-600 hover:to-cta-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Sending..." : "Get My Free India Expansion Plan"}
                  </motion.button>
                </form>
              </motion.div>
            )}

            {activeTab === "calendly" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Book a Free Consultation
                  </h2>
                  <p className="text-gray-600">
                    Schedule a 30-minute call with our India expansion experts.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What to expect:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Customized India expansion strategy
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Cost analysis and savings calculation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Compliance and legal guidance
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Timeline and next steps
                    </li>
                  </ul>
                </div>

                <iframe
                  title="Calendly Booking"
                  src={process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL || "about:blank"}
                  className="w-full h-[600px] border border-gray-200 rounded-lg"
                />
              </motion.div>
            )}

            {activeTab === "direct" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Get in Touch Directly
                  </h2>
                  <p className="text-gray-600">
                    Prefer to reach out directly? Here are our contact details.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-600">hello@monohr.com</p>
                        <p className="text-sm text-gray-500">We respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Phone</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM IST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Office</h3>
                        <p className="text-gray-600">Mumbai, India</p>
                        <p className="text-sm text-gray-500">Bangalore & Delhi offices</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Response Times</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Email inquiries</span>
                        <span className="text-sm font-medium text-gray-900">< 24 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Phone calls</span>
                        <span className="text-sm font-medium text-gray-900">Immediate</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Urgent requests</span>
                        <span className="text-sm font-medium text-gray-900">< 2 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}


