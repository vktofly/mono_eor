import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MonoHR - EOR India Services",
  description: "Learn how MonoHR protects your personal data and privacy. Our comprehensive privacy policy covers data collection, usage, and your rights under GDPR and Indian data protection laws.",
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR compliance",
    "EOR India privacy",
    "MonoHR privacy",
    "data security",
    "personal information protection"
  ],
  authors: [{ name: "MonoHR Legal Team" }],
  creator: "MonoHR",
  publisher: "MonoHR",
  alternates: {
    canonical: "https://www.monohr.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | MonoHR - EOR India Services",
    description: "Learn how MonoHR protects your personal data and privacy. Our comprehensive privacy policy covers data collection, usage, and your rights under GDPR and Indian data protection laws.",
    url: "https://www.monohr.com/privacy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | MonoHR - EOR India Services",
    description: "Learn how MonoHR protects your personal data and privacy. Our comprehensive privacy policy covers data collection, usage, and your rights under GDPR and Indian data protection laws.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MonoHR ("we," "our," or "us") is committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
              you visit our website, use our Employer of Record (EOR) services, or interact with us in any way.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This policy applies to all users of our services, including clients, employees, contractors, 
              and website visitors. By using our services, you consent to the data practices described in this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect the following types of personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
              <li><strong>Professional Information:</strong> Job title, company name, industry, work experience</li>
              <li><strong>Identity Information:</strong> Government-issued ID, passport, visa information (for EOR services)</li>
              <li><strong>Financial Information:</strong> Bank account details, tax information, salary data (for payroll services)</li>
              <li><strong>Employment Information:</strong> Employment history, skills, qualifications, references</li>
              <li><strong>Communication Records:</strong> Emails, phone calls, chat messages, support tickets</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Technical Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns, referral sources</li>
              <li><strong>Cookies and Tracking:</strong> Session cookies, analytics cookies, preference cookies</li>
              <li><strong>Location Data:</strong> General geographic location based on IP address</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your personal information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Service Delivery:</strong> Providing EOR services, payroll processing, compliance management</li>
              <li><strong>Communication:</strong> Responding to inquiries, sending service updates, marketing communications</li>
              <li><strong>Legal Compliance:</strong> Meeting regulatory requirements, tax obligations, employment law compliance</li>
              <li><strong>Business Operations:</strong> Improving services, analyzing usage patterns, developing new features</li>
              <li><strong>Security:</strong> Protecting against fraud, unauthorized access, and security threats</li>
              <li><strong>Marketing:</strong> Sending promotional materials, newsletters, and service announcements (with consent)</li>
            </ul>
          </section>

          {/* Legal Basis for Processing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Basis for Processing (GDPR)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under the General Data Protection Regulation (GDPR), we process your personal data based on:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Contract Performance:</strong> Processing necessary to fulfill our EOR service agreements</li>
              <li><strong>Legal Obligation:</strong> Compliance with employment, tax, and immigration laws</li>
              <li><strong>Legitimate Interest:</strong> Business operations, security, and service improvement</li>
              <li><strong>Consent:</strong> Marketing communications and optional data collection</li>
              <li><strong>Vital Interests:</strong> Protecting health and safety in emergency situations</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Government Authorities:</strong> Tax offices, immigration services, labor departments</li>
              <li><strong>Service Providers:</strong> Payroll processors, background check services, cloud hosting providers</li>
              <li><strong>Business Partners:</strong> Insurance providers, benefits administrators, compliance consultants</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or legal process</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
              <li><strong>Consent:</strong> When you explicitly authorize sharing with third parties</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement comprehensive security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Encryption:</strong> Data encrypted in transit and at rest using industry-standard protocols</li>
              <li><strong>Access Controls:</strong> Role-based access, multi-factor authentication, regular access reviews</li>
              <li><strong>Network Security:</strong> Firewalls, intrusion detection, secure network architecture</li>
              <li><strong>Employee Training:</strong> Regular security awareness training and background checks</li>
              <li><strong>Incident Response:</strong> Comprehensive breach response procedures and notification protocols</li>
              <li><strong>Regular Audits:</strong> Security assessments, penetration testing, compliance audits</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Access:</strong> Request copies of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data (right to be forgotten)</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, contact us at <a href="mailto:privacy@monohr.com" className="text-brand-600 hover:underline">privacy@monohr.com</a>
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Provide our services and maintain business relationships</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Protect against fraud and security threats</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Specific retention periods vary by data type and legal requirements. Employment records may be 
              retained for up to 7 years, while marketing data is typically retained until consent is withdrawn.
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As an EOR service provider, we may transfer your personal data across international borders. 
              We ensure adequate protection through:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate data protection</li>
              <li><strong>Standard Contractual Clauses:</strong> EU-approved data transfer agreements</li>
              <li><strong>Binding Corporate Rules:</strong> Internal data protection policies</li>
              <li><strong>Certification Schemes:</strong> Privacy Shield or equivalent frameworks</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience. For detailed information, 
              please see our <a href="/cookies" className="text-brand-600 hover:underline">Cookie Policy</a>.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for individuals under 16 years of age. We do not knowingly 
              collect personal information from children. If we become aware of such collection, we will 
              take steps to delete the information promptly.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal 
              requirements. We will notify you of significant changes via email or website notice. Your 
              continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>MonoHR Data Protection Officer</strong></p>
              <p className="text-gray-700 mb-2">Email: <a href="mailto:privacy@monohr.com" className="text-brand-600 hover:underline">privacy@monohr.com</a></p>
              <p className="text-gray-700 mb-2">Phone: +91-XXXX-XXXXXX</p>
              <p className="text-gray-700">
                Address: [Your Business Address], India
              </p>
            </div>
          </section>

          {/* Compliance Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Regulatory Compliance</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Privacy Policy complies with:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>General Data Protection Regulation (GDPR) - EU</li>
              <li>Personal Data Protection Bill - India</li>
              <li>California Consumer Privacy Act (CCPA) - US</li>
              <li>Other applicable data protection laws</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
