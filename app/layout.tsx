import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIZARB — ONE STRIKE. REAL IMPACT.',
  description:
    'We land AI precisely where it counts inside your business, then build the websites, apps and automations around it.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
