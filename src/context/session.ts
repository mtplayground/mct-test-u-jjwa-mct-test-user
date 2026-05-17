export type GameId = '2048' | 'pacman' | 'hexgl'

export type SessionState = {
  selectedGame: GameId | null
  elapsedSeconds: number
  isEnded: boolean
}

export type SessionAction =
  | {
      type: 'SELECT_GAME'
      gameId: GameId
    }
  | {
      type: 'TICK'
      seconds?: number
    }
  | {
      type: 'END'
    }
  | {
      type: 'RESET'
    }

export const initialSessionState: SessionState = {
  selectedGame: null,
  elapsedSeconds: 0,
  isEnded: false,
}

export const sessionReducer = (
  state: SessionState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case 'SELECT_GAME':
      return {
        ...state,
        selectedGame: action.gameId,
        isEnded: false,
      }

    case 'TICK': {
      if (state.selectedGame === null || state.isEnded) {
        return state
      }

      const seconds = Math.max(0, action.seconds ?? 1)

      if (seconds === 0) {
        return state
      }

      return {
        ...state,
        elapsedSeconds: state.elapsedSeconds + seconds,
      }
    }

    case 'END':
      return {
        ...state,
        isEnded: true,
      }

    case 'RESET':
      return initialSessionState

    default: {
      const exhaustiveCheck: never = action
      return exhaustiveCheck
    }
  }
}
