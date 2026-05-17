import { useSession } from '../context/useSession'
import { gameRegistryById } from '../games'
import { GoodbyeView } from './GoodbyeView'
import { WelcomeView } from './WelcomeView'

export const ScreenRouter = () => {
  const {
    state: { isEnded, selectedGame },
  } = useSession()
  const activeGame = selectedGame

  if (isEnded) {
    return <GoodbyeView />
  }

  if (activeGame === null) {
    return <WelcomeView />
  }

  const ActiveGameScreen = gameRegistryById[activeGame].component

  return <ActiveGameScreen key={activeGame} />
}
