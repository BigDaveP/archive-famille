'use client';

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!ctx) {
      ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return ctx;
  } catch {
    return null;
  }
}

function beep(freq: number, dur: number, type: OscillatorType = 'square', vol = 0.08, delay = 0): void {
  const c = getCtx();
  if (!c) return;
  try {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = type;
    osc.frequency.value = freq;
    const t = c.currentTime + delay;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.01);
  } catch {
    // Audio unavailable
  }
}

export function playKeyClick(): void {
  beep(600, 0.025, 'square', 0.04);
}

export function playSuccess(): void {
  beep(440, 0.08, 'sine', 0.12, 0);
  beep(660, 0.08, 'sine', 0.12, 0.09);
  beep(880, 0.15, 'sine', 0.12, 0.18);
}

export function playError(): void {
  beep(180, 0.12, 'sawtooth', 0.1, 0);
  beep(140, 0.12, 'sawtooth', 0.08, 0.13);
}

export function playBoot(): void {
  [200, 280, 240, 380, 320, 480, 440].forEach((f, i) =>
    beep(f, 0.07, 'square', 0.07, i * 0.09),
  );
}

export function playUnlock(): void {
  [330, 440, 550, 660, 770, 880, 1100].forEach((f, i) =>
    beep(f, 0.09, 'sine', 0.1, i * 0.055),
  );
}

export function playFinale(): void {
  [262, 330, 392, 523, 659, 784, 1047].forEach((f, i) =>
    beep(f, 0.14, 'sine', 0.13, i * 0.12),
  );
  [880, 1100, 1320, 1760].forEach((f, i) =>
    beep(f, 0.2, 'triangle', 0.1, 0.9 + i * 0.15),
  );
}

export function playGlitch(): void {
  beep(Math.random() * 800 + 200, 0.04, 'square', 0.06);
}

export function playDrone(): void {
  beep(55, 2.5, 'sine', 0.035);
  beep(110, 2.5, 'sawtooth', 0.015, 0.1);
}

export function playCountdownTick(): void {
  beep(1200, 0.04, 'square', 0.14);
  beep(600, 0.04, 'square', 0.07, 0.045);
}

export function playKlaxon(): void {
  [880, 660, 880, 660, 880, 1320].forEach((f, i) =>
    beep(f, 0.11, 'sawtooth', 0.14, i * 0.1),
  );
}

export function playStaticBurst(): void {
  for (let i = 0; i < 14; i++) {
    beep(Math.random() * 2000 + 200, 0.022, 'sawtooth', 0.05, i * 0.022);
  }
}
