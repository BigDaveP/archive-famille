'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  playKeyClick,
  playGlitch,
  playDrone,
  playCountdownTick,
  playKlaxon,
  playStaticBurst,
} from '@/lib/audio';

const GLITCH_CHARS = '!@#$%^&*<>?/|ABCDEFGHIJabcdefghij0123456789░▒▓█▀▄■□╔╗╚╝═║┼┤├';

function randLine(len = 72) {
  return Array.from(
    { length: len },
    () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
  ).join('');
}

interface CineLine {
  text: string;
  color?: string;
  size?: string;
  glow?: boolean;
  delay: number; // ms from mount
}

// All delays are relative to component mount.
// The CRT power-on animation takes ~750ms, text starts at 950ms.
const LINES: CineLine[] = [
  { text: '> CONNEXION AU RÉSEAU SÉCURISÉ...', delay: 950 },
  { text: '> PROTOCOLE FANTÔME: ACTIF', delay: 1650 },
  { text: '> LOCALISATION AGENT: [MASQUÉE]', delay: 2250 },
  { text: '> NIVEAU D\'ACCÈS: ROUGE — CLASSIFIÉ', delay: 2750, color: '#ff3333' },
  { text: '> IDENTITÉ OPÉRATEUR: [REDACTED]', delay: 3200, color: '#ff3333' },
  { text: '\u00A0', delay: 3700 },
  { text: '⚠  ATTENTION — CE QUI SUIT EST CONFIDENTIEL', delay: 4100, color: '#ffcc00', size: 'text-xl', glow: true },
  { text: '\u00A0', delay: 4800 },
  { text: '══════════════════════════════════════════════════', delay: 5000, color: '#0f2a0f' },
  { text: '\u00A0', delay: 5200 },
  { text: '    ARCHIVE  FAMILLE', delay: 5600, color: '#ffcc00', size: 'text-3xl', glow: true },
  { text: '    DOSSIER CLASSIFIÉ — ACCÈS RESTREINT', delay: 6500, color: '#886600', size: 'text-lg' },
  { text: '\u00A0', delay: 7100 },
  { text: '══════════════════════════════════════════════════', delay: 7300, color: '#0f2a0f' },
  { text: '\u00A0', delay: 7600 },
  { text: 'Il y a des histoires qu\'on ne devrait pas perdre.', delay: 8200, size: 'text-lg' },
  { text: '\u00A0', delay: 9000 },
  { text: 'Des rires. Des larmes. Des moments volés au temps.', delay: 9500 },
  { text: '138 fragments d\'une famille — corrompus, dispersés,', delay: 10300 },
  { text: 'effacés par une main inconnue.', delay: 11000 },
  { text: '\u00A0', delay: 11700 },
  { text: 'Ces souvenirs méritent d\'être retrouvés.', delay: 12300, size: 'text-lg' },
  { text: '\u00A0', delay: 13000 },
  { text: 'Vous êtes notre agent.', delay: 13600, color: '#33ff33', size: 'text-xl', glow: true },
  { text: 'Vous êtes leur seul espoir.', delay: 14400, color: '#33ff33', size: 'text-xl', glow: true },
  { text: '\u00A0', delay: 15200 },
  { text: '══════════════════════════════════════════════════', delay: 15400, color: '#0f2a0f' },
  { text: '\u00A0', delay: 15700 },
  { text: 'MISSION  : RESTAURER L\'ARCHIVE FAMILLE', delay: 16100, color: '#ffcc00' },
  { text: 'DOSSIERS : 150 FRAGMENTS À RÉCUPÉRER', delay: 16750, color: '#ffcc00' },
  { text: '\u00A0', delay: 17400 },
  { text: '⚠  CE MESSAGE S\'AUTODÉTRUIRA DANS...', delay: 17900, color: '#ff3333', size: 'text-xl', glow: true },
];

