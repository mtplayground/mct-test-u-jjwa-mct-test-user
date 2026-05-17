import { describe, expect, it } from 'vitest'

import { formatDuration } from '../formatDuration'

describe('formatDuration', () => {
  it('handles zero duration', () => {
    expect(formatDuration(0)).toBe('0 minutes 0 seconds')
  })

  it('handles singular seconds', () => {
    expect(formatDuration(1_000)).toBe('0 minutes 1 second')
  })

  it('handles singular minutes', () => {
    expect(formatDuration(60_000)).toBe('1 minute 0 seconds')
  })

  it('handles plural minutes and seconds', () => {
    expect(formatDuration(125_000)).toBe('2 minutes 5 seconds')
  })

  it('clamps negative input to zero', () => {
    expect(formatDuration(-500)).toBe('0 minutes 0 seconds')
  })
})
