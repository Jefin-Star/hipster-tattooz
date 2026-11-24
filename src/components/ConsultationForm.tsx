import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { CheckCircle2, FileImage, MessageCircle, Upload, X } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

interface ConsultationFormProps {
  prefilledArtist: string;
  prefilledPlacement: string;
  prefilledTier: string;
  prefilledIdea: string;
}

interface BookingState {
  fullName: string;
  phone: string;
  email: string;
  tattooIdea: string;
  size: string;
  placement: string;
  preferredArtist: string;
  sessionTier: string;
}

interface BookingErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  tattooIdea?: string;
}

export function ConsultationForm({
  prefilledArtist,
  prefilledPlacement,
  prefilledTier,
  prefilledIdea,
}: ConsultationFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<BookingState>({
    fullName: '',
    phone: '',
    email: '',
    tattooIdea: prefilledIdea || '',
    size: '',
    placement: prefilledPlacement || STUDIO_CONFIG.placements[0],
    preferredArtist: prefilledArtist || STUDIO_CONFIG.artists[0].name,
    sessionTier: prefilledTier || STUDIO_CONFIG.rates[0].name,
  });

  const [referenceFile, setReferenceFile] = useState<{
    name: string;
    sizeLabel: string;
    previewUrl: string | null;
  } | null>(null);
  const [fileError, setFileError] = useState('');
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submittedBooking, setSubmittedBooking] = useState<BookingState | null>(null);

  useEffect(() => {
    if (prefilledArtist) {
      setForm((prev) => ({ ...prev, preferredArtist: prefilledArtist }));
    }
  }, [prefilledArtist]);

  useEffect(() => {
    if (prefilledPlacement) {
      setForm((prev) => ({ ...prev, placement: prefilledPlacement }));
    }
  }, [prefilledPlacement]);

  useEffect(() => {
    if (prefilledTier) {
      setForm((prev) => ({ ...prev, sessionTier: prefilledTier }));
    }
  }, [prefilledTier]);

  useEffect(() => {
    if (prefilledIdea) {
      setForm((prev) => ({ ...prev, tattooIdea: prefilledIdea }));
    }
  }, [prefilledIdea]);

  useEffect(() => {
    return () => {
      if (referenceFile?.previewUrl) {
        URL.revokeObjectURL(referenceFile.previewUrl);
      }
    };
  }, [referenceFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setFileError('Please select an image smaller than 10 MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setFileError('Supported formats: JPG, PNG, or WEBP reference images.');
      return;
    }

    if (referenceFile?.previewUrl) {
      URL.revokeObjectURL(referenceFile.previewUrl);
    }

    const kb = file.size / 1024;
    const sizeLabel = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;

    setReferenceFile({
      name: file.name,
      sizeLabel,
      previewUrl: URL.createObjectURL(file),
    });
  };

  const clearReferenceFile = () => {
    if (referenceFile?.previewUrl) {
      URL.revokeObjectURL(referenceFile.previewUrl);
    }
    setReferenceFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = (): BookingErrors => {
    const nextErrors: BookingErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 7) {
      nextErrors.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.tattooIdea.trim() || form.tattooIdea.trim().length < 6) {
      nextErrors.tattooIdea = 'Please describe your tattoo idea or concept.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmittedBooking({ ...form });
  };

  const buildWhatsAppUrl = (booking: BookingState) => {
    const waTarget = `${STUDIO_CONFIG.contact.whatsappCountryCode}${STUDIO_CONFIG.contact.whatsappNumber}`;
    const lines = [
      `Hello ${STUDIO_CONFIG.brand.name}, I would like to book a tattoo consultation.`,
      `Full Name: ${booking.fullName}`,
      `Phone: ${booking.phone}`,
      `Email: ${booking.email}`,
      `Tattoo Idea: ${booking.tattooIdea}`,
      `Approximate Size: ${booking.size || 'To be measured at studio'}`,
      `Placement: ${booking.placement}`,
      `Preferred Artist: ${booking.preferredArtist}`,
      `Session Tier: ${booking.sessionTier}`,
      referenceFile ? `Reference Image: ${referenceFile.name}` : '',
    ].filter(Boolean);

    return `https://wa.me/${waTarget}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const resetForm = () => {
    setSubmittedBooking(null);
    setErrors({});
    setForm((prev) => ({
      ...prev,
      fullName: '',
      phone: '',
      email: '',
      tattooIdea: '',
      size: '',
    }));
    clearReferenceFile();
  };

  return (
    <section id="booking" className="py-20 sm:py-24 bg-[#121212] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column: Booking guide */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.18em] text-[#C8A26A] mb-3">
              BOOKING &amp; CONSULTATION
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#F5F4F0] leading-[1.12] tracking-tight mb-5"
              style={{ textWrap: 'balance' }}
            >
              Reserve your tattoo consultation
            </h2>
            <p className="text-base text-[#B3B0A8] leading-relaxed mb-10">
              Share your tattoo concept, estimated size, body placement, and reference images. Master artist Vishnu reviews every brief personally to provide a customized quote and prepare your session.
            </p>

            <div className="space-y-6 border-t border-white/10 pt-8">
              <div>
                <div className="font-mono text-xs text-[#C8A26A] mb-1">
                  01. Concept &amp; Custom Quote
                </div>
                <p className="text-sm text-[#B3B0A8]">
                  Pieces start at ₹1,000, with final quotes customized to your specific design request, scale, and placement.
                </p>
              </div>
              <div>
                <div className="font-mono text-xs text-[#C8A26A] mb-1">
                  02. Operating Hours &amp; Sunday Sessions
                </div>
                <p className="text-sm text-[#B3B0A8]">
                  Open Monday through Saturday from 10 AM to 10 PM. Sunday sessions are available by prior appointment via WhatsApp.
                </p>
              </div>
              <div>
                <div className="font-mono text-xs text-[#C8A26A] mb-1">
                  03. Sterile Session Prep
                </div>
                <p className="text-sm text-[#B3B0A8]">
                  Every station is prepped fresh with sealed, sterile cannulated needles and hospital-grade barriers.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            {submittedBooking ? (
              <div className="bg-[#0A0A0A] border border-white/15 rounded-xl p-8 sm:p-10">
                <div className="flex items-start gap-3 mb-5">
                  <CheckCircle2
                    className="w-6 h-6 text-[#C8A26A] shrink-0 mt-0.5"
                    strokeWidth={1.75}
                  />
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F5F4F0]">
                      Consultation Brief Ready
                    </h3>
                    <p className="text-sm text-[#B3B0A8] mt-1">
                      Thank you, {submittedBooking.fullName}. Send this brief directly on WhatsApp to confirm your slot with {submittedBooking.preferredArtist}.
                    </p>
                  </div>
                </div>

                <dl className="divide-y divide-white/10 border-t border-b border-white/10 text-sm my-6">
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#B3B0A8]">Tattoo Idea</dt>
                    <dd className="font-medium text-[#F5F4F0] text-right max-w-xs">
                      {submittedBooking.tattooIdea}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#B3B0A8]">Size &amp; Placement</dt>
                    <dd className="font-medium text-[#F5F4F0] text-right">
                      {submittedBooking.size ? `${submittedBooking.size} · ` : ''}
                      {submittedBooking.placement}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#B3B0A8]">Preferred Artist</dt>
                    <dd className="font-medium text-[#F5F4F0] text-right">
                      {submittedBooking.preferredArtist}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#B3B0A8]">Session Tier</dt>
                    <dd className="font-medium text-[#F5F4F0] text-right">
                      {submittedBooking.sessionTier}
                    </dd>
                  </div>
                  {referenceFile && (
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#B3B0A8]">Reference Image</dt>
                      <dd className="font-mono text-xs text-[#F5F4F0] text-right">
                        {referenceFile.name} ({referenceFile.sizeLabel})
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={buildWhatsAppUrl(submittedBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0A0A0A] bg-[#C8A26A] hover:bg-[#D8B681] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={2} />
                    <span>Confirm via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-[#F5F4F0] bg-[#161615] hover:bg-[#222220] border border-white/15 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Book Another Piece
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 sm:p-9 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-medium text-[#E5E3DC] mb-1.5"
                    >
                      Full Name <span className="text-[#E57373]">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => {
                        setForm({ ...form, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#161615] border border-white/15 rounded-lg text-[#F5F4F0] placeholder:text-[#78756E] focus:outline-none focus:border-[#C8A26A] focus:ring-1 focus:ring-[#C8A26A]"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-[#F28B82] mt-1.5">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium text-[#E5E3DC] mb-1.5"
                    >
                      Phone Number <span className="text-[#E57373]">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="+91 97465 60859"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#161615] border border-white/15 rounded-lg text-[#F5F4F0] placeholder:text-[#78756E] focus:outline-none focus:border-[#C8A26A] focus:ring-1 focus:ring-[#C8A26A]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#F28B82] mt-1.5">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-[#E5E3DC] mb-1.5"
                    >
                      Email Address <span className="text-[#E57373]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#161615] border border-white/15 rounded-lg text-[#F5F4F0] placeholder:text-[#78756E] focus:outline-none focus:border-[#C8A26A] focus:ring-1 focus:ring-[#C8A26A]"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#F28B82] mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Approximate Size */}
                  <div>
                    <label
                      htmlFor="tattooSize"
                      className="block text-xs font-medium text-[#E5E3DC] mb-1.5"
                    >
                      Approximate Size (inches / cm)
                    </label>
                    <input
                      id="tattooSize"
                      type="text"
                      value={form.size}
                      onChange={(e) => setForm({ ...form, size: e.target.value })}
                      placeholder="e.g. 6 × 4 inches"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#161615] border border-white/15 rounded-lg text-[#F5F4F0] placeholder:text-[#78756E] focus:outline-none focus:border-[#C8A26A] focus:ring-1 focus:ring-[#C8A26A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Placement */}
                  <div>
                    <label
                      htmlFor="placement"
                      className="block text-xs font-medium text-[#E5E3DC] mb-1.5"
                    >
                      Placement
                    </label>
                    <select
                      id="placement"
                      value={form.placement}
                      onChange={(e) => setForm({ ...form, placement: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#161615] border border-white/15 rounded-lg text-[#F5F4F0] focus:outline-none focus:border-[#C8A26A] focus:ring-1 focus:ring-[#C8A26A]"
                    >
                      {STUDIO_CONFIG.placements.map((place) => (
                        <option key={place} value={place}>
                          {place}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Artist */}
                  <div>
                    <label
                      htmlFor="preferredArtist"
                      className="block text-xs font-medium text-[#E5E3DC] mb-1.5"
                    >
                      Preferred Artist
                    </label>
                    <select
                      id="preferredArtist"
                      value={form.preferredArtist}
                      onChange={(e) => setForm({ ...form, preferredArtist: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#161615] border border-white/15 rounded-lg text-[#F5F4F0] focus:outline-none focus:border-[#C8A26A] focus:ring-1 focus:ring-[#C8A26A]"
                    >
                      {STUDIO_CONFIG.artists.map((artist) => (
                        <option key={artist.id} value={artist.name}>
                          {artist.name} — {artist.role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Session Tier */}
                <div>
                  <label
                    htmlFor="sessionTier"
                    className="block text-xs font-medium text-[#E5E3DC] mb-1.5"
                  >
                    Estimated Session Tier
                  </label>
                  <select
                    id="sessionTier"
                    value={form.sessionTier}
                    onChange={(e) => setForm({ ...form, sessionTier: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#161615] border border-white/15 rounded-lg text-[#F5F4F0] focus:outline-none focus:border-[#C8A26A] focus:ring-1 focus:ring-[#C8A26A]"
                  >
                    {STUDIO_CONFIG.rates.map((tier) => (
                      <option key={tier.id} value={tier.name}>
                        {tier.name} ({tier.priceLabel} {tier.unitLabel})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tattoo Idea */}
                <div>
                  <label
                    htmlFor="tattooIdea"
                    className="block text-xs font-medium text-[#E5E3DC] mb-1.5"
                  >
                    Tattoo Idea &amp; Style Notes <span className="text-[#E57373]">*</span>
                  </label>
                  <textarea
                    id="tattooIdea"
                    rows={4}
                    value={form.tattooIdea}
                    onChange={(e) => {
                      setForm({ ...form, tattooIdea: e.target.value });
                      if (errors.tattooIdea) setErrors({ ...errors, tattooIdea: undefined });
                    }}
                    placeholder="Describe your tattoo concept, style (black & grey realism, fine line, neo-traditional, geometry), and preferred date or Sunday request."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#161615] border border-white/15 rounded-lg text-[#F5F4F0] placeholder:text-[#78756E] focus:outline-none focus:border-[#C8A26A] focus:ring-1 focus:ring-[#C8A26A]"
                  />
                  {errors.tattooIdea && (
                    <p className="text-xs text-[#F28B82] mt-1.5">{errors.tattooIdea}</p>
                  )}
                </div>

                {/* Reference Image Upload */}
                <div>
                  <label className="block text-xs font-medium text-[#E5E3DC] mb-1.5">
                    Reference Image Upload
                  </label>

                  {referenceFile ? (
                    <div className="flex items-center justify-between gap-4 p-3.5 bg-[#161615] border border-white/15 rounded-lg">
                      <div className="flex items-center gap-3 min-w-0">
                        {referenceFile.previewUrl ? (
                          <img
                            src={referenceFile.previewUrl}
                            alt="Uploaded tattoo reference preview"
                            className="w-12 h-12 rounded-md object-cover border border-white/15 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-md bg-[#0A0A0A] border border-white/15 flex items-center justify-center shrink-0">
                            <FileImage className="w-5 h-5 text-[#B3B0A8]" strokeWidth={1.5} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#F5F4F0] truncate">
                            {referenceFile.name}
                          </p>
                          <p className="font-mono text-xs text-[#B3B0A8] tabular-nums">
                            {referenceFile.sizeLabel}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={clearReferenceFile}
                        aria-label="Remove uploaded image"
                        className="inline-flex items-center justify-center w-9 h-9 text-[#B3B0A8] hover:text-[#F5F4F0] hover:bg-white/10 rounded-md transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="referenceUpload"
                      className="flex flex-col items-center justify-center px-4 py-6 bg-[#161615] border border-dashed border-white/20 hover:border-[#C8A26A] rounded-lg cursor-pointer transition-colors text-center"
                    >
                      <Upload className="w-5 h-5 text-[#C8A26A] mb-2" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-[#F5F4F0]">
                        Upload tattoo reference artwork
                      </span>
                      <span className="text-xs text-[#B3B0A8] mt-1">
                        JPG, PNG, or WEBP up to 10 MB
                      </span>
                      <input
                        ref={fileInputRef}
                        id="referenceUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  )}

                  {fileError && (
                    <p className="text-xs text-[#F28B82] mt-1.5">{fileError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#0A0A0A] bg-[#C8A26A] hover:bg-[#D8B681] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A26A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                >
                  Submit Consultation Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
