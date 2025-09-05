# Environment Variables Setup Guide

## 🚀 Quick Setup Instructions

### 1. Create Your `.env.local` File

Create a file named `.env.local` in your project root directory with the following content:

```bash
# ===========================================
# EOR WEBSITE - ENVIRONMENT VARIABLES
# ===========================================

# ===========================================
# SITE CONFIGURATION
# ===========================================
NEXT_PUBLIC_SITE_NAME=MonoHR
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# ===========================================
# CONTENTFUL CMS (Optional)
# ===========================================
CONTENTFUL_SPACE_ID=your_contentful_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token_here

# ===========================================
# HUBSPOT CRM
# ===========================================
HUBSPOT_ACCESS_TOKEN=your_hubspot_private_app_token_here
HUBSPOT_PORTAL_ID=your_hubspot_portal_id_here

# ===========================================
# ANALYTICS & TRACKING
# ===========================================
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_site_id_here
NEXT_PUBLIC_HOTJAR_VERSION=6

# ===========================================
# CALENDLY INTEGRATION
# ===========================================
NEXT_PUBLIC_CALENDLY_EMBED_URL=https://calendly.com/your-username/intro-call

# ===========================================
# AWS SES EMAIL SERVICE
# ===========================================
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
AWS_REGION=us-east-1
SES_FROM_EMAIL=noreply@yourdomain.com
SES_FROM_NAME=MonoHR
SES_ADMIN_EMAIL=admin@yourdomain.com
SES_SUPPORT_EMAIL=support@yourdomain.com
SES_SALES_TO=sales@yourdomain.com

# ===========================================
# DEVELOPMENT SETTINGS
# ===========================================
NODE_ENV=development
```

## 🔧 How to Get Each Credential

### **Contentful CMS (Optional)**
1. Go to [Contentful](https://app.contentful.com/)
2. Create a new space or use existing
3. Go to Settings → API keys
4. Copy Space ID and Content Delivery API access token

### **HubSpot CRM**
1. Go to [HubSpot](https://app.hubspot.com/)
2. Go to Settings → Integrations → Private Apps
3. Create a new private app
4. Enable these scopes:
   - `crm.objects.contacts.write`
   - `crm.objects.contacts.read`
   - `crm.objects.deals.write`
   - `crm.objects.deals.read`
5. Copy the access token and portal ID

### **Google Analytics 4**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Go to Admin → Data Streams
4. Copy the Measurement ID (starts with G-)

### **Google Tag Manager**
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new container
3. Copy the Container ID (starts with GTM-)

### **Hotjar**
1. Go to [Hotjar](https://www.hotjar.com/)
2. Create a new site
3. Copy the Site ID from the tracking code

### **Calendly**
1. Go to [Calendly](https://calendly.com/)
2. Create an event type
3. Go to Event → Advanced → Embed
4. Copy the embed URL

### **AWS SES**
1. Go to [AWS Console](https://aws.amazon.com/ses/)
2. Create SES service
3. Verify your domain/email
4. Create IAM user with SES permissions
5. Copy Access Key ID and Secret Access Key

## 🚀 Vercel Deployment

### **For Vercel Deployment:**

1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add each variable from your `.env.local` file**
5. **Make sure to set the correct environment (Production, Preview, Development)**

### **Required Variables for Vercel:**
```bash
# Essential for production
NEXT_PUBLIC_SITE_NAME
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_CALENDLY_EMBED_URL

# Analytics (recommended)
NEXT_PUBLIC_GA4_MEASUREMENT_ID
NEXT_PUBLIC_GTM_ID
NEXT_PUBLIC_HOTJAR_ID

# CRM & Email (recommended)
HUBSPOT_ACCESS_TOKEN
HUBSPOT_PORTAL_ID
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
SES_FROM_EMAIL
SES_ADMIN_EMAIL
```

## 🧪 Testing Your Setup

### **1. Test Locally:**
```bash
# Start development server
npm run dev

# Test contact form
# Check browser console for any errors
# Verify integrations are working
```

### **2. Test on Vercel:**
1. Deploy to Vercel
2. Test contact form on live site
3. Check HubSpot for new contacts
4. Verify email notifications
5. Check analytics tracking

## 🔒 Security Notes

- ✅ **Never commit `.env.local` to git**
- ✅ **Use different credentials for development/production**
- ✅ **Rotate API keys regularly**
- ✅ **Use least privilege principle for AWS IAM**
- ✅ **Monitor usage and costs**

## 🆘 Troubleshooting

### **Common Issues:**

1. **Build fails on Vercel:**
   - Check all environment variables are set
   - Verify variable names match exactly
   - Check for typos in values

2. **Contact form not working:**
   - Verify HubSpot credentials
   - Check AWS SES configuration
   - Test email sending permissions

3. **Analytics not tracking:**
   - Verify GA4/GTM IDs are correct
   - Check if tracking codes are loading
   - Test in incognito mode

4. **Calendly not loading:**
   - Verify Calendly URL is correct
   - Check if event is published
   - Test embed URL directly

## 📞 Need Help?

If you encounter issues:
1. Check the detailed setup guide in `docs/INTEGRATION_SETUP.md`
2. Verify each service's documentation
3. Test integrations one by one
4. Check browser console for errors

**Your EOR website is ready to go live! 🎉**
