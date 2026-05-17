import { useEffect, useRef, useState } from 'react'

import {
  createPacmanState,
  createPositionKeyPacman,
  getGhostModePacman,
  getMazeSizePacman,
  getRemainingPelletCountPacman,
  PACMAN_TILE_SIZE,
  runPacmanTurn,
  type DirectionPacman,
  type GhostModePacman,
  type PacmanState,
} from './pacman'

const keyToDirection: Partial<Record<string, DirectionPacman>> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

const drawPacmanScene = (
  canvas: HTMLCanvasElement,
  state: PacmanState,
  message: string,
  ghostMode: GhostModePacman
) => {
  const context = canvas.getContext('2d')

  if (!context) {
    return
  }

  const { rows, columns } = getMazeSizePacman(state.maze)
  const boardWidth = columns * PACMAN_TILE_SIZE
  const boardHeight = rows * PACMAN_TILE_SIZE

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#020617'
  context.fillRect(0, 0, canvas.width, canvas.height)

  state.maze.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      const x = columnIndex * PACMAN_TILE_SIZE
      const y = rowIndex * PACMAN_TILE_SIZE

      if (tile === 'wall') {
        context.fillStyle = '#2563eb'
        context.fillRect(x, y, PACMAN_TILE_SIZE, PACMAN_TILE_SIZE)
        context.fillStyle = '#0f172a'
        context.fillRect(
          x + 3,
          y + 3,
          PACMAN_TILE_SIZE - 6,
          PACMAN_TILE_SIZE - 6
        )
        return
      }

      const positionKey = createPositionKeyPacman({
        row: rowIndex,
        column: columnIndex,
      })

      if (state.pellets.has(positionKey)) {
        context.fillStyle = '#f8fafc'
        context.beginPath()
        context.arc(x + 12, y + 12, 3, 0, Math.PI * 2)
        context.fill()
      }

      if (state.powerPellets.has(positionKey)) {
        context.fillStyle = '#fde68a'
        context.beginPath()
        context.arc(x + 12, y + 12, 6, 0, Math.PI * 2)
        context.fill()
      }
    })
  })

  context.fillStyle = '#facc15'
  context.beginPath()
  context.arc(
    state.player.column * PACMAN_TILE_SIZE + PACMAN_TILE_SIZE / 2,
    state.player.row * PACMAN_TILE_SIZE + PACMAN_TILE_SIZE / 2,
    PACMAN_TILE_SIZE / 2 - 3,
    0.2 * Math.PI,
    1.8 * Math.PI
  )
  context.lineTo(
    state.player.column * PACMAN_TILE_SIZE + PACMAN_TILE_SIZE / 2,
    state.player.row * PACMAN_TILE_SIZE + PACMAN_TILE_SIZE / 2
  )
  context.fill()

  state.ghosts.forEach((ghost) => {
    const x = ghost.position.column * PACMAN_TILE_SIZE
    const y = ghost.position.row * PACMAN_TILE_SIZE

    context.fillStyle = ghostMode === 'frightened' ? '#60a5fa' : ghost.color
    context.beginPath()
    context.arc(
      x + PACMAN_TILE_SIZE / 2,
      y + PACMAN_TILE_SIZE / 2,
      PACMAN_TILE_SIZE / 2 - 4,
      Math.PI,
      0
    )
    context.lineTo(x + PACMAN_TILE_SIZE - 4, y + PACMAN_TILE_SIZE - 4)
    context.lineTo(x + PACMAN_TILE_SIZE - 10, y + PACMAN_TILE_SIZE - 10)
    context.lineTo(x + PACMAN_TILE_SIZE / 2, y + PACMAN_TILE_SIZE - 4)
    context.lineTo(x + 10, y + PACMAN_TILE_SIZE - 10)
    context.lineTo(x + 4, y + PACMAN_TILE_SIZE - 4)
    context.closePath()
    context.fill()
  })

  context.strokeStyle = 'rgba(148, 163, 184, 0.18)'
  context.strokeRect(0.5, 0.5, boardWidth - 1, boardHeight - 1)

  context.fillStyle = '#94a3b8'
  context.font = '12px monospace'
  context.fillText(message, 8, boardHeight - 8)
}

export const GamePacman = () => {
  const [gameState, setGameState] = useState(() => createPacmanState())
  const [statusMessage, setStatusMessage] = useState(
    'Use arrow keys to clear the maze.'
  )
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = keyToDirection[event.key]

      if (!direction) {
        return
      }

      event.preventDefault()

      setGameState((currentState) => {
        const moveResult = runPacmanTurn(currentState, direction)

        if (!moveResult.moved) {
          setStatusMessage('Wall ahead. Pick another route.')
          return currentState
        }

        if (moveResult.collision === 'ghost-hit') {
          setStatusMessage('Ghost collision. Life lost.')
        } else if (moveResult.collision === 'ghost-eaten') {
          setStatusMessage('Ghost eaten during fright mode.')
        } else if (moveResult.atePowerPellet) {
          setStatusMessage('Power pellet collected.')
        } else if (moveResult.atePellet) {
          setStatusMessage('Pellet cleared.')
        } else {
          setStatusMessage('Path advanced.')
        }

        return moveResult.state
      })
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    drawPacmanScene(
      canvas,
      gameState,
      statusMessage,
      getGhostModePacman(gameState)
    )
  }, [gameState, statusMessage])

  const resetMaze = () => {
    setGameState(createPacmanState())
    setStatusMessage('Use arrow keys to clear the maze.')
  }

  const { rows, columns } = getMazeSizePacman(gameState.maze)
  const ghostMode = getGhostModePacman(gameState)

  return (
    <section className="flex h-full min-h-full items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-3xl rounded-[1.7rem] border border-cyan-400/10 bg-slate-950/45 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.38em] text-cyan-300/70">
              Arcade Chase
            </p>
            <h1 className="mt-3 font-mono text-3xl font-semibold uppercase tracking-[0.1em] text-cyan-50 sm:text-4xl">
              Pac-Man
            </h1>
            <p className="mt-3 max-w-xl font-mono text-sm leading-6 text-slate-300">
              Navigate the maze with the arrow keys, clear pellets, and avoid
              slamming into the walls.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">
                Score
              </p>
              <p
                aria-label="Pac-Man score"
                className="mt-1 font-mono text-2xl font-semibold text-cyan-50"
              >
                {gameState.score}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">
                Pellets
              </p>
              <p
                aria-label="Pac-Man pellets remaining"
                className="mt-1 font-mono text-2xl font-semibold text-cyan-50"
              >
                {getRemainingPelletCountPacman(gameState)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-slate-400">
                Lives
              </p>
              <p
                aria-label="Pac-Man lives"
                className="mt-1 font-mono text-2xl font-semibold text-cyan-50"
              >
                {gameState.lives}
              </p>
            </div>
            <button
              className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-200/45 hover:bg-cyan-200/15"
              onClick={resetMaze}
              type="button"
            >
              New Maze
            </button>
          </div>
        </div>

        <div className="mt-5 flex min-h-10 items-center justify-between gap-3 rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
          <p className="font-mono text-sm uppercase tracking-[0.14em] text-slate-300">
            {statusMessage}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">
            {ghostMode === 'frightened' ? 'Fright' : ghostMode}
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/25 p-2 sm:p-3">
          <canvas
            aria-label="Pac-Man maze"
            className="h-auto w-full rounded-[1.2rem] bg-slate-950"
            height={rows * PACMAN_TILE_SIZE}
            ref={canvasRef}
            width={columns * PACMAN_TILE_SIZE}
          />
        </div>
      </div>
    </section>
  )
}
