'use client';

import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';
import { motion } from 'framer-motion';

/* ────────────────────────────────────────────
   BUSINESS CONFIG
──────────────────────────────────────────── */
const config = {
  businessName: 'Apex Epoxy & Surface Systems',
  phone: '(281) 433-4346',
  phoneE164: '+12814334346',
  email: 'beauscalise@apexepoxytx.com',
  hours: '6AM - 6PM, 7 Days a Week',
  city: 'Cypress, TX',
  serviceArea: 'Cypress & Greater Houston',
  founders: 'Beau Scalise & Haden Mcdade',
  foundersTitle: 'Founding Partners | Principal Installers',
  warranty: '5-Year Warranty on Every Job',
  tagline: 'Warranty-Backed Epoxy Floors You Can Trust',

  services: [
    {
      name: 'Flake Epoxy Floors',
      shortName: 'Flake System',
      headline: 'The #1 Choice for Garage Floors in Cypress',
      desc: 'Our most popular system. Decorative vinyl flakes are broadcast into high-build epoxy, creating a chip-resistant, easy-to-clean surface that hides imperfections and looks incredible for years.',
      benefits: [
        'Hides cracks, stains & imperfections in concrete',
        'Resists hot tire pickup, chemicals & abrasion',
        'Easy to sweep, mop, or hose clean',
        'Hundreds of color & flake combinations',
        'Completed in just 1-2 days',
        'Backed by our 5-year warranty',
      ],
      ideal: 'Garages, Workshops, Laundry Rooms',
      image: '/pictures/service1.png',
    },
    {
      name: 'Commercial & Warehouse Floors',
      shortName: 'Shop Floors',
      headline: 'Heavy-Duty Coatings for Houston Businesses',
      desc: 'Industrial-strength epoxy systems engineered for high-traffic commercial environments. Our coatings withstand forklifts, chemical spills, and constant foot traffic while maintaining a professional appearance.',
      benefits: [
        'Withstands forklifts & heavy machinery',
        'Chemical & oil resistant surface',
        'OSHA-compliant safety line striping available',
        'Minimal downtime — fast cure times',
      ],
      ideal: 'Warehouses, Auto Shops, Retail',
      image: '/pictures/service2.png',
    },
    {
      name: 'Patio & Outdoor Coatings',
      shortName: 'Outdoor',
      headline: 'Protect Your Patio from Texas Weather',
      desc: 'UV-stable polyaspartic coatings designed specifically for outdoor concrete. Our outdoor systems resist fading, cracking, and peeling — even under the brutal Texas sun, rain, and humidity.',
      benefits: [
        'UV-stable — won\'t yellow or fade',
        'Slip-resistant texture for wet areas',
        'Withstands Texas heat, rain & humidity',
        'Perfect for pool decks & entertainment areas',
      ],
      ideal: 'Patios, Pool Decks, Walkways',
      image: '/pictures/service3.png',
    },
    {
      name: 'Metallic Epoxy Floors',
      shortName: 'Metallic',
      headline: 'One-of-a-Kind Metallic Finishes',
      desc: 'Stunning, high-gloss metallic pigments create a flowing, 3D marble effect that is completely unique to your space. The ultimate showpiece floor for homeowners who want something truly special.',
      benefits: [
        'Every floor is 100% unique',
        'High-gloss, mirror-like finish',
        'Seamless — no grout lines or seams',
        'Perfect for showrooms & living spaces',
      ],
      ideal: 'Showrooms, Man Caves, Interiors',
      image: '/pictures/service4.png',
    },
  ],

  process: [
    { step: '01', title: 'Free Estimate', desc: 'Call or fill out the form. We\'ll schedule a free on-site visit to measure your space and discuss your options — no pressure, no commitment.' },
    { step: '02', title: 'Surface Prep', desc: 'We diamond-grind your concrete to create the perfect bond profile. Cracks, spalling, and imperfections get repaired before any coating is applied.' },
    { step: '03', title: 'Coating Application', desc: 'Your chosen system is applied by hand — flake broadcast, metallic pour, or solid color — with precision and attention to detail on every square foot.' },
    { step: '04', title: 'Final Seal & Walkthrough', desc: 'A UV-stable polyaspartic top coat is applied for long-lasting protection. We walk you through the finished result and make sure you\'re 100% satisfied.' },
  ],

  whyUs: [
    { icon: 'verified', title: '5-Year Warranty', desc: 'Every job backed by our written 5-year warranty. If there\'s ever an issue, we come back and make it right — period.' },
    { icon: 'groups', title: 'Owner-Operated', desc: 'Beau & Haden are on every single job site. No subcontractors, no middlemen, no runaround.' },
    { icon: 'schedule', title: 'Fast Turnaround', desc: 'Most residential garage floors completed in just 1-2 days. We respect your time and minimize disruption.' },
    { icon: 'star', title: '100% Solids Epoxy', desc: 'We use industrial-grade, 100% solids epoxy and polyaspartic top coats — not the watered-down big-box store stuff.' },
    { icon: 'shield', title: 'Fully Licensed & Insured', desc: 'Licensed, insured, and committed to protecting your property and your investment from start to finish.' },
    { icon: 'palette', title: 'Custom Color Options', desc: 'Hundreds of flake blends, metallic pigments, and solid color options. Your floor, designed exactly how you want it.' },
  ],

  faqs: [
    { q: 'How long does an epoxy garage floor take in Cypress?', a: 'Most residential garage floors in Cypress take just 1-2 days to complete. Larger commercial or multi-bay projects may take 2-3 days. We always give you a clear timeline before we start so there are no surprises.' },
    { q: 'How much does epoxy flooring cost in Houston?', a: 'Pricing depends on your space size, concrete condition, and chosen system. A typical 2-car garage in Cypress or Houston ranges from $1,800 to $3,500 for a full flake system. We provide free, no-obligation estimates so you know the exact price upfront.' },
    { q: 'Do you offer free estimates in the Cypress area?', a: 'Yes! We provide 100% free on-site estimates throughout Cypress, Houston, Katy, The Woodlands, and all surrounding communities. We\'ll measure your space, assess your concrete, discuss options, and give you a clear price — no hidden fees, no pressure.' },
    { q: 'What\'s included in your 5-year warranty?', a: 'Our warranty covers peeling, delamination, and hot-tire pickup. If there\'s ever an issue with our workmanship, we come back and fix it at no charge — period. We stand behind every floor we install.' },
    { q: 'Is epoxy flooring slippery when wet?', a: 'Not with our system. We add anti-slip aggregate to the polyaspartic top coat, giving your floor excellent traction even when wet. This is especially important for garage floors and outdoor patios.' },
    { q: 'What\'s the difference between epoxy and polyaspartic coatings?', a: 'Epoxy is the base coat — it bonds to concrete and provides strength. Polyaspartic is the top coat — it\'s UV-stable, cures faster, and provides the glossy, protective finish. We use both together for maximum durability and performance.' },
    { q: 'Can you coat outdoor patios and pool decks?', a: 'Absolutely. We use UV-stable polyaspartic coatings specifically designed for outdoor use. They resist fading, cracking, and delamination from Texas sun, rain, and temperature swings.' },
    { q: 'What areas in Houston do you serve?', a: 'We\'re based in Cypress and serve the entire Greater Houston metro area including The Woodlands, Katy, Spring, Tomball, Sugar Land, Pearland, Friendswood, League City, and all surrounding communities.' },
  ],

  coverageAreas: [
    'Cypress', 'Houston', 'The Woodlands', 'Katy', 'Spring',
    'Tomball', 'Sugar Land', 'Pearland', 'Friendswood', 'League City',
    'Humble', 'Kingwood', 'Atascocita', 'Conroe', 'Richmond',
  ],

  heroImage: '/pictures/hero.png',
  heroVideo: '/pictures/hero_vid.mp4',
  contactImage: '/pictures/form.png',
  ctaImage: '/pictures/cta.png',
};

