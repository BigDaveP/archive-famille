'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import TransitionLink from '@/components/TransitionLink';
import FinaleModal from '@/components/FinaleModal';
import { ITEMS, TIER_COLORS, TOTAL_ITEMS, isFinalArchive } from '@/lib/data';
import { useProgress } from '@/lib/storage';
import { playSuccess, playError, playKeyClick, playUnlock, playFinale, playGlitch } from '@/lib/audio';

type Phase = 'idle' | 'decrypting' | 'success' | 'finale' | 'error';

const GLITCH = '!@#$%^&*<>?/|ABCDEFGHIJabcdefghij0123456789░▒▓█';

function restoreArchiveScroll() {
  sessionStorage.setItem('havre:archive-restore', '1');
}

function randomGlitch(len = 24) {
  return Array.from({ length: len }, () => GLITCH[Math.floor(Math.random() * GLITCH.length)]).join('');
}

export default function PuzzleTerminal({ itemId }: { itemId: string }) {
  const item   = ITEMS.find(i => i.id === itemId);
  const { count, isUnlocked, unlock } = useProgress();

  const [answer,    setAnswer]    = useState('');
  const [phase,     setPhase]     = useState<Phase>('idle');
  const [showHint,  setShowHint]  = useState(false);
  const [glitchTxt, setGlitchTxt] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (phase !== 'finale') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [phase]);

  const alreadyDone = item ? isUnlocked(item.id) : false;
  const isAvail     = item ? count >= item.requiredUnlocks : false;
  const justSolved  = phase === 'success' || phase === 'finale' || phase === 'decrypting';
  const showAlreadyDone = alreadyDone && !justSolved;
  const showActivePuzzle = isAvail && (!alreadyDone || justSolved);

  const validate = useCallback(() => {
    if (!item || phase === 'decrypting') return;
    const norm = answer.trim().toLowerCase();
    const ok   = item.puzzle.answers.some(a => a.toLowerCase() === norm);

    if (ok) {
      const completesSystem = isFinalArchive(item.id) && count === TOTAL_ITEMS - 1;
      setPhase('decrypting');
      playSuccess();
      let frame = 0;
      const totalFrames = completesSystem ? 40 : 18;
      const iv = setInterval(() => {
        setGlitchTxt(randomGlitch(completesSystem ? 32 : 24));
        playGlitch();
        frame++;
        if (frame >= totalFrames) {
          clearInterval(iv);
          unlock(item.id);
          setPhase(completesSystem ? 'finale' : 'success');
          if (completesSystem) playFinale();
          else playUnlock();
        }
      }, completesSystem ? 70 : 80);
    } else {
      setPhase('error');
      playError();
      setTimeout(() => setPhase('idle'), 2200);
    }
  }, [item, answer, phase, unlock, count]);

  if (!item) {
    return (
      <div className="min-h-screen p-8 font-mono" style={{ background: 'var(--term-bg)', color: 'var(--term-red)' }}>
        <p>ERREUR: ARCHIVE {itemId} INTROUVABLE DANS LA BASE DE DONNÉES</p>
        <TransitionLink href="/archive" onBeforeNavigate={restoreArchiveScroll} className="underline mt-4 block" style={{ color: 'var(--term-green)' }}>
          ← RETOUR AU MENU PRINCIPAL
        </TransitionLink>
      </div>
    );
  }

  const tierColor = TIER_COLORS[item.tier];

  return (
    <div className="crt min-h-screen p-3 md:p-6 font-mono" style={{ background: 'var(--term-bg)', color: 'var(--term-green)' }}>

      {/* Back */}
      <div className="mb-4">
        <TransitionLink href="/archive" onBeforeNavigate={restoreArchiveScroll} className="text-sm hover:underline" style={{ color: 'var(--term-green-dim)' }}>
          ← RETOUR AU TERMINAL PRINCIPAL
        </TransitionLink>
      </div>

      {/* Header */}
      <div className="border p-4 mb-4" style={{ borderColor: 'var(--term-border)' }}>
        <div className="text-xl text-center mb-2" style={{ color: tierColor }}>
          ╔══════════════════════════════════════════════════════════╗
        </div>
        <div className="text-xl text-center glow" style={{ color: tierColor }}>
          MISSION : RESTAURER L&apos;ARCHIVE &quot;{item.displayName}&quot;
        </div>
        <div className="text-xl text-center mb-2" style={{ color: tierColor }}>
          ╚══════════════════════════════════════════════════════════╝
        </div>
        <div className="flex flex-wrap gap-4 text-sm justify-center mt-2" style={{ color: 'var(--term-green-dim)' }}>
          <span>DOSSIER: {item.filename}</span>
          <span style={{ color: tierColor }}>TIER: [{item.tier.toUpperCase()}]</span>
          <span>CATÉGORIE: [{item.category.toUpperCase()}]</span>
        </div>
      </div>

      {/* ── Locked ── */}
      {!isAvail && !alreadyDone && (
        <div className="border p-6" style={{ borderColor: '#3a0000', color: 'var(--term-red)' }}>
          <div className="text-xl mb-2">⊘ ACCÈS REFUSÉ — SÉCURITÉ ACTIVE</div>
          <div>Ce dossier requiert {item.requiredUnlocks} archives restaurées.</div>
          <div className="mt-2" style={{ color: '#883333' }}>Progression: {count} / {item.requiredUnlocks}</div>
          <TransitionLink href="/archive" onBeforeNavigate={restoreArchiveScroll} className="block mt-4 underline" style={{ color: 'var(--term-green)' }}>
            ← RETOURNER DÉBLOQUER D&apos;AUTRES DOSSIERS
          </TransitionLink>
        </div>
      )}

      {/* ── Already unlocked ── */}
      {showAlreadyDone && (
        <div className="border p-6 success-flash" style={{ borderColor: 'var(--term-green)' }}>
          <div className="text-xl glow mb-3">✓ ARCHIVE DÉJÀ RESTAURÉE</div>
          <div className="text-2xl mb-2" style={{ color: tierColor }}>{item.displayName}</div>
          <div className="text-sm leading-relaxed mt-3">{item.cardDescription}</div>
          <TransitionLink href="/archive" onBeforeNavigate={restoreArchiveScroll} className="block mt-6 underline text-sm" style={{ color: 'var(--term-green-dim)' }}>
            ← RETOUR
          </TransitionLink>
        </div>
      )}

      {/* ── Active puzzle ── */}
      {showActivePuzzle && (
        <>
          {/* Step A */}
          <div className="border p-4 mb-4" style={{ borderColor: 'var(--term-border)' }}>
            <div className="text-xl mb-3" style={{ color: 'var(--term-amber)' }}>
              ═══ ÉTAPE A : L&apos;ENQUÊTE ═══
            </div>
            <div className="border p-3 space-y-3" style={{ borderColor: 'var(--term-border)', background: 'rgba(51,255,51,0.04)' }}>
              <div className="flex gap-3">
                <span className="shrink-0 text-sm font-bold" style={{ color: 'var(--term-amber)', minWidth: '6.5rem' }}>[ MISSION   ]</span>
                <span className="text-base leading-relaxed" style={{ color: 'var(--term-green)' }}>{item.puzzle.missionText}</span>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 text-sm font-bold" style={{ color: 'var(--term-amber)', minWidth: '6.5rem' }}>[ CONTACTER ]</span>
                <span className="text-base" style={{ color: 'var(--term-green)' }}>{item.puzzle.contact}</span>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 text-sm font-bold" style={{ color: 'var(--term-amber)', minWidth: '6.5rem' }}>[ QUESTION  ]</span>
                <span className="text-base leading-snug" style={{ color: 'var(--term-green)' }}>{item.puzzle.question}</span>
              </div>
            </div>
          </div>

          {/* Step B */}
          <div className="border p-4 mb-4" style={{ borderColor: 'var(--term-border)' }}>
            <div className="text-xl mb-3" style={{ color: 'var(--term-amber)' }}>
              ═══ ÉTAPE B : CODE DE DÉCRYPTAGE ═══
            </div>

            {phase === 'success' && (
              <div className="success-flash p-4 border" style={{ borderColor: 'var(--term-green)' }}>
                <div className="text-xl glow mb-2">✓ ARCHIVE RESTAURÉE !</div>
                <div className="text-2xl mb-2" style={{ color: tierColor }}>{item.displayName}</div>
                <div className="text-base leading-relaxed mt-3">{item.cardDescription}</div>
                <TransitionLink href="/archive" onBeforeNavigate={restoreArchiveScroll} className="block mt-4 underline text-sm" style={{ color: 'var(--term-green-dim)' }}>
                  ← RETOUR À LA LISTE
                </TransitionLink>
              </div>
            )}

            {phase === 'decrypting' && (
              <div className="text-xl" style={{ color: 'var(--term-cyan)' }}>
                <span className="glitch-anim">DÉCRYPTAGE EN COURS...</span>
                <span className="ml-2 opacity-70 text-base">{glitchTxt}</span>
              </div>
            )}

            {(phase === 'idle' || phase === 'error') && (
              <>
                <div className="text-base mb-3 leading-relaxed" style={{ color: 'var(--term-green-mid)' }}>
                  Une fois que <span style={{ color: 'var(--term-green)' }}>{item.puzzle.contact}</span> vous a donné la réponse, tapez-la ici :
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: 'var(--term-green-mid)' }}>&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={answer}
                    onChange={e => { setAnswer(e.target.value); playKeyClick(); }}
                    onKeyDown={e => e.key === 'Enter' && validate()}
                    placeholder="ENTREZ LE MOT-CLÉ..."
                    className={`flex-1 py-1 px-2 text-base ${phase === 'error' ? 'shake' : ''}`}
                    style={{
                      borderBottom: `1px solid ${phase === 'error' ? 'var(--term-red)' : 'var(--term-green-mid)'}`,
                      color: phase === 'error' ? 'var(--term-red)' : 'var(--term-green)',
                    }}
                  />
                </div>

                {phase === 'error' && (
                  <div className="mb-3 text-base" style={{ color: 'var(--term-red)' }}>
                    ✗ CODE INVALIDE — ACCÈS REFUSÉ. VÉRIFIEZ L&apos;ORTHOGRAPHE.
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={validate}
                    className="border px-4 py-2 text-base transition-colors hover:bg-white/10"
                    style={{ borderColor: 'var(--term-amber)', color: 'var(--term-amber)' }}
                  >
                    [ VALIDER LE CODE ]
                  </button>

                  {item.puzzle.hint && (
                    <button
                      onClick={() => { setShowHint(v => !v); playKeyClick(); }}
                      className="border px-4 py-2 text-base transition-colors hover:bg-white/5"
                      style={{ borderColor: 'var(--term-green-mid)', color: 'var(--term-green-mid)' }}
                    >
                      {showHint ? '[ MASQUER L\'INDICE ]' : '[ INDICE S.O.S. ]'}
                    </button>
                  )}
                </div>

                {showHint && item.puzzle.hint && (
                  <div className="mt-4 p-3 border text-sm" style={{ borderColor: '#3a3a00', background: 'rgba(255,204,0,0.05)', color: 'var(--term-amber)' }}>
                    <span style={{ color: '#886600' }}>INDICE : </span>
                    {item.puzzle.hint}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <div className="mt-4 text-base" style={{ color: 'var(--term-green-dim)' }}>
        root@archive_famille:~#{' '}
        <span className="cursor" style={{ color: 'var(--term-green)' }}>█</span>
      </div>

      {phase === 'finale' && (
        <FinaleModal
          displayName={item.displayName}
          cardDescription={item.cardDescription}
          tierColor={tierColor}
        />
      )}
    </div>
  );
}
