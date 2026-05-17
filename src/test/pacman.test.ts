import { describe, expect, it } from 'vitest'

import {
  createPacmanState,
  createPositionKeyPacman,
  getRemainingPelletCountPacman,
  isWallPacman,
  movePlayerPacman,
} from '../games/pacman'

describe('pacman logic', () => {
  it('creates maze state with pellets, power pellets, and spawn position', () => {
    const state = createPacmanState()

    expect(state.player).toEqual({ row: 3, column: 5 })
    expect(state.pellets.size).toBeGreaterThan(0)
    expect(state.powerPellets.size).toBe(2)
  })

  it('blocks movement into walls', () => {
    const state = createPacmanState()
    const result = movePlayerPacman(state, 'up')

    expect(result.moved).toBe(false)
    expect(result.state).toBe(state)
    expect(isWallPacman(state.maze, { row: 2, column: 5 })).toBe(true)
  })

  it('moves across paths and consumes pellets', () => {
    const state = createPacmanState()
    const result = movePlayerPacman(state, 'left')

    expect(result.moved).toBe(true)
    expect(result.atePellet).toBe(true)
    expect(result.state.player).toEqual({ row: 3, column: 4 })
    expect(result.state.score).toBe(10)
    expect(
      result.state.pellets.has(createPositionKeyPacman({ row: 3, column: 4 }))
    ).toBe(false)
  })

  it('consumes power pellets for a higher score', () => {
    let state = createPacmanState()
    state = movePlayerPacman(state, 'left').state
    state = movePlayerPacman(state, 'left').state
    state = movePlayerPacman(state, 'left').state
    state = movePlayerPacman(state, 'left').state
    state = movePlayerPacman(state, 'up').state
    const powerState = movePlayerPacman(state, 'up')

    expect(powerState.atePowerPellet).toBe(true)
    expect(powerState.state.score).toBe(100)
  })

  it('tracks remaining pellets after collection', () => {
    const state = createPacmanState()
    const movedState = movePlayerPacman(state, 'left').state

    expect(getRemainingPelletCountPacman(movedState)).toBe(
      getRemainingPelletCountPacman(state) - 1
    )
  })
})