/* ────────────────────────────────────────────
   UTILITIES
──────────────────────────────────────────── */
const Icon = ({ name, className }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className || ''}`}>{name}</span>
);

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const ref = useReveal(0.08);
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-primary text-[10px] tracking-[0.25em] uppercase font-extrabold mb-4">{children}</span>
);

/* ────────────────────────────────────────────
   MAIN PAGE
──────────────────────────────────────────── */
export default function ApexEpoxyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [formTimestamp] = useState(() => Date.now().toString());
  const [phoneValue, setPhoneValue] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const formatPhone = useCallback((value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setAnnouncementVisible(y < 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormStatus('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const address = String(formData.get('address') || '').trim();
    const zipCode = String(formData.get('zipCode') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const honeypot = String(formData.get('website') || '').trim();
    if (honeypot) { form.reset(); setPhoneValue(''); setFormStatus('success'); return; }
    if (!name || !phone || !email || !address || !zipCode || !service) {
      setFormStatus('error');
      setFormError('Please fill out all required fields.');
      return;
    }
    try {
      const response = await fetch('/api/lead', { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) { setFormStatus('error'); setFormError(payload?.error || 'Something went wrong. Please try again.'); return; }
      form.reset(); setPhoneValue(''); setFormStatus('success');
    } catch { setFormStatus('error'); setFormError('Something went wrong. Please try again.'); }
  };

  const scrollToQuote = () => {
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#quote' },
  ];

  const shell = 'max-w-6xl mx-auto px-5 sm:px-6 lg:px-8';

  return (
    <div className="bg-surface text-on-surface noise-overlay">

      {/* ══════ ANNOUNCEMENT BAR ══════ */}
      <div
        className="fixed top-0 w-full z-[60] overflow-hidden"
        style={{
          maxHeight: announcementVisible ? '36px' : '0px',
          opacity: announcementVisible ? 1 : 0,
          transition: 'max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        }}
      >
        <div className="bg-surface-container-lowest border-b border-outline-variant/10">
          <div className={`${shell} flex items-center justify-center sm:justify-between h-[36px]`}>
            {/* Mobile: short, punchy */}
            <span className="sm:hidden text-[9px] tracking-[0.14em] uppercase font-bold text-primary/80">
              Cypress &amp; Houston &middot; Open 7 Days
            </span>
            {/* Desktop: full message */}
            <span className="hidden sm:block text-[10px] tracking-[0.12em] uppercase font-bold text-primary/80">
              Serving Cypress &amp; Greater Houston &middot; 7 Days a Week
            </span>
            <a href={`tel:${config.phoneE164}`} className="hidden sm:flex items-center gap-1.5 text-[10px] tracking-[0.08em] font-bold text-on-surface-variant/50 hover:text-primary transition-colors">
              <Icon name="call" className="text-primary !text-[11px]" />
              {config.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ══════ NAVIGATION ══════ */}
      <nav
        className="fixed w-full z-50"
        style={{
          top: announcementVisible ? '36px' : '0px',
          transition: 'top 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Nav background — separate div for smooth opacity/blur transitions */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            background: scrolled
              ? 'rgba(12, 12, 13, 0.92)'
              : 'rgba(12, 12, 13, 0.4)',
            backdropFilter: scrolled ? 'blur(20px) saturate(1.3)' : 'blur(12px)',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.3)' : 'blur(12px)',
            borderBottom: `1px solid ${scrolled ? 'rgba(245, 183, 49, 0.08)' : 'rgba(255, 255, 255, 0.04)'}`,
            boxShadow: scrolled ? '0 1px 0 rgba(245, 183, 49, 0.03), 0 8px 32px rgba(0, 0, 0, 0.4)' : 'none',
          }}
        />

        <div className={`${shell} relative flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'py-3' : 'py-4'}`}>
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className={`flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'w-7 h-7' : 'w-9 h-9'}`}>
              <img
                alt="Apex Epoxy logo mark"
                src="/logo_mark_transparent.svg"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className={`font-headline font-extrabold tracking-[0.04em] uppercase leading-none transition-all duration-700 ${scrolled ? 'text-[12px]' : 'text-[14px]'}`}>
                Apex <span className="text-primary">Epoxy</span>
              </div>
              <div
                className="font-headline text-[8px] font-semibold tracking-[0.18em] uppercase text-on-surface-variant/30 leading-none overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  maxHeight: scrolled ? '0px' : '12px',
                  opacity: scrolled ? 0 : 1,
                  marginTop: scrolled ? '0px' : '3px',
                }}
              >
                Surface Systems
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface/40 hover:text-on-surface/90 px-3.5 py-1.5 rounded-md hover:bg-white/[0.03] transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={scrollToQuote}
              className="hidden sm:flex items-center text-on-surface-variant/40 hover:text-primary text-[11px] font-semibold tracking-[0.04em] transition-colors duration-300 pr-2"
            >
              Free Estimate
            </button>
            <a
              href={`tel:${config.phoneE164}`}
              className="bg-primary hover:bg-[#f7c84a] text-on-primary font-bold px-5 sm:px-6 py-2.5 rounded-lg text-[10px] sm:text-[11px] uppercase tracking-[0.08em] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(245,183,49,0.2)] flex items-center gap-2"
            >
              <Icon name="call" className="!text-[13px]" />
              Call Now
            </a>
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/[0.04] text-on-surface/50 hover:text-on-surface transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            maxHeight: mobileMenuOpen ? '400px' : '0px',
            opacity: mobileMenuOpen ? 1 : 0,
          }}
        >
          <div className="bg-surface/95 backdrop-blur-xl border-t border-white/[0.04] px-5 pt-3 pb-5">
            <div className="space-y-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-[13px] font-semibold tracking-[0.04em] text-on-surface/50 hover:text-on-surface hover:bg-white/[0.03] transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.04] flex flex-col gap-2.5">
              <a href={`tel:${config.phoneE164}`} className="w-full bg-primary hover:bg-[#f7c84a] text-on-primary font-bold py-3 rounded-lg text-xs uppercase tracking-[0.1em] transition-colors duration-300 flex items-center justify-center gap-2">
                <Icon name="call" className="!text-[15px]" />
                Call Now — {config.phone}
              </a>
              <button onClick={() => { scrollToQuote(); setMobileMenuOpen(false); }} className="w-full text-on-surface-variant/50 font-semibold py-2.5 text-sm hover:text-primary transition-colors">
                Or Request a Free Estimate
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ══════ HERO — full-bleed immersive ══════ */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={config.heroImage}
            className="w-full h-full object-cover"
          >
            <source src={config.heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/20" />
        </div>

        <motion.div className={`${shell} relative z-10 w-full py-32`}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 border border-primary/30 bg-surface/60 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-[0_2px_16px_rgba(0,0,0,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-primary text-[10px] uppercase tracking-[0.2em] font-bold">
                {config.warranty}
              </span>
            </div>

            <h1 className="font-headline text-[clamp(2rem,6vw,4.5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] mb-5 sm:mb-6 text-white">
              WHERE FLOORS<br />BECOME <span className="text-primary">SURFACES.</span>
            </h1>

            <p className="text-white/70 text-base sm:text-xl max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              Professional epoxy floor coatings for garages, patios, and commercial spaces in Cypress &amp; Greater Houston, TX.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
              <a href={`tel:${config.phoneE164}`} className="premium-gradient text-on-primary font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg text-sm sm:text-[15px] uppercase tracking-[0.08em] flex items-center justify-center gap-2.5">
                <Icon name="call" className="text-lg sm:text-xl" />
                Call Now
              </a>
              <button onClick={scrollToQuote} className="btn-ghost border-white/20 text-white hover:border-primary hover:text-primary font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg text-sm sm:text-[15px]">
                Get Free Estimate
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom trust strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
          {/* Desktop — 4 columns */}
          <div className={`${shell} hidden sm:grid grid-cols-4 py-3.5`}>
            {[
              { icon: 'verified', text: '5-Year Written Warranty' },
              { icon: 'groups', text: 'Owners On Every Job' },
              { icon: 'shield', text: 'Licensed & Fully Insured' },
              { icon: 'science', text: '100% Solids Epoxy' },
            ].map((item) => (
              <div key={item.icon} className="flex items-center justify-center gap-2">
                <Icon name={item.icon} className="text-primary !text-[13px]" />
                <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-white/45">{item.text}</span>
              </div>
            ))}
          </div>
          {/* Mobile — horizontal scroll, no wrapping */}
          <div className="sm:hidden overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-5 px-5 py-3 w-max">
              {[
                { icon: 'verified', text: '5-Yr Warranty' },
                { icon: 'groups', text: 'Owners On Site' },
                { icon: 'shield', text: 'Insured' },
                { icon: 'science', text: '100% Solids' },
              ].map((item) => (
                <div key={item.icon} className="flex items-center gap-1.5 shrink-0">
                  <Icon name={item.icon} className="text-primary !text-[12px]" />
                  <span className="text-[10px] uppercase tracking-[0.12em] font-bold text-white/50 whitespace-nowrap">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════ ABOUT ══════ */}
      <section className="pt-14 sm:pt-28 pb-14 sm:pb-28 bg-surface-container-lowest relative">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent" />
        {/* Subtle diagonal crosshatch texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `repeating-linear-gradient(45deg, rgba(245,183,49,0.3) 0, rgba(245,183,49,0.3) 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, rgba(245,183,49,0.3) 0, rgba(245,183,49,0.3) 1px, transparent 0, transparent 50%)`, backgroundSize: '48px 48px' }} />

        <div className={`${shell} relative`}>
          {/* Top row — image + intro */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-center">
              {/* Logo */}
              <div className="flex items-center justify-center pt-2 sm:pt-4 pb-6 sm:pb-10">
                <img alt="Apex Epoxy & Surface Systems logo" src="/logo_full_transparent.svg" className="w-full max-w-[300px] sm:max-w-[400px] h-auto object-contain" />
              </div>

              {/* Copy side */}
              <div>
                <SectionLabel>About Apex Epoxy</SectionLabel>
                <h2 className="font-headline text-xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight mb-4 sm:mb-5">
                  Two Guys. One Trade.<br /> Done Right Every Time.
                </h2>
                <p className="text-on-surface-variant/55 text-sm sm:text-[15px] leading-[1.75] sm:leading-[1.8] mb-5 sm:mb-6">
                  Apex Epoxy &amp; Surface Systems is a locally owned epoxy flooring company based in Cypress, Texas. We specialize in garage floors, commercial coatings, patios, and metallic finishes across the Greater Houston area. Unlike franchises or handyman services, our owners are on every single job.
                </p>

                {/* Key selling points — scannable */}
                <div className="space-y-3.5 sm:space-y-4">
                  {[
                    { icon: 'science', title: '100% Solids, Industrial-Grade', desc: 'The same epoxy systems used in commercial and industrial applications — not watered-down big-box products.' },
                    { icon: 'verified', title: '5-Year Written Warranty', desc: 'Covers peeling, delamination, and hot-tire pickup. If there\'s an issue, we come back and fix it.' },
                    { icon: 'speed', title: 'Done in 1–2 Days', desc: 'Diamond grinding, epoxy base coat, full-broadcast flakes, and UV-stable polyaspartic top coat — all in a weekend.' },
                  ].map((point) => (
                    <div key={point.title} className="flex gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_0_1px_rgba(245,183,49,0.08),0_2px_8px_rgba(0,0,0,0.15)]">
                        <Icon name={point.icon} className="text-primary !text-[16px] sm:!text-[18px]" />
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-[13px] sm:text-sm text-on-surface mb-0.5">{point.title}</h3>
                        <p className="text-on-surface-variant/40 text-[12px] sm:text-[13px] leading-relaxed">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stats bar */}
          <Reveal delay="reveal-delay-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 mt-10 sm:mt-16 border-t border-outline-variant/8 pt-8 sm:pt-10">
              {[
                { value: '100%', label: 'Solids Epoxy' },
                { value: '5-Year', label: 'Written Warranty' },
                { value: '1–2 Day', label: 'Typical Install' },
                { value: '15+', label: 'Cities Served' },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-1">
                  <span className="font-display text-2xl sm:text-4xl font-bold text-primary leading-none">{stat.value}</span>
                  <span className="block text-on-surface-variant/30 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] mt-1.5 sm:mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* SEO detail — small, quiet, below the fold */}
          <Reveal delay="reveal-delay-2">
            <p className="text-on-surface-variant/30 text-[11px] sm:text-xs leading-[1.8] sm:leading-[1.9] mt-8 sm:mt-10 max-w-4xl mx-auto text-center px-2 sm:px-0">
              Our most popular service is the flake epoxy garage floor system — a multi-layer coating that includes diamond grinding surface preparation, high-build epoxy base coat, full-broadcast decorative vinyl flakes, and a clear polyaspartic top coat. We serve homeowners and businesses in Cypress, Houston, The Woodlands, Katy, Spring, Tomball, Sugar Land, Pearland, Friendswood, League City, Humble, Kingwood, Atascocita, Conroe, Richmond, and all surrounding communities. Call <a href={`tel:${config.phoneE164}`} className="text-primary/60 font-bold hover:text-primary hover:underline">{config.phone}</a> for a free estimate.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section className="pt-16 sm:pt-24 pb-20 sm:pb-24 bg-surface relative" id="services">
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-outline-variant/15 to-transparent" />
        {/* Subtle scattered dot texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245,183,49,0.5) 1.5px, transparent 0), radial-gradient(circle at 28px 18px, rgba(245,183,49,0.3) 1px, transparent 0)`, backgroundSize: '56px 56px' }} />
        <div className={`${shell} relative`}>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <SectionLabel>Epoxy Flooring Services in Cypress, TX</SectionLabel>
              <h2 className="font-headline text-2xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight">
                Professional Epoxy Floor Systems for Every Space
              </h2>
              <p className="text-on-surface-variant/50 mt-3 text-[15px] sm:text-base leading-relaxed">
                Whether you need a tough garage floor, a stunning metallic showpiece, or heavy-duty commercial coatings — we have the right system for your project.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {config.services.map((svc, i) => (
              <Reveal key={svc.name} delay={i > 1 ? `reveal-delay-${i - 1}` : ''}>
                <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/8 hover:border-primary/20 transition-all duration-500 h-full flex flex-col relative shadow-[0_2px_12px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.02)_inset] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_20px_rgba(245,183,49,0.04)]">
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img alt={`${svc.name} in Cypress TX`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={svc.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {i === 0 && (
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="bg-primary text-on-primary text-[9px] font-extrabold uppercase tracking-[0.12em] px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-[0_2px_10px_rgba(245,183,49,0.3)]">
                          <Icon name="star" className="text-[10px]" />
                          Most Popular
                        </div>
                      </div>
                    )}
                    {/* Bottom overlay with service type + ideal */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-2">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-white/70 font-bold truncate">{svc.ideal}</span>
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-primary font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
                        <Icon name="verified" className="text-[10px] sm:text-xs" />
                        5-Yr Warranty
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-7 md:p-8 flex flex-col flex-1">
                    <h3 className="font-headline text-lg sm:text-xl md:text-2xl font-extrabold tracking-[-0.01em] mb-1">{svc.name}</h3>
                    <p className="text-primary/80 text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] mb-3 sm:mb-4">{svc.headline}</p>
                    <p className="text-on-surface-variant/55 text-[13px] sm:text-sm leading-relaxed mb-5 sm:mb-6">{svc.desc}</p>

                    {/* Benefits */}
                    <div className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 flex-1">
                      {svc.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2">
                          <Icon name="check_circle" className="text-primary text-[13px] sm:text-[14px] shrink-0 leading-none" />
                          <span className="text-on-surface/70 text-[12px] sm:text-[13px] leading-snug">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a href={`tel:${config.phoneE164}`} className="w-full premium-gradient text-on-primary font-bold py-3 sm:py-3.5 rounded-lg text-[13px] sm:text-sm uppercase tracking-[0.08em] flex items-center justify-center gap-2 mt-auto">
                      <Icon name="call" className="text-sm sm:text-base" />
                      Call for {svc.shortName} Quote
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS + THE APEX DIFFERENCE ══════ */}
      <section className="pt-14 sm:pt-24 pb-16 sm:pb-28 bg-surface-container-lowest relative" id="process">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(245,183,49,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className={`${shell} relative`}>
          {/* ── PROCESS ── */}
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <SectionLabel>Our Process</SectionLabel>
              <h2 className="font-headline text-xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight">
                4 Simple Steps to Your New Floor
              </h2>
              <p className="text-on-surface-variant/50 mt-3 max-w-xl mx-auto text-[13px] sm:text-base leading-relaxed">
                From free estimate to final walkthrough — here&apos;s exactly what to expect when you hire Apex Epoxy in Cypress.
              </p>
            </div>
          </Reveal>

          {/* Steps — horizontal timeline */}
          <Reveal>
            <div className="relative max-w-4xl mx-auto">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-5 left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-0.5 bg-gradient-to-r from-primary/30 via-primary/15 to-primary/30 rounded-full" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-6">
                {config.process.map((s, i) => {
                  const icons = ['request_quote', 'construction', 'format_paint', 'verified'];
                  return (
                    <div key={i} className={`reveal-delay-${i + 1} group text-center`}>
                      {/* Circle with icon */}
                      <div className="relative mx-auto w-10 h-10 sm:w-11 sm:h-11 mb-4 sm:mb-5">
                        <div className="absolute -inset-1 rounded-full bg-primary/10 animate-pulse" style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-0 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_12px_rgba(245,183,49,0.2),0_0_0_3px_rgba(245,183,49,0.08)]">
                          <Icon name={icons[i]} className="text-on-primary !text-[16px] sm:!text-[18px]" />
                        </div>
                      </div>

                      {/* Step label */}
                      <span className="text-primary/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">Step {s.step}</span>

                      {/* Title */}
                      <h3 className="font-headline text-[13px] sm:text-[15px] font-bold tracking-tight text-on-surface mt-1 mb-1.5 sm:mb-2">
                        {s.title}
                      </h3>

                      {/* Description */}
                      <p className="text-on-surface-variant/35 text-[11px] sm:text-[13px] leading-relaxed max-w-[220px] mx-auto">
                        {s.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Spacer between process and comparison */}
          <div className="my-14 sm:my-20" />

          {/* ── COMPARISON ── */}
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <SectionLabel>The Apex Difference</SectionLabel>
              <h2 className="font-headline text-xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight">
                Not All Epoxy Floors Are Created Equal
              </h2>
              <p className="text-on-surface-variant/50 mt-3 max-w-xl mx-auto text-[13px] sm:text-base leading-relaxed">
                See how a professional Apex installation compares to the alternatives homeowners in Cypress are considering.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
              {/* ── APEX COLUMN (featured) ── */}
              <div className="relative rounded-xl sm:rounded-2xl border-2 border-primary/30 bg-gradient-to-b from-primary/[0.06] to-transparent p-5 sm:p-8 order-1 lg:order-2 shadow-[0_4px_24px_rgba(245,183,49,0.06),0_12px_48px_rgba(0,0,0,0.25)]">
                {/* Recommended badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-on-primary text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full whitespace-nowrap shadow-[0_2px_12px_rgba(245,183,49,0.3)]">
                    Recommended
                  </span>
                </div>
                <div className="text-center mb-7 mt-2">
                  <img
                    alt="Apex Epoxy logo mark"
                    src="/logo_mark_transparent.svg"
                    className="mx-auto mb-2 h-10 w-10 object-contain"
                  />
                  <h3 className="font-headline text-lg font-extrabold text-on-surface">Apex Epoxy</h3>
                  <p className="text-primary/60 text-[11px] font-bold tracking-wide uppercase mt-1">Professional Installation</p>
                </div>
                <div className="space-y-0">
                  {[
                    { feature: 'Epoxy Type', value: '100% solids, industrial' },
                    { feature: 'Surface Prep', value: 'Diamond grinding' },
                    { feature: 'Top Coat', value: 'UV-stable polyaspartic' },
                    { feature: 'Warranty', value: '5-year written' },
                    { feature: 'Hot Tire Pickup', value: 'Resistant' },
                    { feature: 'Install Time', value: '1–2 days' },
                    { feature: 'Lifespan', value: '15–20+ years' },
                  ].map((row) => (
                    <div key={row.feature} className="flex items-start justify-between py-3.5 border-b border-primary/10 last:border-0 gap-3">
                      <span className="text-on-surface-variant/60 text-sm leading-snug">{row.feature}</span>
                      <span className="text-on-surface font-bold text-sm leading-snug text-right flex items-center gap-2">
                        <Icon name="check_circle" className="text-primary !text-[16px] shrink-0" />
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <a href={`tel:${config.phoneE164}`} className="w-full mt-6 premium-gradient text-on-primary font-bold text-sm py-3 rounded-lg inline-flex items-center justify-center gap-2">
                  <Icon name="call" className="text-base" />
                  Call for Free Quote
                </a>
              </div>

              {/* ── DIY KITS COLUMN ── */}
              <div className="rounded-xl sm:rounded-2xl border border-outline-variant/10 bg-surface-container/50 p-5 sm:p-8 order-2 lg:order-1 shadow-[0_2px_16px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.02)_inset]">
                <div className="text-center mb-7">
                  <Icon name="hardware" className="text-on-surface-variant/25 !text-[32px] mb-2" />
                  <h3 className="font-headline text-lg font-extrabold text-on-surface-variant/60">DIY Kits</h3>
                  <p className="text-on-surface-variant/30 text-[11px] font-bold tracking-wide uppercase mt-1">Big-Box Store</p>
                </div>
                <div className="space-y-0">
                  {[
                    { feature: 'Epoxy Type', value: '50% solids, water-based' },
                    { feature: 'Surface Prep', value: 'Acid etch (weak bond)' },
                    { feature: 'Top Coat', value: 'None included' },
                    { feature: 'Warranty', value: 'None' },
                    { feature: 'Hot Tire Pickup', value: 'Common issue' },
                    { feature: 'Install Time', value: '3–5 days + cure' },
                    { feature: 'Lifespan', value: '1–3 years' },
                  ].map((row) => (
                    <div key={row.feature} className="flex items-start justify-between py-3.5 border-b border-outline-variant/8 last:border-0 gap-3">
                      <span className="text-on-surface-variant/40 text-sm leading-snug">{row.feature}</span>
                      <span className="text-on-surface-variant/45 text-sm leading-snug text-right flex items-center gap-2">
                        <Icon name="close" className="text-red-400/40 !text-[16px] shrink-0" />
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── HANDYMAN COLUMN ── */}
              <div className="rounded-xl sm:rounded-2xl border border-outline-variant/10 bg-surface-container/50 p-5 sm:p-8 order-3 shadow-[0_2px_16px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.02)_inset]">
                <div className="text-center mb-7">
                  <Icon name="handyman" className="text-on-surface-variant/25 !text-[32px] mb-2" />
                  <h3 className="font-headline text-lg font-extrabold text-on-surface-variant/60">Handyman</h3>
                  <p className="text-on-surface-variant/30 text-[11px] font-bold tracking-wide uppercase mt-1">General Contractor</p>
                </div>
                <div className="space-y-0">
                  {[
                    { feature: 'Epoxy Type', value: 'Varies widely' },
                    { feature: 'Surface Prep', value: 'Often skipped' },
                    { feature: 'Top Coat', value: 'Rarely included' },
                    { feature: 'Warranty', value: 'None or verbal' },
                    { feature: 'Hot Tire Pickup', value: 'Common issue' },
                    { feature: 'Install Time', value: '2–3 days' },
                    { feature: 'Lifespan', value: '3–7 years' },
                  ].map((row) => (
                    <div key={row.feature} className="flex items-start justify-between py-3.5 border-b border-outline-variant/8 last:border-0 gap-3">
                      <span className="text-on-surface-variant/40 text-sm leading-snug">{row.feature}</span>
                      <span className="text-on-surface-variant/45 text-sm leading-snug text-right flex items-center gap-2">
                        <Icon name="close" className="text-red-400/40 !text-[16px] shrink-0" />
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ WHY US ══════ */}

      <section className="py-16 sm:py-24 bg-surface relative" id="why-us">
        {/* Subtle terrazzo speckle texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 8px 12px, rgba(245,183,49,0.4) 1px, transparent 0), radial-gradient(circle at 36px 40px, rgba(245,183,49,0.3) 0.8px, transparent 0), radial-gradient(circle at 22px 28px, rgba(200,191,179,0.3) 0.6px, transparent 0)`, backgroundSize: '52px 52px' }} />
        <div className={`${shell} relative`}>
          <Reveal>
            <div className="text-center mb-10">
              <SectionLabel>Why Choose Apex Epoxy</SectionLabel>
              <h2 className="font-headline text-2xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight">
                Why Homeowners in Cypress<br className="hidden sm:block" /> Trust Apex Epoxy
              </h2>
              <p className="text-on-surface-variant/50 mt-3 max-w-2xl mx-auto text-[15px] sm:text-base leading-relaxed">
                We&apos;re not a franchise. We&apos;re not a handyman service. We&apos;re two guys obsessed with doing this one thing at the highest possible level.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/8 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.2),0_0_0_1px_rgba(245,183,49,0.04)]">
            {config.whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i >= 3 ? 'reveal-delay-2' : ''}>
                <div className="p-5 sm:p-7 bg-surface hover:bg-surface-container/50 transition-all duration-300 group h-full relative">
                  <div className="absolute top-0 left-0 w-0 h-full bg-primary/80 group-hover:w-[2px] transition-all duration-300 rounded-r" />
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/15 transition-colors shadow-[0_0_0_1px_rgba(245,183,49,0.06)]">
                    <Icon name={item.icon} className="text-primary text-base sm:text-lg" />
                  </div>
                  <h3 className="font-headline font-extrabold text-[13px] sm:text-sm mb-1">{item.title}</h3>
                  <p className="text-on-surface-variant/50 text-[11px] sm:text-xs leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════ CTA BANNER — full-bleed image ══════ */}
      <Reveal>
        <section className="relative overflow-hidden immersive-image">
          <div className="absolute inset-0">
            <img alt="Epoxy floor coating Cypress TX" className="w-full h-full object-cover" src={config.ctaImage} />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className={`${shell} relative py-12 sm:py-20`}>
            <div className="text-center max-w-2xl mx-auto px-2 sm:px-0">
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 sm:mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                <Icon name="local_offer" className="text-primary text-xs sm:text-sm" />
                <span className="text-primary text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-bold">Free Estimates — No Obligation</span>
              </div>
              <h2 className="font-headline text-xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight mb-3 text-white">
                Ready to Transform Your Garage Floor?
              </h2>
              <p className="text-white/50 text-[13px] sm:text-base mb-5 sm:mb-6 leading-relaxed">
                Join hundreds of homeowners in Cypress and Houston who upgraded to a professional epoxy floor. We&apos;ll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
                <a href={`tel:${config.phoneE164}`} className="premium-gradient text-on-primary font-extrabold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-[15px] flex items-center justify-center gap-2.5 shadow-none">
                  <Icon name="call" className="text-lg sm:text-xl" />
                  Call {config.phone}
                </a>
                <button onClick={scrollToQuote} className="btn-ghost border-white/20 text-white hover:border-primary hover:text-primary font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-[15px]">
                  Get Free Estimate
                </button>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════ SERVICE AREAS (SEO) ══════ */}
      <section className="py-10 sm:py-20 bg-surface relative" id="service-areas">
        {/* Subtle grid lines texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `linear-gradient(rgba(245,183,49,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,183,49,0.3) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
        <div className={`${shell} max-w-4xl relative`}>
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 sm:gap-12">
              {/* Left — heading + description */}
              <div className="sm:max-w-sm shrink-0">
                <SectionLabel>Service Areas</SectionLabel>
                <h2 className="font-headline text-lg sm:text-2xl font-extrabold tracking-[-0.02em] leading-tight">
                  Greater Houston
                </h2>
                <p className="text-on-surface-variant/40 mt-1.5 sm:mt-2 text-[13px] sm:text-sm leading-relaxed">
                  Based in Cypress, TX — serving homeowners and businesses across the metro.
                </p>
                <a href={`tel:${config.phoneE164}`} className="inline-flex items-center gap-2 text-primary text-[13px] sm:text-sm font-bold mt-3 sm:mt-4 hover:underline">
                  <Icon name="call" className="!text-[15px] sm:!text-[16px]" />
                  {config.phone}
                </a>
              </div>

              {/* Right — area list */}
              <div className="columns-2 sm:columns-3 gap-x-6 sm:gap-x-8 gap-y-0">
                {config.coverageAreas.map((area) => (
                  <p key={area} className="text-on-surface-variant/55 text-[13px] sm:text-sm py-1.5 border-b border-outline-variant/6 break-inside-avoid">
                    {area}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="py-12 sm:py-24 bg-surface-container-lowest relative" id="faq">
        {/* Subtle flowing curve texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(ellipse 120px 80px at 30% 50%, rgba(245,183,49,0.15), transparent), radial-gradient(ellipse 100px 60px at 70% 30%, rgba(245,183,49,0.1), transparent)`, backgroundSize: '300px 250px' }} />
        <div className={`${shell} relative`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="lg:sticky lg:top-24">
                  <SectionLabel>FAQ</SectionLabel>
                  <h2 className="font-headline text-lg sm:text-2xl font-extrabold tracking-[-0.02em] leading-tight mb-2 sm:mb-3">
                    Epoxy Flooring Questions from Cypress Homeowners
                  </h2>
                  <p className="text-on-surface-variant/45 text-[13px] sm:text-sm leading-relaxed">
                    Can&apos;t find your answer? Call us at{' '}
                    <a href={`tel:${config.phoneE164}`} className="text-primary font-bold hover:underline">{config.phone}</a>
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-0">
                {config.faqs.map((faq, i) => (
                  <Reveal key={i}>
                    <div className={`border-b border-outline-variant/8 transition-colors duration-200 ${openFaq === i ? 'bg-surface-container/30' : 'hover:bg-surface-container/20'} rounded-lg -mx-3 px-3`}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between py-3.5 sm:py-4 text-left group"
                      >
                        <span className={`font-headline font-bold text-[13px] sm:text-sm pr-3 sm:pr-4 transition-colors ${openFaq === i ? 'text-primary' : 'group-hover:text-primary'}`}>{faq.q}</span>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${openFaq === i ? 'bg-primary/15' : 'bg-outline-variant/8'}`}>
                          <Icon name={openFaq === i ? 'remove' : 'add'} className="text-primary !text-[14px]" />
                        </div>
                      </button>
                      {openFaq === i && (
                        <div className="pb-4 sm:pb-5 text-on-surface-variant/55 text-[13px] sm:text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ LEAD CAPTURE FORM ══════ */}
      <section className="py-12 sm:py-24 bg-surface" id="quote">
        <div className={shell}>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3),0_24px_64px_rgba(0,0,0,0.25),0_0_0_1px_rgba(245,183,49,0.06)] border border-outline-variant/8">
              <div className="bg-surface-container-high p-5 sm:p-8 lg:p-10 relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 lg:hidden" />
                <SectionLabel>Free Estimate</SectionLabel>
                <h2 className="font-headline text-xl sm:text-2xl font-extrabold tracking-[-0.02em] leading-tight mb-2">
                  Get Your Free Epoxy Floor Quote
                </h2>
                <p className="text-on-surface-variant/50 text-sm leading-relaxed mb-6">
                  Tell us about your project and we&apos;ll get back to you within 24 hours with a custom estimate.
                </p>

                {formStatus === 'success' ? (
                  <div className="p-8 bg-primary/[0.07] border border-primary/20 rounded-xl text-center">
                    <Icon name="check_circle" className="text-primary text-5xl mb-4 block mx-auto" />
                    <h3 className="font-headline text-xl font-bold mb-2">We Got Your Request!</h3>
                    <p className="text-on-surface-variant/60 text-sm">Beau or Haden will personally reach out to you shortly. Keep your phone nearby — or call us directly at <a href={`tel:${config.phoneE164}`} className="text-primary font-bold">{config.phone}</a></p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                    <input type="hidden" name="_ts" value={formTimestamp} />
                    <input type="hidden" name="page" value={pageUrl} />
                    <input type="hidden" name="site" value="apexepoxytx.com" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.16em] mb-1.5">Full Name *</label>
                        <input name="name" type="text" required placeholder="John Smith" className="apex-input" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.16em] mb-1.5">Phone Number *</label>
                        <input name="phone" type="tel" required placeholder="(281) 555-0123" value={phoneValue} onChange={(e) => setPhoneValue(formatPhone(e.target.value))} className="apex-input" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.16em] mb-1.5">Email *</label>
                      <input name="email" type="email" required placeholder="john@email.com" className="apex-input" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.16em] mb-1.5">Street Address *</label>
                        <input name="address" type="text" required placeholder="123 Main St, Cypress, TX" className="apex-input" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.16em] mb-1.5">Zip Code *</label>
                        <input name="zipCode" type="text" required placeholder="77429" maxLength={5} className="apex-input" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.16em] mb-1.5">Type of Project *</label>
                      <select name="service" required className="apex-select">
                        <option value="">What do you need?</option>
                        <option value="Residential - Garage Floor">Residential - Garage Floor</option>
                        <option value="Residential - Patio / Outdoor">Residential - Patio / Outdoor</option>
                        <option value="Residential - Interior / Other">Residential - Interior / Other</option>
                        <option value="Commercial / Industrial">Commercial / Industrial</option>
                      </select>
                    </div>

                    {/* SMS consent checkbox */}
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input type="checkbox" name="sms_consent" className="mt-1 accent-[#F5B731] w-3.5 h-3.5 shrink-0" />
                      <span className="text-[10px] sm:text-[11px] leading-[1.6] text-on-surface-variant/35">
                        By checking this box, you agree to receive text messages from Apex Epoxy &amp; Surface Systems. You can reply STOP to opt-out or HELP for help. Message and data rates may apply. See our{' '}
                        <a href="https://quicklaunchweb.us/terms" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="https://quicklaunchweb.us/privacy" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary underline">Privacy Policy</a>.
                      </span>
                    </label>

                    {formStatus === 'error' && formError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{formError}</div>
                    )}

                    <button type="submit" disabled={formStatus === 'sending'}
                      className="w-full premium-gradient text-on-primary font-black py-3.5 rounded-lg text-sm uppercase tracking-[0.08em] disabled:opacity-50 shadow-none">
                      {formStatus === 'sending' ? 'Sending...' : 'Get My Free Estimate'}
                    </button>
                    <p className="text-xs text-on-surface-variant/35 text-center">
                      Or call us directly: <a href={`tel:${config.phoneE164}`} className="text-primary font-bold hover:underline">{config.phone}</a>
                    </p>
                  </form>
                )}
              </div>

              <div className="relative hidden lg:block overflow-hidden">
                <img alt="Epoxy flooring project in progress Cypress TX" className="absolute inset-0 w-full h-full object-cover" src={config.contactImage} />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-8 left-8 right-8 p-5 bg-surface/90 backdrop-blur-sm rounded-xl border border-primary/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/15 shadow-[0_0_12px_rgba(245,183,49,0.08)]">
                      <Icon name="engineering" className="text-primary text-xl" />
                    </div>
                    <div>
                      <h4 className="font-headline font-extrabold text-[15px]">{config.founders}</h4>
                      <p className="text-xs text-on-surface-variant/50">{config.foundersTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-surface-container-low border-t border-outline-variant/10">
        <div className={`${shell} pt-12 sm:pt-16 pb-10 sm:pb-14`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Left column — logo + description + contact */}
            <div className="lg:col-span-5 space-y-5">
              <a href="#top" className="inline-block">
                <img
                  alt="Apex Epoxy & Surface Systems"
                  src="/logo_full_transparent.svg"
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              </a>
              <p className="text-on-surface-variant/35 text-[13px] sm:text-sm max-w-sm leading-relaxed">
                Professional epoxy flooring in Cypress &amp; Greater Houston. Owner-operated, warranty-backed, built to last.
              </p>
              <div className="h-px w-12 bg-primary/20" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                <a href={`tel:${config.phoneE164}`} className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                  <Icon name="call" className="text-primary !text-[15px]" /> {config.phone}
                </a>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant/35">
                  <Icon name="schedule" className="text-primary !text-[15px] shrink-0" /> {config.hours}
                </div>
                <a href={`mailto:${config.email}`} className="flex items-center gap-2 text-sm text-on-surface-variant/35 hover:text-primary transition-colors sm:col-span-2">
                  <Icon name="mail" className="text-primary !text-[15px] shrink-0" /> {config.email}
                </a>
              </div>
            </div>

            {/* Middle column — Services */}
            <div className="lg:col-span-3 lg:pl-8">
              <h4 className="text-[10px] font-extrabold text-primary uppercase tracking-[0.25em] mb-4">Services</h4>
              <ul className="space-y-2.5">
                <li><a href="#services" className="text-sm text-on-surface-variant/40 hover:text-on-surface transition-colors">Flake Epoxy Floors</a></li>
                <li><a href="#services" className="text-sm text-on-surface-variant/40 hover:text-on-surface transition-colors">Commercial &amp; Warehouse</a></li>
                <li><a href="#services" className="text-sm text-on-surface-variant/40 hover:text-on-surface transition-colors">Patio &amp; Outdoor</a></li>
                <li><a href="#services" className="text-sm text-on-surface-variant/40 hover:text-on-surface transition-colors">Metallic Epoxy</a></li>
              </ul>
            </div>

            {/* Right column — Areas + CTA */}
            <div className="lg:col-span-4 lg:pl-4">
              <h4 className="text-[10px] font-extrabold text-primary uppercase tracking-[0.25em] mb-4">Service Areas</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-6">
                {['Cypress', 'Houston', 'Katy', 'The Woodlands', 'Spring', 'Tomball', 'Sugar Land'].map((area) => (
                  <span key={area} className="text-sm text-on-surface-variant/40">{area}, TX</span>
                ))}
              </div>
              <a href={`tel:${config.phoneE164}`} className="w-full sm:w-auto premium-gradient text-on-primary font-bold px-8 py-3 rounded-lg text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-2">
                <Icon name="call" className="!text-[14px]" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        <div className={`${shell} py-5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-outline-variant/8`}>
          <p className="text-[10px] text-on-surface-variant/25 uppercase tracking-[0.12em] font-semibold">
            &copy; {new Date().getFullYear()} Apex Epoxy &amp; Surface Systems
          </p>
          <p className="text-[10px] text-on-surface-variant/20 tracking-[0.12em]">
            Website by <a href="https://quicklaunchweb.us" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant/35 hover:text-primary transition-colors uppercase font-semibold">QuickLaunchWeb</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
