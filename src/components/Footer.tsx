export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container py-10 text-sm text-text-secondary">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} MonoHR. All rights reserved.</p>
          <nav className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-text-primary">Privacy</a>
            <a href="/terms" className="hover:text-text-primary">Terms</a>
            <a href="/faqs" className="hover:text-text-primary">FAQs</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}


