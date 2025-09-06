import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | MonoHR - EOR India Services",
  description: "Learn about how MonoHR uses cookies and tracking technologies to improve your experience on our EOR India services website.",
  keywords: ["cookie policy", "tracking", "privacy", "MonoHR cookies"],
  alternates: { canonical: "https://www.monohr.com/cookies" },
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files stored on your device when you visit our website. They help us provide 
              a better user experience and understand how you interact with our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">Essential Cookies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These cookies are necessary for the website to function properly. They cannot be disabled.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Analytics Cookies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use Google Analytics to understand how visitors use our website. You can opt out of these cookies.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Marketing Cookies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These cookies help us deliver relevant advertisements and measure campaign effectiveness.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              You can control cookies through your browser settings. However, disabling certain cookies may 
              affect the functionality of our website. For more information, contact us at 
              <a href="mailto:privacy@monohr.com" className="text-brand-600 hover:underline"> privacy@monohr.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
