import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: vi.fn(() => ({
    beginPath: vi.fn(),
    arc: vi.fn(),
    clearRect: vi.fn(),
    fill: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    lineTo: vi.fn(),
    strokeRect: vi.fn(),
    set fillStyle(_value: string) {},
    set font(_value: string) {},
    set strokeStyle(_value: string) {},
  })),
})
