import { ConsoleShell } from './components/ConsoleShell'
import { RouteProvider } from './context/RouteContext'
import { ScreenRouter } from './views/ScreenRouter'

function App() {
  return (
    <RouteProvider>
      <main className="min-h-screen bg-console-backdrop px-4 py-8 text-slate-50 sm:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
          <ConsoleShell
            leftJoycon={
              <section aria-label="Left joycon region" className="space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.28em]">
                  Left Joycon
                </p>
                <div className="rounded-3xl border border-slate-950/15 bg-white/10 px-4 py-6">
                  <p className="text-sm font-medium text-slate-900/80">
                    Placeholder region for future controls and game selection.
                  </p>
                </div>
              </section>
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
