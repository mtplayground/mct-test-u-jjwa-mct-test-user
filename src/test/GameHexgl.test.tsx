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

  it('renders the HexGL shell before the race bundle is launched', () => {
    render(<GameHexgl />)

    expect(screen.getByRole('heading', { name: 'HexGL' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Launch Race' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('HexGL game frame')).toHaveAttribute(
      'src',
      'about:blank'
    )
  })

  it('boots and focuses the iframe when the race is launched', () => {
    render(<GameHexgl />)

    expect(focusFrame).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Launch Race' }))

    const frame = screen.getByLabelText('HexGL game frame')

    expect(focusFrame).toHaveBeenCalledTimes(1)
    expect(frame).toHaveAttribute('src', '/hexgl/index.html')

    fireEvent.load(frame)

    expect(focusFrame).toHaveBeenCalledTimes(2)
  })
})
