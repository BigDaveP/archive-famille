'use client';
import { useState, useEffect } from 'react';
import CinematicIntro from '@/components/CinematicIntro';
import BootSequence from '@/components/BootSequence';

const INTRO_KEY = 'archive_famille_intro_v1';

export default function HomeEntry() {
  const [phase, setPhase] = useState<'loading' | 'intro' | 'boot'>('loading');

  useEffect(() => {
    const seen = localStorage.getItem(INTRO_KEY);
    setPhase(seen ? 'boot' : 'intro');
  }, []);

  function handleIntroComplete() {
    localStorage.setItem(INTRO_KEY, '1');
    setPhase('boot');
  }

  // Avoid flash: render nothing until localStorage is checked
  if (phase === 'loading') {
    return (
      <div
        style={{ background: 'var(--term-bg)', minHeight: '100vh' }}
      />
    );
  }

  return phase === 'intro'
    ? <CinematicIntro onComplete={handleIntroComplete} />
    : <BootSequence />;
}
