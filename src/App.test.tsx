import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the Tailwind setup message', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Tailwind CSS is wired in.' })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /custom arcade theme with joycon, console, and screen bezel tokens/i
      )
    ).toBeInTheDocument()
  })
})
