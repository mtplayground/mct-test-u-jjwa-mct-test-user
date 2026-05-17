import { useSession } from '../context/useSession'
import { gameRegistry } from '../games'

export const GameMenu = () => {
  const {
    state: { selectedGame },
    dispatch,
  } = useSession()

  return (
    <div className="space-y-3">
      {gameRegistry.map((game) => {
        const isActive = selectedGame === game.id

        return (
          <button
            aria-pressed={isActive}
            className={`group relative flex w-full items-center justify-between rounded-[1.35rem] border px-4 py-4 text-left transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-300 ${
              isActive
                ? 'border-slate-950/25 bg-slate-950/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_24px_rgba(8,47,73,0.16)]'
                : 'border-slate-950/12 bg-white/18 hover:border-slate-950/20 hover:bg-white/28'
            }`}
            data-active={isActive}
            key={game.id}
            onClick={() => {
              dispatch({ type: 'SELECT_GAME', gameId: game.id })
            }}
            type="button"
          >
            <div>
              <p className="text-[0.7rem] font-black uppercase tracking-[0.34em] text-slate-950/50">
                Cartridge
              </p>
              <p className="mt-2 text-lg font-black uppercase tracking-[0.08em] text-slate-950">
                {game.label}
              </p>
            </div>
            <div
              className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-black transition ${
                isActive
                  ? 'border-slate-950/25 bg-slate-950/18 text-slate-950'
                  : 'border-slate-950/15 bg-white/25 text-slate-950/65 group-hover:border-slate-950/25 group-hover:bg-white/40'
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
