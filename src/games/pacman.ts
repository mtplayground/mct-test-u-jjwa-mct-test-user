export const PACMAN_TILE_SIZE = 24

export type DirectionPacman = 'up' | 'down' | 'left' | 'right'

export type PositionPacman = {
  row: number
  column: number
}

export type MazeTilePacman = 'wall' | 'path'

export type PacmanState = {
  maze: MazeTilePacman[][]
  pellets: Set<string>
  powerPellets: Set<string>
  player: PositionPacman
  score: number
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
    score: 0,
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
    },
    moved: true,
    atePellet,
    atePowerPellet,
  }
}

export const getRemainingPelletCountPacman = (state: PacmanState) => {
  return state.pellets.size + state.powerPellets.size
}
