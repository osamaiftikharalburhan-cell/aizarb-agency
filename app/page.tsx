'use client';

import Link from 'next/link';
import Footer from '../components/Footer';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: 'WEBSITES', href: '#websites' },
  { label: 'MOBILE APPS', href: '#mobile-apps' },
  { label: 'AI AUTOMATION', href: '#ai-automation' },
  { label: 'AI CHATBOTS', href: '#ai-chatbots' },
  { label: 'CONTACT', href: '#contact' },
];

type Service = { id: string; title: string; body: string; featured: boolean; icon: ReactNode };

const iconProps = {
  width: 36,
  height: 36,
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const SERVICES: Service[] = [
  {
    id: 'websites',
    title: 'WEBSITES',
    body: 'Fast, modern sites and web platforms.',
    featured: false,
    icon: (
      <svg {...iconProps} stroke="#C9A227">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    ),
  },
  {
    id: 'mobile-apps',
    title: 'MOBILE APPS',
    body: 'iOS and Android apps for your customers.',
    featured: false,
    icon: (
      <svg {...iconProps} stroke="#C9A227">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <line x1="10.5" y1="18" x2="13.5" y2="18" />
      </svg>
    ),
  },
  {
    id: 'ai-automation',
    title: 'AI AUTOMATION',
    body: 'Workflows that run themselves.',
    featured: false,
    icon: (
      <svg {...iconProps} stroke="#C9A227">
        <path d="M4 12a8 8 0 0 1 14-5.3" />
        <polyline points="18 3 18 7 14 7" />
        <path d="M20 12a8 8 0 0 1-14 5.3" />
        <polyline points="6 21 6 17 10 17" />
      </svg>
    ),
  },
  {
    id: 'ai-chatbots',
    title: 'AI CHATBOTS',
    body: '24/7 assistants trained on your business.',
    featured: true,
    icon: (
      <svg {...iconProps} stroke="#F3EFE7">
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z" />
      </svg>
    ),
  },
];

const FEATURES: {
  label: string;
  title: string;
  body: string;
  tag: string;
  input: string;
  output: { k: string; v: string }[];
}[] = [
  {
    label: 'EXTRACT',
    title: 'Automated Document Extractor',
    body: 'Extract structured JSON/Excel data from PDF invoices, bills, and receipts in seconds.',
    tag: 'invoice_0472.pdf',
    input: 'Parsing 3 pages · 41 fields detected',
    output: [
      { k: '"vendor"', v: '"Northwind Supply Co."' },
      { k: '"invoice_no"', v: '"INV-0472"' },
      { k: '"date"', v: '"2026-09-28"' },
      { k: '"line_items"', v: '12' },
      { k: '"tax"', v: '418.20' },
      { k: '"total"', v: '5646.70' },
    ],
  },
  {
    label: 'QUALIFY',
    title: 'Smart Lead Qualification Bot',
    body: 'Automatically research client URLs and draft personalized sales outreach instantly.',
    tag: 'acme-logistics.com',
    input: 'Crawling site · scoring fit · drafting email',
    output: [
      { k: '"company"', v: '"Acme Logistics"' },
      { k: '"industry"', v: '"Freight & 3PL"' },
      { k: '"headcount"', v: '"200–500"' },
      { k: '"fit_score"', v: '92' },
      { k: '"pain_point"', v: '"Manual dispatch"' },
      { k: '"draft"', v: '"ready"' },
    ],
  },
  {
    label: 'SEARCH',
    title: 'Internal SOP Search Portal',
    body: 'Private RAG search engine for company policies, contracts, and internal documentation.',
    tag: 'What is our refund window?',
    input: 'Searching 1,284 docs · 3 sources matched',
    output: [
      { k: '"answer"', v: '"30 days from delivery"' },
      { k: '"source_1"', v: '"Refund_Policy_v4.pdf"' },
      { k: '"source_2"', v: '"MSA_Template.docx"' },
      { k: '"confidence"', v: '0.97' },
      { k: '"access"', v: '"private"' },
      { k: '"latency_ms"', v: '412' },
    ],
  },
];

const SERVICE_OPTIONS = ['Websites', 'Mobile Apps', 'AI Automation', 'AI Chatbots', 'Other'];

/* ------------------------------------------------------------------ */
/* Brand marks                                                         */
/* ------------------------------------------------------------------ */

/** The AIZARB app-icon mark: blocky Z struck flat, gold impact line beneath. */
function ZMark({ size = 40, tile = '#0F0D12', className = '' }: { size?: number; tile?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden className={className}>
      <rect x="2" y="2" width="96" height="96" rx="22" fill={tile} />
      <path d="M27,27 L73,27 L73,39 L48,61 L73,61 L73,73 L27,73 L27,61 L52,39 L27,39 Z" fill="#D62828" />
      <rect x="27" y="76" width="46" height="6" rx="3" fill="#C9A227" />
    </svg>
  );
}

function Wordmark({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <span className={`font-display leading-none tracking-[0.01em] ${light ? 'text-ink' : 'text-parchment'} ${className}`}>
      <span className="text-strike">AI</span>ZARB
    </span>
  );
}

function Mono({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono font-medium tracking-[0.14em] ${className}`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', service: '', details: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Reveal the demo output line by line whenever the feature changes or replays.
  useEffect(() => {
    setVisibleLines(0);
    const total = FEATURES[active].output.length;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisibleLines(i);
      if (i >= total) window.clearInterval(id);
    }, 220);
    return () => window.clearInterval(id);
  }, [active, runKey]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: new FormData(e.currentTarget).get('website') }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', email: '', service: '', details: '' });
    } catch {
      setStatus('error');
    }
  };

  const feature = FEATURES[active];
  const done = visibleLines >= feature.output.length;

  const fieldCls =
    'w-full rounded-xl border border-line bg-card px-4 py-3.5 text-[15px] text-parchment placeholder:text-mute outline-none transition focus:border-strike focus:ring-4 focus:ring-strike/20';
  const labelCls = 'mb-2 block font-mono text-xs font-medium tracking-[0.14em] text-mute';

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-ink font-sans text-parchment antialiased selection:bg-strike selection:text-parchment">
      {/* ============================ NAVBAR ============================ */}
      <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur-md">
        <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="AIZARB home" className="flex items-center gap-3">
            <ZMark size={40} />
            <Wordmark className="text-[28px]" />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="font-mono text-[13px] font-medium tracking-[0.14em] text-mute transition hover:text-parchment">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-gold px-[22px] py-[14px] font-display text-lg leading-none tracking-[0.02em] text-ink transition hover:brightness-110 sm:inline-block"
            >
              Get Started
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-parchment transition ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-parchment transition ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-parchment transition ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </nav>

        <div className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${menuOpen ? 'max-h-[440px]' : 'max-h-0'}`}>
          <ul className="px-5 pb-6 sm:px-8">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-line py-4 font-mono text-sm font-medium tracking-[0.14em] text-soft hover:text-parchment"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-5 sm:hidden">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block rounded-full bg-gold py-[14px] text-center font-display text-lg leading-none tracking-[0.02em] text-ink"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main>
        {/* ================== HERO — "Company banner" ==================== */}
        <section id="services" className="scroll-mt-[72px] bg-parchment text-ink">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:gap-16 lg:px-[112px] lg:py-20">
            {/* Mark + headline */}
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10 lg:gap-16">
              <ZMark size={220} tile="#16141A" className="h-28 w-28 shrink-0 sm:h-40 sm:w-40 lg:h-[220px] lg:w-[220px]" />
              <h1 className="m-0 font-display text-[56px] leading-[1.02] tracking-[0.005em] sm:text-7xl lg:text-[96px]">
                ONE STRIKE.
                <br />
                REAL IMPACT.
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="m-0 max-w-[1100px] text-xl leading-[1.4] text-graphite sm:text-2xl lg:text-[30px]">
              We land AI precisely where it counts inside your business, then build the websites, apps and automations
              around it.
            </p>

            {/* Service cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  id={s.id}
                  href={`/services/${s.id}`}
                  className={`group flex scroll-mt-24 flex-col gap-[18px] rounded-[18px] p-[30px] text-parchment transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(214,40,40,0.3)] ${
                    s.featured ? 'bg-strike' : 'bg-ink'
                  }`}
                >
                  {s.icon}
                  <h3 className="m-0 font-display text-2xl tracking-[0.01em]">{s.title}</h3>
                  <p className={`m-0 text-lg leading-[1.45] ${s.featured ? 'text-blush' : 'text-soft'}`}>{s.body}</p>
                  <span className="mt-auto font-mono text-sm tracking-[0.08em] transition-transform group-hover:translate-x-1">
                    LEARN MORE →
                  </span>
                </Link>
              ))}
            </div>

            {/* Bottom rule */}
            <div className="flex flex-col gap-6 border-t-2 border-ink pt-7 md:flex-row md:items-center md:justify-between">
              <a href="https://aizarb.com" className="font-display text-[30px] tracking-[0.01em] text-ink">
                AIZARB.COM
              </a>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="mailto:osama.iftikhar.alburhan@gmail.com"
                  className="inline-flex items-center justify-center break-all rounded-full border-2 border-ink px-[22px] py-[14px] font-display text-xl leading-none tracking-[0.02em] text-ink transition hover:bg-ink hover:text-parchment"
                >
                  osama.iftikhar.alburhan@gmail.com
                </a>
                <a
                  href="tel:+923132698198"
                  className="inline-flex items-center justify-center rounded-full border-2 border-strike bg-strike px-[22px] py-[14px] font-display text-xl leading-none tracking-[0.02em] text-parchment transition hover:border-strike-dark hover:bg-strike-dark"
                >
                  +92 313 2698198
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============== AI CAPABILITIES — "Logo sheet" ================ */}
        <section id="capabilities" className="scroll-mt-[72px] bg-ink">
          <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[480px_1fr] lg:px-14">
            {/* Left: mark column */}
            <div className="flex flex-col justify-between gap-10 rounded-[20px] p-2 lg:p-11">
              <Mono className="text-xs text-mute">AI CAPABILITIES</Mono>
              <ZMark size={260} tile="#F3EFE7" className="h-40 w-40 self-center sm:h-[260px] sm:w-[260px]" />
              <p className="m-0 text-[17px] text-soft">{feature.body}</p>
            </div>

            {/* Right: live demo */}
            <div className="flex flex-col overflow-hidden rounded-[20px] bg-card">
              <div className="flex items-center justify-between gap-4 p-6 sm:p-10">
                <div className="flex items-center gap-5 sm:gap-7">
                  <ZMark size={72} className="h-14 w-14 shrink-0 sm:h-[72px] sm:w-[72px]" />
                  <h3 className="m-0 font-display text-3xl leading-none tracking-[0.01em] sm:text-[44px]">{feature.title}</h3>
                </div>
                <Mono
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] ${done ? 'bg-gold text-ink' : 'bg-strike text-parchment'}`}
                >
                  {done ? 'DONE' : 'RUNNING'}
                </Mono>
              </div>

              <div className="mx-6 mb-6 rounded-[20px] bg-parchment p-6 text-ink sm:mx-10 sm:mb-10 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="truncate font-mono text-sm font-medium">{feature.tag}</span>
                  <span className="hidden truncate font-mono text-xs text-slate sm:block">{feature.input}</span>
                </div>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-strike transition-all duration-200"
                    style={{ width: `${(visibleLines / feature.output.length) * 100}%` }}
                  />
                </div>
                <pre className="m-0 mt-5 min-h-[248px] overflow-x-auto font-mono text-[13px] leading-7 sm:text-sm">
                  <span className="text-slate">{'{'}</span>
                  {feature.output.map((line, i) => (
                    <div
                      key={`${active}-${runKey}-${line.k}`}
                      className={`pl-5 transition-all duration-300 ${i < visibleLines ? 'opacity-100' : 'translate-y-1 opacity-0'}`}
                    >
                      <span className="text-ink">{line.k}</span>
                      <span className="text-slate">: </span>
                      <span className={line.v.startsWith('"') ? 'text-strike-dark' : 'text-graphite'}>{line.v}</span>
                      {i < feature.output.length - 1 && <span className="text-slate">,</span>}
                    </div>
                  ))}
                  <span className="text-slate">{'}'}</span>
                </pre>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setRunKey((k) => k + 1)}
                    className="rounded-full border-2 border-ink px-4 py-2 font-mono text-[11px] font-medium tracking-[0.14em] text-ink transition hover:bg-ink hover:text-parchment"
                  >
                    REPLAY
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom: three feature cards */}
            <div role="tablist" aria-label="AI capabilities" className="grid gap-6 md:grid-cols-3 lg:col-span-2">
              {FEATURES.map((f, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={f.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActive(i);
                      setRunKey((k) => k + 1);
                    }}
                    className={`flex flex-col gap-3 rounded-[20px] border-2 bg-card p-8 text-left transition ${
                      isActive ? 'border-strike' : 'border-transparent hover:border-line'
                    }`}
                  >
                    <Mono className={`text-xs ${isActive ? 'text-strike' : 'text-mute'}`}>
                      0{i + 1} / {f.label}
                    </Mono>
                    <span className="font-display text-[28px] leading-[1.15]">{f.title}</span>
                    <span className="text-[15px] leading-relaxed text-soft">{f.body}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================== CONTACT — "Launch post" =================== */}
        <section id="contact" className="scroll-mt-[72px] border-t border-line bg-ink">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-5 py-14 sm:px-8 sm:py-20 lg:px-[88px] lg:py-[88px]">
            <div className="flex items-center justify-between gap-6">
              <Mono className="text-sm tracking-[0.16em] text-mute sm:text-xl">NOW OPEN FOR PROJECTS</Mono>
              <ZMark size={76} className="h-14 w-14 shrink-0 sm:h-[76px] sm:w-[76px]" />
            </div>

            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              <div className="flex flex-col gap-7">
                <h2 className="m-0 font-display text-6xl leading-none tracking-[0.005em] sm:text-7xl lg:text-[108px]">
                  READY TO MAKE AN <span className="text-strike">IMPACT?</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Honeypot: hidden from people, bots fill it in */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelCls}>FULL NAME</span>
                    <input
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={fieldCls}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>BUSINESS EMAIL</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Business Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={fieldCls}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className={labelCls}>SERVICE TYPE</span>
                  <span className="relative block">
                    <select
                      required
                      name="service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className={`${fieldCls} appearance-none pr-12 ${form.service ? '' : 'text-mute'}`}
                    >
                      <option value="" disabled>
                        Service Type
                      </option>
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-card text-parchment">
                          {o}
                        </option>
                      ))}
                    </select>
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mute"
                      aria-hidden
                    >
                      <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </label>
                <label className="block">
                  <span className={labelCls}>PROJECT DETAILS</span>
                  <textarea
                    required
                    name="details"
                    rows={5}
                    placeholder="Project Details"
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    className={`${fieldCls} resize-none`}
                  />
                </label>

                <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p role="status" aria-live="polite" className={`m-0 font-mono text-xs tracking-[0.14em] ${status === 'error' ? 'text-strike' : 'text-gold'} ${status === 'sent' || status === 'error' ? '' : 'invisible'}`}>
                    {status === 'error' ? 'NOT SENT — PLEASE TRY AGAIN' : 'SENT'}
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-strike px-[22px] py-[14px] font-display text-xl leading-none tracking-[0.02em] text-parchment transition hover:bg-strike-dark disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-parchment/40 border-t-parchment" />
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer rule, as on the launch post */}
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
}
