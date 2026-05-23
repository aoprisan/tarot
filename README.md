# Arcana — Tarot

A celestial **Rider–Waite–Smith** tarot companion. Draw a card of the day, lay
single / three-card / mind-body-spirit / Celtic-Cross spreads, flip cards, and
read upright & reversed meanings — all in a single-page app that installs and
works **fully offline**.

> Built as a **SPA + PWA** with **TypeScript + Vite**, deployed to **GitHub Pages**.

<p align="center"><em>Midnight indigo · aged gold · starfield & grain.</em></p>

## Features

- 🃏 **All 78 cards** of the Rider–Waite–Smith deck with upright & reversed keywords and meanings.
- 🔮 **Card of the day** — deterministic per date, so it stays constant all day.
- 🌗 **Reversible draws** — toggle reversed cards on/off.
- 🂠 **Four spreads** — Single, Past·Present·Future, Mind·Body·Spirit, and the full Celtic Cross.
- ✨ **Tap to flip, tap again for detail** — animated card flips with a meaning modal.
- 📲 **Installable PWA** — offline-ready via a service worker; card faces cache as you view them.
- ♿ Keyboard-accessible cards, reduced-motion support, responsive down to mobile.
- 🔗 **Shareable readings** — `?auto=three`, `?auto=celtic-cross`, etc. open with a spread already drawn.

## Tech stack

| Concern        | Choice                                      |
| -------------- | ------------------------------------------- |
| Language       | TypeScript (strict)                         |
| Build / dev    | Vite 6                                       |
| PWA            | `vite-plugin-pwa` (Workbox, `autoUpdate`)   |
| Fonts          | Self-hosted Cormorant Garamond + EB Garamond (`@fontsource`) |
| UI             | Vanilla DOM (no framework) + hand-written CSS |
| Hosting        | GitHub Pages via GitHub Actions             |

## Getting started

```bash
npm install
npm run cards     # download the 78 public-domain card images into public/cards/
npm run icons     # (re)generate the PWA icons
npm run dev       # http://localhost:5173/tarot/
```

`npm run cards` is only needed once — the images are committed to the repo.

### Build & preview

```bash
npm run build     # type-check + production build into dist/
npm run preview   # serve the built app
```

## Deployment (GitHub Pages)

1. Create a GitHub repo and push this code to `main`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
   which builds and publishes `dist/`.

The site is served from `https://<user>.github.io/<repo>/`, so the Vite **base
path** must match the repo name. The workflow sets it automatically from the
repo name; for local builds it defaults to `/tarot/` (see `vite.config.ts`).
To override (e.g. a user/org site or custom domain), set the `VITE_BASE`
repository variable, or:

```bash
VITE_BASE=/ npm run build
```

## Card artwork & license

The card images are the **Rider–Waite–Smith tarot** illustrated by Pamela Colman
Smith (published by William Rider & Son, 1909). This artwork is in the **public
domain** in the United States; the files are fetched from
[Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck)
by `scripts/download-cards.mjs`.

The application code is provided under the MIT License. For reflection and
entertainment.
