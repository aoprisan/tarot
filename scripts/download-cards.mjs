// Downloads the public-domain Rider–Waite–Smith tarot deck (published 1909)
// from Wikimedia Commons into public/cards/ so the PWA works fully offline.
//
// Usage: node scripts/download-cards.mjs
//
// Wikimedia asks for a descriptive User-Agent and gentle request rates; we
// throttle and retry on 429. Images are fetched at a sane width to keep the
// repo light (~200 KB each).

import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'cards');
const WIDTH = 600;
const UA = 'arcana-tarot-pwa/1.0 (https://github.com/; contact: aoprisan@gmail.com)';

const MAJOR = [
  'RWS_Tarot_00_Fool',
  'RWS_Tarot_01_Magician',
  'RWS_Tarot_02_High_Priestess',
  'RWS_Tarot_03_Empress',
  'RWS_Tarot_04_Emperor',
  'RWS_Tarot_05_Hierophant',
  'RWS_Tarot_06_Lovers',
  'RWS_Tarot_07_Chariot',
  'RWS_Tarot_08_Strength',
  'RWS_Tarot_09_Hermit',
  'RWS_Tarot_10_Wheel_of_Fortune',
  'RWS_Tarot_11_Justice',
  'RWS_Tarot_12_Hanged_Man',
  'RWS_Tarot_13_Death',
  'RWS_Tarot_14_Temperance',
  'RWS_Tarot_15_Devil',
  'RWS_Tarot_16_Tower',
  'RWS_Tarot_17_Star',
  'RWS_Tarot_18_Moon',
  'RWS_Tarot_19_Sun',
  'RWS_Tarot_20_Judgement',
  'RWS_Tarot_21_World',
];

// Minor arcana on Commons: <Suit>NN.jpg, NN = 01..14 (Ace..10, Page, Knight, Queen, King).
const SUITS = { wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pents' };

/** Build the full list of { commonsFile, localName } pairs. */
function manifest() {
  const items = [];
  MAJOR.forEach((file, i) => {
    items.push({ commons: `${file}.jpg`, local: `major-${String(i).padStart(2, '0')}.jpg` });
  });
  for (const [suit, prefix] of Object.entries(SUITS)) {
    for (let n = 1; n <= 14; n++) {
      const nn = String(n).padStart(2, '0');
      items.push({ commons: `${prefix}${nn}.jpg`, local: `${suit}-${nn}.jpg` });
    }
  }
  return items;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function fetchImage(commonsFile, attempt = 1) {
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    commonsFile,
  )}?width=${WIDTH}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (res.status === 429 && attempt <= 5) {
    const wait = 2000 * attempt;
    process.stdout.write(` (rate-limited, retry in ${wait}ms)`);
    await sleep(wait);
    return fetchImage(commonsFile, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${commonsFile}`);
  const ct = res.headers.get('content-type') || '';
  if (!ct.startsWith('image/')) throw new Error(`Non-image (${ct}) for ${commonsFile}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const items = manifest();
  let done = 0;
  for (const { commons, local } of items) {
    const dest = join(OUT, local);
    if (await exists(dest)) {
      done++;
      process.stdout.write(`\r[${done}/${items.length}] ${local} — cached`.padEnd(60));
      continue;
    }
    process.stdout.write(`\r[${done + 1}/${items.length}] ${local} ← ${commons}`.padEnd(60));
    const buf = await fetchImage(commons);
    await writeFile(dest, buf);
    done++;
    await sleep(350); // be polite to Wikimedia
  }
  process.stdout.write(`\rDownloaded ${done}/${items.length} cards into public/cards/`.padEnd(60));
  console.log('\nDone.');
}

main().catch((err) => {
  console.error('\nDownload failed:', err.message);
  process.exit(1);
});
