import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { EndPlayingButton } from '../components/EndPlayingButton'
import type { SessionState } from '../context/session'
import {
  SessionContext,
  type SessionContextValue,
} from '../context/session-context'

const createSessionState = (
  overrides: Partial<SessionState> = {}
): SessionState => ({
  selectedGame: '2048',
  elapsedSeconds: 0,
  elapsedSecondsByGame: {
    '2048': 0,
    pacman: 0,
    hexgl: 0,
  },
  isEnded: false,
  ...overrides,
})

const renderButton = (state: SessionState, dispatch = vi.fn()) => {
  const value: SessionContextValue = {
    state,
    dispatch,
  }

  return {
    dispatch,
    ...render(
      <SessionContext.Provider value={value}>
        <EndPlayingButton />
      </SessionContext.Provider>
    ),
  }
}

afterEach(() => {
  cleanup()
})

describe('EndPlayingButton', () => {
  it('renders the large end-session action label', () => {
    renderButton(createSessionState())

    expect(
      screen.getByRole('button', { name: /session control end playing stop/i })
    ).toBeInTheDocument()
  })

  it('dispatches END when clicked', () => {
    const { dispatch } = renderButton(createSessionState())

    fireEvent.click(screen.getByRole('button', { name: /end playing/i }))

    expect(dispatch).toHaveBeenCalledWith({ type: 'END' })
  })

  it('is disabled when no active game is selected', () => {
    renderButton(
      createSessionState({
        selectedGame: null,
      })
    )

    const button = screen.getByRole('button', { name: /end playing/i })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })
})
