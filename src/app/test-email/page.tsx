import { Metadata } from 'next';
import { EmailTest } from '@/components/EmailTest';

export const metadata: Metadata = {
  title: 'Email Integration Test - MonoHR',
  description: 'Test email integration functionality',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Email Integration Test
          </h1>
          <p className="text-lg text-gray-600">
            Test all email functionality to ensure proper integration
          </p>
        </div>
        
        <EmailTest />
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📧 Email Integration Features
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li>• <strong>Contact Form Emails:</strong> Automated emails when users submit contact forms</li>
            <li>• <strong>Quote Request Emails:</strong> Detailed emails for pricing inquiries</li>
            <li>• <strong>Demo Request Emails:</strong> Meeting scheduling and demo requests</li>
            <li>• <strong>Welcome Emails:</strong> Onboarding emails for new users</li>
            <li>• <strong>Newsletter Emails:</strong> Marketing and update communications</li>
            <li>• <strong>Password Reset:</strong> Secure password reset functionality</li>
          </ul>
        </div>

        <div className="mt-6 p-6 bg-yellow-50 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">
            ⚙️ Configuration Required
          </h3>
          <p className="text-yellow-800 mb-3">
            To enable real email sending, configure the following environment variables:
          </p>
          <div className="bg-yellow-100 p-3 rounded text-sm font-mono text-yellow-900">
            <div>AWS_ACCESS_KEY_ID=your_aws_access_key</div>
            <div>AWS_SECRET_ACCESS_KEY=your_aws_secret_key</div>
            <div>AWS_REGION=us-east-1</div>
            <div>SES_FROM_EMAIL=noreply@yourdomain.com</div>
            <div>SES_FROM_NAME=MonoHR</div>
          </div>
        </div>

        <div className="mt-6 p-6 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            🚀 Production Setup
          </h3>
          <ol className="text-green-800 space-y-2 list-decimal list-inside">
            <li>Set up AWS SES account and verify your domain</li>
            <li>Create IAM user with SES permissions</li>
            <li>Add environment variables to your deployment platform</li>
            <li>Test email delivery in production environment</li>
            <li>Monitor email delivery rates and bounce handling</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
