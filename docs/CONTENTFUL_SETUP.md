# Contentful CMS Setup Guide

This guide will help you set up Contentful CMS for your EOR India website.

## 1. Create Contentful Account

1. Go to [contentful.com](https://www.contentful.com)
2. Sign up for a free account
3. Create a new space called "MonoHR EOR Site"

## 2. Get Your Credentials

After creating your space, you'll need these credentials:

### From Contentful Dashboard:
1. Go to **Settings** → **API keys**
2. Copy the following values:
   - **Space ID** (e.g., `abc123def456`)
   - **Content Delivery API - access token** (e.g., `xyz789uvw012`)

### For Preview Mode (Optional):
1. Go to **Settings** → **API keys**
2. Copy the **Content Preview API - access token**

## 3. Environment Variables

Add these to your `.env.local` file:

```bash
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_CDA_TOKEN=your_content_delivery_token_here
CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here
CONTENTFUL_ENV=master
```

## 4. Content Models Setup

You need to create these content types in Contentful:

### 4.1 Site Settings
- **Content Type ID**: `siteSettings`
- **Fields**:
  - `siteName` (Short text)
  - `logo` (Media)
  - `navLinks` (JSON object)
  - `footerLinks` (JSON object)
  - `defaultSEO` (JSON object)
  - `cookiesText` (Long text)

### 4.2 Page
- **Content Type ID**: `page`
- **Fields**:
  - `title` (Short text)
  - `slug` (Short text, unique)
  - `seo` (Reference to SEO content type)
  - `hero` (Reference to Hero Section)
  - `sections` (References to various section types)
  - `hideFromNav` (Boolean)

### 4.3 Hero Section
- **Content Type ID**: `heroSection`
- **Fields**:
  - `eyebrow` (Short text)
  - `heading` (Short text)
  - `subheading` (Long text)
  - `primaryCTA` (JSON object)
  - `secondaryCTA` (JSON object)
  - `image` (Media)

### 4.4 Feature Grid Section
- **Content Type ID**: `featureGridSection`
- **Fields**:
  - `title` (Short text)
  - `features` (References to Feature content type)

### 4.5 Feature
- **Content Type ID**: `feature`
- **Fields**:
  - `icon` (Short text)
  - `title` (Short text)
  - `body` (Long text)

### 4.6 Steps Section
- **Content Type ID**: `stepsSection`
- **Fields**:
  - `title` (Short text)
  - `steps` (References to Step content type)

### 4.7 Step
- **Content Type ID**: `step`
- **Fields**:
  - `number` (Integer)
  - `title` (Short text)
  - `body` (Long text)
  - `icon` (Short text)

### 4.8 Pricing Table Section
- **Content Type ID**: `pricingTableSection`
- **Fields**:
  - `title` (Short text)
  - `billingToggle` (Boolean)
  - `tiers` (References to Pricing Tier)
  - `comparisonTable` (JSON object)

### 4.9 Pricing Tier
- **Content Type ID**: `pricingTier`
- **Fields**:
  - `name` (Short text)
  - `price` (Short text)
  - `priceNote` (Short text)
  - `features` (Short text, list)
  - `ctaLabel` (Short text)
  - `ctaLink` (Short text)

### 4.10 Testimonial Section
- **Content Type ID**: `testimonialSection`
- **Fields**:
  - `title` (Short text)
  - `testimonials` (References to Testimonial)

### 4.11 Testimonial
- **Content Type ID**: `testimonial`
- **Fields**:
  - `quote` (Long text)
  - `authorName` (Short text)
  - `role` (Short text)
  - `company` (Short text)
  - `avatar` (Media)
  - `logo` (Media)

### 4.12 FAQ Section
- **Content Type ID**: `faqSection`
- **Fields**:
  - `title` (Short text)
  - `items` (References to FAQ Item)

### 4.13 FAQ Item
- **Content Type ID**: `faqItem`
- **Fields**:
  - `question` (Short text)
  - `answer` (Long text)
  - `schemaEnabled` (Boolean)

### 4.14 Blog Post
- **Content Type ID**: `blogPost`
- **Fields**:
  - `title` (Short text)
  - `slug` (Short text, unique)
  - `author` (Reference to Author)
  - `tags` (Short text, list)
  - `coverImage` (Media)
  - `excerpt` (Long text)
  - `body` (Rich text)
  - `publishDate` (Date & time)
  - `seo` (Reference to SEO)

### 4.15 Author
- **Content Type ID**: `author`
- **Fields**:
  - `name` (Short text)
  - `title` (Short text)
  - `avatar` (Media)
  - `bio` (Long text)

### 4.16 Guide
- **Content Type ID**: `guide`
- **Fields**:
  - `title` (Short text)
  - `slug` (Short text, unique)
  - `coverImage` (Media)
  - `excerpt` (Long text)
  - `body` (Rich text)
  - `pdfAsset` (Media)
  - `gated` (Boolean)
  - `seo` (Reference to SEO)

### 4.17 SEO
- **Content Type ID**: `seo`
- **Fields**:
  - `metaTitle` (Short text)
  - `metaDescription` (Long text)
  - `canonicalUrl` (Short text)
  - `ogImage` (Media)
  - `schemaType` (Short text)
  - `schemaJson` (JSON object)

## 5. Sample Content

### 5.1 Site Settings Example
```json
{
  "siteName": "MonoHR",
  "navLinks": [
    {
      "label": "EOR India",
      "href": "/eor-india"
    },
    {
      "label": "Pricing",
      "href": "/pricing"
    },
    {
      "label": "Resources",
      "href": "/resources"
    }
  ],
  "footerLinks": [
    {
      "label": "Privacy Policy",
      "href": "/privacy"
    },
    {
      "label": "Terms of Service",
      "href": "/terms"
    }
  ],
  "defaultSEO": {
    "title": "EOR India | Employer of Record Services | MonoHR",
    "description": "Scale your team in India in just 48 hours with MonoHR's EOR services.",
    "keywords": ["EOR India", "Employer of Record", "India EOR services"]
  },
  "cookiesText": "We use cookies to analyze traffic and improve your experience."
}
```

### 5.2 Hero Section Example
```json
{
  "eyebrow": "India • Employer of Record",
  "heading": "Scale your team in India without the complexity",
  "subheading": "Hire top Indian talent in 48 hours with our EOR services. 40% cost savings, 100% compliance, India-first expertise.",
  "primaryCTA": {
    "text": "Get Started",
    "href": "/contact"
  },
  "secondaryCTA": {
    "text": "View Pricing",
    "href": "/pricing"
  }
}
```

## 6. Testing the Integration

After setting up your content models and adding sample content:

1. **Test the connection**:
   ```bash
   npm run dev
   ```

2. **Check the console** for any Contentful connection errors

3. **Visit your pages** to see if content is loading from Contentful

## 7. Content Management

### 7.1 Adding New Content
1. Go to your Contentful space
2. Create new entries for the content types you need
3. Publish the entries
4. Content will automatically appear on your website

### 7.2 Updating Existing Content
1. Edit entries in Contentful
2. Publish changes
3. Content updates immediately on your website

### 7.3 Preview Mode
- Use preview tokens to see unpublished content
- Access preview mode at `/api/preview?secret=your-secret`

## 8. Troubleshooting

### Common Issues:

1. **"Space not found" error**:
   - Check your `CONTENTFUL_SPACE_ID` is correct
   - Ensure the space exists and is accessible

2. **"Access token invalid" error**:
   - Verify your `CONTENTFUL_CDA_TOKEN` is correct
   - Check if the token has the right permissions

3. **Content not loading**:
   - Ensure content is published in Contentful
   - Check if content type IDs match exactly
   - Verify field names match the expected structure

4. **Images not displaying**:
   - Check if image assets are published
   - Verify the image URL structure

## 9. Next Steps

After setting up Contentful:

1. **Create sample content** for all your pages
2. **Test the integration** thoroughly
3. **Set up preview mode** for content editors
4. **Train your team** on using Contentful
5. **Set up webhooks** for automatic deployments (optional)

## 10. Support

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Contentful Community](https://www.contentful.com/community/)
- [Contentful Support](https://www.contentful.com/support/)
