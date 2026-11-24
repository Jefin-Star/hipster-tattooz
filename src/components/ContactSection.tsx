import { useState } from 'react';
import { Check, Copy, Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<'whatsapp' | 'email' | null>(null);

  const whatsappUrl = `https://wa.me/${STUDIO_CONFIG.contact.whatsappCountryCode}${STUDIO_CONFIG.contact.whatsappNumber}`;

  const handleCopy = async (value: string, field: 'whatsapp' | 'email') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard API unavailable; clickable links remain functional
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left column: Clickable WhatsApp, Email, Instagram & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-[#C8A26A] mb-3">
                CONTACT US
              </p>
              <h2
                className="font-serif text-3xl sm:text-4xl font-semibold text-[#F5F4F0] leading-[1.15] tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Visit {STUDIO_CONFIG.brand.name} or message the desk
              </h2>
              <p className="text-sm text-[#B3B0A8] leading-relaxed mb-8">
                Connect directly via WhatsApp for Sunday bookings and quick inquiries, email custom concepts, or follow daily healed work on Instagram.
              </p>
            </div>

            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {/* WhatsApp */}
              <div className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <MessageCircle
                    className="w-4 h-4 text-[#C8A26A] mt-1 shrink-0"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-[#B3B0A8]">WhatsApp</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-medium text-[#F5F4F0] hover:text-[#C8A26A] transition-colors tabular-nums"
                    >
                      {STUDIO_CONFIG.contact.whatsappDisplay}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(STUDIO_CONFIG.contact.whatsappNumber, 'whatsapp')
                  }
                  aria-label="Copy WhatsApp number"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#D0CEC6] hover:text-[#F5F4F0] bg-[#161615] border border-white/10 rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedField === 'whatsapp' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C8A26A]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email */}
              <div className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <Mail
                    className="w-4 h-4 text-[#C8A26A] mt-1 shrink-0"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-[#B3B0A8]">Email</p>
                    <a
                      href={`mailto:${STUDIO_CONFIG.contact.email}`}
                      className="text-sm font-medium text-[#F5F4F0] hover:text-[#C8A26A] transition-colors break-all"
                    >
                      {STUDIO_CONFIG.contact.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(STUDIO_CONFIG.contact.email, 'email')}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#D0CEC6] hover:text-[#F5F4F0] bg-[#161615] border border-white/10 rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C8A26A]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instagram */}
              <div className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <Instagram
                    className="w-4 h-4 text-[#C8A26A] mt-1 shrink-0"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-[#B3B0A8]">Instagram</p>
                    <a
                      href={STUDIO_CONFIG.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#F5F4F0] hover:text-[#C8A26A] transition-colors"
                    >
                      {STUDIO_CONFIG.contact.instagramHandle}
                    </a>
                  </div>
                </div>
                <a
                  href={STUDIO_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 text-xs font-medium text-[#D0CEC6] hover:text-[#F5F4F0] bg-[#161615] border border-white/10 rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  Follow
                </a>
              </div>

              {/* Studio Address & Hours */}
              <div className="py-4 flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 text-[#C8A26A] mt-1 shrink-0"
                  strokeWidth={1.75}
                />
                <div>
                  <p className="text-xs text-[#B3B0A8]">Studio Address &amp; Operating Hours</p>
                  <p className="text-sm font-medium text-[#F5F4F0] mt-0.5">
                    {STUDIO_CONFIG.contact.studioNameOnMap}
                  </p>
                  <p className="text-xs font-medium text-[#F5F4F0] mt-2">
                    {STUDIO_CONFIG.hours.regular}
                  </p>
                  <p className="text-xs text-[#C8A26A] mt-0.5">
                    {STUDIO_CONFIG.hours.sunday}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Embedded Google Maps */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex-1 min-h-[360px] lg:min-h-[460px] rounded-xl overflow-hidden border border-white/15 bg-[#121212]">
              <iframe
                title="Hipster Tattoo School & Studio location map"
                src={STUDIO_CONFIG.contact.mapEmbedUrl}
                className="w-full h-full min-h-[360px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
