import { formatDuration } from '../formatDuration'
import { useSession } from '../context/useSession'
import type { GameId } from '../context/session'

const gameLabels: Record<GameId, string> = {
  '2048': '2048',
  pacman: 'Pac-Man',
  hexgl: 'HexGL',
}

const gameOrder: GameId[] = ['2048', 'pacman', 'hexgl']

export const GoodbyeView = () => {
  const { state, dispatch } = useSession()

  return (
    <section className="flex h-full min-h-full items-center justify-center">
      <div className="w-full max-w-3xl rounded-[1.5rem] border border-cyan-400/10 bg-slate-950/40 px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm sm:px-10 sm:py-10">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.42em] text-cyan-300/70">
            Session Complete
          </p>
          <h1 className="mt-5 font-mono text-3xl font-semibold uppercase tracking-[0.12em] text-cyan-100 sm:text-4xl">
            Thanks for playing!
          </h1>
          <p className="mt-4 font-mono text-sm leading-7 text-slate-300 sm:text-base">
            Total play time: {formatDuration(state.elapsedSeconds * 1000)}
          </p>
        </div>

        <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-slate-400 sm:text-xs">
            <span>Game</span>
            <span>Time Logged</span>
          </div>
          <div className="mt-3 space-y-3">
            {gameOrder.map((gameId) => (
              <div
                key={gameId}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3"
              >
                <span className="font-mono text-sm uppercase tracking-[0.16em] text-slate-200 sm:text-base">
                  {gameLabels[gameId]}
                </span>
                <span className="font-mono text-sm text-cyan-100 sm:text-base">
                  {formatDuration(state.elapsedSecondsByGame[gameId] * 1000)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-200/45 hover:bg-cyan-200/15"
            onClick={() => {
              dispatch({ type: 'RESET' })
            }}
            type="button"
          >
            Play Again
          </button>
        </div>
      </div>
    </section>
  )
}
