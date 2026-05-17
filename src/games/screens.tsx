import { Game2048 } from './Game2048'

type GameScreenProps = {
  title: string
  subtitle: string
}

const GameScreenPlaceholder = ({ title, subtitle }: GameScreenProps) => {
  return (
    <section className="flex h-full min-h-full items-center justify-center">
      <div className="w-full max-w-3xl rounded-[1.5rem] border border-cyan-400/10 bg-slate-950/35 px-6 py-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm sm:px-10 sm:py-14">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-cyan-300/70">
          Game Loading
        </p>
        <h1 className="mt-5 font-mono text-3xl font-semibold uppercase tracking-[0.12em] text-cyan-100 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-5 font-mono text-sm leading-7 text-slate-300 sm:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

export const Game2048Screen = () => {
  return <Game2048 />
}

export const PacmanScreen = () => {
  return (
    <GameScreenPlaceholder
      subtitle="Clear the maze, dodge ghosts, and keep the pellet run alive."
      title="Pac-Man"
    />
  )
}

export const HexglScreen = () => {
  return (
    <GameScreenPlaceholder
      subtitle="Warm up the antigrav circuits before the HexGL launch."
      title="HexGL"
    />
  )
}
