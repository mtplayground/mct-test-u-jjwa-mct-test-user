import type { ReactNode } from 'react'
import { useEffect, useReducer } from 'react'

import { SessionContext } from './session-context'
import { initialSessionState, sessionReducer } from './session'

const TICK_INTERVAL_MS = 100
const TICK_SECONDS = TICK_INTERVAL_MS / 1000

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialSessionState)

  useEffect(() => {
    if (state.selectedGame === null || state.isEnded) {
      return
    }

    const intervalId = window.setInterval(() => {
      dispatch({ type: 'TICK', seconds: TICK_SECONDS })
    }, TICK_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [state.isEnded, state.selectedGame])

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  )
}
