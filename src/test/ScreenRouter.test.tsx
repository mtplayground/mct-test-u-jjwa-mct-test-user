import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import {
  SessionContext,
  type SessionContextValue,
} from '../context/session-context'
import type { SessionState } from '../context/session'
import { ScreenRouter } from '../views/ScreenRouter'

const createSessionState = (
  overrides: Partial<SessionState> = {}
): SessionState => ({
  selectedGame: null,
  elapsedSeconds: 0,
  elapsedSecondsByGame: {
    '2048': 0,
    pacman: 0,
    hexgl: 0,
  },
  isEnded: false,
  ...overrides,
})

const renderRouter = (state: SessionState) => {
  const value: SessionContextValue = {
    state,
    dispatch: () => undefined,
  }

  return render(
    <SessionContext.Provider value={value}>
      <ScreenRouter />
    </SessionContext.Provider>
  )
}

afterEach(() => {
  cleanup()
})

describe('ScreenRouter', () => {
  it('renders the welcome view when no game is selected', () => {
    renderRouter(createSessionState())

    expect(
      screen.getByRole('heading', { name: 'Choose a game to start playing' })
    ).toBeInTheDocument()
  })

  it('renders the active game screen from session state', () => {
    renderRouter(
      createSessionState({
        selectedGame: 'pacman',
      })
    )

    expect(screen.getByRole('heading', { name: 'Pac-Man' })).toBeInTheDocument()
    expect(
      screen.getByText(
        /navigate the maze with the arrow keys, clear pellets, and avoid slamming into the walls/i
      )
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Pac-Man maze')).toBeInTheDocument()
  })

  it('renders the registered 2048 component for the 2048 selection', () => {
    renderRouter(
      createSessionState({
        selectedGame: '2048',
      })
    )

    expect(screen.getByRole('heading', { name: '2048' })).toBeInTheDocument()
    expect(screen.getByRole('grid', { name: '2048 board' })).toBeInTheDocument()
    expect(screen.getByLabelText('2048 score')).toHaveTextContent('0')
  })

  it('renders the goodbye view when the session has ended', () => {
    renderRouter(
      createSessionState({
        selectedGame: 'hexgl',
        elapsedSeconds: 45,
        elapsedSecondsByGame: {
          '2048': 0,
          pacman: 0,
          hexgl: 45,
        },
        isEnded: true,
      })
    )

    expect(
      screen.getByRole('heading', { name: 'Thanks for playing!' })
    ).toBeInTheDocument()
  })

  it('unmounts the previous game screen when the selected game changes', () => {
    const { rerender } = renderRouter(
      createSessionState({
        selectedGame: '2048',
      })
    )

    expect(screen.getByRole('heading', { name: '2048' })).toBeInTheDocument()

    rerender(
      <SessionContext.Provider
        value={{
          state: createSessionState({
            selectedGame: 'hexgl',
          }),
          dispatch: () => undefined,
        }}
      >
        <ScreenRouter />
      </SessionContext.Provider>
    )

    expect(
      screen.queryByRole('heading', { name: '2048' })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'HexGL' })).toBeInTheDocument()
  })
})
