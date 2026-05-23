// Generates PWA PNG icons from an inline SVG emblem using sharp.
// Usage: node scripts/generate-icons.mjs

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, '..', 'public');

/**
 * Render the "squared circle" (philosopher's stone) emblem in sepia on aged
 * paper as an SVG square.
 * @param size   pixel dimension
 * @param scale  emblem diameter as a fraction of `size`
 * @param fullBleed  fill the whole square (maskable) vs. a rounded card
 */
function emblem(size, { scale = 0.72, fullBleed = false } = {}) {
  const c = size / 2;
  const r = (size * scale) / 2; // outer circle radius
  const sq = r * 0.72; // square half-side
  const triTop = r * 0.85;
  const triBase = r * 0.6;
  const inner = r * 0.37;
  const sw = Math.max(1, size * 0.006);

  const bg = fullBleed
    ? `<rect width="${size}" height="${size}" fill="url(#paper)" />`
    : `<rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#paper)" />`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f3ecd9" />
      <stop offset="100%" stop-color="#e2d3b1" />
    </linearGradient>
  </defs>
  ${bg}
  <g transform="translate(${c} ${c})" stroke="#5b4326" fill="none" stroke-width="${sw}">
    <circle r="${r}" />
    <rect x="${-sq}" y="${-sq}" width="${sq * 2}" height="${sq * 2}" />
    <path d="M0 ${-triTop} L${triBase} ${triBase} L${-triBase} ${triBase} Z" />
    <circle r="${inner}" />
    <circle r="${inner * 0.36}" fill="#8a322b" stroke="none" />
  </g>
</svg>`;
}

const targets = [
  { name: 'icon-192.png', size: 192, opts: { scale: 0.7 } },
  { name: 'icon-512.png', size: 512, opts: { scale: 0.7 } },
  { name: 'icon-512-maskable.png', size: 512, opts: { scale: 0.54, fullBleed: true } },
  { name: 'apple-touch-icon.png', size: 180, opts: { scale: 0.68 } },
];

for (const { name, size, opts } of targets) {
  await sharp(Buffer.from(emblem(size, opts))).png().toFile(join(PUB, name));
  console.log(`✓ ${name} (${size}×${size})`);
}
console.log('Icons generated in public/.');
