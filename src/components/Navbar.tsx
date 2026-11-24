import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Rates', href: '#rates' },
  { label: 'Booking', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Seamless Studio Logo */}
        <a
          href="#top"
          aria-label={STUDIO_CONFIG.brand.name}
          className="inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A] rounded-sm"
        >
          <img
            src={STUDIO_CONFIG.brand.logoImage}
            alt={STUDIO_CONFIG.brand.name}
            referrerPolicy="no-referrer"
            className="h-9 sm:h-10 w-auto object-contain mix-blend-lighten"
          />
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B3B0A8]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-[#F5F4F0] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#C8A26A] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA + mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#booking"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-[#0A0A0A] bg-[#C8A26A] hover:bg-[#D8B681] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            Book Consultation
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#F5F4F0] hover:bg-white/10 rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0A0A] px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block py-2.5 text-base font-medium text-[#F5F4F0] hover:text-[#C8A26A] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10">
            <a
              href="#booking"
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-[#0A0A0A] bg-[#C8A26A] hover:bg-[#D8B681] rounded-lg transition-colors whitespace-nowrap"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
