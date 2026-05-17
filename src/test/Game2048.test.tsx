import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Game2048 } from '../games/Game2048'

const createDeterministicRandom = (values: number[]) => {
  let index = 0

  return () => {
    const value = values[index] ?? values[values.length - 1] ?? 0
    index += 1
    return value
  }
}

afterEach(() => {
  cleanup()
})

describe('Game2048', () => {
  it('renders the 4x4 board and initial score', () => {
    render(<Game2048 random={createDeterministicRandom([0, 0, 0.99, 0.95])} />)

    expect(screen.getByRole('heading', { name: '2048' })).toBeInTheDocument()
    expect(screen.getByLabelText('2048 score')).toHaveTextContent('0')
    expect(screen.getByRole('grid', { name: '2048 board' })).toBeInTheDocument()
    expect(screen.getAllByRole('gridcell')).toHaveLength(16)
    expect(
      screen.getByLabelText('Tile 2 at row 1 column 1')
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('Tile 4 at row 4 column 4')
    ).toBeInTheDocument()
  })

  it('responds to arrow keys by moving tiles and updating score', () => {
    render(
      <Game2048
        random={createDeterministicRandom([0, 0, 0.14, 0, 0.99, 0.1])}
      />
    )

    fireEvent.keyDown(window, { key: 'ArrowLeft' })

    expect(
      screen.getByLabelText('Tile 4 at row 1 column 1')
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('Tile 2 at row 4 column 4')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('2048 score')).toHaveTextContent('4')
    expect(
      screen.getByText('Shift tiles until you build the 2048 block.')
    ).toBeInTheDocument()
  })

  it('resets to a new board when New Game is clicked', () => {
    render(
      <Game2048
        random={createDeterministicRandom([
          0, 0, 0.14, 0, 0.99, 0.1, 0.4, 0.95, 0.74, 0.95,
        ])}
      />
    )

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    fireEvent.click(screen.getByRole('button', { name: 'New Game' }))

    expect(
      screen.getByLabelText('Tile 4 at row 2 column 3')
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('Tile 4 at row 4 column 1')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('2048 score')).toHaveTextContent('0')
  })
})
