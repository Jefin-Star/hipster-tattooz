import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ConsultationForm } from './components/ConsultationForm';
import { ContactSection } from './components/ContactSection';
import { FeeGuideSection } from './components/FeeGuideSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PortfolioModal } from './components/PortfolioModal';
import { PortfolioSection } from './components/PortfolioSection';
import { STUDIO_CONFIG, TattooPortfolioItem } from './config/studioConfig';

export default function App() {
  const [activeWork, setActiveWork] = useState<TattooPortfolioItem | null>(null);
  const [prefilledArtist, setPrefilledArtist] = useState<string>(
    STUDIO_CONFIG.artists[0].name
  );
  const [prefilledPlacement, setPrefilledPlacement] = useState<string>(
    STUDIO_CONFIG.placements[0]
  );
  const [prefilledTier, setPrefilledTier] = useState<string>(
    STUDIO_CONFIG.rates[0].name
  );
  const [prefilledIdea, setPrefilledIdea] = useState<string>('');

  const handleBookSimilar = (work: TattooPortfolioItem) => {
    const placementMap: Record<string, string> = {
      'Outer Forearm': 'Forearm (Inner / Outer)',
      'Inner Forearm': 'Forearm (Inner / Outer)',
      'Forearm Wrap': 'Forearm (Inner / Outer)',
      'Upper Arm': 'Upper Arm / Half Sleeve',
      'Upper Back / Shoulder': 'Upper Back / Shoulder Blade',
    };

    setPrefilledPlacement(placementMap[work.placement] || STUDIO_CONFIG.placements[0]);
    setPrefilledArtist(work.artist);
    setPrefilledIdea(`Inspired by "${work.title}" (${work.style})`);
    setActiveWork(null);

    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F4F0]">
      <Navbar />

      <main className="flex-1">
        <HeroSection />

        <AboutSection
          onSelectArtist={(artistName) => setPrefilledArtist(artistName)}
        />

        <PortfolioSection onOpenWork={(work) => setActiveWork(work)} />

        <FeeGuideSection
          selectedTier={prefilledTier}
          onSelectTier={(tierName) => setPrefilledTier(tierName)}
        />

        <ConsultationForm
          prefilledArtist={prefilledArtist}
          prefilledPlacement={prefilledPlacement}
          prefilledTier={prefilledTier}
          prefilledIdea={prefilledIdea}
        />

        <ContactSection />
      </main>

      <Footer />

      <PortfolioModal
        work={activeWork}
        onClose={() => setActiveWork(null)}
        onBookSimilar={handleBookSimilar}
      />
    </div>
  );
}
