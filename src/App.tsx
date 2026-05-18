import { ArcadeRoomBackground } from './components/ArcadeRoomBackground'
import { ScreenBezel } from './components/CenterDisplay'
import { ConsoleShell } from './components/ConsoleShell'
import { EndPlayingButton } from './components/EndPlayingButton'
import { GameMenu } from './components/GameMenu'
import { LeftJoycon } from './components/LeftJoyconPanel'
import { RightJoycon } from './components/RightJoyconPanel'
import { SessionProvider } from './context/SessionContext'
import { useShellLayout } from './hooks/useShellLayout'
import { ScreenRouter } from './views/ScreenRouter'

function App() {
  const layout = useShellLayout()

  return (
    <SessionProvider>
      <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,1)_100%)] px-4 py-6 text-slate-50 sm:px-6 sm:py-8">
        <ArcadeRoomBackground />
        <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-[88rem] items-center justify-center md:min-h-[calc(100vh-4rem)]">
          <ConsoleShell
            layout={layout}
            leftJoycon={
              <LeftJoycon>
                <GameMenu />
              </LeftJoycon>
            }
            screen={
              <ScreenBezel>
                <ScreenRouter />
              </ScreenBezel>
            }
            rightJoycon={
              <RightJoycon>
                <EndPlayingButton />
              </RightJoycon>
            }
          />
        </div>
      </main>
    </SessionProvider>
  )
}

export default App
