import { useSession } from '../context/useSession'
import { gameRegistry } from '../games'

export const GameMenu = () => {
  const {
    state: { selectedGame },
    dispatch,
  } = useSession()

  return (
    <div className="space-y-3 sm:space-y-3.5">
      {gameRegistry.map((game) => {
        const isActive = selectedGame === game.id

        return (
          <button
            aria-pressed={isActive}
            className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[1.45rem] border px-4 py-4 text-left transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-300 active:translate-y-[1px] sm:px-4 sm:py-4 md:px-5 md:py-[1.05rem] ${
              isActive
                ? 'border-cyan-50/40 bg-[linear-gradient(135deg,rgba(15,23,42,0.24)_0%,rgba(255,255,255,0.2)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(255,255,255,0.08),0_18px_30px_rgba(8,47,73,0.2),0_0_32px_rgba(34,211,238,0.18)]'
                : 'border-slate-950/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.14)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] hover:-translate-y-0.5 hover:border-slate-950/20 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.18)_100%)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_24px_rgba(8,47,73,0.12)]'
            }`}
            data-active={isActive}
            key={game.id}
            onClick={() => {
              dispatch({ type: 'SELECT_GAME', gameId: game.id })
            }}
            type="button"
          >
            <div
              className={`pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-60'
              }`}
            />
            <div
              className={`pointer-events-none absolute inset-y-3 right-3 w-20 rounded-full blur-2xl transition duration-300 ${
                isActive
                  ? 'bg-cyan-100/25 opacity-100'
                  : 'bg-white/0 opacity-0 group-hover:bg-white/20 group-hover:opacity-100'
              }`}
            />
            <div>
              <p
                className={`text-[0.7rem] font-black uppercase tracking-[0.34em] transition-colors duration-300 ${
                  isActive ? 'text-slate-950/70' : 'text-slate-950/50'
                }`}
              >
                Cartridge
              </p>
              <p
                className={`mt-2 text-base font-black uppercase tracking-[0.1em] transition-colors duration-300 sm:text-lg ${
                  isActive ? 'text-slate-950' : 'text-slate-950/90'
                }`}
              >
                {game.label}
              </p>
            </div>
            <div
              className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border text-sm font-black transition-all duration-300 sm:h-11 sm:w-11 ${
                isActive
                  ? 'border-cyan-50/45 bg-slate-950/22 text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_24px_rgba(34,211,238,0.22)]'
                  : 'border-slate-950/15 bg-white/25 text-slate-950/65 group-hover:border-slate-950/25 group-hover:bg-white/40 group-hover:text-slate-950/85'
              }`}
            >
              {isActive ? 'ON' : 'GO'}
            </div>
          </button>
        )
      })}
    </div>
  )
}
