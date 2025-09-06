"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { emailService } from '@/lib/email';
import { analytics } from '@/lib/analytics';
import { hotjar } from '@/lib/hotjar';

interface EmailTestProps {
  className?: string;
}

export function EmailTest({ className = '' }: EmailTestProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [configStatus, setConfigStatus] = useState<any>(null);

  // Fetch configuration status on component mount
  useEffect(() => {
    const fetchConfigStatus = async () => {
      try {
        const response = await fetch('/api/email-config');
        const data = await response.json();
        if (data.success) {
          setConfigStatus(data.configuration);
        }
      } catch (error) {
        console.error('Failed to fetch configuration status:', error);
      }
    };

    fetchConfigStatus();
  }, []);

  const testEmailTypes = [
    {
      name: 'Contact Form',
      description: 'Test contact form email',
      testData: {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        phone: '+1234567890',
        message: 'This is a test message from the email integration test.',
        subject: 'Test Contact Form Submission',
      },
      testFunction: () => emailService.sendContactFormEmail({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        phone: '+1234567890',
        message: 'This is a test message from the email integration test.',
      }),
    },
    {
      name: 'Quote Request',
      description: 'Test quote request email',
      testData: {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        teamSize: '10-50 employees',
        services: ['EOR Services', 'Payroll Management'],
        timeline: 'Within 1 month',
        message: 'This is a test quote request.',
      },
      testFunction: () => emailService.sendQuoteRequestEmail({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        teamSize: '10-50 employees',
        services: ['EOR Services', 'Payroll Management'],
        timeline: 'Within 1 month',
        message: 'This is a test quote request.',
      }),
    },
    {
      name: 'Demo Request',
      description: 'Test demo request email',
      testData: {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        role: 'HR Manager',
        teamSize: '50-100 employees',
        preferredDate: '2024-01-15',
        preferredTime: '2:00 PM',
        message: 'This is a test demo request.',
      },
      testFunction: () => emailService.sendDemoRequestEmail({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        role: 'HR Manager',
        teamSize: '50-100 employees',
        preferredDate: '2024-01-15',
        preferredTime: '2:00 PM',
        message: 'This is a test demo request.',
      }),
    },
    {
      name: 'Welcome Email',
      description: 'Test welcome email',
      testData: {
        userEmail: 'test@example.com',
        userName: 'Test User',
      },
      testFunction: () => emailService.sendWelcomeEmail('test@example.com', 'Test User'),
    },
  ];

  const runEmailTest = async (testType: typeof testEmailTypes[0]) => {
    setIsLoading(true);
    
    try {
      // Track test start
      analytics.trackEvent('email_test_started', {
        test_type: testType.name,
      });
      hotjar.trackHotjarEvent('email_test_started', {
        test_type: testType.name,
      });

      const result = await testType.testFunction();
      
      const testResult = {
        type: testType.name,
        success: result.success,
        messageId: (result as any).messageId,
        error: result.error,
        timestamp: new Date().toISOString(),
        simulated: (result as any).simulated || false,
      };

      setTestResults(prev => [testResult, ...prev]);

      if (result.success) {
        toast.success(`${testType.name} test passed!`, {
          description: (result as any).simulated 
            ? 'Email simulated (AWS SES not configured)'
            : 'Email sent successfully',
        });

        // Track successful test
        analytics.trackEvent('email_test_success', {
          test_type: testType.name,
          simulated: (result as any).simulated || false,
        });
        hotjar.trackHotjarEvent('email_test_success', {
          test_type: testType.name,
          simulated: (result as any).simulated || false,
        });
      } else {
        toast.error(`${testType.name} test failed!`, {
          description: result.error || 'Unknown error',
        });

        // Track failed test
        analytics.trackEvent('email_test_failed', {
          test_type: testType.name,
          error: result.error,
        });
        hotjar.trackHotjarEvent('email_test_failed', {
          test_type: testType.name,
          error: result.error,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      toast.error(`${testType.name} test failed!`, {
        description: errorMessage,
      });

      const testResult = {
        type: testType.name,
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
        simulated: false,
      };

      setTestResults(prev => [testResult, ...prev]);

      // Track error
      analytics.trackEvent('email_test_error', {
        test_type: testType.name,
        error: errorMessage,
      });
      hotjar.trackHotjarEvent('email_test_error', {
        test_type: testType.name,
        error: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    
    try {
      // Track all tests start
      analytics.trackEvent('email_all_tests_started');
      hotjar.trackHotjarEvent('email_all_tests_started');

      for (const testType of testEmailTypes) {
        await runEmailTest(testType);
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      toast.success('All email tests completed!', {
        description: 'Check the results below',
      });

      // Track all tests completion
      analytics.trackEvent('email_all_tests_completed');
      hotjar.trackHotjarEvent('email_all_tests_completed');
    } catch (error) {
      toast.error('Error running all tests!', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
    toast.info('Test results cleared');
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Integration Test</h2>
        <p className="text-gray-600">
          Test all email types to ensure the integration is working correctly.
        </p>
      </div>

      {/* Test Controls */}
      <div className="mb-6 flex flex-wrap gap-3">
        <motion.button
          onClick={runAllTests}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? 'Running Tests...' : 'Run All Tests'}
        </motion.button>
        
        <motion.button
          onClick={clearResults}
          disabled={isLoading}
          className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Clear Results
        </motion.button>
      </div>

      {/* Individual Test Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {testEmailTypes.map((testType, index) => (
          <motion.div
            key={testType.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <h3 className="font-semibold text-gray-900 mb-2">{testType.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{testType.description}</p>
            <motion.button
              onClick={() => runEmailTest(testType)}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Test {testType.name}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {testResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-lg border ${
                  result.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      result.success ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <span className="font-medium text-gray-900">{result.type}</span>
                    {result.simulated && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Simulated
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                {result.success ? (
                  <div className="mt-2 text-sm text-green-700">
                    ✅ Success
                    {result.messageId && (
                      <div className="text-xs text-gray-600 mt-1">
                        Message ID: {result.messageId}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-red-700">
                    ❌ Failed: {result.error}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Configuration Status */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Configuration Status</h4>
        {configStatus ? (
          <div className="text-sm text-gray-600 space-y-1">
            <div>• AWS SES: {configStatus.status.awsSes ? '✅ Configured' : '❌ Not configured'}</div>
            <div>• Email Service: {configStatus.status.emailService ? '✅ Available' : '❌ Not available'}</div>
            <div>• Templates: {configStatus.status.templates ? '✅ Loaded' : '❌ Not loaded'}</div>
            <div>• From Email: {configStatus.email.fromEmail}</div>
            <div>• From Name: {configStatus.email.fromName}</div>
            <div>• AWS Region: {configStatus.aws.region}</div>
            {configStatus.aws.configured && (
              <div className="mt-2 p-2 bg-green-100 rounded text-green-800 text-xs">
                ✅ AWS SES is properly configured and ready to send emails!
              </div>
            )}
            {!configStatus.aws.configured && (
              <div className="mt-2 p-2 bg-yellow-100 rounded text-yellow-800 text-xs">
                ⚠️ AWS SES not configured. Emails will be simulated in development mode.
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            <div>• Loading configuration status...</div>
          </div>
        )}
      </div>
    </div>
  );
}
