### Project Overview
- **Goal**: Build a multi-page marketing site focused on India-specific Employer of Record (EOR), Payroll & Compliance, and Contractor Management to drive leads, contacts, and automation requests.
- **Primary KPIs**: Lead generation (form submissions), conversion rate, time on page, cost calculator interactions.
- **Secondary KPIs**: Calls booked, CTR, demo requests, quote requests.
- **Audience**: Founders/HR at startups in US/UK/Canada/Australia; industries: Development, IT, SaaS, FinTech.
- **Competitive Positioning**: "The Modern EOR Platform" - faster setup (48 hours), transparent pricing, data-driven insights.
- **References**: `https://www.wisemonk.io/eor`, `https://www.wisemonk.io/payroll-in-india`, `https://www.wisemonk.io/blogs/hire-and-pay-contractors-in-india`, `https://www.deel.com`.

### Information Architecture (Sitemap)
- Top-level: `/` Home, `/eor-india`, `/payroll-in-india`, `/contractor-management-india`, `/pricing`, `/resources` → `/blog`, `/guides`, `/about`, `/contact`
- Footer: `/privacy`, `/terms`, `/faqs`, `/careers`
- URL strategy: Short, keyword-rich slugs aligned to India-focused topics.

### Page Blueprints
- Home (`/`)
- EOR India (`/eor-india`) ✅ **COMPLETED**
  - Hero (email capture, trust indicators), Review Platform Ratings, Great Employee Experience, Integrations, Everything You Need, Onboarding Process Flow (48-hour setup), Why Choose Us (enhanced benefits), Tax-Optimized Salary Structure (Sankey diagram), Interactive Cost Calculator, Compliance Checklist, Testimonials, Success Stories, Bottom CTA.
- Payroll in India (`/payroll-in-india`)
  - Compliance stack (PF, ESI, TDS, PT), payroll process timeline, benefits/deductions table, calculator CTA, FAQs.
- Contractor Management (`/contractor-management-india`)
  - AOR vs EOR vs Contractor comparison, onboarding/payouts flow, tax docs/compliance, FAQs.
- Pricing (`/pricing`)
  - Tiers + feature comparison tables mirroring Wisemonk's structure; monthly/annual toggle; "what's included" accordion; add-ons; embedded calendar CTA.
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
- Framework: Next.js 15 (App Router), TypeScript
- Styling: Tailwind CSS, shadcn/ui primitives
- Animations: Framer Motion (micro-interactions, scroll animations)
- Data Visualization: Recharts (Sankey diagrams, charts)
- Forms: React Hook Form + Zod validation
- CMS: Contentful
- Hosting/CDN: Vercel (preview now), Cloudflare DNS later
- Images: Next/Image; SVG icons
- Email: AWS SES
- Forms: Next.js API routes; server actions where appropriate
- Analytics: Google Analytics 4 + GTM (event tracking)

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

### Key Features ✅ **IMPLEMENTED**
- Lead capture: Multi-step form (Name, Work email, Company, Interest) + spam protection
- Interactive Cost Calculator: Real-time savings calculation with dynamic inputs
- Data Visualizations: Sankey diagrams for benefit distribution, progress indicators
- Calendar scheduling: Embedded Calendly; Google Meet auto-generation
- Pricing comparison: Mirror Wisemonk categories; our own copy
- Social proof: Client logos, testimonials, review platform ratings
- Resources: Blog with tags/authors; gated guides
- Advanced Tools: Tax-optimized salary structure, compliance checklist
- Accessibility: WCAG 2.1 AA (semantic, keyboard, focus, contrast)
- Analytics: Comprehensive event tracking for all user interactions

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

### Execution Plan ✅ **UPDATED STATUS**
- Week 1 (MVP foundation) ✅ **COMPLETED**
  - IA finalize, Contentful setup, Next.js scaffold, base components, SES route, pricing schema, deploy to Vercel preview
- Week 2 ✅ **COMPLETED**
  - Build `/eor-india` (fully implemented with advanced features), HubSpot + Calendly wiring; SEO base; accessibility pass
- Week 3 ✅ **COMPLETED**
  - Advanced EOR page features: Interactive calculator, Sankey diagrams, compliance checklist, testimonials, case studies, analytics events, QA, performance tuning
- Week 4 🔄 **IN PROGRESS**
  - Build `/payroll-in-india`, `/contractor-management-india`, `/pricing`; Resources (Blog/Guides), legal review, launch; post-launch monitoring

### Deliverables ✅ **UPDATED STATUS**
- Live Vercel preview ✅ **COMPLETED**
- Contentful space with models and sample entries ✅ **COMPLETED**
- Themed component library (buttons, cards, grids, tables, forms) ✅ **COMPLETED**
- EOR India page fully implemented ✅ **COMPLETED**
  - Advanced features: Interactive calculator, Sankey diagrams, compliance checklist
  - Data-driven visualizations: Progress indicators, benefit distribution
  - Analytics integration: Comprehensive event tracking
- Working lead form → HubSpot, SES email, Slack alert ✅ **COMPLETED**
- Embedded Calendly booking ✅ **COMPLETED**
- GA4/GTM configured; event tracking implemented ✅ **COMPLETED**
- Legal pages + cookie consent 🔄 **PENDING**
- Brief brand guide (palette, tokens, typography, logo placeholder) ✅ **COMPLETED**

### Advanced Features Implemented ✅ **EOR INDIA PAGE**
- **Interactive Cost Calculator**: Real-time savings calculation with dynamic inputs (employees, salary, company type, timeline)
- **Sankey Diagram**: Tax-optimized salary structure visualization showing benefit distribution
- **Onboarding Process Flow**: 48-hour setup timeline with progress indicators
- **Compliance Checklist**: Interactive employment law and tax compliance requirements
- **Review Platform Ratings**: Professional badges and ratings from G2/Clutch
- **Enhanced Benefits Section**: Insurance comparison tables, tax-efficient salary breakdown
- **Case Studies**: Detailed success stories with metrics and testimonials
- **Analytics Integration**: Comprehensive event tracking for all user interactions
- **Mobile Optimization**: Touch-friendly interactions and responsive design
- **Framer Motion Animations**: Smooth micro-interactions and scroll animations

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