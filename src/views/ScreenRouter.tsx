import { useSession } from '../context/useSession'
import { Game2048Screen, HexglScreen, PacmanScreen } from '../games/screens'
import { GoodbyeView } from './GoodbyeView'
import { WelcomeView } from './WelcomeView'

export const ScreenRouter = () => {
  const {
    state: { isEnded, selectedGame },
  } = useSession()
  const activeGame = selectedGame

  if (isEnded) {
    return (
      <>
        {selectedGame === 'hexgl' ? (
          <div
            aria-hidden="true"
            className="pointer-events-none h-0 overflow-hidden opacity-0"
          >
            <HexglScreen />
          </div>
        ) : null}
        <GoodbyeView />
      </>
    )
  }

  if (activeGame === null) {
    return <WelcomeView />
  }

  switch (activeGame) {
    case '2048':
      return <Game2048Screen key="2048" />
    case 'pacman':
      return <PacmanScreen key="pacman" />
    case 'hexgl':
      return <HexglScreen key="hexgl" />
    default: {
      const exhaustiveCheck: never = activeGame
      return exhaustiveCheck
    }
  }
}
