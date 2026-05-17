import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { GameHexgl } from '../games/GameHexgl'

describe('GameHexgl', () => {
  const focusFrame = vi.fn()

  beforeEach(() => {
    focusFrame.mockClear()

    Object.defineProperty(HTMLIFrameElement.prototype, 'focus', {
      configurable: true,
      value: focusFrame,
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('renders the HexGL iframe with the configured asset path', () => {
    render(<GameHexgl />)

    expect(screen.getByRole('heading', { name: 'HexGL' })).toBeInTheDocument()
    expect(screen.getByLabelText('HexGL game frame')).toHaveAttribute(
      'src',
      '/hexgl/index.html'
    )
  })

  it('focuses the iframe on mount and when the frame loads', () => {
    render(<GameHexgl />)

    const frame = screen.getByLabelText('HexGL game frame')

    expect(focusFrame).toHaveBeenCalledTimes(1)

    fireEvent.load(frame)

    expect(focusFrame).toHaveBeenCalledTimes(2)
  })
})
