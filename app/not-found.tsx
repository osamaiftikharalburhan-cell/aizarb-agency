import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-5 text-center font-sans text-white">
      <p className="m-0 font-display text-[120px] leading-none text-strike">404</p>
      <h1 className="mt-4 mb-0 font-display text-3xl tracking-[0.02em] uppercase">Page not found</h1>
      <p className="mt-3 mb-0 text-neutral-400">That page doesn&apos;t exist, or it has moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-strike px-7 py-3.5 font-display tracking-[0.04em] uppercase transition hover:bg-strike-dark"
      >
        <span aria-hidden>←</span> Back to Home
      </Link>
    </div>
  );
}
