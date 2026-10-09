import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type FeatureIcon =
  | 'layout'
  | 'bolt'
  | 'search'
  | 'cart'
  | 'phone'
  | 'layers'
  | 'bell'
  | 'shield'
  | 'flow'
  | 'plug'
  | 'doc'
  | 'chart'
  | 'chat'
  | 'mic'
  | 'brain'
  | 'globe';

interface Feature {
  icon: FeatureIcon;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface Service {
  title: string;
  tagline: string;
  description: string;
  features: Feature[];
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// Every image is used exactly once across all services.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const SERVICES: Record<string, Service> = {
  websites: {
    title: 'Websites & Web Applications',
    tagline: 'Fast sites that turn visitors into customers.',
    description:
      'From high-converting landing pages to full web platforms, we design and build websites that load instantly, rank well and are easy to grow. Every build is responsive, accessible and ready for AI features when you need them.',
    features: [
      {
        icon: 'layout',
        title: 'Conversion-Focused Design',
        description: 'Clear layouts, sharp copy and calls to action placed where your visitors decide.',
        image: unsplash('1547658719-da2b51169166'),
        imageAlt: 'Landing page designs open on a desktop monitor and tablet',
      },
      {
        icon: 'bolt',
        title: 'Performance First',
        description: 'Server rendering, optimised assets and edge hosting for sub-second load times.',
        image: unsplash('1551288049-bebda4e38f71'),
        imageAlt: 'Dark performance analytics dashboard with charts',
      },
      {
        icon: 'search',
        title: 'SEO Built In',
        description: 'Clean markup, metadata and structured data so search engines understand your business.',
        image: unsplash('1460925895917-afdab827c52f'),
        imageAlt: 'Laptop showing website traffic analytics',
      },
      {
        icon: 'cart',
        title: 'E-Commerce & Payments',
        description: 'Online stores, bookings and subscriptions with Stripe and other payment providers.',
        image: unsplash('1563013544-824ae1b704d3'),
        imageAlt: 'Shopper paying online with a credit card on a laptop',
      },
      {
        icon: 'layers',
        title: 'Custom Web Apps',
        description: 'Dashboards, portals and SaaS products with authentication, databases and APIs.',
        image: unsplash('1558655146-d09347e92766'),
        imageAlt: 'SaaS component library and widget templates on a desktop screen',
      },
      {
        icon: 'globe',
        title: 'Immersive 3D Experiences',
        description: 'Interactive 3D scenes and motion that make your brand impossible to forget.',
        image: unsplash('1523961131990-5ea7c61b2107'),
        imageAlt: 'Glowing 3D wireframe cubes floating in darkness',
      },
    ],
  },
  'mobile-apps': {
    title: 'Mobile Application Development',
    tagline: 'Your business, in every pocket.',
    description:
      'We build iOS and Android apps from a single codebase, so you launch faster and spend less. From the first prototype to the App Store release, we handle design, development, backend and publishing.',
    features: [
      {
        icon: 'phone',
        title: 'Cross-Platform Apps',
        description: 'One codebase for iOS and Android with a native look, feel and speed.',
        image: unsplash('1556656793-08538906a9f8'),
        imageAlt: 'iPhone and Android phones side by side',
      },
      {
        icon: 'layout',
        title: 'UI/UX Design',
        description: 'Intuitive screens and flows designed around how your customers actually use their phones.',
        image: unsplash('1581291518857-4e27b48ff24e'),
        imageAlt: 'Designer sketching mobile app wireframes on paper',
      },
      {
        icon: 'bell',
        title: 'Push Notifications',
        description: 'Targeted messages that bring users back at the right moment.',
        image: unsplash('1555774698-0b77e0d5fac6'),
        imageAlt: 'Hand holding a smartphone with app icons on screen',
      },
      {
        icon: 'shield',
        title: 'Secure Authentication',
        description: 'Email, social and biometric login, backed by secure, scalable infrastructure.',
        image: unsplash('1563986768609-322da13575f3'),
        imageAlt: 'Person signing in on a laptop while holding a phone',
      },
      {
        icon: 'brain',
        title: 'AI-Powered Features',
        description: 'In-app assistants, smart search, image recognition and personalised recommendations.',
        image: unsplash('1526498460520-4c246339dccb'),
        imageAlt: 'Smartphone displaying code on a wooden desk',
      },
      {
        icon: 'bolt',
        title: 'App Store Launch',
        description: 'We handle submission, review guidelines and release updates for both stores.',
        image: unsplash('1512941937669-90a1b58e7e9c'),
        imageAlt: 'Close-up of a smartphone home screen full of apps',
      },
    ],
  },
  'ai-automation': {
    title: 'AI Automation Workflows',
    tagline: 'Workflows that run themselves.',
    description:
      'We map the repetitive work slowing your team down and replace it with AI-powered workflows that run around the clock. Leads, documents, reports and follow-ups get handled automatically, accurately and at scale.',
    features: [
      {
        icon: 'flow',
        title: 'Process Automation',
        description: 'End-to-end workflows that move data between your tools without manual copy-paste.',
        image: unsplash('1639322537228-f710d846310a'),
        imageAlt: 'Network of connected workflow nodes',
      },
      {
        icon: 'plug',
        title: 'Tool Integrations',
        description: 'Connect your CRM, email, sheets, Slack, WhatsApp and hundreds of other apps.',
        image: unsplash('1544197150-b99a580bb7a8'),
        imageAlt: 'Network cables plugged into a patch panel',
      },
      {
        icon: 'doc',
        title: 'Document Processing',
        description: 'Extract, classify and summarise invoices, contracts and forms with AI.',
        image: unsplash('1586281380349-632531db7ed4'),
        imageAlt: 'Document on a clipboard next to a laptop',
      },
      {
        icon: 'chart',
        title: 'Lead Qualification',
        description: 'Score, enrich and route leads instantly so your sales team only talks to buyers.',
        image: unsplash('1504868584819-f8e8b4b6d7e3'),
        imageAlt: 'Laptop showing a lead-scoring dashboard',
      },
      {
        icon: 'brain',
        title: 'AI Agents',
        description: 'Autonomous agents that research, decide and act on your behalf, with human checkpoints.',
        image: unsplash('1485827404703-89b55fcc595e'),
        imageAlt: 'Humanoid robot assistant holding a tablet',
      },
      {
        icon: 'bell',
        title: 'Reporting & Alerts',
        description: 'Automated reports and real-time alerts delivered where your team already works.',
        image: unsplash('1454165804606-c3d57bc86b40'),
        imageAlt: 'Team reviewing printed reports beside laptops',
      },
    ],
  },
  'ai-chatbots': {
    title: 'Custom AI Chatbots & Voice Agents',
    tagline: '24/7 assistants trained on your business.',
    description:
      'We build chat and voice agents that know your products, policies and customers. They answer questions, book appointments and capture leads on your website, WhatsApp or phone line, day and night.',
    features: [
      {
        icon: 'chat',
        title: 'Website & WhatsApp Chatbots',
        description: 'Instant, on-brand answers on every channel your customers use.',
        image: unsplash('1535378620166-273708d44e4c'),
        imageAlt: 'Friendly white robot assistant',
      },
      {
        icon: 'mic',
        title: 'AI Voice Agents',
        description: 'Natural-sounding phone agents that handle inbound calls and outbound follow-ups.',
        image: unsplash('1478737270239-2f02b77fc618'),
        imageAlt: 'Studio microphone in a dark room',
      },
      {
        icon: 'brain',
        title: 'Trained on Your Data',
        description: 'Retrieval over your documents, FAQs and website so answers are accurate and current.',
        image: unsplash('1558494949-ef010cbdcc31'),
        imageAlt: 'Server racks in a data centre',
      },
      {
        icon: 'cart',
        title: 'Bookings & Lead Capture',
        description: 'Qualify prospects, book meetings and push details straight into your CRM.',
        image: unsplash('1556742049-0cfed4f6a45d'),
        imageAlt: 'Customer checking in with a smartphone at a front desk',
      },
      {
        icon: 'globe',
        title: 'Multilingual Support',
        description: 'Serve customers in English, Urdu, Arabic and dozens of other languages.',
        image: unsplash('1451187580459-43490279c0fa'),
        imageAlt: 'Earth at night with city lights connecting continents',
      },
      {
        icon: 'chart',
        title: 'Analytics & Handoff',
        description: 'Conversation insights, plus smooth handoff to a human when it matters.',
        image: unsplash('1531746790731-6c087fecd65a'),
        imageAlt: 'Robotic hand reaching out for a handoff',
      },
    ],
  },
};

const getService = (slug: string) => (Object.hasOwn(SERVICES, slug) ? SERVICES[slug] : undefined);

/* ------------------------------------------------------------------ */
/* Routing & metadata                                                  */
/* ------------------------------------------------------------------ */

type Props = { params: Promise<{ slug: string }> };

// Only the slugs in SERVICES exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | AIZARB`,
    description: service.description,
  };
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const ICON_PATHS: Record<FeatureIcon, ReactNode> = {
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="20" />
    </>
  ),
  bolt: <polygon points="13 2 4 14 12 14 11 22 20 10 12 10 13 2" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <line x1="10.5" y1="18" x2="13.5" y2="18" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  flow: (
    <>
      <path d="M4 12a8 8 0 0 1 14-5.3" />
      <polyline points="18 3 18 7 14 7" />
      <path d="M20 12a8 8 0 0 1-14 5.3" />
      <polyline points="6 21 6 17 10 17" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2v6M15 2v6" />
      <path d="M6 8h12v4a6 6 0 0 1-12 0V8z" />
      <path d="M12 18v4" />
    </>
  ),
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </>
  ),
  chart: (
    <>
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="6" y="11" width="3" height="6" />
      <rect x="11" y="7" width="3" height="10" />
      <rect x="16" y="4" width="3" height="13" />
    </>
  ),
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z" />,
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </>
  ),
  brain: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </>
  ),
};

