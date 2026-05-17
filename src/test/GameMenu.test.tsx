import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GameMenu } from '../components/GameMenu'
import type { SessionState } from '../context/session'
import {
  SessionContext,
  type SessionContextValue,
} from '../context/session-context'

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

const renderMenu = (state: SessionState, dispatch = vi.fn()) => {
  const value: SessionContextValue = {
    state,
    dispatch,
  }

  return {
    dispatch,
    ...render(
      <SessionContext.Provider value={value}>
        <GameMenu />
      </SessionContext.Provider>
    ),
  }
}

afterEach(() => {
  cleanup()
})

describe('GameMenu', () => {
  it('renders selectable items for each registered game', () => {
    renderMenu(createSessionState())

    expect(
      screen.getByRole('button', { name: /cartridge 2048 go/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /cartridge pac-man go/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /cartridge hexgl go/i })
    ).toBeInTheDocument()
  })

  it('dispatches SELECT_GAME when a game is clicked', () => {
    const { dispatch } = renderMenu(createSessionState())

    fireEvent.click(screen.getByRole('button', { name: /cartridge pac-man/i }))

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SELECT_GAME',
      gameId: 'pacman',
    })
  })

  it('marks the selected game as active', () => {
    renderMenu(
      createSessionState({
        selectedGame: 'hexgl',
      })
    )

    const activeButton = screen.getByRole('button', {
      name: /cartridge hexgl on/i,
    })
    const inactiveButton = screen.getByRole('button', {
      name: /cartridge 2048 go/i,
    })

    expect(activeButton).toHaveAttribute('aria-pressed', 'true')
    expect(activeButton).toHaveAttribute('data-active', 'true')
    expect(inactiveButton).toHaveAttribute('aria-pressed', 'false')
    expect(inactiveButton).toHaveAttribute('data-active', 'false')
  })
})
