import type { ReactNode } from 'react'

type LeftJoyconPanelProps = {
  children: ReactNode
}

export const LeftJoyconPanel = ({ children }: LeftJoyconPanelProps) => {
  return (
    <section
      aria-label="Left joycon region"
      className="relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[2rem] border border-cyan-200/35 bg-[linear-gradient(180deg,rgba(34,211,238,0.98)_0%,rgba(14,165,233,0.96)_48%,rgba(8,145,178,0.98)_100%)] px-5 py-6 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-16px_30px_rgba(8,47,73,0.22)]"
    >
      <div className="pointer-events-none absolute inset-y-6 left-3 w-px bg-white/20" />
      <div className="pointer-events-none absolute right-4 top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[0.65rem] font-black uppercase tracking-[0.34em] text-slate-950/65">
            Left Joycon
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950/70">
            Game menu slot
          </p>
        </div>
        <div className="h-4 w-4 rounded-full border border-white/40 bg-white/20 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
      </div>

      <div className="relative mt-6 flex items-center justify-center">
        <div className="absolute h-28 w-28 rounded-full bg-slate-950/10 blur-xl" />
        <div className="relative grid h-24 w-24 place-items-center rounded-full border border-slate-950/20 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.32),rgba(15,23,42,0.22)_55%,rgba(15,23,42,0.45)_100%)] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2),0_18px_28px_rgba(14,116,144,0.25)]">
          <div className="h-12 w-12 rounded-full border border-slate-950/25 bg-slate-900/70 shadow-[inset_0_2px_8px_rgba(255,255,255,0.12)]" />
        </div>
      </div>

      <div className="mt-8 grid place-items-center">
        <div className="relative h-24 w-24">
          <div className="absolute left-1/2 top-0 h-full w-7 -translate-x-1/2 rounded-2xl border border-slate-950/15 bg-slate-950/18 shadow-[inset_0_1px_4px_rgba(255,255,255,0.15)]" />
          <div className="absolute left-0 top-1/2 h-7 w-full -translate-y-1/2 rounded-2xl border border-slate-950/15 bg-slate-950/18 shadow-[inset_0_1px_4px_rgba(255,255,255,0.15)]" />
          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-slate-950/30 shadow-[0_0_12px_rgba(15,23,42,0.16)]" />
          <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/45" />
          <div className="absolute bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/28" />
          <div className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white/28" />
          <div className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white/45" />
        </div>
      </div>

      <div className="relative mt-8 rounded-[1.75rem] border border-slate-950/15 bg-slate-950/12 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        {children}
      </div>
    </section>
  )
}

export const LeftJoycon = LeftJoyconPanel
