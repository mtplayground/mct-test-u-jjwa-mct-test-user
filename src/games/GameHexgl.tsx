import { useEffect, useRef } from 'react'

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

  useEffect(() => {
    focusHexglFrame(iframeRef.current)
  }, [])

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
          <iframe
            aria-label="HexGL game frame"
            className="h-full w-full border-0"
            onLoad={() => {
              focusHexglFrame(iframeRef.current)
            }}
            ref={iframeRef}
            src={`${hexglBasePath}index.html`}
            tabIndex={0}
            title="HexGL"
          />
        </div>
      </div>
    </section>
  )
}
