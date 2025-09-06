import { getSiteConfig, getAnalyticsConfig, getContentfulConfig, getEmailConfig, getAWSConfig, getHubSpotConfig } from './config';

export interface EnvValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  missing: string[];
  configured: string[];
}

export function validateEnvironmentVariables(): EnvValidationResult {
  const result: EnvValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    missing: [],
    configured: []
  };

  // Site Configuration
  const siteConfig = getSiteConfig();
  if (!siteConfig.siteName) result.missing.push('NEXT_PUBLIC_SITE_NAME');
  else result.configured.push('NEXT_PUBLIC_SITE_NAME');
  
  if (!siteConfig.siteUrl) result.missing.push('NEXT_PUBLIC_SITE_URL');
  else result.configured.push('NEXT_PUBLIC_SITE_URL');

  // Analytics Configuration
  const analyticsConfig = getAnalyticsConfig();
  if (!analyticsConfig.ga4MeasurementId) {
    result.warnings.push('NEXT_PUBLIC_GA4_MEASUREMENT_ID not configured - Analytics disabled');
  } else {
    result.configured.push('NEXT_PUBLIC_GA4_MEASUREMENT_ID');
  }

  if (!analyticsConfig.gtmId) {
    result.warnings.push('NEXT_PUBLIC_GTM_ID not configured - GTM disabled');
  } else {
    result.configured.push('NEXT_PUBLIC_GTM_ID');
  }

  if (!analyticsConfig.hotjarId) {
    result.warnings.push('NEXT_PUBLIC_HOTJAR_ID not configured - Hotjar disabled');
  } else {
    result.configured.push('NEXT_PUBLIC_HOTJAR_ID');
  }

  // Contentful Configuration
  const contentfulConfig = getContentfulConfig();
  if (!contentfulConfig.spaceId) {
    result.warnings.push('CONTENTFUL_SPACE_ID not configured - CMS disabled');
  } else {
    result.configured.push('CONTENTFUL_SPACE_ID');
  }

  if (!contentfulConfig.cdaToken) {
    result.warnings.push('CONTENTFUL_CDA_TOKEN not configured - CMS disabled');
  } else {
    result.configured.push('CONTENTFUL_CDA_TOKEN');
  }

  // Email Configuration
  const emailConfig = getEmailConfig();
  const awsConfig = getAWSConfig();
  
  if (!awsConfig.accessKeyId || !awsConfig.secretAccessKey) {
    result.errors.push('AWS credentials not configured - Email service will use simulation mode');
    result.isValid = false;
  } else {
    result.configured.push('AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY');
  }

  if (!emailConfig.fromEmail) {
    result.errors.push('SES_FROM_EMAIL not configured - Email service may fail');
    result.isValid = false;
  } else {
    result.configured.push('SES_FROM_EMAIL');
  }

  if (!emailConfig.toEmail) {
    result.warnings.push('SES_SALES_TO not configured - Using default email');
  } else {
    result.configured.push('SES_SALES_TO');
  }

  // HubSpot Configuration
  const hubspotConfig = getHubSpotConfig();
  if (!hubspotConfig.accessToken) {
    result.warnings.push('HUBSPOT_ACCESS_TOKEN not configured - CRM integration disabled');
  } else {
    result.configured.push('HUBSPOT_ACCESS_TOKEN');
  }

  if (!hubspotConfig.portalId) {
    result.warnings.push('HUBSPOT_PORTAL_ID not configured - CRM integration may fail');
  } else {
    result.configured.push('HUBSPOT_PORTAL_ID');
  }

  return result;
}

export function getEnvironmentStatus(): {
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details: EnvValidationResult;
} {
  const validation = validateEnvironmentVariables();
  
  if (!validation.isValid) {
    return {
      status: 'error',
      message: 'Critical environment variables are missing',
      details: validation
    };
  }
  
  if (validation.warnings.length > 0) {
    return {
      status: 'warning',
      message: 'Some optional integrations are not configured',
      details: validation
    };
  }
  
  return {
    status: 'healthy',
    message: 'All environment variables are properly configured',
    details: validation
  };
}

// Runtime environment validation (for client-side)
export function validateClientEnvironment(): {
  isProduction: boolean;
  hasAnalytics: boolean;
  hasHotjar: boolean;
  siteUrl: string;
} {
  const siteConfig = getSiteConfig();
  const analyticsConfig = getAnalyticsConfig();
  
  return {
    isProduction: siteConfig.nodeEnv === 'production',
    hasAnalytics: !!analyticsConfig.ga4MeasurementId,
    hasHotjar: !!analyticsConfig.hotjarId,
    siteUrl: siteConfig.siteUrl
  };
}
