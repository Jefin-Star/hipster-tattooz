import { useEffect, useState } from 'react';
import { ArrowUpRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { TattooPortfolioItem } from '../config/studioConfig';
import { ResilientImage } from './ResilientImage';

interface PortfolioModalProps {
  work: TattooPortfolioItem | null;
  onClose: () => void;
  onBookSimilar: (work: TattooPortfolioItem) => void;
}

export function PortfolioModal({
  work,
  onClose,
  onBookSimilar,
}: PortfolioModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [work?.id]);

  useEffect(() => {
    if (!work) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [work, onClose]);

  if (!work) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tattoo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#121212] border border-white/15 rounded-xl overflow-hidden flex flex-col lg:grid lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-right modal controls */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsZoomed((z) => !z)}
            aria-label={isZoomed ? 'Reset zoom' : 'Zoom in on tattoo detail'}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#F5F4F0] bg-[#0A0A0A]/90 hover:bg-[#1C1C1B] border border-white/15 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A]"
          >
            {isZoomed ? (
              <>
                <ZoomOut className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>1× Fit</span>
              </>
            ) : (
              <>
                <ZoomIn className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Zoom Detail</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close artwork modal"
            className="inline-flex items-center justify-center w-9 h-9 text-[#F5F4F0] bg-[#0A0A0A]/90 hover:bg-[#1C1C1B] border border-white/15 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A]"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* High-resolution tattoo canvas */}
        <div className="lg:col-span-7 bg-[#0A0A0A] overflow-auto max-h-[48vh] lg:max-h-[92vh] flex items-center justify-center">
          <div
            className={`w-full h-full flex items-center justify-center transition-transform duration-200 ease-out origin-center ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed((z) => !z)}
          >
            <ResilientImage
              src={work.image}
              alt={`${work.title} — close-up detail`}
              fallbackTitle={work.title}
              className="w-full h-full object-cover min-h-[260px] lg:min-h-[540px]"
            />
          </div>
        </div>

        {/* Specifications panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#121212]">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#B3B0A8] mb-2">
              <span>{work.style}</span>
              <span aria-hidden="true">·</span>
              <span>{work.placement}</span>
            </div>

            <h3
              id="tattoo-modal-title"
              className="font-serif text-2xl sm:text-3xl font-medium text-[#F5F4F0] leading-tight mb-4"
            >
              {work.title}
            </h3>

            <p className="text-sm text-[#D0CEC6] leading-relaxed mb-6">
              {work.summary}
            </p>

            <dl className="divide-y divide-white/10 border-t border-b border-white/10 text-sm">
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-[#B3B0A8]">Artist</dt>
                <dd className="font-medium text-[#F5F4F0]">{work.artist}</dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-[#B3B0A8]">Placement</dt>
                <dd className="font-medium text-[#F5F4F0]">{work.placement}</dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-[#B3B0A8]">Approximate Size</dt>
                <dd className="font-mono font-medium text-[#F5F4F0] tabular-nums">
                  {work.dimensions}
                </dd>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <dt className="text-[#B3B0A8]">Session Time</dt>
                <dd className="font-mono font-medium text-[#F5F4F0] tabular-nums">
                  {work.sessionTime}
                </dd>
              </div>
            </dl>
          </div>

          <div className="pt-6 mt-6">
            <button
              type="button"
              onClick={() => onBookSimilar(work)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0A0A0A] bg-[#C8A26A] hover:bg-[#D8B681] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
            >
              <span>Book Similar Piece</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
