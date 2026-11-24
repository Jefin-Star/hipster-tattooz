import { ArrowRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  onSelectArtist: (artistName: string) => void;
}

export function AboutSection({ onSelectArtist }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-24 bg-[#0A0A0A] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Two-column studio story & workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-[#C8A26A] mb-3">
                ABOUT OUR STUDIO
              </p>
              <h2
                className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#F5F4F0] leading-[1.12] tracking-tight mb-6"
                style={{ textWrap: 'balance' }}
              >
                Bespoke artistry built on sterile precision and eight years of craft.
              </h2>
              <p className="text-base text-[#D0CEC6] leading-[1.75] mb-8 max-w-[65ch]">
                {STUDIO_CONFIG.about.story}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-[#B3B0A8] mb-1">Founder &amp; Lead</p>
                <p className="font-serif text-2xl font-medium text-[#F5F4F0]">
                  {STUDIO_CONFIG.about.founderName}
                </p>
                <p className="text-sm text-[#B3B0A8]">{STUDIO_CONFIG.about.founderTitle}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#B3B0A8] mb-1">Operating Hours</p>
                <p className="text-sm font-medium text-[#F5F4F0]">
                  {STUDIO_CONFIG.hours.regular}
                </p>
                <p className="text-xs text-[#B3B0A8] mt-1">{STUDIO_CONFIG.hours.sunday}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[340px] lg:min-h-[440px] rounded-xl overflow-hidden border border-white/10 bg-[#121212]">
              <ResilientImage
                src={STUDIO_CONFIG.about.studioImage}
                alt={STUDIO_CONFIG.about.studioImageCaption}
                fallbackTitle="HIPSTER TATTOOZ Workstation"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
            <p className="text-xs text-[#B3B0A8] mt-3">
              {STUDIO_CONFIG.about.studioImageCaption}
            </p>
          </div>
        </div>

        {/* Studio hygiene & craftsmanship standards */}
        <div className="mt-16 pt-14 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {STUDIO_CONFIG.about.standards.map((standard) => (
            <div key={standard.index} className="space-y-2.5">
              <div className="font-mono text-xs font-medium text-[#C8A26A] tabular-nums">
                {standard.index}.
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#F5F4F0]">
                {standard.title}
              </h3>
              <p className="text-sm text-[#B3B0A8] leading-relaxed">{standard.description}</p>
            </div>
          ))}
        </div>

        {/* Sole Featured Master Artist: Vishnu */}
        <div className="mt-16 pt-14 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-[#C8A26A] mb-2">
                MASTER ARTIST
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F5F4F0]">
                Every piece crafted personally by {STUDIO_CONFIG.artists[0].name}
              </h3>
            </div>
            <p className="text-sm text-[#B3B0A8] max-w-md">
              All studio consultations and custom tattoo sessions are led directly by our founder.
            </p>
          </div>

          {STUDIO_CONFIG.artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-[#121212] border border-white/10 rounded-xl p-7 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
            >
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#B3B0A8] mb-2">
                  <span>{artist.role}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{artist.experience} Expertise</span>
                </div>
                <h4 className="font-serif text-3xl font-medium text-[#F5F4F0] mb-2">
                  {artist.name}
                </h4>
                <p className="text-xs font-medium text-[#C8A26A] mb-3">
                  {artist.specialty}
                </p>
                <p className="text-sm text-[#D0CEC6] leading-relaxed">
                  {artist.bio}
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href="#booking"
                  onClick={() => onSelectArtist(artist.name)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0A0A0A] bg-[#C8A26A] hover:bg-[#D8B681] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A]"
                >
                  <span>Book Consultation with {artist.name}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
