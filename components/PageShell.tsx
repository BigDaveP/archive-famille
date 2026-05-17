'use client';
import { useState, useEffect, useCallback } from 'react';
import { registerPageExit, unregisterPageExit } from '@/lib/pageTransition';

const ENTER_DURATION = 580; // ms — matches page-enter animation
const EXIT_DURATION  = 580; // ms — matches crt-poweroff animation

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'enter' | 'idle' | 'exit'>('enter');

  // Transition to idle once the enter animation finishes
  useEffect(() => {
    const t = setTimeout(() => setPhase('idle'), ENTER_DURATION);
    return () => clearTimeout(t);
  }, []);

  // Register this shell as the active exit handler
  const handleExit = useCallback((done: () => void) => {
    setPhase('exit');
    setTimeout(done, EXIT_DURATION);
  }, []);

  useEffect(() => {
    registerPageExit(handleExit);
    return () => unregisterPageExit();
  }, [handleExit]);

  return (
    <div
      className={
        phase === 'enter' ? 'page-enter' :
        phase === 'exit'  ? 'crt-poweroff' : ''
      }
    >
      {children}
    </div>
  );
}
