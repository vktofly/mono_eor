export default function Home() {
  return (
    <main className="min-h-dvh bg-brand-50">
      <section className="container py-16 sm:py-24">
        <p className="text-sm text-text-secondary">Employer of Record in India</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold text-text-primary tracking-tight">Hire in India without an entity</h1>
        <p className="mt-4 max-w-2xl text-text-secondary">MonoHR handles EOR, payroll & compliance, and contractor payments so you can scale quickly and compliantly in India.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-cta-500 hover:bg-cta-600 text-white px-5 py-3 font-medium focus:outline-none focus:ring-4 focus:ring-cta-300">Book a call</a>
          <a href="/pricing" className="inline-flex items-center justify-center rounded-md text-brand-500 hover:text-brand-600 border border-line px-5 py-3 font-medium bg-white">Explore pricing</a>
        </div>
      </section>
    </main>
  );
}
