# MonoHR EOR Site - Employer of Record Services in India

A modern, high-performance marketing website for Employer of Record (EOR) services in India, built with Next.js 15, Tailwind CSS v4, and integrated with multiple third-party services for a complete business solution.

## 🚀 Features

### Core Features
- **Modern Tech Stack**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS for modern styling
- **Performance Optimized**: Minimal animations, optimized loading, and fast builds with Turbopack
- **SEO Optimized**: Built-in Next.js SEO with structured data and meta tags
- **Responsive Design**: Mobile-first responsive design with accessibility features
- **PWA Ready**: Progressive Web App capabilities with manifest and service worker support

### Business Features
- **EOR Services**: Comprehensive Employer of Record services for India
- **Cost Calculator**: Interactive cost calculation tool for EOR services
- **Lead Generation**: Contact forms with multiple integration options
- **Appointment Booking**: Calendly integration for consultation scheduling
- **Analytics**: Comprehensive tracking with GA4, GTM, and Hotjar
- **A/B Testing**: Built-in A/B testing capabilities for optimization

### Integrations
- **Content Management**: Contentful CMS for dynamic content
- **Email Services**: AWS SES for transactional emails
- **CRM Integration**: HubSpot for lead management
- **Communication**: WhatsApp and SMS via Twilio
- **Notifications**: Slack webhook integration
- **Analytics**: Google Analytics 4, Google Tag Manager, Hotjar

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router pages
│   ├── about/                    # About page
│   ├── contact/                  # Contact page with multiple forms
│   ├── eor-india/               # Main EOR services page
│   ├── contractor-management-india/  # Contractor management services
│   ├── pricing/                 # Pricing page
│   ├── resources/               # Resources and blog
│   ├── ab-testing/              # A/B testing dashboard
│   ├── test-email/              # Email testing page
│   ├── test-integration/        # Integration testing
│   └── api/                     # API routes
│       ├── analytics/           # Analytics endpoints
│       ├── calendly/            # Calendly integration
│       ├── contact/             # Contact form handling
│       ├── hubspot/             # HubSpot CRM integration
│       ├── notifications/       # Notification services
│       ├── sms/                 # SMS services
│       └── whatsapp/            # WhatsApp integration
├── components/                   # Reusable React components
│   ├── ab-testing/              # A/B testing components
│   ├── accessibility/           # Accessibility features
│   ├── eor-india/              # EOR-specific components
│   │   ├── components/         # Calculator and UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── sections/           # Page sections
│   │   ├── types/              # TypeScript definitions
│   │   └── ui/                 # UI components
│   ├── optimized/              # Performance optimization components
│   ├── seo/                    # SEO components
│   ├── shared/                 # Shared components
│   ├── testing/                # Testing components
│   ├── Header.tsx              # Site header
│   ├── Footer.tsx              # Site footer
│   └── Button.tsx              # Button component
└── lib/                        # Utility libraries
    ├── api/                    # API client libraries
    ├── ab-testing.ts           # A/B testing utilities
    ├── analytics.ts            # Analytics configuration
    ├── contentful.ts           # Contentful CMS integration
    ├── email.ts                # Email service utilities
    ├── env-validation.ts       # Environment validation
    ├── hubspot.ts              # HubSpot integration
    └── config.ts               # Centralized configuration
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: Radix UI, Lucide React, React Icons
- **Animations**: Framer Motion (minimal usage for performance)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Notifications**: Sonner for toast notifications

### Backend & Services
- **CMS**: Contentful for content management
- **Email**: AWS SES for transactional emails
- **CRM**: HubSpot for lead management
- **Analytics**: Google Analytics 4, GTM, Hotjar
- **Communication**: Twilio for SMS, WhatsApp Business API
- **Scheduling**: Calendly integration
- **Notifications**: Slack webhook integration

