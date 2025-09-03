### Project Overview
- **Goal**: Build a multi-page marketing site focused on India-specific Employer of Record (EOR), Payroll & Compliance, and Contractor Management to drive leads, contacts, and automation requests.
- **Primary KPIs**: Calls booked, CTR.
- **Audience**: Founders/HR at startups in US/UK/Canada/Australia; industries: Development, IT.
- **References**: `https://www.wisemonk.io/eor`, `https://www.wisemonk.io/payroll-in-india`, `https://www.wisemonk.io/blogs/hire-and-pay-contractors-in-india`, `https://www.deel.com`.

### Information Architecture (Sitemap)
- Top-level: `/` Home, `/eor-india`, `/payroll-in-india`, `/contractor-management-india`, `/pricing`, `/resources` → `/blog`, `/guides`, `/about`, `/contact`
- Footer: `/privacy`, `/terms`, `/faqs`, `/careers`
- URL strategy: Short, keyword-rich slugs aligned to India-focused topics.

### Page Blueprints
- EOR India (`/eor-india`)
  - Hero (USP, primary CTA), trust logos, “How it works” (3–4 steps), benefits, pricing summary, integrations row, testimonials, FAQs (schema), final CTA.
- Payroll in India (`/payroll-in-india`)
  - Compliance stack (PF, ESI, TDS, PT), payroll process timeline, benefits/deductions table, calculator CTA (phase 2), FAQs.
- Contractor Management (`/contractor-management-india`)
  - AOR vs EOR vs Contractor comparison, onboarding/payouts flow, tax docs/compliance, FAQs.
- Pricing (`/pricing`)
  - Tiers + feature comparison tables mirroring Wisemonk’s structure; monthly/annual toggle; “what’s included” accordion; add-ons; embedded calendar CTA.
- Resources
  - Blog index with tags/authors; post page; Guides (gated PDF) with lead capture.
- About, Contact
  - Contact: single-step form, inline success + embedded Calendly.
- Legal: Privacy, Terms, FAQs.

### Branding
- Palette (Premium + subdued)
  - Blues: `#2155CD` (primary), `#153F9E` (hover), `#EEF3FF` (tint)
  - Oranges (CTAs): `#FF7A00` (primary), `#E16400` (hover), `#FFD9B3` (focus ring)
  - Neutrals: `#0F172A` (text), `#475569` (subtext), `#E2E8F0` (borders), `#FFFFFF` (bg)
- Temporary logo: Simple logotype (blue) with orange accent dot; swap later.
- Typography: Inter (headings/body), accessible sizes/contrast.

### Tech Stack
- Framework: Next.js 14 (App Router), TypeScript
- Styling: Tailwind CSS, shadcn/ui primitives
- CMS: Contentful
- Hosting/CDN: Vercel (preview now), Cloudflare DNS later
- Images: Next/Image; SVG icons
- Email: AWS SES
- Forms: Next.js API routes; server actions where appropriate

### Contentful Models
- `siteSettings`: siteName, logo, navLinks, footerLinks, defaultSEO, cookiesText
- `page`: title, slug, seo, hero(ref), sections[](refs), hideFromNav
- `heroSection`: eyebrow, heading, subheading, primaryCTA, secondaryCTA, image
- `featureGridSection`: title, features[](icon, title, body)
- `stepsSection`: title, steps[](number, title, body, icon)
- `pricingTableSection`: title, billingToggle, tiers[](name, price, priceNote, features[], ctaLabel, ctaLink), comparisonTable(columns[], rows[])
- `testimonialSection`: title, testimonials[](quote, authorName, role, company, avatar, logo)
- `faqSection`: title, items[](question, answer, schemaEnabled)
- `logosRowSection`: logos[](asset)
- `integrationsRowSection`: integrations[](name, logo, link)
- `blogPost`: title, slug, author(ref), tags[], coverImage, excerpt, body, publishDate, seo
- `guide`: title, slug, coverImage, excerpt, body, pdfAsset, gated, seo
- `author`: name, title, avatar, bio
- `seo`: metaTitle, metaDescription, canonicalUrl, ogImage, schemaType, schemaJson

