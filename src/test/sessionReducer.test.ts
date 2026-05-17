import { describe, expect, it } from 'vitest'

import {
  initialSessionState,
  sessionReducer,
  type SessionAction,
  type SessionState,
} from '../context/session'

const reduceSession = (
  actions: SessionAction[],
  initialState: SessionState = initialSessionState
) => {
  return actions.reduce(sessionReducer, initialState)
}

describe('sessionReducer', () => {
  it('tracks total and per-game elapsed time across a game switch', () => {
    const state = reduceSession([
      { type: 'SELECT_GAME', gameId: '2048' },
      { type: 'TICK', seconds: 30 },
      { type: 'SELECT_GAME', gameId: 'pacman' },
      { type: 'TICK', seconds: 45 },
    ])

    expect(state.selectedGame).toBe('pacman')
    expect(state.elapsedSeconds).toBe(75)
    expect(state.elapsedSecondsByGame).toEqual({
      '2048': 30,
      pacman: 45,
      hexgl: 0,
    })
  })

  it('does not double-count time when switching games', () => {
    const state = reduceSession([
      { type: 'SELECT_GAME', gameId: '2048' },
      { type: 'TICK', seconds: 15 },
      { type: 'SELECT_GAME', gameId: 'pacman' },
    ])

    expect(state.elapsedSeconds).toBe(15)
    expect(state.elapsedSecondsByGame).toEqual({
      '2048': 15,
      pacman: 0,
      hexgl: 0,
    })
  })

  it('freezes elapsed time after END', () => {
    const state = reduceSession([
      { type: 'SELECT_GAME', gameId: 'hexgl' },
      { type: 'TICK', seconds: 12 },
      { type: 'END' },
      { type: 'TICK', seconds: 5 },
    ])

    expect(state.isEnded).toBe(true)
    expect(state.elapsedSeconds).toBe(12)
    expect(state.elapsedSecondsByGame).toEqual({
      '2048': 0,
      pacman: 0,
      hexgl: 12,
    })
  })

  it('resets total and per-game time back to zero', () => {
    const state = reduceSession([
      { type: 'SELECT_GAME', gameId: 'hexgl' },
      { type: 'TICK', seconds: 70 },
      { type: 'RESET' },
    ])

    expect(state).toEqual(initialSessionState)
  })
})
