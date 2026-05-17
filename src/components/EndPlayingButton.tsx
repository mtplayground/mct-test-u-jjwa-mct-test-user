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
      className={`group relative w-full overflow-hidden rounded-[1.7rem] border px-4 py-4 text-left transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/45 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-300 sm:px-5 sm:py-5 ${
        isDisabled
          ? 'cursor-not-allowed border-slate-950/10 bg-white/15 text-slate-950/45'
          : 'border-slate-950/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_42%,rgba(15,23,42,0.12)_100%)] text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_16px_28px_rgba(127,29,29,0.18)] hover:-translate-y-0.5 hover:border-slate-950/28 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_22px_36px_rgba(127,29,29,0.24),0_0_28px_rgba(251,113,133,0.12)] active:translate-y-[1px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_10px_18px_rgba(127,29,29,0.2)]'
      }`}
      disabled={isDisabled}
      onClick={() => {
        dispatch({ type: 'END' })
      }}
      type="button"
    >
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
      <div
        className={`pointer-events-none absolute inset-y-3 right-3 w-24 rounded-full blur-2xl transition duration-300 ${
          isDisabled
            ? 'bg-transparent opacity-0'
            : 'bg-rose-100/20 opacity-0 group-hover:opacity-100'
        }`}
      />
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
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border text-[0.68rem] font-black uppercase tracking-[0.16em] transition-all duration-300 sm:h-12 sm:w-12 ${
            isDisabled
              ? 'border-slate-950/10 bg-white/10 text-current/50'
              : 'border-slate-950/20 bg-slate-950/15 text-slate-950 group-hover:scale-[1.04] group-hover:bg-slate-950/20'
          }`}
        >
          Stop
        </div>
      </div>
    </button>
  )
}
