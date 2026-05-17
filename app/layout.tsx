import type { Metadata } from 'next';
import { VT323 } from 'next/font/google';
import Scanlines from '@/components/Scanlines';
import './globals.css';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ARCHIVE_FAMILLE v0.95 — TERMINAL RESTREINT',
  description: 'Système de récupération d\'archives familiales corrompues. Accès restreint.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${vt323.variable} h-full`}>
      <body className="min-h-full" style={{ fontFamily: "var(--font-vt323), 'Courier New', monospace" }}>
        <Scanlines />
        {children}
      </body>
    </html>
  );
}
