"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ABTestingService } from "@/lib/ab-testing";
import { AB_TESTS } from "@/lib/ab-testing";
import { BarChart3, Users, TrendingUp, Target, Eye, MousePointer } from "lucide-react";

interface TestResult {
  testId: string;
  testName: string;
  totalUsers: number;
  variants: {
    [variantId: string]: {
      name: string;
      users: number;
      conversions: number;
      conversionRate: number;
      confidence: number;
    };
  };
  winner?: string;
  isSignificant: boolean;
}

export function ABTestDashboard() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading test results
    // In a real implementation, this would fetch from your analytics API
    setTimeout(() => {
      const mockResults: TestResult[] = [
        {
          testId: "hero_headline_v1",
          testName: "Hero Headline Test",
          totalUsers: 1247,
          variants: {
            control: {
              name: "Control - Scale your team in India without the complexity",
              users: 623,
              conversions: 89,
              conversionRate: 14.3,
              confidence: 95.2
            },
            variant_a: {
              name: "Variant A - Speed Focus",
              users: 312,
              conversions: 67,
              conversionRate: 21.5,
              confidence: 98.7
            },
            variant_b: {
              name: "Variant B - Cost Focus",
              users: 312,
              conversions: 45,
              conversionRate: 14.4,
              confidence: 76.3
            }
          },
          winner: "variant_a",
          isSignificant: true
        },
        {
          testId: "cta_button_v1",
          testName: "CTA Button Test",
          totalUsers: 892,
          variants: {
            control: {
              name: "Control - Get Started",
              users: 446,
              conversions: 78,
              conversionRate: 17.5,
              confidence: 92.1
            },
            variant_a: {
              name: "Variant A - Urgency",
              users: 223,
              conversions: 52,
              conversionRate: 23.3,
              confidence: 97.8
            },
            variant_b: {
              name: "Variant B - Benefit",
              users: 223,
              conversions: 41,
              conversionRate: 18.4,
              confidence: 88.5
            }
          },
          winner: "variant_a",
          isSignificant: true
        }
      ];
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  }, []);

  const getService = () => ABTestingService.getInstance();

  const getCurrentUserVariants = () => {
    return getService().getAllUserVariants();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">A/B Testing Dashboard</h1>
              <p className="text-gray-600 mt-2">Monitor and analyze your conversion optimization tests</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          {/* Current User Variants */}
          <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Current Test Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from(getCurrentUserVariants()).map(([testId, variantId]) => {
                const test = AB_TESTS.find(t => t.id === testId);
                const variant = test?.variants.find(v => v.id === variantId);
                return (
                  <div key={testId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{test?.name}</div>
                      <div className="text-sm text-gray-600">{variant?.name}</div>
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {variantId}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Results */}
          <div className="grid gap-6">
            {results.map((result) => (
              <motion.div
                key={result.testId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{result.testName}</h3>
                    <p className="text-gray-600">Test ID: {result.testId}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{result.totalUsers}</div>
                      <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                    {result.winner && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Winner: {result.variants[result.winner]?.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(result.variants).map(([variantId, variant]) => (
                    <div
                      key={variantId}
                      className={`p-4 rounded-lg border-2 ${
                        result.winner === variantId
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{variant.name}</h4>
                        {result.winner === variantId && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Users:</span>
                          <span className="font-medium">{variant.users}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Conversions:</span>
                          <span className="font-medium">{variant.conversions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Conversion Rate:</span>
                          <span className="font-medium text-green-600">{variant.conversionRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Confidence:</span>
                          <span className="font-medium">{variant.confidence}%</span>
                        </div>
                      </div>

                      {/* Conversion Rate Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(variant.conversionRate * 2, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Statistical Significance */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Statistical Significance: {result.isSignificant ? "Achieved" : "Not Yet"}
                    </span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    {result.isSignificant
                      ? "Results are statistically significant and can be trusted for decision making."
                      : "Continue running the test to achieve statistical significance."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">View Detailed Analytics</div>
                  <div className="text-sm text-gray-600">Deep dive into user behavior</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <MousePointer className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Create New Test</div>
                  <div className="text-sm text-gray-600">Set up additional A/B tests</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Export Results</div>
                  <div className="text-sm text-gray-600">Download test data</div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
