"use client";

import { useState } from "react";
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
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  interest: z.enum(["eor", "payroll", "contractors", "partnership", "careers", "other"]),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Team members data
const teamMembers = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former McKinsey consultant with 15+ years in global expansion. Led EOR operations for 200+ companies across Asia-Pacific.",
    expertise: ["Global Expansion", "EOR Strategy", "Operations"],
    image: "/api/placeholder/300/300",
    linkedin: "https://linkedin.com/in/sarahchen",
    location: "San Francisco, CA"
  },
  {
    name: "Rajesh Kumar",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer with deep expertise in India's tech ecosystem. Built scalable platforms serving 10M+ users.",
    expertise: ["Technology", "India Market", "Platform Development"],
    image: "/api/placeholder/300/300",
    linkedin: "https://linkedin.com/in/rajeshkumar",
    location: "Bangalore, India"
  },
  {
    name: "Priya Sharma",
    role: "Head of India Operations",
    bio: "Legal expert with 12+ years in Indian employment law. Former partner at top-tier law firm specializing in corporate compliance.",
    expertise: ["Legal Compliance", "Employment Law", "India Operations"],
    image: "/api/placeholder/300/300",
    linkedin: "https://linkedin.com/in/priyasharma",
    location: "Mumbai, India"
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Customer Success",
    bio: "Former Stripe executive with 10+ years in fintech. Expert in building customer-centric operations and support systems.",
    expertise: ["Customer Success", "Fintech", "Operations"],
    image: "/api/placeholder/300/300",
    linkedin: "https://linkedin.com/in/michaelrodriguez",
    location: "Austin, TX"
  },
  {
    name: "Anita Patel",
    role: "Head of Compliance",
    bio: "Chartered Accountant with 15+ years in Indian tax and compliance. Former Deloitte senior manager specializing in international taxation.",
    expertise: ["Tax Compliance", "Accounting", "International Tax"],
    image: "/api/placeholder/300/300",
    linkedin: "https://linkedin.com/in/anitapatel",
    location: "Delhi, India"
  },
  {
    name: "David Kim",
    role: "Head of Product",
    bio: "Former Airbnb product manager with 8+ years building user-centric platforms. Expert in scaling products for global markets.",
    expertise: ["Product Management", "User Experience", "Global Scaling"],
    image: "/api/placeholder/300/300",
    linkedin: "https://linkedin.com/in/davidkim",
    location: "Seattle, WA"
  }
];

// Company values
const companyValues = [
  {
    title: "Transparency First",
    description: "We believe in complete transparency in pricing, processes, and communication. No hidden fees, no surprises.",
    icon: "🔍",
    details: [
      "Clear, upfront pricing",
      "Regular progress updates",
      "Open communication channels",
      "Transparent reporting"
    ]
  },
  {
    title: "Speed & Efficiency",
    description: "We're built for speed. Our 48-hour setup guarantee reflects our commitment to rapid, efficient service delivery.",
    icon: "⚡",
    details: [
      "48-hour setup guarantee",
      "Automated processes",
      "Real-time updates",
      "Streamlined workflows"
    ]
  },
  {
    title: "Local Expertise",
    description: "Our deep understanding of Indian business culture, regulations, and market dynamics sets us apart.",
    icon: "🏛️",
    details: [
      "Local team in India",
      "Cultural understanding",
      "Regulatory expertise",
      "Market knowledge"
    ]
  },
  {
    title: "Customer Success",
    description: "Your success is our success. We're committed to building long-term partnerships that drive mutual growth.",
    icon: "🤝",
    details: [
      "Dedicated account managers",
      "Proactive support",
      "Success metrics tracking",
      "Partnership approach"
    ]
  }
];

// Office locations
const officeLocations = [
  {
    city: "San Francisco",
    country: "United States",
    address: "123 Market Street, Suite 400",
    postalCode: "San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "sf@company.com",
    type: "Headquarters",
    timezone: "PST (UTC-8)"
  },
  {
    city: "Bangalore",
    country: "India",
    address: "456 Brigade Road, 5th Floor",
    postalCode: "Bangalore, Karnataka 560001",
    phone: "+91 80 1234 5678",
    email: "bangalore@company.com",
    type: "Operations Center",
    timezone: "IST (UTC+5:30)"
  },
  {
    city: "Mumbai",
    country: "India",
    address: "789 Bandra Kurla Complex",
    postalCode: "Mumbai, Maharashtra 400051",
    phone: "+91 22 1234 5678",
    email: "mumbai@company.com",
    type: "Legal & Compliance",
    timezone: "IST (UTC+5:30)"
  }
];

// Certifications and partnerships
const certifications = [
  {
    name: "ISO 27001 Certified",
    description: "Information Security Management System",
    issuer: "International Organization for Standardization",
    year: "2023",
    logo: "/api/placeholder/100/100"
  },
  {
    name: "SOC 2 Type II",
    description: "Security, Availability, and Confidentiality",
    issuer: "AICPA",
    year: "2023",
    logo: "/api/placeholder/100/100"
  },
  {
    name: "GDPR Compliant",
    description: "General Data Protection Regulation",
    issuer: "European Union",
    year: "2023",
    logo: "/api/placeholder/100/100"
  },
  {
    name: "India Data Protection",
    description: "Digital Personal Data Protection Act",
    issuer: "Government of India",
    year: "2024",
    logo: "/api/placeholder/100/100"
  }
];

