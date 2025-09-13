import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MonoHR</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Scale your team in India without the complexity. EOR, payroll, and contractor management made simple.
            </p>
            <div className="flex flex-col space-y-3">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Follow Us</h4>
              <div className="flex space-x-4">
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/techype.co/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-300 group"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                    <path d="M12.017 5.838c-3.403 0-6.179 2.776-6.179 6.179s2.776 6.179 6.179 6.179 6.179-2.776 6.179-6.179-2.776-6.179-6.179-6.179zm0 10.179c-2.205 0-4-1.795-4-4s1.795-4 4-4 4 1.795 4 4-1.795 4-4 4zm6.179-10.179c-.751 0-1.36-.609-1.36-1.36s.609-1.36 1.36-1.36 1.36.609 1.36 1.36-.609 1.36-1.36 1.36z"/>
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/techype-1/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                {/* X (Twitter) */}
                <a 
                  href="https://x.com/Techypeco" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition-colors duration-300 group"
                  aria-label="Follow us on X (Twitter)"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/techypeco" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-300 group"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 block py-1">
                  EOR India
                </Link>
              </li>
              <li>
                <Link href="/contractor-management-india" className="text-gray-300 hover:text-white transition-colors duration-200 block py-1">
                  Contractor Management
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors duration-200 block py-1">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 block py-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white transition-colors duration-200 block py-1">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 block py-1">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors duration-200 block py-1">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} MonoHR. All rights reserved.
              </p>
              <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
              <p className="text-gray-500 text-xs">
                Powered by <span className="text-brand-400">Techype</span>
              </p>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 py-1"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 py-1"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 py-1"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}


