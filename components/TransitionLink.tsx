'use client';
import { useRouter } from 'next/navigation';
import { triggerPageExit } from '@/lib/pageTransition';
import { playStaticBurst, playGlitch } from '@/lib/audio';

interface Props {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Drop-in replacement for <Link> that plays the CRT power-off transition
 * before navigating. Use everywhere you'd use next/link for page navigation.
 */
export default function TransitionLink({ href, className, style, children }: Props) {
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    // Sound effects — static burst + a few glitch pulses
    playStaticBurst();
    let ticks = 0;
    const iv = setInterval(() => {
      playGlitch();
      if (++ticks >= 3) clearInterval(iv);
    }, 75);

    triggerPageExit(() => router.push(href));
  }

  return (
    <a href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </a>
  );
}
