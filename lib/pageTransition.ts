/**
 * Module-level exit coordinator.
 *
 * The active PageShell registers its exit callback here.
 * TransitionLink (and any imperative navigation) calls triggerPageExit()
 * to play the CRT power-off animation before the route change fires.
 */

type ExitFn = (done: () => void) => void;

let _exitFn: ExitFn | null = null;

export function registerPageExit(fn: ExitFn): void {
  _exitFn = fn;
}

export function unregisterPageExit(): void {
  _exitFn = null;
}

/** Play exit animation, then call done(). Falls back to immediate done(). */
export function triggerPageExit(done: () => void): void {
  if (_exitFn) {
    _exitFn(done);
  } else {
    done();
  }
}
