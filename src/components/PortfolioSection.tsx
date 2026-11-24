import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { STUDIO_CONFIG, TattooPortfolioItem } from '../config/studioConfig';
import { ResilientImage } from './ResilientImage';

interface PortfolioSectionProps {
  onOpenWork: (work: TattooPortfolioItem) => void;
}

const STYLES = [
  'All Works',
  'Black & Grey Realism',
  'Fine Line',
  'Neo-Traditional',
  'Sacred Geometry',
  'Color Realism',
] as const;

export function PortfolioSection({ onOpenWork }: PortfolioSectionProps) {
  const [activeStyle, setActiveStyle] = useState<(typeof STYLES)[number]>('All Works');

  const filteredWorks =
    activeStyle === 'All Works'
      ? STUDIO_CONFIG.portfolio
      : STUDIO_CONFIG.portfolio.filter((item) => item.style === activeStyle);

  return (
    <section id="portfolio" className="py-20 sm:py-24 bg-[#121212] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header & functional segmented filter control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-[#C8A26A] mb-3">
              ARTIST PORTFOLIO
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#F5F4F0] leading-[1.12] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Selected custom ink &amp; healed gallery
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter portfolio by tattoo style"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#0A0A0A] border border-white/10 rounded-lg w-fit"
          >
            {STYLES.map((style) => {
              const isSelected = activeStyle === style;
              return (
                <button
                  key={style}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveStyle(style)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A] ${
                    isSelected
                      ? 'bg-[#C8A26A] text-[#0A0A0A] font-semibold'
                      : 'text-[#B3B0A8] hover:text-[#F5F4F0]'
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredWorks.map((work, idx) => {
            const isFeaturedLead = activeStyle === 'All Works' && idx === 0;
            return (
              <article
                key={work.id}
                className={`group flex flex-col ${
                  isFeaturedLead ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => onOpenWork(work)}
                  aria-label={`Zoom in on ${work.title}`}
                  className={`relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] ${
                    isFeaturedLead ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <ResilientImage
                    src={work.image}
                    alt={`${work.title} — ${work.style} tattoo by ${work.artist}`}
                    fallbackTitle={work.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />

                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0A0A0A] bg-[#F5F4F0] rounded-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap">
                    <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Zoom Artwork</span>
                  </span>
                </button>

                {/* Clean unboxed metadata below card */}
                <div className="pt-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#B3B0A8] mb-1.5">
                    <span>{work.style}</span>
                    <span aria-hidden="true">·</span>
                    <span>{work.placement}</span>
                    <span aria-hidden="true">·</span>
                    <span>Artist: {work.artist}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F5F4F0] group-hover:text-[#C8A26A] transition-colors">
                    <button
                      type="button"
                      onClick={() => onOpenWork(work)}
                      className="text-left focus-visible:outline-none focus-visible:underline"
                    >
                      {work.title}
                    </button>
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
