import { ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  return (
    <section id="top" className="bg-[#0A0A0A]">
      {/* Full-bleed atmospheric tattoo studio backdrop */}
      <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-end overflow-hidden bg-[#0A0A0A]">
        <ResilientImage
          src={STUDIO_CONFIG.hero.image}
          alt={STUDIO_CONFIG.hero.imageAlt}
          fallbackTitle={STUDIO_CONFIG.brand.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Measured multi-stop scrim guaranteeing >= 4.5:1 contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/65 to-[#0A0A0A]/30"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C8A26A] mb-3">
              {STUDIO_CONFIG.brand.name} · KOZHIKODE STUDIO &amp; SCHOOL
            </p>

            <h1
              className="font-serif font-semibold text-[#F5F4F0] leading-[1.06] tracking-tight mb-5"
              style={{
                fontSize: 'clamp(2.35rem, 4.7vw, 4.25rem)',
                textWrap: 'balance',
              }}
            >
              {STUDIO_CONFIG.brand.tagline}
            </h1>

            <p className="text-base sm:text-lg text-[#D0CEC6] leading-relaxed max-w-2xl mb-8">
              {STUDIO_CONFIG.brand.subTagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0A0A0A] bg-[#C8A26A] hover:bg-[#D8B681] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-[#F5F4F0] border border-white/30 bg-black/35 hover:bg-white/10 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-column studio credentials strip */}
      <div className="border-t border-b border-white/10 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          <div className="py-5 pr-4">
            <div className="font-mono text-xl sm:text-2xl font-medium text-[#F5F4F0] tabular-nums">
              {STUDIO_CONFIG.brand.yearsExperience} Years
            </div>
            <p className="text-xs sm:text-sm text-[#B3B0A8] mt-1">
              Specialized custom tattoo mastery
            </p>
          </div>

          <div className="py-5 pl-4 lg:px-6">
            <div className="font-mono text-lg sm:text-xl font-medium text-[#F5F4F0]">
              Founder · Vishnu
            </div>
            <p className="text-xs sm:text-sm text-[#B3B0A8] mt-1">
              Lead artist &amp; studio director
            </p>
          </div>

          <div className="py-5 pr-4 lg:px-6">
            <div className="font-mono text-base sm:text-lg font-medium text-[#F5F4F0] tabular-nums">
              Mon – Sat · 10 AM – 10 PM
            </div>
            <p className="text-xs sm:text-sm text-[#B3B0A8] mt-1">
              Sunday by prior WhatsApp appointment
            </p>
          </div>

          <div className="py-5 pl-4 lg:pl-6">
            <div className="font-mono text-base sm:text-lg font-medium text-[#F5F4F0]">
              Cannulated Needles
            </div>
            <p className="text-xs sm:text-sm text-[#B3B0A8] mt-1">
              100% sterile single-use protocol
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
