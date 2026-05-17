export const ArcadeRoomBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_32%),radial-gradient(circle_at_85%_18%,_rgba(255,107,107,0.18),_transparent_24%),linear-gradient(180deg,_rgba(15,23,42,0.55)_0%,_rgba(2,6,23,0.92)_56%,_rgba(2,6,23,1)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[repeating-linear-gradient(90deg,rgba(148,163,184,0.08)_0,rgba(148,163,184,0.08)_1px,transparent_1px,transparent_88px)] opacity-60" />
      <div className="absolute left-1/2 top-[16%] h-72 w-72 -translate-x-1/2 rounded-full bg-joycon-left/10 blur-3xl md:h-96 md:w-96" />
      <div className="absolute bottom-[14%] right-[10%] h-48 w-48 rounded-full bg-joycon-right/10 blur-3xl md:h-72 md:w-72" />
      <div className="absolute inset-x-[8%] bottom-[12%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  )
}
