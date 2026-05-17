import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the routing skeleton and placeholder regions', () => {
    render(<App />)

    expect(screen.getByLabelText('Console body')).toBeInTheDocument()
    expect(screen.getByLabelText('Center display bezel')).toBeInTheDocument()
    expect(screen.getByLabelText('Inner display region')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Console layout scaffolded.' })
    ).toBeInTheDocument()
    expect(screen.getByText('Game menu slot')).toBeInTheDocument()
    expect(screen.getByText('End button slot')).toBeInTheDocument()
    expect(
      screen.getByText(
        /directory structure for components, games, context, and views/i
      )
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Left joycon region')).toBeInTheDocument()
    expect(screen.getByLabelText('Right joycon region')).toBeInTheDocument()
    expect(screen.getByText('route=welcome')).toBeInTheDocument()
    expect(screen.getByText('VITE_HEXGL_BASE_PATH=/hexgl/')).toBeInTheDocument()
  })
})
