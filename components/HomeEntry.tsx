'use client';
import { useState, useEffect } from 'react';
import CinematicIntro from '@/components/CinematicIntro';
import BootSequence from '@/components/BootSequence';
import { unlockAllExceptLast, unlockAllForTest } from '@/lib/storage';

const INTRO_KEY = 'archive_famille_intro_v1';

export default function HomeEntry() {
  const [phase, setPhase] = useState<'loading' | 'intro' | 'boot'>('loading');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dev = params.get('dev');
    if (dev === 'finale') {
      unlockAllExceptLast();
      window.history.replaceState({}, '', '/');
    } else if (dev === 'complete') {
      unlockAllForTest();
      window.history.replaceState({}, '', '/');
    }

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