// Company milestones
const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to simplify global expansion"
  },
  {
    year: "2021",
    title: "First 100 Clients",
    description: "Reached our first milestone of 100 successful EOR setups"
  },
  {
    year: "2022",
    title: "India Operations Launch",
    description: "Opened our first office in Bangalore, India"
  },
  {
    year: "2023",
    title: "500+ Companies",
    description: "Served over 500 companies across 15 countries"
  },
  {
    year: "2024",
    title: "Platform 2.0",
    description: "Launched our next-generation EOR platform"
  }
];

// Main AboutClient component
export default function AboutClient() {
  const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);

  const { register, handleSubmit, formState } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      trackEvent(AnalyticsEvents.FORM_SUBMITTED, {
        form_type: 'about_contact',
        interest: data.interest
      });

      console.log('About contact form submitted:', data);
      toast.success("Thank you for reaching out! We'll be in touch within 24 hours.");
    } catch (error) {
      trackEvent(AnalyticsEvents.FORM_ERROR, {
        form_type: 'about_contact',
        error: 'submission_failed'
      });
      toast.error("Something went wrong. Please try again.");
    }
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
              About Us
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The modern EOR platform built for global companies expanding in India
            </motion.p>

            <motion.div 
              className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">
                  <AnimatedCounter end={500} suffix="+" className="text-3xl font-bold text-white" />
                </div>
                <div className="text-sm text-white/80">Companies Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  <AnimatedCounter end={15} suffix="+" className="text-3xl font-bold text-white" />
                </div>
                <div className="text-sm text-white/80">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  <AnimatedCounter end={4} className="text-3xl font-bold text-white" />
                </div>
                <div className="text-sm text-white/80">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  <AnimatedCounter end={48} suffix="h" className="text-3xl font-bold text-white" />
                </div>
                <div className="text-sm text-white/80">Setup Guarantee</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-xl text-gray-600">
                Born from the frustration of complex global expansion
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-gray-700 leading-relaxed space-y-6"
              >
                <p>
                  In 2020, our founders experienced firsthand the pain of expanding a company into India. 
                  The traditional process was slow, expensive, and filled with compliance headaches. 
                  What should have taken weeks was taking months, and what should have been straightforward 
                  was becoming a maze of legal requirements and bureaucratic delays.
                </p>
                
                <p>
                  We realized that global companies needed a better way to hire and manage talent in India. 
                  Not just a service provider, but a true partner that could handle the complexity while 
                  keeping things simple and transparent for the client.
                </p>
                
                <p>
                  Today, we&apos;re proud to serve 500+ companies across 15 countries, helping them scale 
                  their teams in India with our 48-hour setup guarantee and transparent pricing. 
                  Our platform combines deep local expertise with modern technology to deliver 
                  the fastest, most reliable EOR service in the market.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Global expertise with deep local knowledge of India&apos;s business landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-64 bg-gradient-to-br from-brand-100 to-cta-100 flex items-center justify-center">
                  <div className="text-6xl opacity-20">👤</div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {member.location}
                  </p>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                    LinkedIn
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-gray-50 rounded-xl p-8 border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {value.description}
                </p>
                <ul className="space-y-2">
                  {value.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-cta-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Offices
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Global presence with local expertise in key markets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {officeLocations.map((office, index) => (
              <motion.div
                key={office.city}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {office.city}
                  </h3>
                  <p className="text-brand-600 font-medium mb-2">
                    {office.type}
                  </p>
                  <p className="text-sm text-gray-500">
                    {office.timezone}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>{office.address}</p>
                  <p>{office.postalCode}</p>
                  <p>{office.country}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span> {office.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {office.email}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Committed to the highest standards of security and compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-brand-100 to-cta-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl opacity-60">🏆</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {cert.description}
                </p>
                <p className="text-xs text-gray-500">
                  {cert.issuer} • {cert.year}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones in our growth and evolution
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-brand-400 to-cta-400"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                      <div className="text-2xl font-bold text-brand-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cta-500 rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
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
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help you scale your team in India
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-cta-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cta-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICKED, { cta_type: 'get_started', page: 'about' })}
              >
                Get Started Today
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICKED, { cta_type: 'schedule_call', page: 'about' })}
              >
                Schedule a Call
              </motion.button>
            </div>

            <p className="text-sm text-white/70 mt-6">
              Free consultation • 48-hour setup guarantee • No hidden fees
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600">
                Have questions? We&apos;d love to hear from you
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
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                  {formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formState.errors.name.message}
                    </p>
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
                    placeholder="your@company.com"
                  />
                  {formState.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  {...register("company")}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Your company"
                />
                {formState.errors.company && (
                  <p className="mt-1 text-sm text-red-600">
                    {formState.errors.company.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I&apos;m interested in *
                </label>
                <select
                  {...register("interest")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="eor">EOR Services</option>
                  <option value="payroll">Payroll Management</option>
                  <option value="contractors">Contractor Management</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="careers">Career Opportunities</option>
                  <option value="other">Other</option>
                </select>
                {formState.errors.interest && (
                  <p className="mt-1 text-sm text-red-600">
                    {formState.errors.interest.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Tell us about your needs..."
                />
                {formState.errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {formState.errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full bg-cta-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-cta-700 disabled:opacity-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICKED, { cta_type: 'contact_form_submit', page: 'about' })}
              >
                {formState.isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <FloatingCTA 
        onQuoteClick={() => trackEvent(AnalyticsEvents.QUOTE_REQUESTED, { page: 'about' })}
        onDemoClick={() => trackEvent(AnalyticsEvents.DEMO_BOOKED, { page: 'about' })}
      />
    </main>
  );
}