### Key Features
- Lead capture: Single-step form (Name, Work email, Company, Country, Team size, Interest, Message optional) + spam protection (Cloudflare Turnstile/hCaptcha)
- Calendar scheduling: Embedded Calendly; Google Meet auto-generation
- Pricing comparison: Mirror Wisemonk categories; our own copy
- Social proof: Client logos, testimonials; placeholders initially
- Resources: Blog with tags/authors; gated guides
- Tools (phase 2): Salary/Total Cost calculator; later Tax/Gratuity
- Accessibility: WCAG 2.1 AA (semantic, keyboard, focus, contrast)

### Integrations
- CRM: HubSpot (Free) — form sync, MQL pipeline, email follow-ups
- Analytics: GA4 + GTM; events for form submit, CTA clicks, calendar booked
- Heatmaps: Hotjar (selected pages)
- Email: AWS SES (transactional + notifications)
- Alerts: Slack webhook on new leads
- Optional enrichment later: Clearbit

### Performance & SEO
- Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Rendering: SSG/ISR for marketing pages; edge caching
- SEO: Page-level metadata, OpenGraph, JSON-LD (Organization, Product/Service, FAQ), internal linking across EOR/Payroll/Contractor/Pricing
- Programmatic SEO: Glossary at `/resources/glossary/:slug`
- Keyword focus: “Employer of Record India”, “EOR India”, “hire in India without entity”, “India payroll compliance”, “pay contractors in India”

### Compliance & Legal
- Pages: Privacy, Terms, Cookie Policy
- Consent: Cookie banner with granular consent; GTM blocked until consent
- Data: Store PII in HubSpot; email via SES; environment secrets managed securely

### Security
- Bot protection (Turnstile/hCaptcha), API rate limiting, HTTPS, Vercel WAF
- SES SNS webhooks for bounces/complaints; suppression list
- IAM least privilege; key rotation policy

### Environment Variables
- Contentful: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENV`, `CONTENTFUL_CDA_TOKEN`, `CONTENTFUL_PREVIEW_TOKEN`
- HubSpot: `HUBSPOT_PRIVATE_APP_TOKEN`
- Analytics: `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_HOTJAR_ID`
- Calendly: `CALENDLY_URL`
- Email (SES): `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `SES_FROM_EMAIL`, `SES_SALES_TO`

### Execution Plan
- Week 1 (MVP foundation)
  - IA finalize, Contentful setup, Next.js scaffold, base components, SES route, pricing schema, deploy to Vercel preview
- Week 2
  - Build `/eor-india`, `/payroll-in-india`, `/contractor-management-india`, `/pricing`; HubSpot + Calendly wiring; SEO base; accessibility pass
- Week 3
  - Resources (Blog/Guides), testimonials/logos, FAQs, analytics events, Hotjar, QA, performance tuning
- Week 4
  - Salary/Cost calculator (phase 2), polish, legal review, launch; post-launch monitoring

### Deliverables
- Live Vercel preview
- Contentful space with models and sample entries
- Themed component library (buttons, cards, grids, tables, forms)
- Pages wired to CMS; pricing comparison configured
- Working lead form → HubSpot, SES email, Slack alert
- Embedded Calendly booking
- GA4/GTM/Hotjar configured; basic dashboards
- Legal pages + cookie consent
- Brief brand guide (palette, tokens, typography, logo placeholder)

### Owner Inputs Needed
- Contentful space credentials
- HubSpot private app token
- GA4/GTM/Hotjar IDs
- Calendly link
- SES credentials + sender/recipient emails
- Optional: testimonials, client logos, initial pricing details

### Citations (structure inspiration)
- Wisemonk EOR: `https://www.wisemonk.io/eor`
- Payroll in India: `https://www.wisemonk.io/payroll-in-india`
- Contractor reference: `https://www.wisemonk.io/blogs/hire-and-pay-contractors-in-india`
- Secondary reference: `https://www.deel.com`

- I’ll proceed to set up the Contentful space, theme tokens, SES route, and initial routes, then share a Vercel preview for review.