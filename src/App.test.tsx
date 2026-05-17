import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import App from './App'

const renderAtWidth = (width: number) => {
  window.innerWidth = width
  window.dispatchEvent(new Event('resize'))

  return render(<App />)
}

afterEach(() => {
  cleanup()
})

describe('App', () => {
  it('renders the shell with mounted controls and welcome screen', () => {
    renderAtWidth(1280)

    expect(screen.getByLabelText('Console body')).toBeInTheDocument()
    expect(screen.getByLabelText('Center display bezel')).toBeInTheDocument()
    expect(screen.getByLabelText('Inner display region')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Choose a game to start playing' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /cartridge 2048 go/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /session control end playing stop/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /select a cartridge from the left controller to initialize the arcade session/i
      )
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Left joycon region')).toBeInTheDocument()
    expect(screen.getByLabelText('Right joycon region')).toBeInTheDocument()
    expect(screen.getByText('route=welcome')).toBeInTheDocument()
    expect(screen.getByText('VITE_HEXGL_BASE_PATH=/hexgl/')).toBeInTheDocument()
  })

  it('supports the welcome to goodbye integration flow', () => {
    renderAtWidth(1280)

    const endPlayingButton = screen.getByRole('button', {
      name: /end playing/i,
    })

    expect(endPlayingButton).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: /cartridge 2048 go/i }))

    expect(screen.getByRole('heading', { name: '2048' })).toBeInTheDocument()
    expect(screen.getByRole('grid', { name: '2048 board' })).toBeInTheDocument()
    expect(screen.getByLabelText('2048 score')).toHaveTextContent('0')
    expect(endPlayingButton).toBeEnabled()
    expect(
      screen.getByRole('button', { name: /cartridge 2048 on/i })
    ).toHaveAttribute('data-active', 'true')

    fireEvent.click(
      screen.getByRole('button', { name: /cartridge pac-man go/i })
    )

    expect(
      screen.queryByRole('heading', { name: '2048' })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Pac-Man' })).toBeInTheDocument()
    expect(screen.getByLabelText('Pac-Man maze')).toBeInTheDocument()
    expect(screen.getByLabelText('Pac-Man score')).toHaveTextContent('0')
    expect(screen.getByLabelText('Pac-Man lives')).toHaveTextContent('3')
    expect(
      screen.getByRole('button', { name: /cartridge pac-man on/i })
    ).toHaveAttribute('data-active', 'true')

    fireEvent.click(screen.getByRole('button', { name: /cartridge hexgl go/i }))

    expect(
      screen.queryByRole('heading', { name: 'Pac-Man' })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'HexGL' })).toBeInTheDocument()
    expect(screen.getByLabelText('HexGL game frame')).toHaveAttribute(
      'src',
      '/hexgl/index.html'
    )
    expect(
      screen.getByRole('button', { name: /cartridge hexgl on/i })
    ).toHaveAttribute('data-active', 'true')

    fireEvent.click(endPlayingButton)

    expect(
      screen.getByRole('heading', { name: 'Thanks for playing!' })
    ).toBeInTheDocument()
    expect(screen.getByText(/total play time:/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }))

    expect(
      screen.getByRole('heading', { name: 'Choose a game to start playing' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /cartridge pac-man go/i })
    ).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: /end playing/i })).toBeDisabled()
  })

  it('matches the desktop shell snapshot', () => {
    const { container } = renderAtWidth(1280)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches the tablet shell snapshot', () => {
    cleanup()

    const { container } = renderAtWidth(900)

    expect(container.firstChild).toMatchSnapshot()
  })
})
