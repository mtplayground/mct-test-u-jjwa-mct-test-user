import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  SessionContext,
  type SessionContextValue,
} from '../context/session-context'
import type { SessionState } from '../context/session'
import { GoodbyeView } from '../views/GoodbyeView'

afterEach(() => {
  cleanup()
})

const createSessionState = (
  overrides: Partial<SessionState> = {}
): SessionState => ({
  selectedGame: 'hexgl',
  elapsedSeconds: 153,
  elapsedSecondsByGame: {
    '2048': 61,
    pacman: 32,
    hexgl: 60,
  },
  isEnded: true,
  ...overrides,
})

const renderWithSession = (value: SessionContextValue) => {
  return render(
    <SessionContext.Provider value={value}>
      <GoodbyeView />
    </SessionContext.Provider>
  )
}

describe('GoodbyeView', () => {
  it('renders the headline, total time, and per-game breakdown', () => {
    renderWithSession({
      state: createSessionState(),
      dispatch: vi.fn(),
    })

    expect(
      screen.getByRole('heading', { name: 'Thanks for playing!' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Total play time: 2 minutes 33 seconds')
    ).toBeInTheDocument()
    expect(screen.getByText('2048')).toBeInTheDocument()
    expect(screen.getByText('Pac-Man')).toBeInTheDocument()
    expect(screen.getByText('HexGL')).toBeInTheDocument()
    expect(screen.getByText('1 minute 1 second')).toBeInTheDocument()
    expect(screen.getByText('0 minutes 32 seconds')).toBeInTheDocument()
    expect(screen.getByText('1 minute 0 seconds')).toBeInTheDocument()
  })

  it('dispatches RESET when Play Again is pressed', () => {
    const dispatch = vi.fn()

    renderWithSession({
      state: createSessionState(),
      dispatch,
    })

    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }))

    expect(dispatch).toHaveBeenCalledWith({ type: 'RESET' })
  })
})
