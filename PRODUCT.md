# ZeroClaw Arcade

## What It Is

ZeroClaw Arcade is a single-page Vite + React + TypeScript web app that wraps
three playable experiences inside a stylized handheld-console UI:

- `2048`
- `Pac-Man`
- `HexGL`

It is designed as a session-based arcade shell: the player picks games from the
left joycon, plays inside the center display, and ends the session with the
right joycon.

## What It Does

- Renders an arcade-room backdrop and responsive console shell for desktop and
  tablet layouts.
- Uses a flexible center display with responsive minimum heights so tall game
  screens can grow instead of being clipped into a fixed aspect box.
- Tracks one session across multiple games with total elapsed time and
  per-game elapsed time.
- Shows a welcome screen before play and a goodbye summary after the session
  ends.
- Embeds HexGL as a static vendored experience served from `/hexgl/`.

## Current Features

- `2048` is fully interactive with keyboard input, score tracking, and internal
  reset.
- `Pac-Man` is canvas-based with pellets, power pellets, ghosts, collisions,
  lives, and restart behavior.
- `HexGL` is mounted in an iframe pointed at `VITE_HEXGL_BASE_PATH +
  "index.html"` and is expected to receive keyboard focus on mount.
- The game menu highlights the active game and the end-session control is wired
  into shared session state.
- The goodbye screen reports total time plus a per-game breakdown for `2048`,
  `Pac-Man`, and `HexGL`.

## Architecture

- `src/components/`: console shell, joycons, menu, bezel, background, and
  session controls.
- `src/views/`: welcome, goodbye, and screen routing.
- `src/games/`: game implementations plus pure logic modules for `2048` and
  `Pac-Man`.
- `src/context/`: session state, reducer, provider, and hooks.
- `public/hexgl/`: vendored HexGL static assets copied straight into the final
  build.

## Key Decisions

- Session timing is centralized in `SessionContext` with a `100ms` tick and a
  reducer-driven state model.
- The center display owns screen sizing centrally; games are allowed to expand
  past the minimum display height and fall back to scrolling when oversized.
- `2048` and core `Pac-Man` behavior are implemented as testable pure logic,
  with React components layered on top.
- HexGL is not rebuilt from source inside the React app; it is treated as a
  static bundle and served as-is from the public/dist tree.

## Conventions

- Default local/dev/preview server port is `8080`.
- `VITE_HEXGL_BASE_PATH` defaults to `/hexgl/`.
- Unit and integration tests use Vitest.
- Browser smoke coverage uses Playwright and exercises the cross-game session
  flow.
