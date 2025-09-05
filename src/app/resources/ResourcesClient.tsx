"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Global type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Form validation schema
const newsletterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  interest: z.enum(["eor", "payroll", "contractors", "compliance", "all"]),
});

type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

// Blog categories
const blogCategories = [
  { name: "All", slug: "all", count: 24 },
  { name: "EOR Guide", slug: "eor", count: 8 },
  { name: "Payroll", slug: "payroll", count: 6 },
  { name: "Compliance", slug: "compliance", count: 5 },
  { name: "Contractors", slug: "contractors", count: 3 },
  { name: "Case Studies", slug: "case-studies", count: 2 }
];

// Featured blog posts
const featuredPosts = [
  {
    id: 1,
    title: "Complete Guide to EOR in India: Everything You Need to Know",
    excerpt: "Learn everything about Employer of Record services in India, from setup to compliance, with this comprehensive guide.",
    category: "EOR Guide",
    readTime: "12 min read",
    publishDate: "2024-01-15",
    author: "Sarah Chen",
    image: "/api/placeholder/600/400",
    featured: true,
    tags: ["EOR", "India", "Guide", "Compliance"]
  },
  {
    id: 2,
    title: "India Payroll Compliance: PF, ESI, TDS, and More",
    excerpt: "Navigate the complex world of Indian payroll compliance with our detailed breakdown of all requirements.",
    category: "Payroll",
    readTime: "8 min read",
    publishDate: "2024-01-12",
    author: "Michael Rodriguez",
    image: "/api/placeholder/600/400",
    featured: true,
    tags: ["Payroll", "Compliance", "PF", "ESI"]
  },
  {
    id: 3,
    title: "How TechCorp Scaled Their India Team from 5 to 50 Employees",
    excerpt: "A detailed case study of how a US-based tech company successfully expanded their India operations.",
    category: "Case Studies",
    readTime: "6 min read",
    publishDate: "2024-01-10",
    author: "Priya Sharma",
    image: "/api/placeholder/600/400",
    featured: true,
    tags: ["Case Study", "Scaling", "Tech", "Success"]
  }
];

// Recent blog posts
const recentPosts = [
  {
    id: 4,
    title: "Contractor vs Employee: What's the Difference in India?",
    excerpt: "Understanding the legal and practical differences between contractors and employees in India.",
    category: "Contractors",
    readTime: "5 min read",
    publishDate: "2024-01-08",
    author: "David Kumar",
    image: "/api/placeholder/300/200",
    tags: ["Contractors", "Legal", "Employment"]
  },
  {
    id: 5,
    title: "GST Registration for Foreign Companies in India",
    excerpt: "Step-by-step guide to GST registration for international companies operating in India.",
    category: "Compliance",
    readTime: "7 min read",
    publishDate: "2024-01-05",
    author: "Anita Patel",
    image: "/api/placeholder/300/200",
    tags: ["GST", "Compliance", "Registration"]
  },
  {
    id: 6,
    title: "Best Practices for Remote Team Management in India",
    excerpt: "Tips and strategies for effectively managing remote teams across different time zones.",
    category: "EOR Guide",
    readTime: "6 min read",
    publishDate: "2024-01-03",
    author: "Rajesh Singh",
    image: "/api/placeholder/300/200",
    tags: ["Remote Work", "Management", "Best Practices"]
  },
  {
    id: 7,
    title: "Understanding TDS (Tax Deducted at Source) in India",
    excerpt: "Complete guide to TDS requirements, rates, and compliance for foreign companies.",
    category: "Compliance",
    readTime: "9 min read",
    publishDate: "2024-01-01",
    author: "Meera Joshi",
    image: "/api/placeholder/300/200",
    tags: ["TDS", "Tax", "Compliance"]
  }
];

// Guides data
const guides = [
  {
    id: 1,
    title: "India EOR Setup Checklist",
    description: "Complete checklist for setting up EOR services in India, including all required documents and steps.",
    type: "PDF Guide",
    pages: 12,
    downloadCount: "2.3k",
    gated: true,
    image: "/api/placeholder/400/300",
    tags: ["EOR", "Setup", "Checklist"]
  },
  {
    id: 2,
    title: "India Payroll Compliance Handbook",
    description: "Comprehensive guide covering all payroll compliance requirements in India.",
    type: "PDF Guide",
    pages: 18,
    downloadCount: "1.8k",
    gated: true,
    image: "/api/placeholder/400/300",
    tags: ["Payroll", "Compliance", "Handbook"]
  },
  {
    id: 3,
    title: "Contractor Management Best Practices",
    description: "Best practices for managing contractors in India, including legal and operational considerations.",
    type: "PDF Guide",
    pages: 15,
    downloadCount: "1.2k",
    gated: true,
    image: "/api/placeholder/400/300",
    tags: ["Contractors", "Management", "Best Practices"]
  },
  {
    id: 4,
    title: "India Tax Optimization Strategies",
    description: "Legal strategies for optimizing tax efficiency when operating in India.",
    type: "PDF Guide",
    pages: 20,
    downloadCount: "950",
    gated: true,
    image: "/api/placeholder/400/300",
    tags: ["Tax", "Optimization", "Strategies"]
  }
];