function Icon({ name }: { name: FeatureIcon }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-black font-sans text-white antialiased">
      <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 lg:py-28">
        {/* Header */}
        <header className="max-w-[820px]">
          <h1 className="m-0 font-display text-5xl leading-[1.05] tracking-[0.01em] uppercase sm:text-6xl lg:text-[80px]">
            {service.title}
          </h1>
          <p className="mt-5 mb-0 text-2xl font-semibold text-strike sm:text-3xl">{service.tagline}</p>
          <p className="mt-6 mb-0 text-lg leading-relaxed text-neutral-400 sm:text-xl">{service.description}</p>
        </header>

        {/* Feature grid */}
        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20">
          {service.features.map((f, i) => (
            <article
              key={f.title}
              className="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-[0_0_32px_rgba(220,38,38,0.2)]"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl sm:h-56">
                <Image
                  src={f.image}
                  alt={f.imageAlt}
                  fill
                  sizes="(min-width: 1100px) 530px, (min-width: 640px) 50vw, 100vw"
                  priority={i < 2}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/10 text-red-500 transition duration-300 group-hover:bg-red-600 group-hover:text-white">
                    <Icon name={f.icon} />
                  </span>
                  <h2 className="m-0 text-xl font-semibold text-white">{f.title}</h2>
                </div>
                <p className="mt-3 mb-0 leading-relaxed text-neutral-400">{f.description}</p>
              </div>
            </article>
          ))}
        </section>

        {/* CTA — same styling as the navbar "Get Started" button */}
        <div className="mt-16 flex justify-center lg:mt-20">
          <Link
            href="/#contact"
            className="inline-block rounded-full bg-gold px-[22px] py-[14px] font-display text-lg leading-none tracking-[0.02em] text-ink transition hover:brightness-110"
          >
            Get a Free Consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
