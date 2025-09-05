import { fetchSiteSettings } from "@/lib/contentful";
import { siteSettings as fallback } from "@/lib/tempData";

export async function loadSiteSettings() {
  const fromCf = await fetchSiteSettings();
  return {
    name: fromCf?.siteName || process.env.NEXT_PUBLIC_SITE_NAME || fallback.name,
    calendlyUrl: fromCf?.calendlyUrl || process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL || fallback.calendlyUrl,
    navLinks: fromCf?.navLinks || fallback.navLinks,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    ga4Id: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
    hotjarVersion: process.env.NEXT_PUBLIC_HOTJAR_VERSION || '6',
  };
}

export const getEmailConfig = () => ({
  fromEmail: process.env.SES_FROM_EMAIL || 'noreply@yourdomain.com',
  fromName: process.env.SES_FROM_NAME || 'MonoHR',
  adminEmail: process.env.SES_ADMIN_EMAIL || 'admin@yourdomain.com',
  supportEmail: process.env.SES_SUPPORT_EMAIL || 'support@yourdomain.com',
});

export const getHubSpotConfig = () => ({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
  portalId: process.env.HUBSPOT_PORTAL_ID,
});

export const getAWSConfig = () => ({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
});


