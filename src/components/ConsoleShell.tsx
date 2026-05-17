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
    <section className="w-full overflow-hidden rounded-[2rem] border border-console-highlight/60 bg-console-body shadow-[0_30px_100px_rgba(2,6,23,0.55)]">
      <div className="grid gap-0 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,14rem)]">
        <aside className="bg-joycon-left px-6 py-8 text-slate-950">
          {leftJoycon}
        </aside>

        <section className="bg-console-panel px-6 py-12 sm:px-10">
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
