import { hexglBasePath } from '../config'
import { gameRegistry } from '../games'

export const WelcomeView = () => {
  return (
    <section className="space-y-5">
      <p className="text-sm font-bold uppercase tracking-[0.32em] text-joycon-left">
        Routing Skeleton
      </p>
      <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
        Console layout scaffolded.
      </h1>
      <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
        The app now has a directory structure for components, games, context,
        and views, plus a screen router that can grow as additional issues add
        real screens and gameplay.
      </p>
      <div className="flex flex-wrap gap-3 font-mono text-sm text-slate-200">
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
    </section>
  )
}
