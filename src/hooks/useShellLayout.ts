import { useEffect, useState } from 'react'

export type ShellLayout = 'desktop' | 'tablet'

const DESKTOP_BREAKPOINT = 1024

const getShellLayout = (): ShellLayout => {
  if (typeof window === 'undefined') {
    return 'desktop'
  }

  return window.innerWidth >= DESKTOP_BREAKPOINT ? 'desktop' : 'tablet'
}

export const useShellLayout = () => {
  const [layout, setLayout] = useState<ShellLayout>(getShellLayout)

  useEffect(() => {
    const handleResize = () => {
      setLayout(getShellLayout())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return layout
}
