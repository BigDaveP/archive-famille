'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TransitionLink from '@/components/TransitionLink';
import { TOTAL_ITEMS } from '@/lib/data';

function restoreArchiveScroll() {
  sessionStorage.setItem('havre:archive-restore', '1');
}

export default function FinaleModal({
  displayName,
  cardDescription,
  tierColor,
}: {
  displayName: string;
  cardDescription: string;
  tierColor: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="finale-title"
    >
      <div
        className="modal-panel finale-reveal font-mono"
        style={{ borderColor: 'var(--term-gold)', background: 'var(--term-bg)' }}
      >
        <div className="modal-panel-header" style={{ borderColor: 'var(--term-gold)', color: 'var(--term-gold)' }}>
          <span>◆ ARCHIVE_FAMILLE — TRANSMISSION FINALE</span>
          <span className="modal-panel-dots">● ● ●</span>
        </div>

        <div className="modal-panel-body text-center">
          <pre className="text-xs mb-4 leading-tight glow-gold" style={{ color: 'var(--term-gold)' }}>
{`╔════════════════════════════════════════╗
║   NOYAU FAMILIAL — RESTAURATION 100%   ║
╚════════════════════════════════════════╝`}
          </pre>
          <div id="finale-title" className="text-xl md:text-2xl glow-gold mb-3" style={{ color: 'var(--term-gold)' }}>
            ✓ SYSTÈME RESTAURÉ AVEC SUCCÈS
          </div>
          <div className="text-lg mb-2" style={{ color: tierColor }}>{displayName}</div>
          <div className="text-sm leading-relaxed mb-3" style={{ color: 'var(--term-green)' }}>
            {cardDescription}
          </div>
          <div className="text-sm leading-relaxed space-y-2 mb-5" style={{ color: 'var(--term-green-mid)' }}>
            <p>Félicitations, agents. Vous avez restauré les {TOTAL_ITEMS} archives perdues.</p>
            <p>L&apos;Archive Famille est sauvegardée. Le noyau est stable à 100%.</p>
            <p className="text-base glow-gold" style={{ color: 'var(--term-gold)' }}>
              Vous allez recevoir une livraison officielle par notre unité &quot;bêta&quot;.
            </p>
          </div>
          <TransitionLink
            href="/archive"
            onBeforeNavigate={restoreArchiveScroll}
            className="inline-block border px-5 py-2 text-sm transition-colors hover:bg-white/10"
            style={{ borderColor: 'var(--term-gold)', color: 'var(--term-gold)' }}
          >
            [ RETOUR AU TERMINAL ]
          </TransitionLink>
        </div>
      </div>
    </div>,
    document.body,
  );
}
