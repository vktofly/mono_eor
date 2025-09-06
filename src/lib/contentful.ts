import { createClient, ContentfulApi } from 'contentful';
import { getContentfulConfig } from './config';

// Contentful configuration
const config = getContentfulConfig();
const spaceId = config.spaceId;
const accessToken = config.cdaToken;
const previewToken = config.previewToken;
const environment = config.environment;

// Create Contentful client (only if credentials are available)
export const contentfulClient = spaceId && accessToken ? createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment,
}) : null;

// Create preview client (only if credentials are available)
export const contentfulPreviewClient = spaceId && (previewToken || accessToken) ? createClient({
  space: spaceId,
  accessToken: previewToken || accessToken,
  environment: environment,
  host: 'preview.contentful.com',
}) : null;

// Type definitions for Contentful content types
export interface SiteSettings {
  siteName: string;
  logo?: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
    };
  };
  navLinks: Array<{
    label: string;
    href: string;
    submenu?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  footerLinks: Array<{
    label: string;
    href: string;
  }>;
  defaultSEO: {
    title: string;
    description: string;
    keywords: string[];
  };
  cookiesText: string;
}

export interface HeroSection {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  image?: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
    };
  };
}

export interface Feature {
  icon: string;
  title: string;
  body: string;
}

export interface FeatureGridSection {
  title: string;
  features: Feature[];
}

export interface Step {
  number: number;
  title: string;
  body: string;
  icon: string;
}

export interface StepsSection {
  title: string;
  steps: Step[];
}

export interface PricingTier {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  ctaLabel: string;
  ctaLink: string;
}

export interface PricingTableSection {
  title: string;
  billingToggle: boolean;
  tiers: PricingTier[];
  comparisonTable: {
    columns: string[];
    rows: Array<{
      feature: string;
      values: string[];
    }>;
  };
}

export interface Testimonial {
  quote: string;
  authorName: string;
  role: string;
  company: string;
  avatar?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  logo?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export interface TestimonialSection {
  title: string;
  testimonials: Testimonial[];
}

export interface FAQItem {
  question: string;
  answer: string;
  schemaEnabled: boolean;
}

export interface FAQSection {
  title: string;
  items: FAQItem[];
}

export interface BlogPost {
  title: string;
  slug: string;
  author: {
    fields: {
      name: string;
      title: string;
      avatar?: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
  };
  tags: string[];
  coverImage?: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
    };
  };
  excerpt: string;
  body: string;
  publishDate: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    ogImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

export interface Guide {
  title: string;
  slug: string;
  coverImage?: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
    };
  };
  excerpt: string;
  body: string;
  pdfAsset?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  gated: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    ogImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

// Contentful API functions
export class ContentfulService {
  private client: ContentfulApi | null;

  constructor(usePreview = false) {
    this.client = usePreview ? contentfulPreviewClient : contentfulClient;
  }

  private checkClient(): boolean {
    if (!this.client) {
      console.warn('Contentful client not initialized. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_CDA_TOKEN environment variables.');
      return false;
    }
    return true;
  }

  // Get site settings
  async getSiteSettings(): Promise<SiteSettings | null> {
    if (!this.checkClient()) return null;

    try {
      const response = await this.client!.getEntries({
        content_type: 'siteSettings',
        limit: 1,
      });

      if (response.items.length > 0) {
        return response.items[0].fields as SiteSettings;
      }
      return null;
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return null;
    }
  }

  // Get page by slug
  async getPageBySlug(slug: string): Promise<any> {
    if (!this.checkClient()) return null;

    try {
      const response = await this.client!.getEntries({
        content_type: 'page',
        'fields.slug': slug,
        limit: 1,
        include: 10, // Include linked entries
      });

      if (response.items.length > 0) {
        return response.items[0];
      }
      return null;
    } catch (error) {
      console.error(`Error fetching page ${slug}:`, error);
      return null;
    }
  }

  // Get all blog posts
  async getBlogPosts(limit = 10, skip = 0): Promise<BlogPost[]> {
    if (!this.checkClient()) return [];

    try {
      const response = await this.client!.getEntries({
        content_type: 'blogPost',
        order: '-fields.publishDate',
        limit,
        skip,
        include: 2,
      });

      return response.items.map(item => item.fields as BlogPost);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  // Get blog post by slug
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!this.checkClient()) return null;

    try {
      const response = await this.client!.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1,
        include: 2,
      });

      if (response.items.length > 0) {
        return response.items[0].fields as BlogPost;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching blog post ${slug}:`, error);
      return null;
    }
  }

  // Get all guides
  async getGuides(limit = 10, skip = 0): Promise<Guide[]> {
    if (!this.checkClient()) return [];

    try {
      const response = await this.client!.getEntries({
        content_type: 'guide',
        order: '-sys.createdAt',
        limit,
        skip,
        include: 2,
      });

      return response.items.map(item => item.fields as Guide);
    } catch (error) {
      console.error('Error fetching guides:', error);
      return [];
    }
  }

  // Get guide by slug
  async getGuideBySlug(slug: string): Promise<Guide | null> {
    if (!this.checkClient()) return null;

    try {
      const response = await this.client!.getEntries({
        content_type: 'guide',
        'fields.slug': slug,
        limit: 1,
        include: 2,
      });

      if (response.items.length > 0) {
        return response.items[0].fields as Guide;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching guide ${slug}:`, error);
      return null;
    }
  }

  // Get entries by content type
  async getEntriesByType(contentType: string, limit = 100): Promise<any[]> {
    if (!this.checkClient()) return [];

    try {
      const response = await this.client!.getEntries({
        content_type: contentType,
        limit,
        include: 2,
      });

      return response.items.map(item => item.fields);
    } catch (error) {
      console.error(`Error fetching ${contentType}:`, error);
      return [];
    }
  }
}

// Export default service instance
export const contentfulService = new ContentfulService();
export const contentfulPreviewService = new ContentfulService(true);

// Helper function to get asset URL
export function getAssetUrl(asset: any): string {
  if (!asset?.fields?.file?.url) return '';
  
  const url = asset.fields.file.url;
  return url.startsWith('//') ? `https:${url}` : url;
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(asset: any, width?: number, height?: number, quality = 80): string {
  if (!asset?.fields?.file?.url) return '';
  
  let url = asset.fields.file.url;
  if (url.startsWith('//')) {
    url = `https:${url}`;
  }
  
  // Add Contentful image API parameters
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('f', 'webp'); // Use WebP format for better performance
  
  return `${url}?${params.toString()}`;
}