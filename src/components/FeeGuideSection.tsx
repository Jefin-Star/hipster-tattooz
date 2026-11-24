import { ArrowRight, Check } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

interface FeeGuideSectionProps {
  selectedTier: string;
  onSelectTier: (tierName: string) => void;
}

export function FeeGuideSection({
  selectedTier,
  onSelectTier,
}: FeeGuideSectionProps) {
  return (
    <section id="rates" className="py-20 sm:py-24 bg-[#0A0A0A] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-[#C8A26A] mb-3">
              SESSION RATES
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#F5F4F0] leading-[1.12] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Tattoos starting at ₹1,000
            </h2>
          </div>
          <p className="text-sm text-[#B3B0A8] max-w-md">
            Sessions begin at ₹1,000 for minimal work. All final quotes are customized based on your specific design requests, dimensions, and anatomical placement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STUDIO_CONFIG.rates.map((tier) => {
            const isSelected = selectedTier === tier.name;
            return (
              <div
                key={tier.id}
                className={`rounded-xl p-7 flex flex-col justify-between transition-colors duration-150 ${
                  tier.highlighted
                    ? 'bg-[#1A1815] border border-[#C8A26A]/50'
                    : 'bg-[#121212] border border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-xs text-[#C8A26A] tabular-nums">
                      {tier.index}.
                    </span>
                    <span className="font-mono text-xs text-[#B3B0A8] tabular-nums">
                      {tier.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#F5F4F0] mb-3">
                    {tier.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-4 pb-5 border-b border-white/10">
                    <span className="font-mono text-3xl font-medium text-[#F5F4F0] tabular-nums">
                      {tier.priceLabel}
                    </span>
                    <span className="text-xs text-[#B3B0A8]">{tier.unitLabel}</span>
                  </div>

                  <p className="text-sm text-[#B3B0A8] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className="w-4 h-4 mt-0.5 shrink-0 text-[#C8A26A]"
                          strokeWidth={1.75}
                        />
                        <span className="text-[#E5E3DC]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#booking"
                  onClick={() => onSelectTier(tier.name)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A] ${
                    tier.highlighted || isSelected
                      ? 'bg-[#C8A26A] text-[#0A0A0A] font-semibold hover:bg-[#D8B681]'
                      : 'bg-[#1B1B19] text-[#F5F4F0] hover:bg-[#252522] border border-white/10'
                  }`}
                >
                  <span>{isSelected ? 'Session Selected' : 'Select Session Tier'}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
