export const siteSettings = {
  name: "MonoHR",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL ||
    "https://calendly.com/sample/intro-call",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Payroll", href: "/payroll-in-india" },
    { label: "Contractors", href: "/contractor-management-india" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ],
};

export const eorBenefits: Array<{ title: string; body: string }> = [
  { title: "Compliance-first", body: "Local employment, payroll taxes, and filings handled." },
  { title: "India HR support", body: "Onboarding, policies, leave and benefits guidance." },
  { title: "Faster hiring", body: "Onboard in days without setting up an entity." },
];

export const eorHowItWorks: Array<{ step: number; title: string; body: string }> = [
  { step: 1, title: "Share role & offer details", body: "Comp, benefits, start date, and employment terms." },
  { step: 2, title: "We issue local contract", body: "Compliant India contract and onboarding checklist." },
  { step: 3, title: "Onboard & run payroll", body: "Monthly payroll with PF/ESI/TDS and payslips." },
];

export const eorFaqs = [
  { q: "How fast can we hire via EOR?", a: "Typically 3–7 business days once details are confirmed." },
  { q: "Who is the legal employer?", a: "MonoHR’s India partner entity acts as employer of record." },
];

export const pricingSummary = [
  { tier: "EOR", price: "$99+ / employee / mo", highlights: ["Payroll", "Compliance", "Benefits"] },
  { tier: "Contractors", price: "$X / contractor / mo", highlights: ["Invoices", "Payouts", "Compliance"] },
];

export const faqs = [
  { q: "What is EOR?", a: "A third-party legal employer to hire in India without your own entity." },
  { q: "Is EOR legal in India?", a: "Yes, when operated in compliance with Indian labor laws." },
];

export const payrollBenefits = [
  { title: "Accurate deductions", body: "PF, ESI, TDS, Professional Tax managed monthly." },
  { title: "Payslips & filings", body: "Employee payslips and statutory filings handled." },
  { title: "Local support", body: "Support for reimbursements and tax declarations." },
];

export const payrollHowItWorks = [
  { step: 1, title: "Collect inputs", body: "CTC, attendance, reimbursements." },
  { step: 2, title: "Run payroll", body: "Calculate net pay and statutory deductions." },
  { step: 3, title: "Pay & file", body: "Salary payouts and statutory payments/returns." },
];

export const payrollFaqs = [
  { q: "Which taxes are included?", a: "PF, ESI (where applicable), TDS, and PT per state rules." },
  { q: "Do you issue payslips?", a: "Yes, monthly payslips are provided to employees." },
];

export const contractorBenefits = [
  { title: "Fast onboarding", body: "Collect KYC and contract details quickly." },
  { title: "On-time payouts", body: "Pay to Indian bank accounts in INR." },
  { title: "Invoice tracking", body: "Automated invoices and approvals." },
];

export const contractorHowItWorks = [
  { step: 1, title: "Invite contractor", body: "Send onboarding link and contract." },
  { step: 2, title: "Approve invoice", body: "Contractor submits invoice for approval." },
  { step: 3, title: "Payout", body: "We disburse funds and record payment." },
];

export const contractorFaqs = [
  { q: "Do you withhold taxes?", a: "We provide guidance; tax treatment depends on engagement terms." },
  { q: "Can we switch to EOR?", a: "Yes, contractors can convert to full-time via EOR." },
];


