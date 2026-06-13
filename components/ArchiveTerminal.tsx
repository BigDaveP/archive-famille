'use client';
import { useState, useMemo, useEffect } from 'react';
import TransitionLink from '@/components/TransitionLink';
import { ITEMS, TIER_COLORS, TOTAL_ITEMS, nextLockedTier, TIER_THRESHOLDS, type Category, type Tier } from '@/lib/data';
import { useProgress } from '@/lib/storage';
import { playKeyClick } from '@/lib/audio';

const ARCHIVE_SCROLL_KEY = 'havre:archive-scroll';
const ARCHIVE_RESTORE_FLAG = 'havre:archive-restore';
// Durée de l'animation PageShell + petite marge
const SCROLL_RESTORE_DELAY = 600;

type CatFilter    = Category | 'Tous';
type TierFilter   = Tier | 'Tous';
type StatusFilter = 'Tous' | 'Disponible' | 'Verrouillé' | 'Débloqué';

const DIVIDER = '─'.repeat(72);

export default function ArchiveTerminal() {
  const { count, isUnlocked, hydrated } = useProgress();
  const [cat, setCat]       = useState<CatFilter>('Tous');
  const [tier, setTier]     = useState<TierFilter>('Tous');
  const [status, setStatus] = useState<StatusFilter>('Tous');
  const [search, setSearch] = useState('');

  // Empêcher le navigateur de restaurer un scroll incorrect
  useEffect(() => {
    if (!('scrollRestoration' in history)) return;
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    return () => { history.scrollRestoration = previous; };
  }, []);

  // Sauvegarder la position avant de quitter la liste
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(ARCHIVE_SCROLL_KEY, String(window.scrollY));
    };
    window.addEventListener('scroll', saveScroll, { passive: true });
    return () => {
      saveScroll();
      window.removeEventListener('scroll', saveScroll);
    };
  }, []);

  // Restaurer la position uniquement au retour depuis une énigme
  useEffect(() => {
    if (sessionStorage.getItem(ARCHIVE_RESTORE_FLAG) !== '1') return;
    sessionStorage.removeItem(ARCHIVE_RESTORE_FLAG);

    const raw = sessionStorage.getItem(ARCHIVE_SCROLL_KEY);
    if (!raw) return;

    const y = Number(raw);
    if (!Number.isFinite(y)) return;

    const timer = window.setTimeout(() => {
      window.scrollTo(0, y);
    }, SCROLL_RESTORE_DELAY);

    return () => window.clearTimeout(timer);
  }, []);

  function itemStatus(id: string, req: number) {
    if (isUnlocked(id))  return 'Débloqué';
    if (count >= req)    return 'Disponible';
    return 'Verrouillé';
  }

  const filtered = useMemo(() => ITEMS.filter(item => {
    const s = itemStatus(item.id, item.requiredUnlocks);
    if (cat    !== 'Tous' && item.category !== cat)   return false;
    if (tier   !== 'Tous' && item.tier     !== tier)  return false;
    if (status !== 'Tous' && s             !== status) return false;
    if (search && !item.displayName.toLowerCase().includes(search.toLowerCase()) &&
        !item.filename.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [cat, tier, status, search, count, isUnlocked]); // eslint-disable-line react-hooks/exhaustive-deps

  const filled  = Math.round((count / TOTAL_ITEMS) * 20);
  const pct     = Math.round((count / TOTAL_ITEMS) * 100);
  const nextTier = nextLockedTier(count);

  function btn(label: string, active: boolean, onClick: () => void, color?: string) {
    return (
      <button
        key={label}
        onClick={() => { onClick(); playKeyClick(); }}
        className="px-2 py-0.5 border text-sm transition-colors"
        style={{
          borderColor: active ? (color || 'var(--term-green)') : 'var(--term-border)',
          color:       active ? (color || 'var(--term-green)') : 'var(--term-green-dim)',
          background:  active ? 'rgba(51,255,51,0.05)' : 'transparent',
        }}
      >
        [{label}]
      </button>
    );
  }

  return (
    <div className="crt min-h-screen p-3 md:p-6" style={{ background: 'var(--term-bg)', color: 'var(--term-green)' }}>

      {/* ── Header ──────────────────────────────────────── */}
      <div className="border mb-4 p-4" style={{ borderColor: 'var(--term-border)' }}>
        <div className="text-center text-xl glow mb-1">
          [ ARCHIVE_FAMILLE v0.95 ] — STATION DE RECHERCHE NUMÉRIQUE
        </div>
        <div className="text-center text-sm" style={{ color: 'var(--term-green-dim)' }}>
          {DIVIDER}
        </div>
      </div>

      {/* ── Progress ────────────────────────────────────── */}
      <div className="border mb-4 p-4" style={{ borderColor: 'var(--term-border)' }}>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span style={{ color: 'var(--term-amber)' }}>INTÉGRITÉ DU SYSTÈME:</span>
          <span className="font-mono">
            {'['}
            <span className="bar-animated" style={{ color: 'var(--term-green)' }}>
              {'█'.repeat(filled)}
            </span>
            <span style={{ color: 'var(--term-border)' }}>{'░'.repeat(20 - filled)}</span>
            {']'}
            {' '}
            <strong>{count}</strong>/{TOTAL_ITEMS}
            {' '}({pct}%)
          </span>
        </div>
        {!hydrated ? null : nextTier ? (
          <div style={{ color: 'var(--term-amber)' }}>
            ⚠ ALERTE: DÉBLOQUEZ {TIER_THRESHOLDS[nextTier] - count} ARCHIVES DE PLUS POUR ACCÉDER AU NIVEAU {nextTier.toUpperCase()}
          </div>
        ) : (
          <div style={{ color: 'var(--term-green)' }}>
            ✓ TOUS LES NIVEAUX SONT ACCESSIBLES — {count}/{TOTAL_ITEMS} ARCHIVES RESTAURÉES
          </div>
        )}
      </div>

      {/* ── Filters ─────────────────────────────────────── */}
      <div className="border mb-4 p-3" style={{ borderColor: 'var(--term-border)' }}>
        <div className="flex flex-wrap gap-2 mb-2">
          {(['Tous','Personnage','Objet','Lieu','Sort'] as CatFilter[]).map(c =>
            btn(c.toUpperCase(), cat === c, () => setCat(c))
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {(['Tous','Vert','Bleu','Or','Jaune','Rouge'] as TierFilter[]).map(t =>
            btn(t.toUpperCase(), tier === t, () => setTier(t),
              t !== 'Tous' ? TIER_COLORS[t as Tier] : undefined)
          )}
          <span style={{ color: 'var(--term-border)' }}>│</span>
          {(['Tous','Disponible','Verrouillé','Débloqué'] as StatusFilter[]).map(s =>
            btn(s.toUpperCase(), status === s, () => setStatus(s))
          )}
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="RECHERCHER UN DOSSIER..."
          className="w-full px-2 py-1 text-sm"
          style={{ borderBottom: '1px solid var(--term-border)' }}
        />
      </div>

      {/* ── File list ───────────────────────────────────── */}
      <div className="border" style={{ borderColor: 'var(--term-border)' }}>
        <div className="px-4 py-2 text-sm border-b flex justify-between"
          style={{ borderColor: 'var(--term-border)', color: 'var(--term-green-dim)' }}>
          <span>DOSSIERS DISPONIBLES</span>
          <span>{filtered.length} RÉSULTATS</span>
        </div>

        <div className="divide-y" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
          {filtered.map(item => {
            const s = itemStatus(item.id, item.requiredUnlocks);
            const isAvail   = s === 'Disponible';
            const isDone    = s === 'Débloqué';
            const isLocked  = s === 'Verrouillé';

            const rowColor = isDone   ? 'var(--term-green)'
                           : isAvail  ? 'var(--term-amber)'
                           : '#2a2a2a';

            const statusLabel = isDone   ? '[DÉBLOQUÉ  ]'
                              : isAvail  ? '[DISPONIBLE]'
                              : '[VERROUILLÉ]';

            return (
              <div
                key={item.id}
                className="px-3 py-1.5 flex flex-wrap md:flex-nowrap items-center gap-2 text-sm hover:bg-white/5 transition-colors"
                style={{ borderTopColor: 'var(--term-border)' }}
              >
                {/* Status */}
                <span className="font-mono shrink-0 text-xs" style={{ color: rowColor, minWidth: '7.5rem' }}>
                  {statusLabel}
                </span>

                {/* ID */}
                <span className="shrink-0 text-xs" style={{ color: 'var(--term-green-dim)', minWidth: '2.5rem' }}>
                  {item.id} &gt;&gt;
                </span>

                {/* Filename */}
                <span className="flex-1 font-mono truncate" style={{ color: rowColor }}>
                  {item.filename}
                </span>

                {/* Tier badge */}
                <span className="shrink-0 font-mono text-xs" style={{ color: TIER_COLORS[item.tier] }}>
                  [{item.tier.toUpperCase()}]
                </span>

                {/* Action */}
                {(isAvail || isDone) ? (
                  <TransitionLink
                    href={`/archive/${item.id}`}
                    className="shrink-0 border px-2 py-0.5 text-xs font-mono transition-colors hover:bg-white/10"
                    style={{ borderColor: rowColor, color: rowColor }}
                  >
                    {isDone ? '[VOIR]' : '[OUVRIR]'}
                  </TransitionLink>
                ) : (
                  <span className="shrink-0 text-xs" style={{ color: '#333' }}>
                    (besoin: {item.requiredUnlocks})
                  </span>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--term-green-dim)' }}>
              AUCUN DOSSIER CORRESPOND À CES CRITÈRES
            </div>
          )}
        </div>
      </div>

      {/* ── Footer prompt ───────────────────────────────── */}
      <div className="mt-4 text-base" style={{ color: 'var(--term-green-dim)' }}>
        root@archive_famille:~#{' '}
        <span className="cursor" style={{ color: 'var(--term-green)' }}>█</span>
      </div>
    </div>
  );
}
