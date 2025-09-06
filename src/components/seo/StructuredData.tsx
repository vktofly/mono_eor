"use client";

import { usePathname } from 'next/navigation';

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'service' | 'faq' | 'article' | 'breadcrumb' | 'localBusiness';
  data?: any;
}

export function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const pathname = usePathname();

  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return getOrganizationSchema();
      case 'website':
        return getWebsiteSchema();
      case 'service':
        return getServiceSchema(data);
      case 'faq':
        return getFAQSchema(data);
      case 'article':
        return getArticleSchema(data);
      case 'breadcrumb':
        return getBreadcrumbSchema(data);
      case 'localBusiness':
        return getLocalBusinessSchema();
      default:
        return getOrganizationSchema();
    }
  };

  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MonoHR",
    "alternateName": "MonoHR EOR Services",
    "url": "https://www.monohr.com",
    "logo": "https://www.monohr.com/logo.png",
    "description": "Leading Employer of Record (EOR) services in India. Scale your team in India without the complexity. 48-hour setup, 40% cost savings, 100% compliance.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "MonoHR Team"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXX-XXXXXX",
      "contactType": "customer service",
      "email": "contact@monohr.com",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/monohr",
      "https://twitter.com/monohr"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "EOR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Employer of Record India",
            "description": "Complete EOR services for hiring in India"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Contractor Management",
            "description": "Professional contractor management services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Payroll Services",
            "description": "Comprehensive payroll processing in India"
          }
        }
      ]
    }
  });

  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MonoHR - EOR India Services",
    "alternateName": "MonoHR",
    "url": "https://www.monohr.com",
    "description": "Scale your team in India without the complexity. EOR, payroll, and contractor management made simple.",
    "publisher": {
      "@type": "Organization",
      "name": "MonoHR",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.monohr.com/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.monohr.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "name": "EOR India",
          "url": "https://www.monohr.com/eor-india"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Pricing",
          "url": "https://www.monohr.com/pricing"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Contractor Management",
          "url": "https://www.monohr.com/contractor-management-india"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Resources",
          "url": "https://www.monohr.com/resources"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "About",
          "url": "https://www.monohr.com/about"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Contact",
          "url": "https://www.monohr.com/contact"
        }
      ]
    }
  });

  const getServiceSchema = (serviceData: any) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData?.name || "EOR India Services",
    "description": serviceData?.description || "Employer of Record services in India for global companies",
    "provider": {
      "@type": "Organization",
      "name": "MonoHR",
      "url": "https://www.monohr.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "serviceType": "Employer of Record",
    "category": "Human Resources",
    "offers": {
      "@type": "Offer",
      "price": "Contact for pricing",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "EOR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Employment Compliance",
            "description": "Full compliance with Indian employment laws"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Payroll Processing",
            "description": "Complete payroll management and processing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Benefits Administration",
            "description": "Employee benefits and insurance management"
          }
        }
      ]
    }
  });

  const getFAQSchema = (faqData: any) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData?.faqs?.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })) || []
  });

  const getArticleSchema = (articleData: any) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData?.title || "EOR India Services",
    "description": articleData?.description || "Complete guide to Employer of Record services in India",
    "image": articleData?.image || "https://www.monohr.com/og-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "MonoHR",
      "url": "https://www.monohr.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MonoHR",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.monohr.com/logo.png"
      }
    },
    "datePublished": articleData?.publishedDate || new Date().toISOString(),
    "dateModified": articleData?.modifiedDate || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.monohr.com${pathname}`
    }
  });

  const getBreadcrumbSchema = (breadcrumbData: any) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbData?.items?.map((item: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    })) || []
  });

  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "MonoHR",
    "description": "Employer of Record services in India",
    "url": "https://www.monohr.com",
    "telephone": "+91-XXXX-XXXXXX",
    "email": "contact@monohr.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "serviceArea": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "EOR Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "EOR India",
            "description": "Complete Employer of Record services"
          }
        }
      ]
    }
  });

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}
