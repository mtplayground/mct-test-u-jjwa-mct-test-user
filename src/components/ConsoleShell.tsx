import type { ReactNode } from 'react'

type ConsoleShellProps = {
  leftJoycon: ReactNode
  screen: ReactNode
  rightJoycon: ReactNode
}

export const ConsoleShell = ({
  leftJoycon,
  screen,
  rightJoycon,
}: ConsoleShellProps) => {
  return (
    <section
      aria-label="Console body"
      className="relative w-full max-w-[74rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(51,65,85,0.96)_0%,rgba(30,41,59,0.98)_56%,rgba(15,23,42,1)_100%)] shadow-[0_35px_120px_rgba(2,6,23,0.65)] ring-1 ring-white/5 md:min-h-[38rem] md:rounded-[3rem]"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-b-[2rem] bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
      <div className="grid gap-0 md:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)_minmax(12rem,15rem)]">
        <aside className="bg-console-panel/20 px-3 py-3 md:px-4 md:py-4">
          {leftJoycon}
        </aside>

        <section className="bg-console-panel/95 px-6 py-10 sm:px-8 md:px-10 md:py-12">
          <div className="rounded-[1.75rem] border border-screen-bezel/80 bg-screen-bezel p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="rounded-[1.25rem] bg-slate-950/90 px-6 py-10">
              {screen}
            </div>
          </div>
        </section>

        <aside className="bg-joycon-right px-6 py-8 text-slate-950">
          {rightJoycon}
        </aside>
      </div>
    </section>
  )
}
