"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contentfulService, getAssetUrl, getOptimizedImageUrl } from '@/lib/contentful';

interface DynamicPageProps {
  slug: string;
  fallbackContent?: React.ReactNode;
}

export function DynamicPage({ slug, fallbackContent }: DynamicPageProps) {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPage() {
      try {
        setLoading(true);
        const pageData = await contentfulService.getPageBySlug(slug);
        
        if (pageData) {
          setPage(pageData);
        } else {
          setError('Page not found');
        }
      } catch (err) {
        console.error('Error loading page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const { fields } = page;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {fields.hero && (
        <section className="bg-gradient-to-br from-brand-500 to-brand-600 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {fields.hero.fields.eyebrow && (
                <p className="text-white/80 text-sm mb-4">
                  {fields.hero.fields.eyebrow}
                </p>
              )}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {fields.hero.fields.heading}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                {fields.hero.fields.subheading}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {fields.hero.fields.primaryCTA && (
                  <a
                    href={fields.hero.fields.primaryCTA.href}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-600 hover:opacity-90 rounded-lg font-semibold transition-all"
                  >
                    {fields.hero.fields.primaryCTA.text}
                  </a>
                )}
                
                {fields.hero.fields.secondaryCTA && (
                  <a
                    href={fields.hero.fields.secondaryCTA.href}
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-brand-600 rounded-lg font-semibold transition-all"
                  >
                    {fields.hero.fields.secondaryCTA.text}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      {fields.sections && fields.sections.map((section: any, index: number) => (
        <DynamicSection key={index} section={section} />
      ))}

      {/* Fallback Content */}
      {!fields.sections && fallbackContent && (
        <div className="container mx-auto px-4 py-16">
          {fallbackContent}
        </div>
      )}
    </div>
  );
}

// Dynamic Section Component
function DynamicSection({ section }: { section: any }) {
  const { sys, fields } = section;
  const contentType = sys.contentType.sys.id;

  switch (contentType) {
    case 'featureGridSection':
      return <FeatureGridSection fields={fields} />;
    
    case 'stepsSection':
      return <StepsSection fields={fields} />;
    
    case 'testimonialSection':
      return <TestimonialSection fields={fields} />;
    
    case 'faqSection':
      return <FAQSection fields={fields} />;
    
    case 'pricingTableSection':
      return <PricingTableSection fields={fields} />;
    
    default:
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {fields.title || 'Section'}
              </h2>
              <p className="text-gray-600">
                Content type: {contentType}
              </p>
            </div>
          </div>
        </section>
      );
  }
}

// Feature Grid Section
function FeatureGridSection({ fields }: { fields: any }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {fields.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.features && fields.features.map((feature: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="text-4xl mb-4">{feature.fields.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.fields.title}
              </h3>
              <p className="text-gray-600">
                {feature.fields.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Steps Section
function StepsSection({ fields }: { fields: any }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {fields.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fields.steps && fields.steps.map((step: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-brand-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.fields.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.fields.title}
              </h3>
              <p className="text-gray-600">
                {step.fields.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial Section
function TestimonialSection({ fields }: { fields: any }) {
  return (
    <section className="py-20 bg-brand-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {fields.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.testimonials && fields.testimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.fields.quote}"
              </p>
              <div className="flex items-center">
                {testimonial.fields.avatar && (
                  <img
                    src={getOptimizedImageUrl(testimonial.fields.avatar, 48, 48)}
                    alt={testimonial.fields.authorName}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.fields.authorName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.fields.role} at {testimonial.fields.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection({ fields }: { fields: any }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {fields.title}
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {fields.items && fields.items.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg mb-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.fields.question}
              </h3>
              <p className="text-gray-600">
                {item.fields.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Table Section
function PricingTableSection({ fields }: { fields: any }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {fields.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {fields.tiers && fields.tiers.map((tier: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {tier.fields.name}
              </h3>
              <div className="text-3xl font-bold text-brand-500 mb-4">
                {tier.fields.price}
              </div>
              {tier.fields.priceNote && (
                <p className="text-gray-600 mb-6">{tier.fields.priceNote}</p>
              )}
              
              <ul className="space-y-3 mb-8">
                {tier.fields.features && tier.fields.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a
                href={tier.fields.ctaLink}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
              >
                {tier.fields.ctaLabel}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