// Glossary terms
const glossaryTerms = [
  {
    term: "EOR (Employer of Record)",
    definition: "A service provider that legally employs workers on behalf of another company, handling all employment-related responsibilities including payroll, benefits, and compliance."
  },
  {
    term: "PF (Provident Fund)",
    definition: "A mandatory retirement savings scheme in India where both employer and employee contribute 12% of basic salary."
  },
  {
    term: "ESI (Employee State Insurance)",
    definition: "A social security scheme providing medical and cash benefits to employees earning up to ₹21,000 per month."
  },
  {
    term: "TDS (Tax Deducted at Source)",
    definition: "A tax collection mechanism where tax is deducted at the source of income before payment is made to the recipient."
  },
  {
    term: "GST (Goods and Services Tax)",
    definition: "A comprehensive indirect tax levied on the supply of goods and services in India, replacing multiple state and central taxes."
  },
  {
    term: "AOR (Agent of Record)",
    definition: "A service provider that acts as an administrative agent for contractor relationships, handling payments and basic compliance."
  }
];

// Case studies
const caseStudies = [
  {
    id: 1,
    title: "TechStart: From 0 to 25 Employees in 6 Months",
    company: "TechStart",
    industry: "SaaS",
    challenge: "Rapid scaling in India with complex compliance requirements",
    solution: "EOR services with automated compliance and payroll",
    results: [
      "25 employees onboarded in 6 months",
      "100% compliance rate maintained",
      "60% reduction in administrative overhead",
      "48-hour average onboarding time"
    ],
    testimonial: "The EOR solution allowed us to focus on growth while ensuring full compliance. Our team in India feels secure and well-supported.",
    author: "CEO, TechStart",
    image: "/api/placeholder/500/300"
  },
  {
    id: 2,
    title: "GlobalSoft: Streamlining Contractor Management",
    company: "GlobalSoft",
    industry: "Software Development",
    challenge: "Managing 50+ contractors across multiple projects",
    solution: "Comprehensive contractor management platform",
    results: [
      "50+ contractors managed efficiently",
      "90% reduction in payment processing time",
      "Zero compliance issues",
      "95% contractor satisfaction rate"
    ],
    testimonial: "Our contractor management is now completely streamlined. Payments are instant, and compliance is automated.",
    author: "Head of Operations, GlobalSoft",
    image: "/api/placeholder/500/300"
  }
];

// Main ResourcesClient component
export default function ResourcesClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { register, handleSubmit, formState } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      interest: "all"
    }
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      // Track analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: data.interest
        });
      }

      console.log('Newsletter signup:', data);
      toast.success("Thank you for subscribing! Check your email for confirmation.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const filteredPosts = recentPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category.toLowerCase() === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
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
              Resources Hub
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Everything you need to know about EOR, payroll, and contractor management in India
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
                Browse Resources
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Guides
              </motion.button>
            </motion.div>

            <motion.div 
              className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">24+</div>
                <div className="text-sm text-white/80">Blog Posts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm text-white/80">Free Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">2k+</div>
                <div className="text-sm text-white/80">Downloads</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Content
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most popular and comprehensive resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-gradient-to-br from-brand-100 to-cta-100 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📄</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.publishDate}</div>
                      </div>
                    </div>
                    
                    <motion.button
                      className="text-brand-600 hover:text-brand-700 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      Read More →
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights on EOR and payroll in India
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {blogCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.slug
                    ? "bg-brand-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-32 bg-gradient-to-br from-brand-100 to-cta-100 flex items-center justify-center">
                  <div className="text-4xl opacity-20">📄</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      By {post.author} • {post.publishDate}
                    </div>
                    
                    <motion.button
                      className="text-brand-600 hover:text-brand-700 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      Read →
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Downloadable Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive guides to help you navigate EOR and payroll in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-gradient-to-br from-cta-100 to-brand-100 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📚</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-cta-100 text-cta-700 px-3 py-1 rounded-full text-sm font-medium">
                      {guide.type}
                    </span>
                    <span className="text-gray-500 text-sm">{guide.pages} pages</span>
                    <span className="text-gray-500 text-sm">• {guide.downloadCount} downloads</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {guide.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {guide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button
                    className="w-full bg-cta-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-cta-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {guide.gated ? "Download Free Guide" : "View Guide"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real companies, real results with our EOR and contractor management solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="h-48 bg-gradient-to-br from-brand-100 to-cta-100 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🏆</div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {study.title}
                  </h3>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    {study.company} • {study.industry}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                    <p className="text-gray-600 text-sm">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                    <p className="text-gray-600 text-sm">{study.solution}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      {study.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start">
                          <svg className="w-4 h-4 text-cta-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <blockquote className="border-l-4 border-cta-500 pl-4 italic text-gray-700 mb-4">
                    &quot;{study.testimonial}&quot;
                  </blockquote>
                  
                  <div className="text-sm text-gray-600">
                    — {study.author}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              EOR & Payroll Glossary
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key terms and definitions for EOR, payroll, and compliance in India
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {glossaryTerms.map((term, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {term.term}
                  </h3>
                  <p className="text-gray-600">
                    {term.definition}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get the latest insights on EOR, payroll, and contractor management in India
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
                <motion.button
                  type="submit"
                  className="bg-cta-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cta-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-white/80 mb-2">I'm interested in:</label>
                <div className="flex flex-wrap justify-center gap-3">
                  {["eor", "payroll", "contractors", "compliance", "all"].map((option) => (
                    <label key={option} className="flex items-center text-sm">
                      <input
                        {...register("interest")}
                        type="radio"
                        value={option}
                        className="mr-2"
                      />
                      <span className="capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formState.errors.email && (
                <p className="text-red-200 text-sm">
                  {formState.errors.email.message}
                </p>
              )}

              <p className="text-sm text-white/70">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
