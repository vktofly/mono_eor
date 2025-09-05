# EOR Site - Employer of Record Services in India

A modern, high-performance marketing website for Employer of Record (EOR) services in India, built with Next.js 15, Tailwind CSS v4, and integrated with Contentful CMS and AWS SES.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Content Management**: Contentful CMS integration
- **Email Services**: AWS SES for contact forms
- **Analytics**: Google Analytics 4, Google Tag Manager, Hotjar
- **Performance**: Optimized with minimal animations for fast loading
- **SEO**: Built-in Next.js SEO optimization
- **Responsive**: Mobile-first responsive design

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── eor-india/         # EOR services page
│   ├── contractor-management-india/  # Contractor management page
│   ├── pricing/           # Pricing page
│   ├── resources/         # Resources page
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── shared/           # Shared components (animations, CTAs)
│   ├── Header.tsx        # Site header
│   ├── Footer.tsx        # Site footer
│   └── Button.tsx        # Button component
└── lib/                  # Utility libraries
    ├── contentful.ts     # Contentful CMS integration
    ├── analytics.ts      # Analytics configuration
    └── config.ts         # App configuration
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Lucide React, React Icons
- **Animations**: Framer Motion (minimal usage)
- **Forms**: React Hook Form with Zod validation
- **CMS**: Contentful
- **Email**: AWS SES
- **Analytics**: Google Analytics 4, GTM, Hotjar
- **Charts**: Recharts
- **Notifications**: Sonner

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Contentful account
- AWS account (for SES)

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
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # Contentful CMS
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ENV=master
   CONTENTFUL_CDA_TOKEN=your_cda_token
   CONTENTFUL_PREVIEW_TOKEN=your_preview_token

   # HubSpot Integration
   HUBSPOT_PRIVATE_APP_TOKEN=your_hubspot_token

   # Analytics
   NEXT_PUBLIC_GA4_ID=your_ga4_id
   NEXT_PUBLIC_GTM_ID=your_gtm_id
   NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id

   # Calendly Integration
   CALENDLY_URL=your_calendly_url

   # AWS SES Configuration
   AWS_REGION=your_aws_region
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   SES_FROM_EMAIL=no-reply@monohr.com
   SES_SALES_TO=sales@monohr.com
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

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

## 🔧 Configuration

### Contentful Setup

1. Create a Contentful space
2. Set up content models for your pages
3. Add your space ID and tokens to environment variables

### AWS SES Setup

1. Verify your domain in AWS SES
2. Create IAM user with SES permissions
3. Add AWS credentials to environment variables

## 📊 Performance

This project is optimized for performance with:
- Minimal animations to reduce bundle size
- Next.js automatic code splitting
- Image optimization
- Font optimization with `next/font`
- Turbopack for faster builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support, email sales@monohr.com or create an issue in the repository.

---

Built with ❤️ for EOR services in India
