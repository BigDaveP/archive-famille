'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { playBoot, playKeyClick, playGlitch, playStaticBurst } from '@/lib/audio';
import { useProgress } from '@/lib/storage';
import { TOTAL_ITEMS, isSystemComplete } from '@/lib/data';

function getBootLines(lostCount: number): { text: string; color?: string; delay: number }[] {
  return [
    { text: 'ARCHIVE_CORE_V.0.95 — INITIALISATION DU SYSTÈME...', delay: 0 },
    { text: 'VÉRIFICATION DE L\'INTÉGRITÉ DES SECTEURS: [████████████] OK', delay: 500 },
    { text: 'CHARGEMENT DES PROTOCOLES DE SÉCURITÉ FAMILIALE...', delay: 1100 },
    { text: '⚠  ALERTE CRITIQUE: CORRUPTION DÉTECTÉE DANS LE NOYAU FAMILIAL', color: '#ffcc00', delay: 1800 },
    { text: `⚠  FUITE DE DONNÉES EN COURS — ${lostCount} ARCHIVES PERDUES`, color: '#ffcc00', delay: 2300 },
    { text: 'TENTATIVE DE RÉCUPÉRATION: EN COURS...', delay: 2900 },
    { text: 'ACCÈS AU TERMINAL DE SÉCURITÉ RESTREINT: ACCORDÉ', color: '#33ff33', delay: 3600 },
    { text: '────────────────────────────────────────────────────────────', color: '#0f2a0f', delay: 4100 },
    { text: 'BIENVENUE, AGENT. LA MISSION COMMENCE.', color: '#66ff66', delay: 4400 },
    { text: '', delay: 4800 },
    { text: '>>> APPUYEZ SUR UNE TOUCHE OU CLIQUEZ POUR ACCÉDER AU TERMINAL <<<', color: '#ffcc00', delay: 5000 },
  ];
}

const LINES_RESTORED: { text: string; color?: string; delay: number }[] = [
  { text: 'ARCHIVE_CORE_V.0.95 — INITIALISATION DU SYSTÈME...', delay: 0 },
  { text: 'VÉRIFICATION DE L\'INTÉGRITÉ DES SECTEURS: [████████████████████] OK', color: '#33ff33', delay: 500 },
  { text: 'NOYAU FAMILIAL — TOUS LES SECTEURS SYNCHRONISÉS', color: '#33ff33', delay: 1100 },
  { text: 'PROTOCOLES DE SÉCURITÉ FAMILIALE: ACTIFS', color: '#33ff33', delay: 1700 },
  { text: '════════════════════════════════════════════════════════════', color: '#ffd700', delay: 2300 },
  { text: '✓ SYSTÈME RESTAURÉ AVEC SUCCÈS', color: '#ffd700', delay: 2800 },
  { text: 'L\'ARCHIVE FAMILLE EST ENTIÈREMENT SAUVEGARDÉE.', color: '#66ff66', delay: 3400 },
  { text: 'MERCI, AGENTS. HAVRE VOUS ATTEND.', color: '#66ff66', delay: 4000 },
  { text: '', delay: 4600 },
  { text: '>>> APPUYEZ SUR UNE TOUCHE OU CLIQUEZ POUR ACCÉDER AU TERMINAL <<<', color: '#ffcc00', delay: 4800 },
];

export default function BootSequence() {
  const router = useRouter();
  const { count, hydrated } = useProgress();
  const restored = hydrated && isSystemComplete(count);
  const lostArchives = TOTAL_ITEMS - count;
  const bootLines = restored ? LINES_RESTORED : getBootLines(lostArchives);
  const [visible, setVisible]         = useState(0);
  const [ready, setReady]             = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = useCallback(() => {
    if (transitioning || !ready) return;
    setTransitioning(true);
    playStaticBurst();
    // brief glitch pulses before the screen collapses
    let ticks = 0;
    const iv = setInterval(() => { playGlitch(); if (++ticks >= 4) clearInterval(iv); }, 80);
    setTimeout(() => router.push('/archive'), 600);
  }, [transitioning, ready, router]);

  useEffect(() => {
    setVisible(0);
    setReady(false);
    playBoot();
    const lines = restored ? LINES_RESTORED : getBootLines(lostArchives);
    const timers = lines.map((line, i) =>
      setTimeout(() => {
        setVisible(i + 1);
        if (line.text && !line.text.startsWith('─') && !line.text.startsWith('═')) playKeyClick();
        if (i === lines.length - 1) setReady(true);
      }, line.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [restored, lostArchives]);

  useEffect(() => {
    if (!ready) return;
    const handler = () => navigate();
    window.addEventListener('keydown', handler, { once: true });
    return () => window.removeEventListener('keydown', handler);
  }, [ready, navigate]);

  const progressFilled = restored ? 20 : Math.round((count / TOTAL_ITEMS) * 20);

  return (
    <div
      className={`crt min-h-screen flex flex-col justify-center p-6 md:p-12 cursor-pointer select-none${transitioning ? ' crt-poweroff' : ''}`}
      style={{ background: 'var(--term-bg)' }}
      onClick={navigate}
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* ASCII header */}
        <pre className="text-sm leading-tight mb-8 opacity-40" style={{ color: 'var(--term-green)' }}>
{`╔═══════════════════════════════════════════════════════════════╗
║        ARCHIVE_FAMILLE v0.95  —  TERMINAL DE SÉCURITÉ         ║
╚═══════════════════════════════════════════════════════════════╝`}
        </pre>

        {/* Boot lines */}
        <div className="space-y-1 text-lg">
          {bootLines.slice(0, visible).map((line, i) => (
            <div
              key={i}
              className="line-in font-mono"
              style={{ color: line.color || 'var(--term-green)', animationDelay: '0ms' }}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* System status */}
        {visible >= 2 && (
          <div className="mt-6 text-base" style={{ color: 'var(--term-green-dim)' }}>
            INTÉGRITÉ DU SYSTÈME:{' '}
            <span style={{ color: restored ? 'var(--term-gold)' : 'var(--term-green)' }}>
              {'['}{'█'.repeat(progressFilled)}{'░'.repeat(20 - progressFilled)}{']'}
              {' '}{count}/{TOTAL_ITEMS} ARCHIVES
              {restored ? ' — 100%' : ''}
            </span>
          </div>
        )}

        {/* Prompt */}
        <div className="mt-6 text-lg" style={{ color: 'var(--term-green)' }}>
          root@archive_famille:~#{' '}
          <span className="cursor" style={{ color: 'var(--term-green)' }}>█</span>
        </div>
      </div>
    </div>
  );
}
