import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | MonoHR - EOR India Services",
  description: "Read MonoHR's Terms of Service for our Employer of Record (EOR) services in India. Understand your rights, responsibilities, and our service agreements.",
  keywords: ["terms of service", "EOR India terms", "MonoHR terms", "service agreement", "legal terms"],
  alternates: { canonical: "https://www.monohr.com/terms" },
  openGraph: {
    title: "Terms of Service | MonoHR - EOR India Services",
    description: "Read MonoHR's Terms of Service for our Employer of Record (EOR) services in India.",
    url: "https://www.monohr.com/terms",
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using MonoHR's Employer of Record (EOR) services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MonoHR provides Employer of Record services in India, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Employment compliance and legal entity management</li>
              <li>Payroll processing and tax management</li>
              <li>Benefits administration</li>
              <li>HR support and employee relations</li>
              <li>Immigration and visa support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Client Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">As a client, you agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Pay all fees and charges in a timely manner</li>
              <li>Maintain appropriate insurance coverage</li>
              <li>Notify us of any changes in employment status</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              All fees are due as specified in your service agreement. Late payments may result in service suspension. 
              Refunds are subject to our refund policy outlined in your specific service contract.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              MonoHR's liability is limited to the amount paid for services. We are not liable for indirect, 
              incidental, or consequential damages arising from the use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              Either party may terminate services with 30 days written notice. Upon termination, 
              all outstanding fees become immediately due and payable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms are governed by the laws of India. Any disputes will be resolved in the courts of India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these terms, contact us at <a href="mailto:legal@monohr.com" className="text-brand-600 hover:underline">legal@monohr.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
