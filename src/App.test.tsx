import { cleanup, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

const renderAtWidth = (width: number) => {
  window.innerWidth = width
  window.dispatchEvent(new Event('resize'))

  return render(<App />)
}

describe('App', () => {
  it('renders the routing skeleton and placeholder regions', () => {
    renderAtWidth(1280)

    expect(screen.getByLabelText('Console body')).toBeInTheDocument()
    expect(screen.getByLabelText('Center display bezel')).toBeInTheDocument()
    expect(screen.getByLabelText('Inner display region')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Choose a game to start playing' })
    ).toBeInTheDocument()
    expect(screen.getByText('Game menu slot')).toBeInTheDocument()
    expect(screen.getByText('End button slot')).toBeInTheDocument()
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
