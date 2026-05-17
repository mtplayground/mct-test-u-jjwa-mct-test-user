export const PACMAN_TILE_SIZE = 24
export const PACMAN_FRIGHT_TICKS = 8
export const PACMAN_STARTING_LIVES = 3

export type DirectionPacman = 'up' | 'down' | 'left' | 'right'
export type GhostModePacman = 'chase' | 'scatter' | 'frightened'

export type PositionPacman = {
  row: number
  column: number
}

export type MazeTilePacman = 'wall' | 'path'

export type GhostPacman = {
  id: 'blinky' | 'pinky' | 'inky' | 'clyde'
  color: string
  position: PositionPacman
  spawn: PositionPacman
  scatterTarget: PositionPacman
  direction: DirectionPacman
}

export type PacmanState = {
  maze: MazeTilePacman[][]
  pellets: Set<string>
  powerPellets: Set<string>
  player: PositionPacman
  playerSpawn: PositionPacman
  ghosts: GhostPacman[]
  score: number
  lives: number
  frightTicks: number
  turnCount: number
}

export type TurnResultPacman = {
  state: PacmanState
  moved: boolean
  atePellet: boolean
  atePowerPellet: boolean
  collision: 'none' | 'ghost-hit' | 'ghost-eaten'
}

export const PACMAN_LAYOUT = [
  '#############',
  '#o...#.....o#',
  '#.##.#.###..#',
  '#....P......#',
  '#.##.#.###..#',
  '#.....#.....#',
  '#############',
] as const

const directionVectors: Record<DirectionPacman, PositionPacman> = {
  up: { row: -1, column: 0 },
  down: { row: 1, column: 0 },
  left: { row: 0, column: -1 },
  right: { row: 0, column: 1 },
}

const directionPriority: DirectionPacman[] = ['up', 'left', 'down', 'right']

const ghostTemplates: Omit<GhostPacman, 'position'>[] = [
  {
    id: 'blinky',
    color: '#ef4444',
    spawn: { row: 3, column: 7 },
    scatterTarget: { row: 1, column: 11 },
    direction: 'left',
  },
  {
    id: 'pinky',
    color: '#f472b6',
    spawn: { row: 3, column: 8 },
    scatterTarget: { row: 1, column: 1 },
    direction: 'right',
  },
  {
    id: 'inky',
    color: '#22d3ee',
    spawn: { row: 5, column: 4 },
    scatterTarget: { row: 5, column: 11 },
    direction: 'up',
  },
  {
    id: 'clyde',
    color: '#fb923c',
    spawn: { row: 5, column: 8 },
    scatterTarget: { row: 5, column: 1 },
    direction: 'up',
  },
]

export const createPositionKeyPacman = ({ row, column }: PositionPacman) => {
  return `${row}:${column}`
}

export const createPacmanState = (): PacmanState => {
  const pellets = new Set<string>()
  const powerPellets = new Set<string>()
  let player: PositionPacman = { row: 0, column: 0 }

  const maze = PACMAN_LAYOUT.map((row, rowIndex) =>
    [...row].map((cell, columnIndex) => {
      if (cell === '#') {
        return 'wall'
      }

      const position = { row: rowIndex, column: columnIndex }

      if (cell === '.') {
        pellets.add(createPositionKeyPacman(position))
      }

      if (cell === 'o') {
        powerPellets.add(createPositionKeyPacman(position))
      }

      if (cell === 'P') {
        player = position
      }

      return 'path'
    })
  )

  return {
    maze,
    pellets,
    powerPellets,
    player,
    playerSpawn: player,
    ghosts: ghostTemplates.map((ghost) => ({
      ...ghost,
      position: ghost.spawn,
    })),
    score: 0,
    lives: PACMAN_STARTING_LIVES,
    frightTicks: 0,
    turnCount: 0,
  }
}

export const getMazeSizePacman = (maze: MazeTilePacman[][]) => ({
  rows: maze.length,
  columns: maze[0]?.length ?? 0,
})

export const isWallPacman = (
  maze: MazeTilePacman[][],
  position: PositionPacman
) => {
  const row = maze[position.row]

  if (!row) {
    return true
  }

  return row[position.column] !== 'path'
}

export const getNextPositionPacman = (
  position: PositionPacman,
  direction: DirectionPacman
) => {
  const vector = directionVectors[direction]

  return {
    row: position.row + vector.row,
    column: position.column + vector.column,
  }
}

const getManhattanDistancePacman = (
  from: PositionPacman,
  to: PositionPacman
) => {
  return Math.abs(from.row - to.row) + Math.abs(from.column - to.column)
}

export const getGhostModePacman = (state: PacmanState): GhostModePacman => {
  if (state.frightTicks > 0) {
    return 'frightened'
  }

  return state.turnCount % 8 < 4 ? 'scatter' : 'chase'
}

export const getGhostAvailableDirectionsPacman = (
  state: PacmanState,
  ghost: GhostPacman
) => {
  return directionPriority.filter((direction) => {
    return !isWallPacman(
      state.maze,
      getNextPositionPacman(ghost.position, direction)
    )
  })
}

