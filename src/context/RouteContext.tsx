import type { ReactNode } from 'react'
import { useState } from 'react'

import { RouteContext, type AppRoute } from './route-context'

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('welcome')

  return (
    <RouteContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </RouteContext.Provider>
  )
}
