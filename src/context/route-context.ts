import { createContext } from 'react'

export type AppRoute = 'welcome'

export type RouteContextValue = {
  currentRoute: AppRoute
  setCurrentRoute: (route: AppRoute) => void
}

export const RouteContext = createContext<RouteContextValue | null>(null)
