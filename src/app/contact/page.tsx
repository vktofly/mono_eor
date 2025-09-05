export default function Contact() {
  return (
    <main className="container py-16">
      <h1 className="text-3xl font-semibold text-text-primary">Contact MonoHR</h1>
      <p className="mt-2 text-text-secondary">Tell us about your needs and pick a time to talk.</p>

      <form className="mt-8 grid grid-cols-1 gap-4 max-w-xl">
        <input className="border border-line rounded-md px-3 py-2" placeholder="Full name" required />
        <input className="border border-line rounded-md px-3 py-2" type="email" placeholder="Work email" required />
        <input className="border border-line rounded-md px-3 py-2" placeholder="Company" required />
        <input className="border border-line rounded-md px-3 py-2" placeholder="Country" />
        <select className="border border-line rounded-md px-3 py-2">
          <option>Interest: EOR</option>
          <option>Interest: Payroll</option>
          <option>Interest: Contractors</option>
        </select>
        <textarea className="border border-line rounded-md px-3 py-2" placeholder="Message (optional)" rows={4} />
        <button className="inline-flex items-center justify-center rounded-md bg-cta-500 hover:bg-cta-600 text-white px-5 py-3 font-medium focus:outline-none focus:ring-4 focus:ring-cta-300" type="submit">Submit</button>
      </form>

      <div className="mt-12">
        {/* Calendly embed placeholder; replace with actual link via env */}
        <iframe
          title="Calendly"
          src={process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL || "about:blank"}
          className="w-full h-[720px] border border-line rounded-md"
        />
      </div>
    </main>
  );
}


