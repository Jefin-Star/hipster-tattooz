import { STUDIO_CONFIG } from '../config/studioConfig';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${STUDIO_CONFIG.contact.whatsappCountryCode}${STUDIO_CONFIG.contact.whatsappNumber}`;

  return (
    <footer className="bg-[#070707] text-[#D0CEC6] py-14 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-3 mb-4">
              <img
                src={STUDIO_CONFIG.brand.logoImage}
                alt="HIPSTER TATTOOZ logo"
                referrerPolicy="no-referrer"
                className="h-12 w-auto object-contain mix-blend-lighten"
              />
            </a>
            <p className="text-sm text-[#B3B0A8] max-w-sm leading-relaxed">
              {STUDIO_CONFIG.brand.subTagline}
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-medium tracking-[0.16em] text-[#B3B0A8] mb-4">
              NAVIGATION
            </p>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Studio
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#rates" className="hover:text-white transition-colors">
                  Session Rates
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">
                  Book Consultation
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-medium tracking-[0.16em] text-[#B3B0A8] mb-4">
              CONNECT
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp · {STUDIO_CONFIG.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STUDIO_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {STUDIO_CONFIG.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram · {STUDIO_CONFIG.contact.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9C9A92]">
          <p>
            © {currentYear} {STUDIO_CONFIG.brand.name}. All rights reserved.
          </p>
          <p>
            {STUDIO_CONFIG.hours.regular} · {STUDIO_CONFIG.hours.sunday}
          </p>
        </div>
      </div>
    </footer>
  );
}
