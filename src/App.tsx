import { ArcadeRoomBackground } from './components/ArcadeRoomBackground'
import { ScreenBezel } from './components/CenterDisplay'
import { ConsoleShell } from './components/ConsoleShell'
import { LeftJoycon } from './components/LeftJoyconPanel'
import { RightJoycon } from './components/RightJoyconPanel'
import { SessionProvider } from './context/SessionContext'
import { useShellLayout } from './hooks/useShellLayout'
import { ScreenRouter } from './views/ScreenRouter'

function App() {
  const layout = useShellLayout()

  return (
    <SessionProvider>
      <main className="relative isolate min-h-screen overflow-hidden bg-console-backdrop px-4 py-6 text-slate-50 sm:px-6 sm:py-8">
        <ArcadeRoomBackground />
        <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-[88rem] items-center justify-center md:min-h-[calc(100vh-4rem)]">
          <ConsoleShell
            layout={layout}
            leftJoycon={
              <LeftJoycon>
                <p className="text-sm font-medium text-slate-950/80">
                  Placeholder region for future controls and game selection.
                </p>
              </LeftJoycon>
            }
            screen={
              <ScreenBezel>
                <ScreenRouter />
              </ScreenBezel>
            }
            rightJoycon={
              <RightJoycon>
                <p className="text-sm font-medium text-slate-950/80">
                  Placeholder region for future actions and status controls.
                </p>
              </RightJoycon>
            }
          />
        </div>
      </main>
    </SessionProvider>
  )
}

export default App
