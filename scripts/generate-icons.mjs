// Generates PWA PNG icons from an inline SVG emblem using sharp.
// Usage: node scripts/generate-icons.mjs

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, '..', 'public');

/**
 * Render the sun-moon emblem as an SVG square.
 * @param size   pixel dimension
 * @param scale  emblem diameter as a fraction of `size` (smaller = more padding)
 * @param fullBleed  fill the whole square (maskable) vs. a rounded card
 */
function emblem(size, { scale = 0.74, fullBleed = false } = {}) {
  const c = size / 2;
  const u = (size * scale) / 2 / 18; // unit derived from the 18-radius circle

  const rays = [0, 45, 90, 135, 180, 225, 270, 315]
    .map((deg) => {
      const a = (deg * Math.PI) / 180;
      const [cx, cy] = [Math.cos(a), Math.sin(a)];
      return `<line x1="${c + 22 * u * cx}" y1="${c + 22 * u * cy}" x2="${c + 27 * u * cx}" y2="${c + 27 * u * cy}" />`;
    })
    .join('');

  const bg = fullBleed
    ? `<rect width="${size}" height="${size}" fill="url(#bg)" />`
    : `<rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bg)" />`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="#1b1640" />
      <stop offset="100%" stop-color="#070617" />
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f6e7b0" />
      <stop offset="50%" stop-color="#cda349" />
      <stop offset="100%" stop-color="#8a6b21" />
    </linearGradient>
  </defs>
  ${bg}
  <g transform="translate(${c} ${c})" stroke="url(#gold)" fill="none" stroke-width="${1.4 * u}">
    <circle r="${18 * u}" />
  </g>
  <g stroke="url(#gold)" stroke-width="${1.1 * u}">${rays}</g>
  <g transform="translate(${c} ${c})">
    <path d="M 0 ${-10 * u} A ${10 * u} ${10 * u} 0 1 0 ${7 * u} ${9 * u} A ${13 * u} ${13 * u} 0 1 1 0 ${-10 * u} Z" fill="url(#gold)" />
  </g>
</svg>`;
}

const targets = [
  { name: 'icon-192.png', size: 192, opts: { scale: 0.74 } },
  { name: 'icon-512.png', size: 512, opts: { scale: 0.74 } },
  { name: 'icon-512-maskable.png', size: 512, opts: { scale: 0.56, fullBleed: true } },
  { name: 'apple-touch-icon.png', size: 180, opts: { scale: 0.72 } },
];

for (const { name, size, opts } of targets) {
  await sharp(Buffer.from(emblem(size, opts))).png().toFile(join(PUB, name));
  console.log(`✓ ${name} (${size}×${size})`);
}
console.log('Icons generated in public/.');
