import { useSession } from '../context/useSession'

export const EndPlayingButton = () => {
  const {
    state: { isEnded, selectedGame },
    dispatch,
  } = useSession()

  const isDisabled = selectedGame === null || isEnded

  return (
    <button
      aria-disabled={isDisabled}
      className={`group relative w-full overflow-hidden rounded-[1.6rem] border px-5 py-5 text-left transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/45 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-300 ${
        isDisabled
          ? 'cursor-not-allowed border-slate-950/10 bg-white/15 text-slate-950/45'
          : 'border-slate-950/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.2)_42%,rgba(15,23,42,0.12)_100%)] text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_16px_28px_rgba(127,29,29,0.18)] hover:border-slate-950/28 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_18px_32px_rgba(127,29,29,0.24)] active:translate-y-px'
      }`}
      disabled={isDisabled}
      onClick={() => {
        dispatch({ type: 'END' })
      }}
      type="button"
    >
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.32em] text-current/60">
            Session Control
          </p>
          <p className="mt-3 text-xl font-black uppercase tracking-[0.08em]">
            End Playing
          </p>
        </div>
        <div
          className={`grid h-12 w-12 place-items-center rounded-full border text-xs font-black uppercase transition ${
            isDisabled
              ? 'border-slate-950/10 bg-white/10 text-current/50'
              : 'border-slate-950/20 bg-slate-950/15 text-slate-950 group-hover:bg-slate-950/20'
          }`}
        >
          Stop
        </div>
      </div>
    </button>
  )
}
