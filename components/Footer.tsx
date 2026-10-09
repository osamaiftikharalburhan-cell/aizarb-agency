export default function Footer({ className = '' }: { className?: string }) {
  return (
    <footer
      className={`flex flex-col gap-4 border-t-2 border-line pt-8 md:flex-row md:items-center md:justify-between ${className}`}
    >
      <span className="font-display text-[36px] leading-none tracking-[0.01em] text-parchment">
        <span className="text-strike">AI</span>ZARB
      </span>
      <p className="m-0 text-sm text-mute">© 2026 AIZARB. All rights reserved. ONE STRIKE. REAL IMPACT.</p>
      <a href="https://aizarb.com" className="font-mono text-lg font-medium text-parchment transition hover:text-gold">
        AIZARB.COM
      </a>
    </footer>
  );
}
