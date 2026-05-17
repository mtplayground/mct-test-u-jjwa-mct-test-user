import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { GamePacman } from '../games/GamePacman'

afterEach(() => {
  cleanup()
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

  it('moves the player with arrow keys and updates score', () => {
    render(<GamePacman />)

    fireEvent.keyDown(window, { key: 'ArrowLeft' })

    expect(screen.getByLabelText('Pac-Man score')).toHaveTextContent('10')
    expect(
      screen.getByLabelText('Pac-Man pellets remaining')
    ).toHaveTextContent('39')
    expect(screen.getByText('Pellet cleared.')).toBeInTheDocument()
  })

  it('resets the maze with New Maze', () => {
    render(<GamePacman />)

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    fireEvent.click(screen.getByRole('button', { name: 'New Maze' }))

    expect(screen.getByLabelText('Pac-Man score')).toHaveTextContent('0')
    expect(
      screen.getByLabelText('Pac-Man pellets remaining')
    ).toHaveTextContent('40')
    expect(
      screen.getByText('Use arrow keys to clear the maze.')
    ).toBeInTheDocument()
  })

  it('shows fright mode after a power pellet route', () => {
    render(<GamePacman />)

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    fireEvent.keyDown(window, { key: 'ArrowUp' })
    fireEvent.keyDown(window, { key: 'ArrowUp' })

    expect(screen.getByText('Power pellet collected.')).toBeInTheDocument()
    expect(screen.getByText('Fright')).toBeInTheDocument()
  })
})
