import { DECK, type TarotCard } from './data/cards';
import type { Spread, SpreadPosition } from './data/spreads';

export interface DrawnCard {
  card: TarotCard;
  reversed: boolean;
  position: SpreadPosition;
}

/** Mulberry32 — a tiny seedable PRNG, for the deterministic daily card. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates shuffle into a new array, using the given RNG. */
function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Draw one card per position in the spread. Cards are unique within a draw;
 * each has a ~50% chance of being reversed when `allowReversed` is set.
 */
export function drawSpread(spread: Spread, allowReversed: boolean): DrawnCard[] {
  const shuffled = shuffle(DECK);
  return spread.positions.map((position, i) => ({
    card: shuffled[i],
    reversed: allowReversed && Math.random() < 0.5,
    position,
  }));
}

/** A stable integer seed from a YYYY-MM-DD date string. */
function seedFromDate(date: Date): number {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * The card of the day — deterministic for a given date, so it stays constant
 * all day and differs from one day to the next.
 */
export function dailyCard(date = new Date()): { card: TarotCard; reversed: boolean } {
  const rng = mulberry32(seedFromDate(date));
  const card = DECK[Math.floor(rng() * DECK.length)];
  const reversed = rng() < 0.4;
  return { card, reversed };
}

export function meaningFor(drawn: DrawnCard | { card: TarotCard; reversed: boolean }): string {
  return drawn.reversed ? drawn.card.reversedMeaning : drawn.card.uprightMeaning;
}

export function keywordsFor(
  drawn: DrawnCard | { card: TarotCard; reversed: boolean },
): string[] {
  return drawn.reversed ? drawn.card.reversed : drawn.card.upright;
}
