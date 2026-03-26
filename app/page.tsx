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
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi0HEAZlnEGM4pZAlGrdlhuCghSrZd-KOwtVBK603LRneiGNKbACX3wuXDPDpyNTfd__y0V4hQKGsHHnV5tsDN1C8HyS8qWchp0k7gf-bOeD1z0-NWOWnHIEiAm0MTUyfTuJDPeDvTITyw8meChWfO75XbQznfgLNDFrABFb59YvjtfG4Da5yuBvNbmlmFh7YeP3ZHXVPiFVseCIVl0ZZEvkigdC37GbccVXEKIOTrNXqIMUNrAdDIyRzeGrRuYD3v3yb8oCVH0y7l',
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
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIoTUSLogKFLgNNg2cKcmeG50u1DF5JWSlG272cWC8waI4VKIQDhYZ-9Dygm1WmJGwBU-9fZRfspuLBlNPznoH4ZP0znPQwzxv5vo06obF_ys_fNtP1vGhHrBoR8JwCy5gmrGwR1ILlICMAbEsuVewG_XoIumejLx989892I3XzDDko3lzdyBWdpxf6x0ZvW0XKJrsubVW1CRDY3YKSsBbA8xGCjkRbNuZT7e2kmMTJC6P6HikdN6LGQ_YS3fe109gN_cNZvvTmwJ7',
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
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOTCz51YzPcpqWEo7lL8Nei1sC4IL8qe08LuphFuC5xEateR5JojmVTsVBIoj3s4gLMBDYJZyR3H9A1RNuUPHRe6yKOh5aIg1h18Y6-1jfyaT6wMrsBWo_aFyTq5Z-KNsizwDJqvF5CsgeSLq8Gyn9AjK3MZM14y9RenxCx9VoLShVwqEEy6U56yCUCHgn5aY0mJXYwK_2zR6mMb0zHh3hU2sMwgJU3gnn4_4zD8rvKV9pQGz-QOZ44qiOKAotJ0Jlmj-LBCcwggJ2',
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
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkQCSNgyidmxI5t0DOU_yUFdUlTA7ykXsIIPBz6Y8MhRy2YmAtLuNBedWcF6I5LWlHve7w4V2yzsOfudPCIBsOB98naoKoMKGgAJkUIdQQ3NModio_ymka0Ym6aI_WhaEl2U3kqhvF8IET-IhNmjsnEoP_ha5OJvP_Vnl1fVm9gP7FcWj1Ffm4Ltmn5JE6ST4Oj4y-2VKgY-hJon2UwZ-qDN5j1VW0XXO2RNqYHmAR4OnSFgfPvU8AANrImrrZzSMs0qL4jy3tS1-r',
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

  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN8zprQeGXmlQEAdl5NUsepHPSURpzLJwTJK5y0HV6BBYGCE5uThvDZSRNXT-rhVeNKDHLKd9nzmHAenkU_hkutjb_GFwkg4BhRMk_Zfrf4MTjotzwMOGo8Xr3dIlRaB6Dj4HRWbz_hDyqlhytLLjLY9xYE_8RUSvZwW7JmhpnpNXg3CbF99jcu5C6RbuG2rrBGX3xgJ3lBHe7nA6-dqogXg6UH8DXYulgPStw2eEKhFCQItWCcwhU0jdJd3h4AHfAUp_G21UteAXf',
  contactImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFV-y28mzrBnYB7DAsjiyCqEaQGm_JwarDE8looHR4ysTj9Ancj5Zz8pthgNvANxsrhuOY1ir9asqFLKzGgcorDRZ5N9WPqewEibdtLFDFWvnHc14h3ki6LyhsYUsYOwDTe5t_lxcGz3BuFWRTQDoGmr-BXUj_Wp6VeTu7xy6As5E9Kyzn_vfLCQZdtS83hpB4p4ITKQHs-yXRwX3yaMi--5NwwWOabRVkZlhVY4uukHrONyMr233k860zM1cMrlT9et4yfm11F16S',
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
    const address = String(formData.get('address') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const honeypot = String(formData.get('website') || '').trim();
    if (honeypot) { form.reset(); setPhoneValue(''); setFormStatus('success'); return; }
    if (!name || !phone || !address || !service) {
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
        className="fixed top-0 w-full z-[60] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          maxHeight: announcementVisible ? '32px' : '0px',
          opacity: announcementVisible ? 1 : 0,
        }}
      >
        <div className="border-b border-white/[0.06]" style={{ background: 'rgba(12, 12, 13, 0.5)', backdropFilter: 'blur(24px) saturate(1.4)', WebkitBackdropFilter: 'blur(24px) saturate(1.4)' }}>
          <div className={`${shell} flex items-center justify-center gap-6 py-1.5`}>
            <div className="flex items-center gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-bold text-white/50">
              <span className="flex items-center gap-1.5">
                <Icon name="verified" className="text-primary/70 text-[10px]" />
                5-Year Warranty
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-white/20">|</span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Icon name="groups" className="text-primary/70 text-[10px]" />
                Owner-Operated
              </span>
              <span className="hidden md:flex items-center gap-1.5 text-white/20">|</span>
              <span className="hidden md:flex items-center gap-1.5">
                <Icon name="shield" className="text-primary/70 text-[10px]" />
                Fully Insured
              </span>
              <span className="hidden lg:flex items-center gap-1.5 text-white/20">|</span>
              <span className="hidden lg:flex items-center gap-1.5">
                <Icon name="star" className="text-primary/70 text-[10px]" />
                100% Solids Epoxy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ NAVIGATION ══════ */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'glass-nav-scrolled' : ''}`}
        style={{
          top: announcementVisible ? '32px' : '0px',
          background: scrolled ? 'rgba(12, 12, 13, 0.96)' : 'rgba(12, 12, 13, 0.5)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          borderBottom: scrolled ? '1px solid rgba(222, 195, 144, 0.1)' : '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: scrolled ? '0 1px 0 rgba(222, 195, 144, 0.06), 0 8px 32px rgba(0, 0, 0, 0.4)' : 'none',
        }}
      >
        <div className={`${shell} flex justify-between items-center transition-all duration-500 ${scrolled ? 'py-2' : 'py-3'}`}>
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className={`bg-primary rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(222,195,144,0.2)] transition-all duration-500 ${scrolled ? 'w-8 h-8' : 'w-9 h-9'}`}>
              <Icon name="architecture" className={`text-on-primary transition-all duration-500 ${scrolled ? 'text-base' : 'text-lg'}`} />
            </div>
            <div className="hidden sm:block">
              <div className="font-headline text-[13px] font-extrabold tracking-[0.02em] uppercase leading-none">
                Apex Epoxy
              </div>
              <div className={`font-headline text-[9px] font-bold tracking-[0.15em] uppercase text-primary/70 leading-none mt-0.5 transition-all duration-500 overflow-hidden ${scrolled ? 'max-h-0 opacity-0' : 'max-h-4 opacity-100'}`}>
                Surface Systems
              </div>
            </div>
            <div className="sm:hidden font-headline text-sm font-bold tracking-[0.03em] uppercase">
              Apex <span className="text-primary">Epoxy</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-surface/50 hover:text-primary transition-colors duration-200">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={`tel:${config.phoneE164}`} className={`font-extrabold px-5 py-2 rounded-lg text-[11px] uppercase tracking-[0.06em] flex items-center gap-2 transition-all duration-300 ${scrolled ? 'premium-gradient text-on-primary' : 'border border-white/20 text-white/80 hover:border-primary hover:text-primary'}`}>
              <Icon name="call" className="text-sm" />
              <span className="hidden sm:inline">Call Now</span>
            </a>
            <button className="lg:hidden text-on-surface/70 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} className="text-2xl" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-container/95 backdrop-blur-xl px-5 py-6 space-y-4 border-t border-outline-variant/10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold uppercase tracking-[0.12em] text-on-surface/60 hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
            <button onClick={scrollToQuote} className="w-full premium-gradient text-on-primary font-bold py-3 rounded-lg text-xs uppercase tracking-[0.1em] mt-2">
              Get Free Estimate
            </button>
          </div>
        )}
      </nav>

      {/* ══════ HERO — full-bleed immersive ══════ */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Epoxy floor coating installation in Cypress TX" className="w-full h-full object-cover" src={config.heroImage} />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/20" />
        </div>

        <motion.div className={`${shell} relative z-10 w-full py-32`}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 border border-white/20 bg-white/5 px-4 py-2 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-primary text-[10px] uppercase tracking-[0.2em] font-bold">
                {config.warranty}
              </span>
            </div>

            <h1 className="font-headline text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] mb-6 text-white">
              WHERE FLOORS<br />BECOME <span className="text-primary">SURFACES.</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Professional epoxy floor coatings for garages, patios, and commercial spaces in Cypress &amp; Greater Houston, TX.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={scrollToQuote} className="btn-ghost border-white/30 text-white hover:border-primary hover:text-primary font-bold px-10 py-4 rounded-lg text-[15px] uppercase tracking-[0.08em]">
                Get Free Estimate
              </button>
              <a href={`tel:${config.phoneE164}`} className="text-white/60 font-bold px-8 py-4 text-[15px] flex items-center justify-center gap-2.5 hover:text-primary transition-colors">
                <Icon name="call" className="text-xl" />
                {config.phone}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom trust strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10">
          <div className={`${shell} flex flex-wrap justify-between items-center py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-white/40`}>
            <span className="hidden sm:block">Cypress, TX</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 w-full sm:w-auto">
              <span>Certified Installers</span>
              <span>Fully Insured</span>
              <span>Professional Equipment</span>
            </div>
            <span className="hidden sm:block">{config.phone}</span>
          </div>
        </div>
      </section>

      {/* ══════ STATS BAR — connected to hero ══════ */}
      <Reveal>
        <section className="relative z-10 -mt-px bg-surface-container-lowest border-y border-outline-variant/8">
          <div className={`${shell} grid grid-cols-2 lg:grid-cols-4`}>
            {[
              { value: '1–2', unit: 'Day Install', desc: 'Most residential floors' },
              { value: '5', unit: 'Year Warranty', desc: 'Written & backed' },
              { value: '100%', unit: 'Solids Epoxy', desc: 'Industrial-grade only' },
              { value: '0', unit: 'Subcontractors', desc: 'Owners on every job' },
            ].map((stat, i) => (
              <div key={stat.desc} className={`py-8 sm:py-10 text-center ${i < 3 ? 'border-r border-outline-variant/8' : ''}`}>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="font-headline text-3xl sm:text-4xl font-extrabold text-primary">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-[0.12em] font-bold text-on-surface-variant/40">{stat.unit}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant/35 mt-1.5 font-medium">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ══════ SERVICES ══════ */}
      <section className="pt-16 sm:pt-20 pb-20 sm:pb-24" id="services">
        <div className={shell}>
          <Reveal>
            <div className="max-w-2xl mb-12">
              <SectionLabel>Epoxy Flooring Services in Cypress, TX</SectionLabel>
              <h2 className="font-headline text-2xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight">
                Professional Epoxy Floor Systems for Every Space
              </h2>
              <p className="text-on-surface-variant/50 mt-3 text-[15px] sm:text-base leading-relaxed">
                Whether you need a tough garage floor, a stunning metallic showpiece, or heavy-duty commercial coatings — we have the right system for your project.
              </p>
            </div>
          </Reveal>

          {/* Featured service — full-width horizontal card */}
          <Reveal>
            <div className="service-card group relative overflow-hidden rounded-2xl cursor-pointer mb-5" onClick={scrollToQuote}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden">
                  <img alt={`${config.services[0].name} in Cypress TX`} className="w-full h-full object-cover" src={config.services[0].image} />
                  <div className="absolute inset-0 bg-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-surface" />
                  <div className="absolute top-5 left-5">
                    <div className="bg-primary text-on-primary text-[9px] font-extrabold uppercase tracking-[0.12em] px-3 py-1.5 rounded-md">
                      Most Popular
                    </div>
                  </div>
                </div>
                <div className="card-content bg-surface p-7 sm:p-10 flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary/80 font-bold">{config.services[0].ideal}</span>
                  <h3 className="font-headline text-2xl sm:text-3xl font-extrabold mt-2 mb-3 tracking-[-0.01em]">{config.services[0].name}</h3>
                  <p className="text-on-surface-variant/55 text-[15px] leading-relaxed mb-6">{config.services[0].desc}</p>
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.12em]">
                    <span>Get a Quote</span>
                    <Icon name="arrow_forward" className="text-sm group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3 remaining services */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {config.services.slice(1).map((svc, i) => (
              <Reveal key={svc.name} delay={i > 0 ? `reveal-delay-${i}` : ''}>
                <div className="service-card group relative aspect-[4/5] sm:aspect-[4/5] overflow-hidden rounded-xl cursor-pointer" onClick={scrollToQuote}>
                  <img alt={`${svc.name} in Cypress TX`} className="w-full h-full object-cover opacity-60" src={svc.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="card-content absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-bold">{svc.ideal}</span>
                    <h3 className="font-headline text-xl sm:text-2xl font-extrabold mt-1.5 mb-2 tracking-[-0.01em] text-white">{svc.name}</h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{svc.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Get a Quote</span>
                      <Icon name="arrow_forward" className="text-sm" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FLAKE EPOXY SPOTLIGHT — full-bleed two-section ══════ */}
      <section id="flake-epoxy" className="relative bg-surface-container-lowest">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] lg:min-h-[560px]">
          {/* Full-bleed image — left half */}
          <Reveal className="relative immersive-image">
            <div className="relative h-full min-h-[340px] lg:min-h-full overflow-hidden">
              <img
                alt="Flake epoxy garage floor coating installed in Cypress TX home"
                className="w-full h-full object-cover absolute inset-0"
                src={config.services[0].image}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/20 lg:to-surface-container-lowest" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2.5">
                <div className="bg-primary text-on-primary text-[9px] font-extrabold uppercase tracking-[0.12em] px-3 py-1.5 rounded-md">
                  Most Popular
                </div>
                <div className="bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-md">
                  1-2 Day Install
                </div>
              </div>
            </div>
          </Reveal>

          {/* Content — right half */}
          <div className="flex items-center">
            <Reveal>
              <div className="px-7 sm:px-10 lg:px-14 py-12 lg:py-16 max-w-xl">
                <SectionLabel>Featured Service</SectionLabel>
                <h2 className="font-headline text-xl sm:text-[1.85rem] font-extrabold tracking-[-0.02em] leading-tight mb-4">
                  Why Flake Epoxy is the #1 Garage Floor System in Cypress
                </h2>
                <p className="text-on-surface-variant/60 text-[15px] leading-relaxed mb-6">
                  Flake epoxy is the gold standard for residential garage floors. Decorative flakes are broadcast into a thick epoxy base, then sealed with a UV-stable polyaspartic top coat for a surface that&apos;s beautiful, incredibly durable, and easy to maintain.
                </p>

                <div className="space-y-2.5 mb-6">
                  {config.services[0].benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon name="check" className="text-primary text-xs" />
                      </div>
                      <span className="text-on-surface/80 text-sm leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>

                <a href={`tel:${config.phoneE164}`} className="inline-flex premium-gradient text-on-primary font-extrabold px-7 py-3.5 rounded-lg text-sm items-center gap-2">
                  <Icon name="call" className="text-base" />
                  Get a Free Flake Epoxy Quote
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="py-16 sm:py-24 bg-surface" id="process">
        <div className={shell}>
          <Reveal>
            <div className="text-center mb-10">
              <SectionLabel>Our Process</SectionLabel>
              <h2 className="font-headline text-2xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight">
                4 Simple Steps to Your New Floor
              </h2>
              <p className="text-on-surface-variant/50 mt-3 max-w-xl mx-auto text-[15px] sm:text-base leading-relaxed">
                From free estimate to final walkthrough — here&apos;s exactly what to expect when you hire Apex Epoxy in Cypress.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {config.process.map((step, i) => (
              <Reveal key={step.step} delay={`reveal-delay-${i + 1}`}>
                <div className="relative bg-surface-container rounded-xl p-6 border border-outline-variant/8 hover:border-primary/20 transition-all duration-300 group h-full overflow-hidden">
                  <div className="process-number absolute -top-2 -right-1 select-none">{step.step}</div>
                  <div className="relative z-10">
                    <span className="inline-block text-[10px] uppercase tracking-[0.18em] text-primary font-bold mb-3">Step {step.step}</span>
                    <h3 className="font-headline text-base font-bold mb-2">{step.title}</h3>
                    <p className="text-on-surface-variant/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FULL-BLEED IMAGE BREAK ══════ */}
      <Reveal>
        <section className="relative h-[40vh] sm:h-[50vh] immersive-image overflow-hidden">
          <img alt="Professional epoxy flooring equipment Cypress TX" className="w-full h-full object-cover" src={config.services[1].image} />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h2 className="font-headline text-2xl sm:text-[2.5rem] font-extrabold tracking-[-0.02em] text-white leading-tight mb-3">
                THE APEX EPOXY<br /><span className="text-primary">EXPERIENCE</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto">
                Professional craftsmanship meets industrial-grade materials. Every floor tells a story.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════ THE APEX DIFFERENCE ══════ */}
      <section className="py-16 sm:py-24 bg-surface-container-lowest">
        <div className={shell}>
          <Reveal>
            <div className="text-center mb-10">
              <SectionLabel>The Apex Difference</SectionLabel>
              <h2 className="font-headline text-2xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight">
                Not All Epoxy Floors Are Created Equal
              </h2>
              <p className="text-on-surface-variant/50 mt-3 max-w-xl mx-auto text-[15px] sm:text-base leading-relaxed">
                See how a professional Apex installation compares to the alternatives homeowners in Cypress are considering.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto -mx-5 sm:mx-0">
              <table className="w-full min-w-[600px] sm:min-w-0 text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/10">
                    <th className="text-left px-3 py-3 pb-4"></th>
                    <th className="px-3 py-3 pb-4 text-center">
                      <div className="bg-primary/[0.08] border border-primary/20 rounded-lg px-4 py-2 inline-block">
                        <span className="font-headline font-extrabold text-primary text-xs">Apex Epoxy</span>
                      </div>
                    </th>
                    <th className="px-3 py-3 pb-4 text-center text-on-surface-variant/40 font-bold text-[10px] uppercase tracking-[0.12em]">DIY Kits</th>
                    <th className="px-3 py-3 pb-4 text-center text-on-surface-variant/40 font-bold text-[10px] uppercase tracking-[0.12em]">Handyman</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Epoxy Type', apex: '100% solids, industrial', diy: '50% solids, water-based', handyman: 'Varies widely' },
                    { feature: 'Surface Prep', apex: 'Diamond grinding', diy: 'Acid etch (weak bond)', handyman: 'Often skipped' },
                    { feature: 'Top Coat', apex: 'UV-stable polyaspartic', diy: 'None included', handyman: 'Rarely included' },
                    { feature: 'Warranty', apex: '5-year written', diy: 'None', handyman: 'None or verbal' },
                    { feature: 'Hot Tire Pickup', apex: 'Resistant', diy: 'Common issue', handyman: 'Common issue' },
                    { feature: 'Install Time', apex: '1–2 days', diy: '3–5 days + cure', handyman: '2–3 days' },
                    { feature: 'Lifespan', apex: '15–20+ years', diy: '1–3 years', handyman: '3–7 years' },
                  ].map((row, i) => (
                    <tr key={row.feature} className="border-b border-outline-variant/5">
                      <td className="px-3 py-3.5 font-headline font-bold text-xs text-on-surface/70">{row.feature}</td>
                      <td className="px-3 py-3.5 text-center text-primary font-semibold text-xs">{row.apex}</td>
                      <td className="px-3 py-3.5 text-center text-on-surface-variant/35 text-xs">{row.diy}</td>
                      <td className="px-3 py-3.5 text-center text-on-surface-variant/35 text-xs">{row.handyman}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ WHY US ══════ */}
      <section className="py-16 sm:py-24 bg-surface" id="why-us">
        <div className={shell}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/8 rounded-2xl overflow-hidden">
            {config.whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i >= 3 ? 'reveal-delay-2' : ''}>
                <div className="p-6 sm:p-7 bg-surface hover:bg-surface-container/50 transition-colors duration-300 group h-full">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon name={item.icon} className="text-primary text-lg" />
                  </div>
                  <h3 className="font-headline font-extrabold text-sm mb-1.5">{item.title}</h3>
                  <p className="text-on-surface-variant/50 text-xs leading-relaxed">{item.desc}</p>
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
            <img alt="Epoxy floor coating Cypress TX" className="w-full h-full object-cover" src={config.services[3].image} />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className={`${shell} relative py-16 sm:py-20`}>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3.5 py-1.5 rounded-full mb-5">
                <Icon name="local_offer" className="text-primary text-sm" />
                <span className="text-primary text-[10px] uppercase tracking-[0.18em] font-bold">Free Estimates — No Obligation</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-tight mb-3 text-white">
                Ready to Transform Your Garage Floor?
              </h2>
              <p className="text-white/50 text-sm sm:text-base mb-6 leading-relaxed">
                Join hundreds of homeowners in Cypress and Houston who upgraded to a professional epoxy floor. We&apos;ll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a href={`tel:${config.phoneE164}`} className="premium-gradient text-on-primary font-extrabold px-8 py-3.5 rounded-lg text-[15px] flex items-center justify-center gap-2.5 shadow-none">
                  <Icon name="call" className="text-xl" />
                  Call {config.phone}
                </a>
                <button onClick={scrollToQuote} className="btn-ghost border-white/20 text-white hover:border-primary hover:text-primary font-bold px-8 py-3.5 rounded-lg text-[15px]">
                  Get Free Estimate
                </button>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════ FAQ ══════ */}
      <section className="py-16 sm:py-24 bg-surface-container-lowest" id="faq">
        <div className={shell}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="lg:sticky lg:top-24">
                  <SectionLabel>FAQ</SectionLabel>
                  <h2 className="font-headline text-xl sm:text-2xl font-extrabold tracking-[-0.02em] leading-tight mb-3">
                    Epoxy Flooring Questions from Cypress Homeowners
                  </h2>
                  <p className="text-on-surface-variant/45 text-sm leading-relaxed">
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
                    <div className="border-b border-outline-variant/8">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between py-4 text-left group"
                      >
                        <span className="font-headline font-bold text-sm pr-4 group-hover:text-primary transition-colors">{faq.q}</span>
                        <Icon name={openFaq === i ? 'remove' : 'add'} className="text-primary text-lg shrink-0" />
                      </button>
                      {openFaq === i && (
                        <div className="pb-5 text-on-surface-variant/55 text-sm leading-relaxed">
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
      <section className="py-16 sm:py-24 bg-surface" id="quote">
        <div className={shell}>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.4)] border border-outline-variant/8">
              <div className="bg-surface-container-high p-7 sm:p-8 lg:p-10">
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
                    <p className="text-on-surface-variant/60 text-sm">We&apos;ll call you within 24 hours. Need it sooner? Call us at <a href={`tel:${config.phoneE164}`} className="text-primary font-bold">{config.phone}</a></p>
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
                      <label className="block text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.16em] mb-1.5">Email</label>
                      <input name="email" type="email" placeholder="john@email.com" className="apex-input" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.16em] mb-1.5">Street Address *</label>
                        <input name="address" type="text" required placeholder="123 Main St, Cypress, TX" className="apex-input" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.16em] mb-1.5">Zip Code</label>
                        <input name="zipCode" type="text" placeholder="77429" maxLength={5} className="apex-input" />
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
                <div className="absolute bottom-8 left-8 right-8 p-5 bg-surface/90 backdrop-blur-sm rounded-xl border border-primary/15">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/15">
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

      {/* ══════ SERVICE AREAS (SEO) ══════ */}
      <section className="py-12 sm:py-16 bg-surface-container-lowest" id="service-areas">
        <div className={shell}>
          <Reveal>
            <div className="text-center mb-8">
              <SectionLabel>Service Areas</SectionLabel>
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold tracking-[-0.02em] leading-tight">
                Epoxy Floor Coatings Near You in Greater Houston
              </h2>
              <p className="text-on-surface-variant/40 mt-2 text-sm max-w-2xl mx-auto leading-relaxed">
                Based in Cypress, TX — we proudly serve homeowners and businesses throughout the Greater Houston metro area.
              </p>
            </div>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
              {config.coverageAreas.map((area) => (
                <span key={area} className="px-3.5 py-1.5 bg-surface-container rounded-lg text-sm font-medium text-on-surface-variant/50 border border-outline-variant/8 hover:border-primary/20 hover:text-primary transition-colors cursor-default">
                  {area}, TX
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ SEO CONTENT BLOCK ══════ */}
      <section className="py-12 sm:py-16 bg-surface">
        <div className={`${shell} max-w-4xl`}>
          <Reveal>
            <div>
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold tracking-[-0.02em] mb-4">
                About Apex Epoxy &amp; Surface Systems — Cypress, TX
              </h2>
              <p className="text-on-surface-variant/50 text-sm leading-[1.8] mb-3">
                Apex Epoxy &amp; Surface Systems is a locally owned and operated epoxy flooring company based in Cypress, Texas. Founded by Beau Scalise and Haden Mcdade, we specialize in residential garage floor coatings, commercial warehouse floors, patio and outdoor coatings, and high-end metallic epoxy finishes throughout the Greater Houston area.
              </p>
              <p className="text-on-surface-variant/50 text-sm leading-[1.8] mb-3">
                Unlike large franchises or handyman services, our owners are on every single job site. We use only industrial-grade, 100% solids epoxy systems paired with UV-stable polyaspartic top coats — the same materials used in commercial and industrial applications. Every floor we install comes with our written 5-year warranty covering peeling, delamination, and hot-tire pickup.
              </p>
              <p className="text-on-surface-variant/50 text-sm leading-[1.8] mb-3">
                Our most popular service is our <strong className="text-on-surface/70">flake epoxy garage floor system</strong> — a multi-layer coating system that includes diamond grinding surface preparation, high-build epoxy base coat, full-broadcast decorative vinyl flakes, and a clear polyaspartic top coat. The result is a garage floor that&apos;s beautiful, incredibly durable, chemical-resistant, and easy to clean. Most garage floors are completed in just 1-2 days.
              </p>
              <p className="text-on-surface-variant/50 text-sm leading-[1.8]">
                We serve homeowners and businesses in Cypress, Houston, The Woodlands, Katy, Spring, Tomball, Sugar Land, Pearland, Friendswood, League City, Humble, Kingwood, Atascocita, Conroe, Richmond, and all surrounding communities. Call <a href={`tel:${config.phoneE164}`} className="text-primary font-bold hover:underline">{config.phone}</a> today for your free, no-obligation estimate.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-surface-container-low pt-12 sm:pt-16 border-t border-outline-variant/10">
        <div className={`${shell} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`}>
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="architecture" className="text-on-primary text-sm" />
              </div>
              <div>
                <div className="font-headline text-xs font-extrabold tracking-[0.04em] uppercase leading-none">Apex Epoxy</div>
                <div className="font-headline text-[8px] font-bold tracking-[0.15em] uppercase text-primary/60 leading-none mt-0.5">Surface Systems</div>
              </div>
            </div>
            <p className="text-on-surface-variant/40 text-sm max-w-sm leading-relaxed">
              Owner-operated epoxy flooring in Cypress &amp; Greater Houston. Garage floors, patios, commercial coatings — every job backed by our 5-year warranty.
            </p>
            <div className="space-y-2">
              <a href={`tel:${config.phoneE164}`} className="flex items-center gap-2.5 text-sm font-bold hover:text-primary transition-colors">
                <Icon name="call" className="text-primary text-lg" /> {config.phone}
              </a>
              <a href={`mailto:${config.email}`} className="flex items-center gap-2.5 text-sm text-on-surface-variant/40 hover:text-primary transition-colors">
                <Icon name="mail" className="text-primary text-lg" /> {config.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-on-surface-variant/40">
                <Icon name="schedule" className="text-primary text-lg" /> {config.hours}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-extrabold text-primary uppercase tracking-[0.25em]">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-sm text-on-surface-variant/40 hover:text-primary transition-colors">Flake Epoxy Floors</a></li>
              <li><a href="#services" className="text-sm text-on-surface-variant/40 hover:text-primary transition-colors">Commercial &amp; Warehouse</a></li>
              <li><a href="#services" className="text-sm text-on-surface-variant/40 hover:text-primary transition-colors">Patio &amp; Outdoor</a></li>
              <li><a href="#services" className="text-sm text-on-surface-variant/40 hover:text-primary transition-colors">Metallic Epoxy</a></li>
              <li><a href="#flake-epoxy" className="text-sm text-on-surface-variant/40 hover:text-primary transition-colors">Why Flake Epoxy?</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-extrabold text-primary uppercase tracking-[0.25em]">Service Areas</h4>
            <ul className="space-y-1.5">
              {['Cypress', 'Houston', 'Katy', 'The Woodlands', 'Spring', 'Tomball', 'Sugar Land'].map((area) => (
                <li key={area}><span className="text-sm text-on-surface-variant/40">{area}, TX</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large watermark brand name */}
        <div className="mt-8 overflow-hidden">
          <div className="watermark text-[clamp(4rem,12vw,10rem)] text-center pb-2">
            APEX EPOXY
          </div>
        </div>

        <div className={`${shell} py-5 border-t border-outline-variant/8`}>
          <p className="text-[10px] text-on-surface-variant/25 uppercase tracking-[0.15em] font-bold text-center sm:text-left">
            &copy; {new Date().getFullYear()} Apex Epoxy &amp; Surface Systems. Epoxy Flooring Contractor in Cypress &amp; Houston, TX. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
