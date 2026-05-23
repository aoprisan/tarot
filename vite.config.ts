import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages project sites are served from /<repo>/. Override with
// VITE_BASE (e.g. "/" for a user/org site or a custom domain).
const base = process.env.VITE_BASE ?? '/tarot/';

export default defineConfig({
  base,
  build: {
    target: 'es2022',
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'cards/back.svg'],
      manifest: {
        name: 'Arcana — Tarot',
        short_name: 'Arcana',
        description:
          'A celestial Rider–Waite tarot companion. Draw cards, read spreads, reflect.',
        lang: 'en',
        theme_color: '#e9dcbf',
        background_color: '#e9dcbf',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['lifestyle', 'entertainment'],
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the app shell; keep the 78 card faces out of the install
        // payload and serve them CacheFirst so they go offline once seen.
        // woff2 is supported by every service-worker-capable browser; the
        // .woff fallbacks stay in dist but are left out of the precache.
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        globIgnores: ['**/cards/**'],
        navigateFallback: `${base}index.html`,
        runtimeCaching: [
          {
            urlPattern: ({ url }: { url: URL }) => url.pathname.includes('/cards/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'tarot-cards',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
});
