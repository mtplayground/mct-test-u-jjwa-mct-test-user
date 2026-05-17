import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { GamePacman } from '../games/GamePacman'
import { createPacmanState } from '../games/pacman'

const advanceGameLoop = async (ms = 260) => {
  await vi.advanceTimersByTimeAsync(ms)
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    return window.setTimeout(() => callback(performance.now()), 16)
  })
  vi.stubGlobal('cancelAnimationFrame', (id: number) => {
    window.clearTimeout(id)
  })
})

afterEach(() => {
  cleanup()
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('GamePacman', () => {
  it('renders the canvas game with score and pellet counts', () => {
    render(<GamePacman />)

    expect(screen.getByRole('heading', { name: 'Pac-Man' })).toBeInTheDocument()
    expect(screen.getByLabelText('Pac-Man score')).toHaveTextContent('0')
    expect(
      screen.getByLabelText('Pac-Man pellets remaining')
    ).toHaveTextContent('40')
    expect(screen.getByLabelText('Pac-Man lives')).toHaveTextContent('3')
    expect(screen.getByLabelText('Pac-Man maze')).toBeInTheDocument()
  })

  it('moves the player with arrow keys and updates score', async () => {
    render(<GamePacman />)

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    await advanceGameLoop()

    expect(screen.getByLabelText('Pac-Man score')).toHaveTextContent('10')
    expect(
      screen.getByLabelText('Pac-Man pellets remaining')
    ).toHaveTextContent('39')
    expect(screen.getByText('Pellet cleared.')).toBeInTheDocument()
  })

  it('resets the maze with New Maze', async () => {
    render(<GamePacman />)

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    await advanceGameLoop()
    fireEvent.click(screen.getByRole('button', { name: 'New Maze' }))

    expect(screen.getByLabelText('Pac-Man score')).toHaveTextContent('0')
    expect(
      screen.getByLabelText('Pac-Man pellets remaining')
    ).toHaveTextContent('40')
    expect(
      screen.getByText('Use arrow keys to clear the maze.')
    ).toBeInTheDocument()
  })

  it('shows fright mode after a power pellet route', async () => {
    render(<GamePacman />)

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    await advanceGameLoop()
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    await advanceGameLoop()
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    await advanceGameLoop()
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    await advanceGameLoop()
    fireEvent.keyDown(window, { key: 'ArrowUp' })
    await advanceGameLoop()
    fireEvent.keyDown(window, { key: 'ArrowUp' })
    await advanceGameLoop()

    expect(screen.getByText('Power pellet collected.')).toBeInTheDocument()
    expect(screen.getByText('Fright')).toBeInTheDocument()
  })

  it('shows game over state and allows restart', () => {
    render(
      <GamePacman
        initialState={{
          ...createPacmanState(),
          lives: 0,
        }}
      />
    )

    expect(screen.getByLabelText('Pac-Man lives')).toHaveTextContent('0')
    expect(
      screen.getByText('Game over. Restart to chase another run.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Restart' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Restart' }))

    expect(screen.getByLabelText('Pac-Man lives')).toHaveTextContent('3')
    expect(screen.getByRole('button', { name: 'New Maze' })).toBeInTheDocument()
  })
})
