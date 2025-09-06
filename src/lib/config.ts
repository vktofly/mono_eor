import { contentfulService, SiteSettings } from './contentful';

// Default site settings (fallback)
const defaultSiteSettings: SiteSettings = {
  siteName: "MonoHR",
  navLinks: [
    {
      label: "EOR India",
      href: "/eor-india"
    },
    {
      label: "Pricing",
      href: "/pricing"
    },
    {
      label: "Contractor Management",
      href: "/contractor-management-india"
    },
    {
      label: "Resources",
      href: "/resources"
    },
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Contact",
      href: "/contact"
    }
  ],
  footerLinks: [
    {
      label: "Privacy Policy",
      href: "/privacy"
    },
    {
      label: "Terms of Service",
      href: "/terms"
    },
    {
      label: "Cookie Policy",
      href: "/cookies"
    }
  ],
  defaultSEO: {
    title: "EOR India | Employer of Record Services | MonoHR - 48 Hour Setup",
    description: "Scale your team in India in just 48 hours with MonoHR's EOR services. 40% cost savings, 100% compliance, India-first expertise.",
    keywords: ["EOR India", "Employer of Record India", "India EOR services", "hire in India"]
  },
  cookiesText: "We use cookies to analyze traffic and improve your experience. You can accept or reject analytics cookies."
};

// Cache for site settings
let siteSettingsCache: SiteSettings | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function loadSiteSettings(): Promise<SiteSettings> {
  // Check if we have valid cached data
  if (siteSettingsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return siteSettingsCache;
  }

  try {
    // Try to load from Contentful
    const contentfulSettings = await contentfulService.getSiteSettings();
    
    if (contentfulSettings) {
      siteSettingsCache = contentfulSettings;
      cacheTimestamp = Date.now();
      return contentfulSettings;
    }
  } catch (error) {
    console.warn('Failed to load site settings from Contentful, using defaults:', error);
  }

  // Fallback to default settings
  return defaultSiteSettings;
}

// Function to clear cache (useful for development)
export function clearSiteSettingsCache(): void {
  siteSettingsCache = null;
  cacheTimestamp = 0;
}

// Function to get cached settings without async call
export function getCachedSiteSettings(): SiteSettings | null {
  return siteSettingsCache;
}

// Calendly URL configuration
export function getCalendlyUrl(): string {
  return process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL || 'https://calendly.com/monohr/eor-consultation';
}

// Email configuration
export function getEmailConfig() {
  return {
    fromEmail: process.env.SES_FROM_EMAIL || 'noreply@monohr.com',
    toEmail: process.env.SES_SALES_TO || 'contact@monohr.com',
    replyTo: process.env.SES_FROM_EMAIL || 'contact@monohr.com',
    fromName: process.env.SES_FROM_NAME || 'MonoHR',
    adminEmail: process.env.SES_ADMIN_EMAIL || 'admin@monohr.com',
    supportEmail: process.env.SES_SUPPORT_EMAIL || 'support@monohr.com',
  };
}

// AWS configuration
export function getAWSConfig() {
  return {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'us-east-1',
  };
}

// HubSpot configuration
export function getHubSpotConfig() {
  return {
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN || '',
    portalId: process.env.HUBSPOT_PORTAL_ID || '',
  };
}

// Site configuration
export function getSiteConfig() {
  return {
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'MonoHR',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://monohr.vercel.app',
    nodeEnv: process.env.NODE_ENV || 'development',
  };
}

// Analytics configuration
export function getAnalyticsConfig() {
  return {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID || '',
    hotjarVersion: parseInt(process.env.NEXT_PUBLIC_HOTJAR_VERSION || '6'),
  };
}

// Contentful configuration
export function getContentfulConfig() {
  return {
    spaceId: process.env.CONTENTFUL_SPACE_ID || '',
    cdaToken: process.env.CONTENTFUL_CDA_TOKEN || '',
    previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN || '',
    environment: process.env.CONTENTFUL_ENV || 'master',
    previewSecret: process.env.CONTENTFUL_PREVIEW_SECRET || '',
    webhookSecret: process.env.CONTENTFUL_WEBHOOK_SECRET || '',
  };
}