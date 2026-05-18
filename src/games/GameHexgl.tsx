import { useEffect, useRef, useState } from 'react'

import { hexglBasePath } from '../config'

const focusHexglFrame = (frame: HTMLIFrameElement | null) => {
  if (!frame) {
    return
  }

  frame.focus()

  if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) {
    return
  }

  frame.contentWindow?.focus()
}

export const GameHexgl = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [isBooted, setIsBooted] = useState(false)

  useEffect(() => {
    if (!isBooted) {
      return
    }

    focusHexglFrame(iframeRef.current)
  }, [isBooted])

  return (
    <section className="flex h-full min-h-full flex-col bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_45%),linear-gradient(180deg,#030712_0%,#020617_100%)]">
      <div className="flex items-center justify-between border-b border-cyan-400/10 bg-slate-950/70 px-4 py-3 sm:px-5">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-cyan-300/70">
            Antigrav Circuit
          </p>
          <h1 className="mt-2 font-mono text-2xl font-semibold uppercase tracking-[0.12em] text-cyan-50 sm:text-3xl">
            HexGL
          </h1>
        </div>
        <p className="max-w-xs text-right font-mono text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">
          Focus locks to the race frame for keyboard control.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 p-2 sm:p-3">
        <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] border border-cyan-300/10 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          {!isBooted ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_45%),rgba(2,6,23,0.92)] px-6 text-center">
              <p className="max-w-lg font-mono text-sm uppercase tracking-[0.2em] text-cyan-100/80">
                Load the full HexGL bundle only when you are ready to race.
              </p>
              <button
                className="rounded-full border border-cyan-300/40 bg-cyan-300/12 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-[0.22em] text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
                onClick={() => {
                  setIsBooted(true)
                }}
                type="button"
              >
                Launch Race
              </button>
            </div>
          ) : null}
          <iframe
            aria-label="HexGL game frame"
            className="h-full w-full border-0"
            onLoad={() => {
              if (isBooted) {
                focusHexglFrame(iframeRef.current)
              }
            }}
            ref={iframeRef}
            src={isBooted ? `${hexglBasePath}index.html` : 'about:blank'}
            tabIndex={0}
            title="HexGL"
          />
        </div>
      </div>
    </section>
  )
}
