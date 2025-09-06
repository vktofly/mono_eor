# Integration Testing Guide

This guide will help you test all the integrations implemented in your EOR website.

## 🧪 Testing Checklist

### 1. Environment Variables Setup

First, ensure all environment variables are set in your `.env.local` file:

```bash
# Contentful CMS
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_CDA_TOKEN=your_cda_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_ENV=master

# HubSpot CRM
HUBSPOT_ACCESS_TOKEN=your_hubspot_token
HUBSPOT_PORTAL_ID=your_portal_id

# Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
NEXT_PUBLIC_HOTJAR_VERSION=6

# Calendly
NEXT_PUBLIC_CALENDLY_EMBED_URL=https://calendly.com/your-username/event-type
NEXT_PUBLIC_CALENDLY_USERNAME=your_username

# AWS SES
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
SES_FROM_EMAIL=noreply@yourdomain.com
SES_FROM_NAME=MonoHR
SES_ADMIN_EMAIL=admin@yourdomain.com
SES_SUPPORT_EMAIL=support@yourdomain.com

# Website
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=MonoHR
```

### 2. Google Analytics 4 & GTM Testing

#### Test GA4:
1. **Open Developer Tools** (F12)
2. **Go to Network tab**
3. **Navigate to any page**
4. **Look for requests to:**
   - `google-analytics.com/g/collect`
   - `googletagmanager.com/gtag/js`

#### Test GTM:
1. **Install Google Tag Assistant** browser extension
2. **Visit your website**
3. **Check if GTM container is loaded**
4. **Verify tags are firing**

#### Test Events:
1. **Click buttons** - should see `button_click` events
2. **Submit forms** - should see `form_submit` events
3. **Scroll down** - should see `scroll_depth` events
4. **Stay on page** - should see `time_on_page` events

### 3. Hotjar Testing

#### Test Hotjar Loading:
1. **Open Developer Tools** (F12)
2. **Go to Network tab**
3. **Navigate to any page**
4. **Look for requests to:**
   - `static.hotjar.com/c/hotjar-`

#### Test Hotjar Events:
1. **Open Hotjar dashboard**
2. **Navigate your website**
3. **Check if sessions are being recorded**
4. **Verify heatmaps are generating**

### 4. HubSpot CRM Testing

#### Test Contact Creation:
1. **Submit contact form**
2. **Check HubSpot contacts**
3. **Verify contact data is synced**

#### Test Lead Scoring:
1. **Create test contact**
2. **Check HubSpot lead scoring**
3. **Verify workflows are triggered**

### 5. Calendly Integration Testing

#### Test Calendly Widget:
1. **Click "Schedule a Call" button**
2. **Verify popup opens**
3. **Check if Calendly loads correctly**

#### Test Event Tracking:
1. **Schedule a test meeting**
2. **Check GA4 for `calendly_event_scheduled`**
3. **Check Hotjar for Calendly events**

### 6. Email Service Testing

#### Test Contact Form:
1. **Submit contact form**
2. **Check email is sent**
3. **Verify email content**

#### Test Email Templates:
1. **Test welcome email**
2. **Test quote request email**
3. **Test demo request email**

### 7. Contentful CMS Testing

#### Test Content Loading:
1. **Check if content loads from CMS**
2. **Verify fallback content works**
3. **Test preview mode**

## 🔧 Manual Testing Steps

### Step 1: Analytics Testing

```bash
# 1. Open browser with Developer Tools
# 2. Navigate to your website
# 3. Check Console for any errors
# 4. Verify tracking scripts are loaded
```

### Step 2: Form Testing

```bash
# 1. Fill out contact form
# 2. Submit form
# 3. Check for success message
# 4. Verify email is sent
# 5. Check HubSpot for new contact
```

### Step 3: Calendly Testing

```bash
# 1. Click Calendly button
# 2. Verify popup opens
# 3. Schedule test meeting
# 4. Check event tracking
```

### Step 4: Performance Testing

```bash
# 1. Use Lighthouse for performance audit
# 2. Check Core Web Vitals
# 3. Verify lazy loading works
# 4. Test mobile responsiveness
```

## 🐛 Common Issues & Solutions

### Issue 1: Analytics Not Tracking
**Solution:**
- Check environment variables
- Verify script loading in Network tab
- Check for ad blockers

### Issue 2: HubSpot Not Syncing
**Solution:**
- Verify API token permissions
- Check HubSpot portal ID
- Test API connection

### Issue 3: Calendly Not Loading
**Solution:**
- Check Calendly URL format
- Verify widget initialization
- Check for JavaScript errors

### Issue 4: Email Not Sending
**Solution:**
- Check AWS SES configuration
- Verify email addresses
- Check API endpoint

## 📊 Monitoring & Maintenance

### Daily Checks:
- [ ] Analytics data flowing
- [ ] Forms submitting successfully
- [ ] Calendly bookings working
- [ ] Email delivery rates

### Weekly Checks:
- [ ] HubSpot contact sync
- [ ] Performance metrics
- [ ] Error logs
- [ ] User feedback

### Monthly Checks:
- [ ] Integration health
- [ ] Data accuracy
- [ ] Performance optimization
- [ ] Security updates

## 🚀 Production Deployment

### Pre-deployment Checklist:
- [ ] All environment variables set
- [ ] Analytics tracking verified
- [ ] Forms tested end-to-end
- [ ] Calendly integration working
- [ ] Email service functional
- [ ] Performance optimized
- [ ] Security measures in place

### Post-deployment Verification:
- [ ] All integrations working
- [ ] Analytics data flowing
- [ ] Forms submitting
- [ ] Calendly bookings
- [ ] Email delivery
- [ ] Performance metrics
- [ ] Error monitoring

## 📞 Support Resources

### Documentation:
- [Google Analytics](https://developers.google.com/analytics)
- [HubSpot API](https://developers.hubspot.com/docs/api/overview)
- [Calendly API](https://developer.calendly.com/)
- [AWS SES](https://docs.aws.amazon.com/ses/)
- [Hotjar](https://help.hotjar.com/)

### Testing Tools:
- [Google Tag Assistant](https://tagassistant.google.com/)
- [HubSpot API Testing](https://developers.hubspot.com/docs/api/overview)
- [Calendly Testing](https://calendly.com/integrations)
- [AWS SES Testing](https://docs.aws.amazon.com/ses/latest/dg/send-email-simulator.html)

## 🎯 Success Metrics

### Analytics:
- Page views tracking
- Event tracking
- Conversion tracking
- User journey mapping

### CRM:
- Lead generation
- Contact sync
- Deal creation
- Pipeline management

### Engagement:
- Form submissions
- Calendly bookings
- Email opens
- User interactions

### Performance:
- Page load times
- Core Web Vitals
- Error rates
- User experience

---

**Note:** This testing guide should be used in conjunction with your development and staging environments before deploying to production.