const COUNTDOWN_START_MS = 18700;
const COUNTDOWN_TICK_MS  = 950;

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines]   = useState(0);
  const [showScanline, setShowScanline]   = useState(false);
  const [phase, setPhase]                 = useState<'text' | 'countdown' | 'destruct'>('text');
  const [countdownNum, setCountdownNum]   = useState(5);
  const [glitchRows, setGlitchRows]       = useState<string[]>([]);
  const [fadeOut, setFadeOut]             = useState(false);
  const doneRef                           = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFadeOut(true);
    setTimeout(() => onComplete(), 700);
  }, [onComplete]);

  // CRT scanline sweep on mount
  useEffect(() => {
    const t = setTimeout(() => setShowScanline(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Drone on mount
  useEffect(() => {
    playDrone();
  }, []);

  // Reveal lines one by one
  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => {
        if (doneRef.current) return;
        setVisibleLines(i + 1);
        if (line.text !== '\u00A0') playKeyClick();
      }, line.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Switch to countdown phase
  useEffect(() => {
    const t = setTimeout(() => {
      if (doneRef.current) return;
      setPhase('countdown');
    }, COUNTDOWN_START_MS);
    return () => clearTimeout(t);
  }, []);

  // Countdown ticks — each time countdownNum changes while in countdown phase
  useEffect(() => {
    if (phase !== 'countdown') return;
    playCountdownTick();
    if (countdownNum === 0) {
      // Brief pause at 0 then explode
      const t = setTimeout(() => {
        if (doneRef.current) return;
        setPhase('destruct');
        playKlaxon();
        playStaticBurst();
      }, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (doneRef.current) return;
      setCountdownNum(n => n - 1);
    }, COUNTDOWN_TICK_MS);
    return () => clearTimeout(t);
  }, [phase, countdownNum]);

  // Glitch chaos during destruct
  useEffect(() => {
    if (phase !== 'destruct') return;
    const iv = setInterval(() => {
      setGlitchRows(Array.from({ length: 32 }, () => randLine()));
      playGlitch();
    }, 45);
    const fadeTimer = setTimeout(() => {
      clearInterval(iv);
      finish();
    }, 1400);
    return () => {
      clearInterval(iv);
      clearTimeout(fadeTimer);
    };
  }, [phase, finish]);

  // Skip on any keypress or click — enabled after 2s
  useEffect(() => {
    const handler = () => finish();
    const t = setTimeout(() => {
      window.addEventListener('keydown', handler, { once: true });
    }, 2000);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', handler);
    };
  }, [finish]);

  return (
    <>
      {/* CRT scan sweep */}
      {showScanline && <div className="intro-scanline" />}

      <div
        className="crt intro-poweron min-h-screen font-mono select-none cursor-pointer overflow-hidden"
        style={{
          background: 'var(--term-bg)',
          opacity: fadeOut ? 0 : 1,
          transition: fadeOut ? 'opacity 0.6s ease-in' : undefined,
        }}
        onClick={finish}
      >
        {/* ── Destruct phase ── */}
        {phase === 'destruct' && (
          <div className="p-2 text-sm leading-tight">
            {glitchRows.map((row, i) => (
              <div
                key={i}
                style={{
                  color: [
                    'var(--term-green)',
                    'var(--term-red)',
                    'var(--term-cyan)',
                    'var(--term-amber)',
                  ][i % 4],
                }}
              >
                {row}
              </div>
            ))}
          </div>
        )}

        {/* ── Countdown phase ── */}
        {phase === 'countdown' && (
          <div
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ background: 'var(--term-bg)' }}
          >
            <div
              className="mb-10 text-xl tracking-widest"
              style={{ color: 'var(--term-red)', textShadow: 'var(--glow)' }}
            >
              ⚠ &nbsp;AUTODESTRUCTION EN COURS
            </div>
            <div
              key={countdownNum}
              className="countdown-pop"
              style={{
                fontSize: 'clamp(7rem, 22vw, 14rem)',
                lineHeight: 1,
                color: 'var(--term-red)',
                textShadow: '0 0 40px #ff3333, 0 0 80px #ff3333',
                fontFamily: 'inherit',
              }}
            >
              {countdownNum}
            </div>
            <div
              className="mt-12 text-base tracking-widest"
              style={{ color: '#550000', opacity: 0.7 }}
            >
              [CLIQUEZ POUR PASSER]
            </div>
          </div>
        )}

        {/* ── Text phase ── */}
        {phase === 'text' && (
          <div className="p-6 md:p-12">
            <div className="max-w-3xl mx-auto w-full">
              <div className="space-y-1">
                {LINES.slice(0, visibleLines).map((line, i) => (
                  <div
                    key={i}
                    className={`line-in ${line.size ?? 'text-base'}`}
                    style={{
                      color: line.color ?? 'var(--term-green)',
                      textShadow: line.glow ? 'var(--glow)' : undefined,
                      animationDelay: '0ms',
                    }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              {visibleLines >= 6 && (
                <div
                  className="mt-8 text-sm tracking-wide"
                  style={{ color: 'var(--term-green-dim)', opacity: 0.45 }}
                >
                  [CLIQUER OU APPUYER SUR UNE TOUCHE POUR PASSER]
                </div>
              )}

              <div className="mt-4 text-lg" style={{ color: 'var(--term-green)' }}>
                root@archive_famille:~#{' '}
                <span className="cursor">█</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
