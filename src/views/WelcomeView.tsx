import { hexglBasePath } from '../config'
import { gameRegistry } from '../games'

export const WelcomeView = () => {
  return (
    <section className="flex h-full min-h-full items-center justify-center">
      <div className="w-full max-w-2xl rounded-[1.5rem] border border-cyan-400/10 bg-slate-950/35 px-6 py-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm sm:px-10 sm:py-14">
        <p className="font-mono text-xs uppercase tracking-[0.44em] text-cyan-300/75">
          Boot Sequence Ready
        </p>
        <h1 className="mt-6 font-mono text-3xl font-semibold uppercase tracking-[0.14em] text-cyan-100 sm:text-4xl">
          Choose a game to start playing
        </h1>
        <p className="mt-5 font-mono text-sm leading-7 text-slate-300 sm:text-base">
          Select a cartridge from the left controller to initialize the arcade
          session.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-slate-300 sm:text-sm">
          <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            route=welcome
          </p>
          <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            VITE_HEXGL_BASE_PATH={hexglBasePath}
          </p>
          <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            registeredGames={gameRegistry.length}
          </p>
        </div>
      </div>
    </section>
  )
}
