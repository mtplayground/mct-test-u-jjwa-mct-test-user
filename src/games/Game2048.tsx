import { useEffect, useState } from 'react'

import {
  BOARD_SIZE_2048,
  initializeBoard2048,
  moveBoard2048,
  type Board2048,
  type Direction2048,
} from './game2048'

type Game2048Props = {
  random?: () => number
}

type GameState2048 = {
  board: Board2048
  score: number
  won: boolean
  lost: boolean
}

const createInitialState = (random: () => number): GameState2048 => {
  const board = initializeBoard2048(random)

  return {
    board,
    score: 0,
    won: false,
    lost: false,
  }
}

const keyToDirection: Partial<Record<string, Direction2048>> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

const getTileClasses = (value: number) => {
  if (value === 0) {
    return 'border-white/5 bg-white/5 text-transparent'
  }

  if (value >= 1024) {
    return 'border-amber-200/45 bg-amber-300 text-slate-950'
  }

  if (value >= 128) {
    return 'border-amber-200/35 bg-amber-200/90 text-slate-950'
  }

  if (value >= 16) {
    return 'border-orange-200/30 bg-orange-300/80 text-slate-950'
  }

  if (value >= 8) {
    return 'border-cyan-100/20 bg-cyan-300/55 text-slate-950'
  }

  return 'border-white/10 bg-slate-800/90 text-cyan-50'
}

export const Game2048 = ({ random = Math.random }: Game2048Props) => {
  const [gameState, setGameState] = useState(() => createInitialState(random))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = keyToDirection[event.key]

      if (!direction) {
        return
      }

      event.preventDefault()

      setGameState((currentState) => {
        if (currentState.lost) {
          return currentState
        }

        const moveResult = moveBoard2048(currentState.board, direction, random)

        if (!moveResult.moved) {
          return {
            ...currentState,
            won: moveResult.won,
            lost: moveResult.lost,
          }
        }

        return {
          board: moveResult.board,
          score: currentState.score + moveResult.scoreGained,
          won: currentState.won || moveResult.won,
          lost: moveResult.lost,
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [random])

  const resetGame = () => {
    setGameState(createInitialState(random))
  }

  return (
    <section className="flex h-full min-h-full items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-3xl rounded-[1.7rem] border border-cyan-400/10 bg-slate-950/45 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.38em] text-cyan-300/70">
              Puzzle Mode
            </p>
            <h1 className="mt-3 font-mono text-3xl font-semibold uppercase tracking-[0.1em] text-cyan-50 sm:text-4xl">
              2048
            </h1>
            <p className="mt-3 max-w-xl font-mono text-sm leading-6 text-slate-300">
              Use the arrow keys to slide every tile. Matching numbers merge
              once per move, and a fresh tile spawns after each successful
              shift.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">
                Score
              </p>
              <p
                aria-label="2048 score"
                className="mt-1 font-mono text-2xl font-semibold text-cyan-50"
              >
                {gameState.score}
              </p>
            </div>
            <button
              className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-200/45 hover:bg-cyan-200/15"
              onClick={resetGame}
              type="button"
            >
              New Game
            </button>
          </div>
        </div>

        <div className="mt-5 flex min-h-10 items-center justify-between gap-3 rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
          <p className="font-mono text-sm uppercase tracking-[0.14em] text-slate-300">
            {gameState.lost
              ? 'No moves left. Start a new run.'
              : gameState.won
                ? '2048 reached. Keep playing or reset.'
                : 'Shift tiles until you build the 2048 block.'}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">
            {gameState.lost ? 'Game Over' : gameState.won ? 'Victory' : 'Live'}
          </p>
        </div>

        <div
          aria-label="2048 board"
          className="mt-5 grid aspect-square w-full grid-cols-4 gap-2 rounded-[1.6rem] border border-white/10 bg-black/20 p-2 sm:gap-3 sm:p-3"
          role="grid"
        >
          {gameState.board.flatMap((row, rowIndex) =>
            row.map((value, columnIndex) => (
              <div
                aria-label={`Tile ${value} at row ${rowIndex + 1} column ${
                  columnIndex + 1
                }`}
                className={`flex aspect-square items-center justify-center rounded-[1.15rem] border font-mono text-2xl font-black shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition sm:text-3xl ${getTileClasses(
                  value
                )}`}
                key={`${rowIndex}-${columnIndex}`}
                role="gridcell"
              >
                {value === 0 ? '' : value}
              </div>
            ))
          )}
        </div>

        <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
          Board size: {BOARD_SIZE_2048}x{BOARD_SIZE_2048}
        </p>
      </div>
    </section>
  )
}
