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
      className="relative flex h-full min-h-[16rem] flex-col overflow-hidden rounded-[2rem] border border-rose-100/35 bg-[linear-gradient(180deg,rgba(254,202,202,0.5)_0%,rgba(251,146,146,0.98)_12%,rgba(248,113,113,0.97)_44%,rgba(220,38,38,0.99)_100%)] px-4 py-5 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-18px_34px_rgba(127,29,29,0.28),0_20px_36px_rgba(127,29,29,0.2)] transition-transform duration-300 sm:px-5 sm:py-6 xl:min-h-[18rem]"
    >
      <div className="pointer-events-none absolute inset-x-5 top-0 h-16 rounded-b-[1.75rem] bg-gradient-to-b from-white/25 to-transparent blur-xl" />
      <div className="pointer-events-none absolute inset-y-5 right-3 w-px bg-white/20 sm:inset-y-6" />
      <div className="pointer-events-none absolute left-4 top-10 h-28 w-28 rounded-full bg-white/14 blur-2xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-32 w-24 rounded-l-full bg-slate-950/8 blur-2xl" />

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

      <div className="relative mt-5 flex items-center justify-center sm:mt-6">
        <div className="relative h-24 w-24">
          {buttonLabels.map(({ className, label }) => (
            <div
              key={label}
              className={`absolute ${className} grid h-8 w-8 place-items-center rounded-full border border-slate-950/20 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.44),rgba(15,23,42,0.18)_55%,rgba(15,23,42,0.4)_100%)] text-[0.65rem] font-black shadow-[inset_0_2px_6px_rgba(255,255,255,0.2),0_10px_18px_rgba(127,29,29,0.16)]`}
            >
              {label}
            </div>
          ))}
          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-950/18 shadow-[0_0_14px_rgba(15,23,42,0.14)]" />
        </div>
      </div>

      <div className="relative mt-7 flex items-center justify-center sm:mt-8">
        <div className="absolute h-28 w-28 rounded-full bg-slate-950/10 blur-xl" />
        <div className="relative grid h-24 w-24 place-items-center rounded-full border border-slate-950/20 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.34),rgba(15,23,42,0.22)_55%,rgba(15,23,42,0.48)_100%)] shadow-[inset_0_3px_10px_rgba(255,255,255,0.18),0_18px_28px_rgba(127,29,29,0.25)]">
          <div className="h-12 w-12 rounded-full border border-slate-950/25 bg-slate-900/74 shadow-[inset_0_2px_8px_rgba(255,255,255,0.12),0_0_0_1px_rgba(255,255,255,0.04)]" />
        </div>
      </div>

      <div className="mt-7 flex justify-end gap-3 pr-1 sm:mt-8">
        <div className="h-3 w-3 rounded-full bg-white/30" />
        <div className="h-3 w-3 rounded-full bg-white/45" />
        <div className="h-3 w-3 rounded-full bg-white/30" />
      </div>

      <div className="relative mt-6 rounded-[1.75rem] border border-slate-950/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.16)_0%,rgba(15,23,42,0.12)_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_16px_28px_rgba(127,29,29,0.12)] sm:mt-8 sm:p-4">
        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        {children}
      </div>
    </section>
  )
}

export const RightJoycon = RightJoyconPanel
