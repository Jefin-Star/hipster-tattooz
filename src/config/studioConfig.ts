export interface ArtistProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
}

export interface TattooPortfolioItem {
  id: string;
  title: string;
  style: 'Black & Grey Realism' | 'Fine Line' | 'Neo-Traditional' | 'Sacred Geometry' | 'Color Realism';
  placement: string;
  dimensions: string;
  sessionTime: string;
  artist: string;
  summary: string;
  image: string;
  featured?: boolean;
}

export interface SessionRateTier {
  id: string;
  index: string;
  name: string;
  priceLabel: string;
  unitLabel: string;
  duration: string;
  description: string;
  includes: string[];
  highlighted?: boolean;
}

/**
 * HIPSTER TATTOOZ — CENTRAL STUDIO CONFIGURATION
 * Edit studio contact details, operating hours, session rates,
 * artist roster, and portfolio items below.
 */
export const STUDIO_CONFIG = {
  brand: {
    name: 'HIPSTER TATTOOZ',
    logoImage: '/assets/aistudio/704fb33f-326a-4907-a809-9459d210fc04_d8011e04.jpg',
    tagline: 'Bespoke ink crafted with precision, sterile discipline, and lasting artistry.',
    subTagline:
      'Custom tattoos tailored to your anatomy and story—led by founder and master artist Vishnu with 8+ years of specialized craft.',
    yearsExperience: '08+',
  },

  hero: {
    image: '/src/assets/images/tattoo_studio_interior_1795518031744.jpg',
    imageAlt:
      'HIPSTER TATTOOZ private studio chair, framed monochrome ink artwork, and stainless steel workstation',
  },

  about: {
    founderName: 'Vishnu',
    founderTitle: 'Founder & Master Tattoo Artist',
    story:
      'Welcome to our studio, home of bespoke, premium tattoos tailored to your vision. Led by our founder and master artist Vishnu, boasting over eight years plus of specialized expertise, we ensure every piece is a masterpiece. We operate Monday through Saturday from 10 AM to 10 PM, with Sunday sessions available by prior appointment via WhatsApp, and strictly use sterile, cannulated needles for your safety and precision.',
    studioImage: '/src/assets/images/tattoo_artist_workstation_1795518014866.jpg',
    studioImageCaption:
      'Sterile stainless steel setup, single-use cannulated cartridge needles, and precision studio lighting.',
    standards: [
      {
        index: '01',
        title: 'Sterile Cannulated Needles',
        description:
          'Every session uses brand-new, sealed, single-use cannulated needles unboxed directly in front of you.',
      },
      {
        index: '02',
        title: 'Custom Anatomical Design',
        description:
          'Zero copy-paste flash—each artwork is drawn to flow naturally with your muscle contour and skin tone.',
      },
      {
        index: '03',
        title: 'Clinical Studio Hygiene',
        description:
          'Hospital-grade surface barriers, medical nitrile gloves, and dedicated aftercare guidance for clean healing.',
      },
    ],
  },

  hours: {
    regular: 'Monday – Saturday · 10:00 AM – 10:00 PM',
    sunday: 'Sunday sessions available by prior appointment via WhatsApp',
  },

  contact: {
    // Editable studio contact placeholders
    whatsappNumber: '9746560859',
    whatsappCountryCode: '91',
    whatsappDisplay: '+91 97465 60859',
    email: 'hipstertattooz@gmail.com',
    instagramHandle: '@hipster_tattooz_',
    instagramUrl: 'https://www.instagram.com/hipster_tattooz_?igsh=OTVjbzY3aHB6b2d5',
    studioNameOnMap: 'Hipster Tattoo School & Studio',
    addressLine: 'Hipster Tattoo School & Studio, Kozhikode, Kerala',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.9897354668237!2d75.83031609999999!3d11.229608599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b49c7f101ff%3A0x1539d98fa1c418e!2sHipster%20tattoo%20school%20%26%20studio!5e1!3m2!1sen!2sin!4v1795517107011!5m2!1sen!2sin',
  },

  artists: [
    {
      id: 'vishnu',
      name: 'Vishnu',
      role: 'Founder & Master Tattoo Artist',
      experience: '8+ Years',
      specialty: 'Black & Grey Realism · Fine Line · Neo-Traditional · Custom Sleeves',
      bio: 'Founder and sole lead artist of HIPSTER TATTOOZ with over eight years of specialized expertise. Every custom piece is designed around your anatomy and executed using strictly sterile, single-use cannulated needles.',
    },
  ] satisfies ArtistProfile[],

  placements: [
    'Forearm (Inner / Outer)',
    'Upper Arm / Half Sleeve',
    'Full Sleeve',
    'Chest / Sternum',
    'Upper Back / Shoulder Blade',
    'Full Back / Spine',
    'Ribcage / Side Torso',
    'Calf / Thigh',
    'Wrist / Collarbone / Custom',
  ],

  portfolio: [
    {
      id: 'ardhanarishvara-split-band',
      title: 'Ardhanarishvara Split Geometric Band',
      style: 'Sacred Geometry',
      placement: 'Forearm Band',
      dimensions: '4 × 6 in',
      sessionTime: '5 Hours',
      artist: 'Vishnu',
      summary:
        'Symmetrical Ardhanarishvara forearm band uniting Shiva and Parvati across a central vertical geometric pillar, accented with a crescent moon, tripundra tilak, ornate crown filigree, and crisp architectural framing lines.',
      image: '/assets/aistudio/1001575169_08dcccd4.jpeg',
      featured: true,
    },
    {
      id: 'family-portrait-sleeve',
      title: 'Three-Generation Family Portrait',
      style: 'Black & Grey Realism',
      placement: 'Full Forearm',
      dimensions: '9 × 4.5 in',
      sessionTime: '7.5 Hours',
      artist: 'Vishnu',
      summary:
        'Stacked black-and-grey realism family portrait spanning the full forearm to the wrist, capturing delicate facial expressions, flowing hair texture, traditional jewelry, and soft tonal depth.',
      image: '/assets/aistudio/1788356317263_623f1561.jpeg',
    },
    {
      id: 'winged-compass-anchor',
      title: 'Winged Compass & Sunburst Anchor',
      style: 'Fine Line',
      placement: 'Outer Forearm',
      dimensions: '7.5 × 4 in',
      sessionTime: '4 Hours',
      artist: 'Vishnu',
      summary:
        'Nautical forearm composition pairing a shaded compass rose and symmetrical feathered wings with a rope-wrapped anchor set against crisp fine-line sunburst rays.',
      image: '/assets/aistudio/1001646587__1__8296994b.jpeg',
    },
    {
      id: 'ceremonial-cultural-half-sleeve',
      title: 'Ceremonial Guardian Cultural Half-Sleeve',
      style: 'Neo-Traditional',
      placement: 'Upper Arm',
      dimensions: '10 × 6 in',
      sessionTime: '8 Hours',
      artist: 'Vishnu',
      summary:
        'Bold black-and-grey upper-arm half-sleeve inspired by classical Kerala ritual theatre, combining an ornate ceremonial crown and expressive eyes with a bell-bearing performer and geometric medallions.',
      image: '/assets/aistudio/1001541122_e831e291.jpeg',
    },
    {
      id: 'monarch-butterfly-chest',
      title: 'Monarch Butterfly 3D Realism Piece',
      style: 'Color Realism',
      placement: 'Chest / Collarbone',
      dimensions: '5.5 × 4 in',
      sessionTime: '3.5 Hours',
      artist: 'Vishnu',
      summary:
        'Vibrant red-and-orange monarch butterfly tattooed on the upper chest featuring realistic soft drop shadow depth, dark stippled wing border details, and delicate fine-line antennae.',
      image: '/assets/aistudio/1001536217__1__72a6cc83.jpeg',
    },
  ] satisfies TattooPortfolioItem[],

  rates: [
    {
      id: 'minimum-fineline',
      index: '01',
      name: 'Minimal & Fine Line',
      priceLabel: '₹1,000',
      unitLabel: 'starting studio price',
      duration: '1 – 2 Hours',
      description:
        'Starting point for small fine-line script, minimalist symbols, and delicate pieces. Final quote depends on exact size and placement.',
      includes: [
        'Custom stencil sizing & placement check',
        'Sterile single-use cannulated needle setup',
        'Medical-grade second-skin dressing',
      ],
      highlighted: true,
    },
    {
      id: 'custom-medium',
      index: '02',
      name: 'Custom Medium & Realism',
      priceLabel: 'Custom Quote',
      unitLabel: 'based on design',
      duration: '3 – 6 Hours',
      description:
        'Tailored pricing for black-and-grey realism, neo-traditional artwork, and detailed forearm or upper-arm compositions.',
      includes: [
        '1-on-1 concept & anatomy consultation with Vishnu',
        'Bespoke artwork draft prior to session',
        'Complimentary 30-day healed touch-up',
      ],
    },
    {
      id: 'full-day-sleeve',
      index: '03',
      name: 'Full-Day & Large Sleeve',
      priceLabel: 'Custom Quote',
      unitLabel: 'based on scope',
      duration: 'Full-Day Sitting',
      description:
        'Dedicated full-day or multi-session sittings with Vishnu for half sleeves, full sleeves, and large back pieces.',
      includes: [
        'Multi-session sleeve layout mapping',
        'Priority booking (incl. Sunday WhatsApp slots)',
        'Complete aftercare balm & follow-up kit',
      ],
    },
  ] satisfies SessionRateTier[],
};
