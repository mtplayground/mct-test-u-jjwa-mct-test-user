import { ArcadeRoomBackground } from './components/ArcadeRoomBackground'
import { ConsoleShell } from './components/ConsoleShell'
import { LeftJoyconPanel } from './components/LeftJoyconPanel'
import { RightJoyconPanel } from './components/RightJoyconPanel'
import { RouteProvider } from './context/RouteContext'
import { ScreenRouter } from './views/ScreenRouter'

function App() {
  return (
    <RouteProvider>
      <main className="relative isolate min-h-screen overflow-hidden bg-console-backdrop px-4 py-6 text-slate-50 sm:px-6 sm:py-8">
        <ArcadeRoomBackground />
        <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-[88rem] items-center justify-center md:min-h-[calc(100vh-4rem)]">
          <ConsoleShell
            leftJoycon={
              <LeftJoyconPanel>
                <p className="text-sm font-medium text-slate-950/80">
                  Placeholder region for future controls and game selection.
                </p>
              </LeftJoyconPanel>
            }
            screen={<ScreenRouter />}
            rightJoycon={
              <RightJoyconPanel>
                <p className="text-sm font-medium text-slate-950/80">
                  Placeholder region for future actions and status controls.
                </p>
              </RightJoyconPanel>
            }
          />
        </div>
      </main>
    </RouteProvider>
  )
}

export default App
