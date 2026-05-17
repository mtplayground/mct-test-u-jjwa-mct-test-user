import { describe, expect, it } from 'vitest'

import {
  BOARD_SIZE_2048,
  canMove2048,
  createEmptyBoard2048,
  getEmptyCells2048,
  hasWinningTile2048,
  initializeBoard2048,
  isGameLost2048,
  moveBoard2048,
  spawnRandomTile2048,
  type Board2048,
} from '../games/game2048'

const createDeterministicRandom = (values: number[]) => {
  let index = 0

  return () => {
    const value = values[index] ?? values[values.length - 1] ?? 0
    index += 1
    return value
  }
}

const expectBoard = (board: Board2048, expected: Board2048) => {
  expect(board).toEqual(expected)
}

describe('2048 game logic', () => {
  it('creates an empty 4x4 board', () => {
    const board = createEmptyBoard2048()

    expect(board).toHaveLength(BOARD_SIZE_2048)
    expectBoard(board, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })

  it('initializes a board with two spawned tiles', () => {
    const board = initializeBoard2048(
      createDeterministicRandom([0, 0, 0.99, 0.95])
    )

    expectBoard(board, [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 4],
    ])
  })

  it('spawns a 2 or 4 tile on an empty cell without mutating the source board', () => {
    const startingBoard = createEmptyBoard2048()
    const result = spawnRandomTile2048(
      startingBoard,
      createDeterministicRandom([0.4, 0.95])
    )

    expectBoard(startingBoard, createEmptyBoard2048())
    expect(result.spawnedTile).toEqual({
      row: 1,
      column: 2,
      value: 4,
    })
    expect(result.board[1][2]).toBe(4)
  })

  it('moves left, merges pairs once, and spawns a new tile', () => {
    const result = moveBoard2048(
      [
        [2, 0, 2, 2],
        [4, 4, 4, 0],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
      ],
      'left',
      createDeterministicRandom([0.99, 0.1])
    )

    expect(result.moved).toBe(true)
    expect(result.scoreGained).toBe(20)
    expect(result.spawnedTile).toEqual({
      row: 3,
      column: 3,
      value: 2,
    })
    expectBoard(result.board, [
      [4, 2, 0, 0],
      [8, 4, 0, 0],
      [0, 0, 0, 0],
      [4, 4, 0, 2],
    ])
  })

  it('moves vertically and reverses correctly for down moves', () => {
    const result = moveBoard2048(
      [
        [2, 2, 0, 0],
        [2, 0, 4, 0],
        [4, 2, 4, 0],
        [4, 0, 8, 0],
      ],
      'down',
      createDeterministicRandom([0, 0])
    )

    expect(result.scoreGained).toBe(24)
    expectBoard(result.board, [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 0, 8, 0],
      [8, 4, 8, 0],
    ])
  })

  it('does not spawn a tile when a move changes nothing', () => {
    const board: Board2048 = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2, 4],
      [8, 16, 32, 64],
    ]
    const result = moveBoard2048(
      board,
      'left',
      createDeterministicRandom([0, 0])
    )

    expect(result.moved).toBe(false)
    expect(result.scoreGained).toBe(0)
    expect(result.spawnedTile).toBeNull()
    expectBoard(result.board, board)
  })

  it('detects a winning tile', () => {
    expect(
      hasWinningTile2048([
        [0, 0, 0, 0],
        [0, 2048, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    ).toBe(true)
  })

  it('detects when moves remain because cells are empty or adjacent merges exist', () => {
    expect(
      canMove2048([
        [2, 4, 8, 16],
        [32, 0, 128, 256],
        [512, 1024, 2, 4],
        [8, 16, 32, 64],
      ])
    ).toBe(true)

    expect(
      canMove2048([
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 2, 2],
        [8, 16, 32, 64],
      ])
    ).toBe(true)
  })

  it('detects a losing board with no empty cells and no possible merges', () => {
    const board: Board2048 = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2, 4],
      [8, 16, 32, 64],
    ]

    expect(isGameLost2048(board)).toBe(true)
    expect(getEmptyCells2048(board)).toHaveLength(0)
  })
})