const moveGhostPacman = (
  state: PacmanState,
  ghost: GhostPacman,
  mode: GhostModePacman
) => {
  const availableDirections = getGhostAvailableDirectionsPacman(state, ghost)

  if (availableDirections.length === 0) {
    return ghost
  }

  const target = mode === 'scatter' ? ghost.scatterTarget : state.player

  const orderedDirections = [...availableDirections].sort((left, right) => {
    const leftPosition = getNextPositionPacman(ghost.position, left)
    const rightPosition = getNextPositionPacman(ghost.position, right)
    const leftDistance = getManhattanDistancePacman(leftPosition, target)
    const rightDistance = getManhattanDistancePacman(rightPosition, target)

    if (mode === 'frightened') {
      return rightDistance - leftDistance
    }

    return leftDistance - rightDistance
  })

  const nextDirection = orderedDirections[0]

  return {
    ...ghost,
    direction: nextDirection,
    position: getNextPositionPacman(ghost.position, nextDirection),
  }
}

const resetActorsAfterHitPacman = (state: PacmanState): PacmanState => {
  return {
    ...state,
    player: state.playerSpawn,
    ghosts: state.ghosts.map((ghost) => ({
      ...ghost,
      direction: ghost.direction,
      position: ghost.spawn,
    })),
    frightTicks: 0,
  }
}

const resolveGhostCollisionPacman = (state: PacmanState): TurnResultPacman => {
  const collidedGhost = state.ghosts.find((ghost) => {
    return (
      ghost.position.row === state.player.row &&
      ghost.position.column === state.player.column
    )
  })

  if (!collidedGhost) {
    return {
      state,
      moved: true,
      atePellet: false,
      atePowerPellet: false,
      collision: 'none',
    }
  }

  if (state.frightTicks > 0) {
    return {
      state: {
        ...state,
        ghosts: state.ghosts.map((ghost) => {
          if (ghost.id !== collidedGhost.id) {
            return ghost
          }

          return {
            ...ghost,
            position: ghost.spawn,
          }
        }),
        score: state.score + 200,
      },
      moved: true,
      atePellet: false,
      atePowerPellet: false,
      collision: 'ghost-eaten',
    }
  }

  return {
    state: resetActorsAfterHitPacman({
      ...state,
      lives: Math.max(0, state.lives - 1),
    }),
    moved: true,
    atePellet: false,
    atePowerPellet: false,
    collision: 'ghost-hit',
  }
}

export const movePlayerPacman = (
  state: PacmanState,
  direction: DirectionPacman
) => {
  const nextPosition = getNextPositionPacman(state.player, direction)

  if (isWallPacman(state.maze, nextPosition)) {
    return {
      state,
      moved: false,
      atePellet: false,
      atePowerPellet: false,
    }
  }

  const pellets = new Set(state.pellets)
  const powerPellets = new Set(state.powerPellets)
  const positionKey = createPositionKeyPacman(nextPosition)
  const atePellet = pellets.delete(positionKey)
  const atePowerPellet = powerPellets.delete(positionKey)

  return {
    state: {
      ...state,
      player: nextPosition,
      pellets,
      powerPellets,
      score: state.score + (atePellet ? 10 : 0) + (atePowerPellet ? 50 : 0),
      frightTicks: atePowerPellet ? PACMAN_FRIGHT_TICKS : state.frightTicks,
    },
    moved: true,
    atePellet,
    atePowerPellet,
  }
}

export const advanceGhostsPacman = (state: PacmanState) => {
  const mode = getGhostModePacman(state)

  return {
    ...state,
    ghosts: state.ghosts.map((ghost) => moveGhostPacman(state, ghost, mode)),
  }
}

export const runPacmanTurn = (
  state: PacmanState,
  direction: DirectionPacman
): TurnResultPacman => {
  const moveResult = movePlayerPacman(state, direction)

  if (!moveResult.moved) {
    return {
      state,
      moved: false,
      atePellet: false,
      atePowerPellet: false,
      collision: 'none',
    }
  }

  const steppedState: PacmanState = {
    ...moveResult.state,
    turnCount: state.turnCount + 1,
  }

  const immediateCollision = resolveGhostCollisionPacman(steppedState)

  if (immediateCollision.collision !== 'none') {
    return {
      ...immediateCollision,
      atePellet: moveResult.atePellet,
      atePowerPellet: moveResult.atePowerPellet,
    }
  }

  const advancedGhostState = advanceGhostsPacman({
    ...steppedState,
    frightTicks: Math.max(
      0,
      steppedState.frightTicks - (moveResult.atePowerPellet ? 0 : 1)
    ),
  })
  const ghostCollision = resolveGhostCollisionPacman(advancedGhostState)

  return {
    ...ghostCollision,
    atePellet: moveResult.atePellet,
    atePowerPellet: moveResult.atePowerPellet,
  }
}

export const getRemainingPelletCountPacman = (state: PacmanState) => {
  return state.pellets.size + state.powerPellets.size
}
