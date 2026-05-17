import { ArcadeRoomBackground } from './components/ArcadeRoomBackground'
import { ConsoleShell } from './components/ConsoleShell'
import { LeftJoyconPanel } from './components/LeftJoyconPanel'
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
              <section
                aria-label="Right joycon region"
                className="space-y-4 text-right"
              >
                <p className="text-xs font-black uppercase tracking-[0.28em]">
                  Right Joycon
                </p>
                <div className="rounded-3xl border border-slate-950/15 bg-white/10 px-4 py-6">
                  <p className="text-sm font-medium text-slate-900/80">
                    Placeholder region for future actions and status controls.
                  </p>
                </div>
              </section>
            }
          />
        </div>
      </main>
    </RouteProvider>
  )
}

export default App
