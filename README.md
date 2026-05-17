# ZeroClaw Arcade

Vite + React + TypeScript bootstrap for the arcade session app, with Tailwind
CSS configured for the arcade theme tokens.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run format:check`
- `npm run preview`
- `npm run test`
- `npm run test:e2e`

## Environment

- Copy `.env.example` to `.env` when you need local overrides.
- `VITE_HEXGL_BASE_PATH` controls where bundled HexGL assets will be served
  from.
- Default: `/hexgl/`

## Production Build

- `npm run build` emits the app shell into `dist/` and bundles the vendored
  HexGL payload under `dist/hexgl/`.
- Verified release artifacts include:
  - `dist/index.html`
  - `dist/assets/*`
  - `dist/hexgl/index.html`
  - `dist/hexgl/launch.js`
  - `dist/hexgl/audio/bg.ogg`
  - `dist/hexgl/bkcore/hexgl/tracks/Cityscape.js`

## Self-Hosting

- Build first:

```bash
npm run build
```

- Serve `dist/` with Caddy:

```bash
caddy file-server --root dist --listen :8080
```

- Or serve `dist/` with `serve`:

```bash
npx serve -l 8080 dist
```

- After starting either server, verify:
  - App shell loads at `http://127.0.0.1:8080/`
  - HexGL entry resolves at `http://127.0.0.1:8080/hexgl/index.html`
  - With `npx serve`, `/hexgl/index.html` may redirect to `/hexgl/index`
    while still serving the same file
