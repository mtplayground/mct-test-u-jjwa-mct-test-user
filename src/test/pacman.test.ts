import { describe, expect, it } from 'vitest'

import {
  advancePacmanFrame,
  advanceGhostsPacman,
  createPacmanState,
  createPositionKeyPacman,
  getGhostModePacman,
  getRemainingPelletCountPacman,
  isWallPacman,
  movePlayerPacman,
  PACMAN_FRIGHT_TICKS,
  PACMAN_STARTING_LIVES,
  runPacmanTurn,
} from '../games/pacman'

describe('pacman logic', () => {
  it('creates maze state with pellets, power pellets, and spawn position', () => {
    const state = createPacmanState()

    expect(state.player).toEqual({ row: 3, column: 5 })
    expect(state.ghosts).toHaveLength(4)
    expect(state.lives).toBe(PACMAN_STARTING_LIVES)
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

  it('switches to fright mode after a power pellet', () => {
    let state = createPacmanState()
    state = movePlayerPacman(state, 'left').state
    state = movePlayerPacman(state, 'left').state
    state = movePlayerPacman(state, 'left').state
    state = movePlayerPacman(state, 'left').state
    state = movePlayerPacman(state, 'up').state
    const powerState = movePlayerPacman(state, 'up').state

    expect(powerState.frightTicks).toBe(PACMAN_FRIGHT_TICKS)
    expect(getGhostModePacman(powerState)).toBe('frightened')
  })

  it('moves ghosts toward the player in chase mode', () => {
    const state = {
      ...createPacmanState(),
      turnCount: 4,
    }

    const nextState = advanceGhostsPacman(state)
    const blinky = nextState.ghosts.find((ghost) => ghost.id === 'blinky')

    expect(blinky?.position).toEqual({ row: 3, column: 6 })
  })

  it('moves ghosts toward scatter corners during scatter mode', () => {
    const state = createPacmanState()
    const nextState = advanceGhostsPacman(state)
    const clyde = nextState.ghosts.find((ghost) => ghost.id === 'clyde')

    expect(clyde?.position).toEqual({ row: 5, column: 7 })
  })

  it('reduces lives and resets actors on ghost collision outside fright mode', () => {
    const state = {
      ...createPacmanState(),
      ghosts: createPacmanState().ghosts.map((ghost) => {
        if (ghost.id !== 'blinky') {
          return ghost
        }

        return {
          ...ghost,
          position: { row: 3, column: 4 },
        }
      }),
    }
    const result = runPacmanTurn(state, 'left')

    expect(result.collision).toBe('ghost-hit')
    expect(result.state.lives).toBe(PACMAN_STARTING_LIVES - 1)
    expect(result.state.player).toEqual(state.playerSpawn)
  })

  it('lets Pac-Man eat frightened ghosts', () => {
    const state = {
      ...createPacmanState(),
      frightTicks: 4,
      ghosts: createPacmanState().ghosts.map((ghost) => {
        if (ghost.id !== 'blinky') {
          return ghost
        }

        return {
          ...ghost,
          position: { row: 3, column: 4 },
        }
      }),
    }
    const result = runPacmanTurn(state, 'left')
    const blinky = result.state.ghosts.find((ghost) => ghost.id === 'blinky')

    expect(result.collision).toBe('ghost-eaten')
    expect(result.state.score).toBe(210)
    expect(blinky?.position).toEqual(blinky?.spawn)
  })

  it('advances ghosts and fright timers on frame ticks', () => {
    const state = {
      ...createPacmanState(),
      frightTicks: 3,
    }
    const result = advancePacmanFrame(state)

    expect(result.moved).toBe(true)
    expect(result.state.frightTicks).toBe(2)
    expect(result.state.turnCount).toBe(1)
  })

  it('tracks remaining pellets after collection', () => {
    const state = createPacmanState()
    const movedState = movePlayerPacman(state, 'left').state

    expect(getRemainingPelletCountPacman(movedState)).toBe(
      getRemainingPelletCountPacman(state) - 1
    )
  })
})