### Development & Deployment
- **Build Tool**: Turbopack for faster builds
- **Linting**: ESLint with Next.js config
- **Deployment**: Vercel (recommended)
- **Environment**: Node.js 18+

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun package manager
- Contentful account (optional)
- AWS account for SES (optional)
- HubSpot account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eor-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory. See the [Environment Setup Guide](docs/ENVIRONMENT_SETUP_COMPLETE.md) for detailed configuration.

   **Required Variables:**
   ```env
   # Site Configuration
   NEXT_PUBLIC_SITE_NAME=MonoHR
   NEXT_PUBLIC_SITE_URL=https://monohr.vercel.app
   
   # AWS SES (Required for email functionality)
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   SES_FROM_EMAIL=no_reply@transactional.buildmono.com
   SES_SALES_TO=sales@transactional.buildmono.com
   ```

   **Optional Variables:**
   ```env
   # Contentful CMS
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_CDA_TOKEN=your_cda_token
   
   # HubSpot CRM
   HUBSPOT_ACCESS_TOKEN=your_hubspot_token
   HUBSPOT_PORTAL_ID=your_portal_id
   
   # Analytics
   NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
   
   # Calendly
   NEXT_PUBLIC_CALENDLY_EMBED_URL=https://calendly.com/your-username/30min
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Build and Deployment

### Production Build

```bash
npm run build
npm run start
```

### Deploy on Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Environment Status Check

After deployment, check your environment configuration:
```bash
curl https://your-domain.com/api/env-status
```

## 🔧 Configuration

### Centralized Configuration

All environment variables are managed through centralized configuration functions in `src/lib/config.ts`:

- `getSiteConfig()` - Site name, URL, environment
- `getAnalyticsConfig()` - GA4, GTM, Hotjar settings
- `getContentfulConfig()` - CMS configuration
- `getEmailConfig()` - Email service settings
- `getAWSConfig()` - AWS credentials
- `getHubSpotConfig()` - CRM integration

### Service Setup

#### AWS SES Setup
1. Verify your domain in AWS SES
2. Create IAM user with SES permissions
3. Add AWS credentials to environment variables
4. Test email functionality at `/test-email`

#### Contentful Setup
1. Create a Contentful space
2. Set up content models for your pages
3. Add your space ID and tokens to environment variables
4. Check status at `/api/env-status`

#### HubSpot Setup
1. Create a HubSpot account
2. Generate a private app access token
3. Add credentials to environment variables
4. Test integration via contact forms

## 📊 Performance Features

This project is optimized for performance with:

- **Minimal Animations**: Reduced bundle size with selective Framer Motion usage
- **Next.js Optimizations**: Automatic code splitting and image optimization
- **Turbopack**: Faster builds and development experience
- **Font Optimization**: Optimized Google Fonts with `next/font`
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Critical CSS**: Inline critical CSS for faster initial render
- **Resource Preloading**: DNS prefetch and resource hints
- **Caching**: Strategic caching for static assets and API responses

## 🧪 Testing

### Integration Testing

The project includes comprehensive integration testing:

- **Email Testing**: Visit `/test-email` to test AWS SES integration
- **Environment Status**: Check `/api/env-status` for configuration status
- **Contact Forms**: Test all contact forms and integrations
- **A/B Testing**: Use `/ab-testing` for testing different variations

### Development Testing

```bash
# Test email configuration
open http://localhost:3000/test-email

# Check environment status
open http://localhost:3000/api/env-status

# Test contact forms
open http://localhost:3000/contact
```

## 🔒 Security Features

- **Environment Variables**: Secure handling of sensitive data
- **API Security**: Rate limiting and input validation
- **CORS Configuration**: Proper cross-origin resource sharing
- **Content Security Policy**: CSP headers for XSS protection
- **Webhook Security**: Signature verification for webhooks
- **AWS IAM**: Least-privilege access for AWS services

## ♿ Accessibility Features

- **WCAG Compliance**: Built with accessibility best practices
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: High contrast ratios for readability
- **Focus Management**: Proper focus indicators and management
- **Accessibility Toolbar**: Built-in accessibility tools

## 📈 Analytics & Monitoring

### Built-in Analytics
- **Google Analytics 4**: Comprehensive user tracking
- **Google Tag Manager**: Flexible tag management
- **Hotjar**: User behavior and heatmap analysis
- **Core Web Vitals**: Performance monitoring
- **Custom Events**: Business-specific event tracking

### Performance Monitoring
- **Real-time Metrics**: Performance dashboard
- **Error Tracking**: Comprehensive error logging
- **Uptime Monitoring**: Service health checks
- **Conversion Tracking**: Lead and conversion analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Test all integrations before submitting
- Update documentation for new features

## 📄 License

This project is private and proprietary to MonoHR.

## 🆘 Support

### Getting Help

- **Documentation**: Check the `/docs` folder for detailed guides
- **Environment Issues**: Use `/api/env-status` to diagnose configuration
- **Email Support**: Contact sales@monohr.com
- **Technical Issues**: Create an issue in the repository

### Troubleshooting

#### Common Issues

1. **Email Service Not Working**
   - Check AWS credentials and SES verification
   - Verify email addresses are verified in AWS SES
   - Test at `/test-email`

2. **Analytics Not Tracking**
   - Verify GA4/GTM IDs are correct
   - Check browser console for errors
   - Ensure proper domain configuration

3. **Build Failures**
   - Run `npm run lint` to check for linting errors
   - Verify all environment variables are set
   - Check TypeScript compilation errors

4. **Performance Issues**
   - Check Core Web Vitals at `/api/analytics/web-vitals`
   - Review performance dashboard
   - Optimize images and reduce bundle size

### Debug Commands

```bash
# Check environment status
curl http://localhost:3000/api/env-status

# Test email integration
open http://localhost:3000/test-email

# Run linting
npm run lint

# Check build
npm run build
```

## 🚀 Roadmap

### Upcoming Features
- [ ] Multi-language support
- [ ] Advanced A/B testing dashboard
- [ ] Enhanced analytics reporting
- [ ] Mobile app integration
- [ ] Advanced lead scoring
- [ ] Automated follow-up sequences

### Performance Improvements
- [ ] Edge runtime optimization
- [ ] Advanced caching strategies
- [ ] Bundle size optimization
- [ ] Image optimization enhancements

---

Built with ❤️ for EOR services in India by the MonoHR team.

**Last Updated**: December 2024
**Version**: 1.0.0
**Next.js Version**: 15.5.2
**Node.js Requirement**: 18+