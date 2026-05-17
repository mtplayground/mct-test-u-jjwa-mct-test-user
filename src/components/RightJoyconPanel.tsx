import type { ReactNode } from 'react'

type RightJoyconPanelProps = {
  children: ReactNode
}

const buttonLabels = [
  { className: 'top-0 left-1/2 -translate-x-1/2', label: 'X' },
  { className: 'top-1/2 right-0 -translate-y-1/2', label: 'A' },
  { className: 'bottom-0 left-1/2 -translate-x-1/2', label: 'B' },
  { className: 'top-1/2 left-0 -translate-y-1/2', label: 'Y' },
]

export const RightJoyconPanel = ({ children }: RightJoyconPanelProps) => {
  return (
    <section
      aria-label="Right joycon region"
      className="relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[2rem] border border-rose-200/35 bg-[linear-gradient(180deg,rgba(255,107,107,0.98)_0%,rgba(248,113,113,0.96)_46%,rgba(220,38,38,0.98)_100%)] px-5 py-6 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-16px_32px_rgba(127,29,29,0.26)]"
    >
      <div className="pointer-events-none absolute inset-y-6 right-3 w-px bg-white/20" />
      <div className="pointer-events-none absolute left-4 top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex items-start justify-between gap-4 text-right">
        <div className="h-4 w-4 rounded-full border border-white/40 bg-white/20 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
        <div className="ml-auto">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.34em] text-slate-950/65">
            Right Joycon
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950/70">
            End button slot
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex items-center justify-center">
        <div className="relative h-24 w-24">
          {buttonLabels.map(({ className, label }) => (
            <div
              key={label}
              className={`absolute ${className} grid h-8 w-8 place-items-center rounded-full border border-slate-950/20 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),rgba(15,23,42,0.18)_55%,rgba(15,23,42,0.38)_100%)] text-[0.65rem] font-black shadow-[inset_0_2px_6px_rgba(255,255,255,0.2),0_10px_18px_rgba(127,29,29,0.16)]`}
            >
              {label}
            </div>
          ))}
          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-950/18 shadow-[0_0_14px_rgba(15,23,42,0.14)]" />
        </div>
      </div>

      <div className="relative mt-8 flex items-center justify-center">
        <div className="absolute h-28 w-28 rounded-full bg-slate-950/10 blur-xl" />
        <div className="relative grid h-24 w-24 place-items-center rounded-full border border-slate-950/20 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),rgba(15,23,42,0.22)_55%,rgba(15,23,42,0.46)_100%)] shadow-[inset_0_3px_10px_rgba(255,255,255,0.18),0_18px_28px_rgba(127,29,29,0.25)]">
          <div className="h-12 w-12 rounded-full border border-slate-950/25 bg-slate-900/72 shadow-[inset_0_2px_8px_rgba(255,255,255,0.12)]" />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3 pr-1">
        <div className="h-3 w-3 rounded-full bg-white/30" />
        <div className="h-3 w-3 rounded-full bg-white/45" />
        <div className="h-3 w-3 rounded-full bg-white/30" />
      </div>

      <div className="relative mt-8 rounded-[1.75rem] border border-slate-950/15 bg-slate-950/12 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        {children}
      </div>
    </section>
  )
}

export const RightJoycon = RightJoyconPanel
