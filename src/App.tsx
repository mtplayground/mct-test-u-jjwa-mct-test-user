import { hexglBasePath } from './config'

function App() {
  return (
    <main className="min-h-screen bg-console-backdrop px-4 py-8 text-slate-50 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="w-full overflow-hidden rounded-[2rem] border border-console-highlight/60 bg-console-body shadow-[0_30px_100px_rgba(2,6,23,0.55)]">
          <div className="grid gap-0 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,14rem)]">
            <aside className="bg-joycon-left px-6 py-8 text-slate-950">
              <p className="text-xs font-black uppercase tracking-[0.28em]">
                Left Joycon
              </p>
              <div className="mt-8 h-24 w-24 rounded-full border-8 border-slate-950/15 bg-white/20" />
            </aside>

            <div className="bg-console-panel px-6 py-12 sm:px-10">
              <div className="rounded-[1.75rem] border border-screen-bezel/80 bg-screen-bezel p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="rounded-[1.25rem] bg-slate-950/90 px-6 py-10">
                  <p className="text-sm font-bold uppercase tracking-[0.32em] text-joycon-left">
                    Issue #2
                  </p>
                  <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Tailwind CSS is wired in.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                    The project now has Tailwind, PostCSS, autoprefixer, and a
                    custom arcade theme with joycon, console, and screen bezel
                    tokens.
                  </p>
                  <p className="mt-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-slate-200">
                    VITE_HEXGL_BASE_PATH={hexglBasePath}
                  </p>
                </div>
              </div>
            </div>

            <aside className="bg-joycon-right px-6 py-8 text-slate-950">
              <p className="text-right text-xs font-black uppercase tracking-[0.28em]">
                Right Joycon
              </p>
              <div className="mt-8 ml-auto grid w-24 grid-cols-2 gap-3">
                <div className="aspect-square rounded-full bg-white/30" />
                <div className="aspect-square rounded-full bg-white/45" />
                <div className="aspect-square rounded-full bg-white/45" />
                <div className="aspect-square rounded-full bg-white/30" />
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
