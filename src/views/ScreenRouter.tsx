import { useRoute } from '../context/useRoute'
import { WelcomeView } from './WelcomeView'

export const ScreenRouter = () => {
  const { currentRoute } = useRoute()

  switch (currentRoute) {
    case 'welcome':
      return <WelcomeView />
    default:
      return <WelcomeView />
  }
}
