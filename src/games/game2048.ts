export const BOARD_SIZE_2048 = 4
export const WIN_TILE_2048 = 2048

export type Board2048 = number[][]
export type Direction2048 = 'up' | 'down' | 'left' | 'right'

export type TileSpawn2048 = {
  row: number
  column: number
  value: 2 | 4
}

export type MoveResult2048 = {
  board: Board2048
  moved: boolean
  scoreGained: number
  spawnedTile: TileSpawn2048 | null
  won: boolean
  lost: boolean
}

type MergeLineResult = {
  line: number[]
  moved: boolean
  scoreGained: number
}

const createEmptyLine = () => Array.from({ length: BOARD_SIZE_2048 }, () => 0)

export const createEmptyBoard2048 = (): Board2048 => {
  return Array.from({ length: BOARD_SIZE_2048 }, () => createEmptyLine())
}

export const cloneBoard2048 = (board: Board2048): Board2048 => {
  return board.map((row) => [...row])
}

export const getEmptyCells2048 = (board: Board2048) => {
  const emptyCells: Array<{ row: number; column: number }> = []

  board.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value === 0) {
        emptyCells.push({ row: rowIndex, column: columnIndex })
      }
    })
  })

  return emptyCells
}

export const hasWinningTile2048 = (board: Board2048) => {
  return board.some((row) => row.some((value) => value >= WIN_TILE_2048))
}

export const canMove2048 = (board: Board2048) => {
  if (getEmptyCells2048(board).length > 0) {
    return true
  }

  for (let row = 0; row < BOARD_SIZE_2048; row += 1) {
    for (let column = 0; column < BOARD_SIZE_2048; column += 1) {
      const value = board[row][column]

      if (row + 1 < BOARD_SIZE_2048 && board[row + 1][column] === value) {
        return true
      }

      if (column + 1 < BOARD_SIZE_2048 && board[row][column + 1] === value) {
        return true
      }
    }
  }

  return false
}

export const isGameLost2048 = (board: Board2048) => {
  return !canMove2048(board)
}

export const spawnRandomTile2048 = (
  board: Board2048,
  random: () => number = Math.random
) => {
  const emptyCells = getEmptyCells2048(board)

  if (emptyCells.length === 0) {
    return {
      board: cloneBoard2048(board),
      spawnedTile: null,
    }
  }

  const nextBoard = cloneBoard2048(board)
  const selectedCell =
    emptyCells[Math.floor(random() * emptyCells.length)] ?? emptyCells[0]
  const value: 2 | 4 = random() < 0.9 ? 2 : 4

  nextBoard[selectedCell.row][selectedCell.column] = value

  return {
    board: nextBoard,
    spawnedTile: {
      row: selectedCell.row,
      column: selectedCell.column,
      value,
    },
  }
}

export const initializeBoard2048 = (random: () => number = Math.random) => {
  const firstSpawn = spawnRandomTile2048(createEmptyBoard2048(), random)
  const secondSpawn = spawnRandomTile2048(firstSpawn.board, random)

  return secondSpawn.board
}

const mergeLine2048 = (line: number[]): MergeLineResult => {
  const compacted = line.filter((value) => value !== 0)
  const merged: number[] = []
  let scoreGained = 0

  for (let index = 0; index < compacted.length; index += 1) {
    const currentValue = compacted[index]
    const nextValue = compacted[index + 1]

    if (currentValue === nextValue) {
      const mergedValue = currentValue * 2
      merged.push(mergedValue)
      scoreGained += mergedValue
      index += 1
      continue
    }

    merged.push(currentValue)
  }

  while (merged.length < BOARD_SIZE_2048) {
    merged.push(0)
  }

  return {
    line: merged,
    moved: merged.some((value, index) => value !== line[index]),
    scoreGained,
  }
}

const readLine2048 = (
  board: Board2048,
  direction: Direction2048,
  index: number
) => {
  switch (direction) {
    case 'left':
      return [...board[index]]
    case 'right':
      return [...board[index]].reverse()
    case 'up':
      return board.map((row) => row[index])
    case 'down':
      return board.map((row) => row[index]).reverse()
    default: {
      const exhaustiveCheck: never = direction
      return exhaustiveCheck
    }
  }
}

const writeLine2048 = (
  board: Board2048,
  direction: Direction2048,
  index: number,
  line: number[]
) => {
  switch (direction) {
    case 'left':
      board[index] = [...line]
      return
    case 'right':
      board[index] = [...line].reverse()
      return
    case 'up':
      line.forEach((value, rowIndex) => {
        board[rowIndex][index] = value
      })
      return
    case 'down':
      ;[...line].reverse().forEach((value, rowIndex) => {
        board[rowIndex][index] = value
      })
      return
    default: {
      const exhaustiveCheck: never = direction
      return exhaustiveCheck
    }
  }
}

export const moveBoard2048 = (
  board: Board2048,
  direction: Direction2048,
  random: () => number = Math.random
): MoveResult2048 => {
  const nextBoard = createEmptyBoard2048()
  let moved = false
  let scoreGained = 0

  for (let index = 0; index < BOARD_SIZE_2048; index += 1) {
    const originalLine = readLine2048(board, direction, index)
    const mergedLine = mergeLine2048(originalLine)

    writeLine2048(nextBoard, direction, index, mergedLine.line)

    if (mergedLine.moved) {
      moved = true
    }

    scoreGained += mergedLine.scoreGained
  }

  if (!moved) {
    const unchangedBoard = cloneBoard2048(board)

    return {
      board: unchangedBoard,
      moved: false,
      scoreGained: 0,
      spawnedTile: null,
      won: hasWinningTile2048(unchangedBoard),
      lost: isGameLost2048(unchangedBoard),
    }
  }

  const spawnResult = spawnRandomTile2048(nextBoard, random)

  return {
    board: spawnResult.board,
    moved: true,
    scoreGained,
    spawnedTile: spawnResult.spawnedTile,
    won: hasWinningTile2048(spawnResult.board),
    lost: isGameLost2048(spawnResult.board),
  }
}
