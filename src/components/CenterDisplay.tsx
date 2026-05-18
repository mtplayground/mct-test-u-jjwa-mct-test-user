import type { ReactNode } from 'react'

type CenterDisplayProps = {
  children: ReactNode
}

export const CenterDisplay = ({ children }: CenterDisplayProps) => {
  return (
    <section
      aria-label="Center display bezel"
      className="rounded-[2rem] border border-white/6 bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(3,7,18,1)_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_30px_rgba(2,6,23,0.3)] sm:p-4"
    >
      <div className="mb-3 flex items-center justify-between px-2 text-[0.65rem] font-black uppercase tracking-[0.28em] text-slate-500">
        <span>Screen</span>
        <span>Display</span>
      </div>

      <div
        aria-label="Inner display region"
        className="min-h-[28rem] w-full overflow-hidden rounded-[1.5rem] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(2,6,23,1)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:min-h-[32rem] xl:min-h-[36rem]"
      >
        <div className="w-full overflow-auto px-5 py-6 sm:px-6 sm:py-8">
          {children}
        </div>
      </div>
    </section>
  )
}

export const ScreenBezel = CenterDisplay
