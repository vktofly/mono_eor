export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MonoHR",
    "description": "Leading EOR (Employer of Record) services provider in India. Scale your team in India in just 48 hours with 40% cost savings and 100% compliance.",
    "url": "https://www.monohr.com",
    "logo": "https://www.monohr.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "hello@monohr.com",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra"
    },
    "sameAs": [
      "https://www.linkedin.com/company/monohr",
      "https://twitter.com/monohr"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "EOR India Services",
        "description": "Employer of Record services for hiring in India without entity setup",
        "provider": {
          "@type": "Organization",
          "name": "MonoHR"
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "price": "99",
          "priceCurrency": "USD",
          "description": "Starting from $99 per employee per month"
        }
      },
      {
        "@type": "Service", 
        "name": "India Payroll Services",
        "description": "Complete payroll processing and compliance for Indian employees",
        "provider": {
          "@type": "Organization",
          "name": "MonoHR"
        }
      },
      {
        "@type": "Service",
        "name": "Contractor Management India", 
        "description": "Contractor payment and management services in India",
        "provider": {
          "@type": "Organization",
          "name": "MonoHR"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "foundingDate": "2023",
    "numberOfEmployees": "50-100"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly can you set up our India operations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We can have your India operations up and running in just 48 hours. Our streamlined process includes legal registration, compliance setup, and payroll configuration. Most competitors take 2-4 weeks."
        }
      },
      {
        "@type": "Question", 
        "name": "What are the real cost savings compared to setting up our own entity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our clients typically save 40-60% compared to traditional entity setup. This includes avoiding ₹15-25 lakhs in legal setup costs, ₹5-10 lakhs annually in compliance overhead, and 6-12 months of setup time."
        }
      },
      {
        "@type": "Question",
        "name": "What specific Indian compliance requirements do you handle?", 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We handle all Indian employment law compliance including PF (Provident Fund), ESI (Employee State Insurance), professional tax, gratuity, labor law requirements, and GST compliance. 100% compliance guaranteed with our local legal team."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
}
