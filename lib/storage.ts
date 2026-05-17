'use client';
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'archive_famille_v1';

function loadUnlocked(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveUnlocked(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // Storage unavailable — silently ignore
  }
}

export function useProgress() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUnlocked(loadUnlocked());
    setHydrated(true);
  }, []);

  const unlock = useCallback((id: string) => {
    setUnlocked(prev => {
      const next = new Set(prev);
      next.add(id);
      saveUnlocked(next);
      return next;
    });
  }, []);

  const isUnlocked = useCallback((id: string) => unlocked.has(id), [unlocked]);

  return { unlocked, unlock, isUnlocked, count: unlocked.size, hydrated };
}
