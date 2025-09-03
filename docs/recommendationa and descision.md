### Recommendations and decisions to fill the gaps

- **Scope & sitemap**
  - **Recommended IA**:
    - `Home`, `Employer of Record (India)`, `India Payroll & Compliance`, `Contractor Management`, `Pricing`, `Resources` (Blog + Guides), `About`, `Contact`
    - Footer: `Privacy`, `Terms`, `FAQs`, `Careers`
  - **URL structure**:
    - `/eor-india` (mirror of Wisemonk EOR with improvements)
    - `/payroll-in-india`
    - `/contractor-management-india`
    - `/pricing`
    - `/resources` → `/blog`, `/guides`
    - `/about`, `/contact`
  - **Why**: Keeps parity with Wisemonk’s structure while simplifying navigation and supporting SEO topic clusters. References: `https://www.wisemonk.io/eor`, `https://www.wisemonk.io/payroll-in-india`, `https://www.wisemonk.io/blogs/hire-and-pay-contractors-in-india`.

- **Content**
  - Create copy in parallel via a structured outline per page; use a shared content brief template with: audience, keywords, CTA, FAQs, compliance notes, internal links.
  - Capture testimonials/logos opportunistically; start with placeholders and a toggle to hide sections until assets are ready.

- **Design & branding**
  - Mirror Wisemonk’s content hierarchy but modernize with stronger visual contrast, above-the-fold social proof, and persistent CTA.
  - Produce a lightweight brand doc as we go: logo usage, color tokens, typography scales, components (CTA, cards, table, testimonial, form).

- **Key features**
  - **Forms**: Single-step lead form + embedded calendar. Use Calendly with Google Calendar + Google Meet auto-generation.
  - **Pricing**: Comparison tables with toggle (monthly/annual) and expandable “what’s included.”
  - **Trust**: Client logos, review badges (placeholder), “As seen in” row (optional).
  - **Tools**: Start with Salary and Total Cost Calculator (India); phase in Tax/Gratuity later.
  - **Resources**: Blog with tags; Guides (PDF) behind gated forms.

- **CMS & editing**
  - **CMS**: Next.js + headless CMS (Sanity or Contentful). Recommendation: Sanity for flexible content models and fast authoring.
  - **Workflow**: Draft → Review → Approve → Schedule. Use preview mode for reviewers; schedule publishes for launches.

- **Localization**
  - Phase 1: English only, India-focused.
  - Prepare i18n-ready routes and content models for future locales; currency displayed in USD and INR where relevant.

- **Compliance & legal**
  - Policies: Privacy, Terms, Cookie Policy. Cookie banner with granular consent (GTM blocked until consent).
  - Accessibility: Target WCAG 2.1 AA (semantic HTML, color contrast, keyboard nav, focus styles, alt text, ARIA where needed).

- **Tech & hosting**
  - Stack: Next.js 14 App Router, TypeScript, TailwindCSS, shadcn/ui for primitives.
  - Hosting/CDN: Vercel (primary) + Cloudflare DNS.
  - Image CDN: Next/Image with Vercel.
  - Forms: API routes + server actions; webhook to CRM.

- **Performance & SEO**
  - Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms; static generation for most pages, edge caching.
  - SEO: Metadata, OpenGraph, JSON-LD (Organization, Product/Service, FAQ), internal linking between EOR/Payroll/Contractor/Pricing.
  - Keywords: “Employer of Record India”, “EOR India”, “hire in India without entity”, “India payroll compliance”, “pay contractors in India”.
  - Programmatic SEO: FAQ pages and glossary terms as individual, templated entries under `/resources/glossary/:slug`.

- **Integrations**
  - CRM: HubSpot (free) to start; forms sync + pipeline for MQL → SQL.
  - Analytics: GA4 + GTM; optional PostHog for product analytics.
  - Heatmaps: Hotjar (recordings on select pages).
  - Email: SendGrid for transactional; Mailchimp for newsletter (phase 2).

- **Forms & workflows**
  - Fields: Name, Work email, Company, Country, Team size, Interest (EOR/Payroll/Contractors), Message optional.
  - Enrichment: Clearbit Reveal (optional later).
  - Spam protection: hCaptcha or Cloudflare Turnstile.
  - Thank-you: Inline success + calendar embed; email confirmation; CRM task creation; Slack alert to sales channel.

- **Security**
  - Bot protection: hCaptcha/Turnstile.
  - Rate limiting on API routes; WAF via Vercel/CDN; HTTPS everywhere.
  - Secrets in environment variables; rotate quarterly.

- **Data residency**
  - Store PII in CRM (HubSpot EU data center optional). Static site content on Vercel; form submissions do not persist on server beyond CRM/webhook logs.

- **Timeline & budget**
  - Timeline: 3–4 weeks MVP
    - Week 1: IA, wireframes, CMS schema, brand tokens
    - Week 2: Build core pages, forms, CRM integration
    - Week 3: Pricing tables, blog, SEO, accessibility, QA
    - Week 4: Tools (salary calculator), polish, launch
  - Budget: Optimize for out-of-the-box services; avoid custom infra until ROI.

- **Team & process**
  - Stakeholders: You (product/marketing owner), 1 approver for legal.
  - Owners: Content (you), Design (shared), Dev (me).
  - Cadence: 2x weekly check-ins; async updates in a shared doc.

- **Assets**
  - Start a shared drive: logo (SVG), color palette, typography, icon set, illustrations, client logos, testimonial quotes/headshots, review badges.
  - If missing, use a neutral icon set and placeholder logos until replaced.

- **Post-launch**
  - Maintenance: Monthly updates; uptime alerts; dependency upgrades quarterly.
  - Content cadence: Blog weekly, guide monthly, testimonials as obtained.
  - Metrics review: Bi-weekly dashboard of calls booked, CTR, form CVR, top pages.

- **Migration**
  - N/A initially. When migrating, plan redirects, preserve UTM parameters, and keep GA4 property continuity.

### Clarifying questions to finalize
- CMS choice: Sanity or Contentful?
- CRM: Start with HubSpot free?
- Calendar: Use Calendly embedded with Google Meet generation?
- Legal pages: Can we draft initial Privacy/Terms, then have your legal approve?
- Brand: Do you have a logo file or should we generate a simple logotype to start?
- Pricing comparison: Which competitors to include for the table (e.g., Deel, Remote, Oyster, Papaya)? Reference: `https://www.deel.com`.

Once you confirm the above, I’ll deliver:
- A concrete sitemap and wireframes per page (hero, social proof, features, pricing, FAQs, CTAs).
- A component list and content model (CMS schema).
- A day-by-day execution plan for Week 1.