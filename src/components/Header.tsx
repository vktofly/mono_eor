"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  submenu?: NavLink[];
}

interface HeaderProps {
  settings: {
    name: string;
    navLinks: NavLink[];
  };
}

export function Header({ settings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white border-b border-gray-200'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
              {settings.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {settings.navLinks.map((link, index) => (
              <div key={`desktop-${index}-${link.href}`} className="relative dropdown-container">
                {link.submenu ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-brand-600 transition-colors font-medium"
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        activeDropdown === link.label ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                        >
                          {link.submenu.map((subLink, subIndex) => (
                            <Link
                              key={`desktop-sub-${index}-${subIndex}-${subLink.href}`}
                              href={subLink.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors"
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-brand-600 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
          ))}
        </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-cta-500 to-cta-600 hover:from-cta-600 hover:to-cta-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          {isClient && (
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-brand-600 hover:bg-gray-100 transition-colors touch-target"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isClient && (
          <AnimatePresence>
            {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
              id="mobile-menu"
            >
              <div className="py-4 space-y-2">
                {settings.navLinks.map((link, index) => (
                  <div key={`mobile-${index}-${link.href}`}>
                    {link.submenu ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(link.label)}
                          className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-colors touch-target"
                        >
                          <span className="font-medium">{link.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            activeDropdown === link.label ? 'rotate-180' : ''
                          }`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === link.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 space-y-1"
                            >
                              {link.submenu.map((subLink, subIndex) => (
                                <Link
                                  key={`mobile-sub-${index}-${subIndex}-${subLink.href}`}
                                  href={subLink.href}
                                  className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                  {subLink.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-4 py-3 text-gray-700 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA */}
                <div className="px-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-cta-500 to-cta-600 hover:from-cta-600 hover:to-cta-700 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        )}
      </div>
    </header>
  );
}


