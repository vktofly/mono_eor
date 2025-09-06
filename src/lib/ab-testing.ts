
"use client";

import { trackEvent } from "./analytics";

// A/B Test Configuration
export interface ABTest {
  id: string;
  name: string;
  description: string;
  variants: ABVariant[];
  trafficAllocation: number; // 0-1, percentage of users who see this test
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
  targetMetric: string; // 'conversion', 'engagement', 'click_through'
}

export interface ABVariant {
  id: string;
  name: string;
  weight: number; // 0-1, relative weight within the test
  config: Record<string, any>;
}

// Current A/B Tests Configuration
export const AB_TESTS: ABTest[] = [
  {
    id: "hero_headline_v1",
    name: "Hero Headline Test",
    description: "Testing different hero headlines for conversion optimization",
    trafficAllocation: 1.0, // 100% of users
    isActive: true,
    startDate: new Date(),
    targetMetric: "conversion",
    variants: [
      {
        id: "control",
        name: "Control - Scale your team in India without the complexity",
        weight: 1.0,
        config: {
          headline: "Scale your team in India without the complexity",
          animatedWords: ["Scale", "Build"],
          subheadline: "Hire top Indian talent in 48 hours with our EOR services. 40% cost savings, 100% compliance, India-first expertise.",
          ctaText: "Get Started",
          ctaColor: "cta-500"
        }
      },
      {
        id: "variant_a",
        name: "Variant A - Speed Focus",
        weight: 0.0,
        config: {
          headline: "Hire in India in 48 Hours - No Entity Required",
          subheadline: "Skip 6-month entity setup. Start hiring immediately with our EOR services. 40% cost savings, 100% compliance.",
          ctaText: "Start Hiring Today",
          ctaColor: "brand-500"
        }
      },
      {
        id: "variant_b",
        name: "Variant B - Cost Focus",
        weight: 0.0,
        config: {
          headline: "Save 40% on India Expansion with EOR Services",
          subheadline: "Hire top Indian talent without the complexity. 48-hour setup, 100% compliance, India-first expertise.",
          ctaText: "Save Money Now",
          ctaColor: "cta-500"
        }
      }
    ]
  },
  {
    id: "cta_button_v1",
    name: "CTA Button Test",
    description: "Testing different CTA button text and colors",
    trafficAllocation: 1.0,
    isActive: true,
    startDate: new Date(),
    targetMetric: "click_through",
    variants: [
      {
        id: "control",
        name: "Control - Get Started",
        weight: 0.5,
        config: {
          text: "Get Started",
          color: "cta-500",
          size: "lg"
        }
      },
      {
        id: "variant_a",
        name: "Variant A - Urgency",
        weight: 0.25,
        config: {
          text: "Start Now - Free Setup",
          color: "brand-500",
          size: "lg"
        }
      },
      {
        id: "variant_b",
        name: "Variant B - Benefit",
        weight: 0.25,
        config: {
          text: "Save 40% Today",
          color: "cta-500",
          size: "lg"
        }
      }
    ]
  }
];

// A/B Testing Utilities
export class ABTestingService {
  private static instance: ABTestingService;
  private userVariants: Map<string, string> = new Map();
  private initialized = false;

  static getInstance(): ABTestingService {
    if (!ABTestingService.instance) {
      ABTestingService.instance = new ABTestingService();
    }
    return ABTestingService.instance;
  }

  private constructor() {
    this.initialize();
  }

  private initialize() {
    if (typeof window === "undefined") return;
    
    try {
      // Load existing variants from localStorage
      const stored = localStorage.getItem("monohr_ab_variants");
      if (stored) {
        this.userVariants = new Map(JSON.parse(stored));
      }
      
      // Assign variants for new tests
      this.assignVariants();
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize A/B testing:", error);
    }
  }

  private assignVariants() {
    AB_TESTS.forEach(test => {
      if (!test.isActive) return;
      if (this.userVariants.has(test.id)) return;

      // Check if user should see this test (traffic allocation)
      const userHash = this.hashUserId(test.id);
      if (userHash > test.trafficAllocation) return;

      // Assign variant based on weights
      const variant = this.selectVariant(test.variants);
      this.userVariants.set(test.id, variant.id);

      // Track test assignment
      trackEvent("ab_test_assigned", {
        test_id: test.id,
        test_name: test.name,
        variant_id: variant.id,
        variant_name: variant.name,
        user_hash: userHash
      });
    });

    // Save to localStorage
    this.saveVariants();
  }

  private selectVariant(variants: ABVariant[]): ABVariant {
    const random = Math.random();
    let cumulative = 0;

    for (const variant of variants) {
      cumulative += variant.weight;
      if (random <= cumulative) {
        return variant;
      }
    }

    // Fallback to first variant
    return variants[0];
  }

  private hashUserId(testId: string): number {
    // Create a consistent hash based on user's session/device
    const userId = this.getUserId();
    const combined = `${testId}-${userId}`;
    
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash) / 2147483647; // Normalize to 0-1
  }

  private getUserId(): string {
    // Try to get a consistent user ID
    let userId = localStorage.getItem("monohr_user_id");
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("monohr_user_id", userId);
    }
    return userId;
  }

  private saveVariants() {
    try {
      localStorage.setItem("monohr_ab_variants", JSON.stringify([...this.userVariants]));
    } catch (error) {
      console.error("Failed to save A/B test variants:", error);
    }
  }

  public getVariant(testId: string): ABVariant | null {
    if (!this.initialized) {
      this.initialize();
    }

    const variantId = this.userVariants.get(testId);
    if (!variantId) return null;

    const test = AB_TESTS.find(t => t.id === testId);
    if (!test) return null;

    return test.variants.find(v => v.id === variantId) || null;
  }

  public trackConversion(testId: string, conversionType: string, value?: number) {
    const variant = this.getVariant(testId);
    if (!variant) return;

    trackEvent("ab_test_conversion", {
      test_id: testId,
      variant_id: variant.id,
      variant_name: variant.name,
      conversion_type: conversionType,
      value: value,
      timestamp: Date.now()
    });
  }

  public getAllUserVariants(): Map<string, string> {
    return new Map(this.userVariants);
  }

  public getTestResults(testId: string): any {
    // This would typically fetch from your analytics service
    // For now, return mock data structure
    return {
      testId,
      totalUsers: 0,
      conversions: {},
      conversionRates: {},
      statisticalSignificance: 0
    };
  }

  public resetUserVariants() {
    // Clear existing variants to force reassignment
    this.userVariants.clear();
    this.saveVariants();
    this.assignVariants();
  }
}

// React Hook for A/B Testing
export function useABTest(testId: string) {
  const service = ABTestingService.getInstance();
  const variant = service.getVariant(testId);
  
  const trackConversion = (conversionType: string, value?: number) => {
    service.trackConversion(testId, conversionType, value);
  };

  return {
    variant,
    trackConversion,
    isActive: variant !== null
  };
}

// Utility function to get test configuration
export function getABTestConfig(testId: string): Record<string, any> | null {
  const service = ABTestingService.getInstance();
  const variant = service.getVariant(testId);
  return variant?.config || null;
}
