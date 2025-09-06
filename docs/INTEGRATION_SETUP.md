# EOR Website - Integration Setup Guide

This guide will help you set up all the necessary integrations for your EOR website.

## 🔧 Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

### Contentful CMS Configuration
```bash
# Get these from your Contentful space settings
CONTENTFUL_SPACE_ID=your_contentful_space_id
CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_contentful_preview_token
CONTENTFUL_ENVIRONMENT=master
```

### HubSpot CRM Integration
```bash
# Create a private app in HubSpot and get the access token
HUBSPOT_ACCESS_TOKEN=your_hubspot_private_app_token
HUBSPOT_PORTAL_ID=your_hubspot_portal_id
```

### Analytics & Tracking
```bash
# Google Analytics 4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Hotjar
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_site_id
NEXT_PUBLIC_HOTJAR_VERSION=6
```

### Calendly Integration
```bash
# Your Calendly scheduling link
NEXT_PUBLIC_CALENDLY_EMBED_URL=https://calendly.com/vktofly/30min
NEXT_PUBLIC_CALENDLY_USERNAME=Monohr
```

### AWS SES Email Configuration
```bash
# AWS SES credentials for sending emails
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1

# Email addresses
SES_FROM_EMAIL=noreply@yourdomain.com
SES_FROM_NAME=MonoHR
SES_ADMIN_EMAIL=admin@yourdomain.com
SES_SUPPORT_EMAIL=support@yourdomain.com
```

### Website Configuration
```bash
# Your website domain
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=MonoHR
```

## 📋 Setup Instructions

### 1. Contentful CMS Setup

1. **Create a Contentful account** at [contentful.com](https://contentful.com)
2. **Create a new space** for your EOR website
3. **Get your credentials**:
   - Go to Settings → API keys
   - Copy the Space ID and Content Delivery API access token
4. **Create content types** (optional - we have fallback data):
   - Site Settings
   - Testimonials
   - Client Logos
   - Pricing Tiers

### 2. HubSpot CRM Setup

1. **Create a HubSpot account** at [hubspot.com](https://hubspot.com)
2. **Create a private app**:
   - Go to Settings → Integrations → Private Apps
   - Create a new private app
   - Grant permissions for: Contacts, Companies, Deals, Forms
3. **Get your credentials**:
   - Copy the access token
   - Note your portal ID from the URL

### 3. Google Analytics 4 Setup

1. **Create a GA4 property** at [analytics.google.com](https://analytics.google.com)
2. **Get your Measurement ID**:
   - Go to Admin → Data Streams
   - Select your web stream
   - Copy the Measurement ID (starts with G-)

### 4. Google Tag Manager Setup

1. **Create a GTM account** at [tagmanager.google.com](https://tagmanager.google.com)
2. **Create a container** for your website
3. **Get your Container ID** (starts with GTM-)

### 5. Hotjar Setup

1. **Create a Hotjar account** at [hotjar.com](https://hotjar.com)
2. **Add your website** to Hotjar
3. **Get your Site ID** from the tracking code 6512862

### 6. Calendly Setup

1. **Create a Calendly account** at [calendly.com](https://calendly.com)
2. **Create an event type** (e.g., "Intro Call")
3. **Get your Calendly URL** from the event settings

### 7. AWS SES Setup

1. **Create an AWS account** at [aws.amazon.com](https://aws.amazon.com)
2. **Set up SES**:
   - Go to Amazon SES in the AWS Console
   - Verify your domain and email addresses
   - Create IAM user with SES permissions
3. **Get your credentials**:
   - Access Key ID and Secret Access Key
   - Choose your preferred AWS region

## 🚀 Testing Your Integrations

After setting up all the environment variables, test each integration:

1. **Contentful**: Check if content loads from CMS
2. **HubSpot**: Submit a test form to verify lead creation
3. **Analytics**: Check if events are being tracked
4. **Calendly**: Test the booking widget
5. **Email**: Send a test email through the contact form

## 📞 Support

If you need help with any of these integrations, refer to:
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [Google Analytics Documentation](https://developers.google.com/analytics)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)

## 🔒 Security Notes

- Never commit your `.env.local` file to version control
- Use environment-specific credentials for development/production
- Regularly rotate your API keys and access tokens
- Monitor your API usage and set up alerts for unusual activity
