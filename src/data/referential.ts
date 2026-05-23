// Le Référentiel de Naissance — a method of self-knowledge created by Georges
// Colleuil (from the 1980s) that maps a birth date onto the 22 major arcana of
// the Tarot de Marseille, arranged as a cross of fourteen "houses" (maisons).
//
// This module computes the fourteen houses from a birth date and resolves each
// arcanum to a card in our Rider–Waite–Smith deck. Because Colleuil works in the
// Marseille tradition, the mapping is faithful to it: arcanum VIII is La Justice
// and XI is La Force (swapped relative to RWS), and Le Mat is numbered 22.
//
// Houses 1–5 (the "rose des vents" cross + central quintessence) are canonical.
// Houses 6–13 follow one widely documented convention; practitioners differ on
// some of these formulas. House 14 is a minor arcanum drawn in base 56.

import { DECK, type Suit, type TarotCard } from './cards';

// ---- numerology helpers ---------------------------------------------------

/** Sum the decimal digits of a non-negative integer (e.g. 1975 → 22). */
function digitSum(n: number): number {
  return Math.abs(Math.trunc(n))
    .toString()
    .split('')
    .reduce((sum, d) => sum + Number(d), 0);
}

/** Reduce to the 1–22 range used by the major arcana (subtract 22 as needed). */
function reduce22(n: number): number {
  let x = n;
  while (x > 22) x -= 22;
  return x < 1 ? x + 22 : x;
}

/** Reduce to a single root 1–9, leaving the master numbers 11 and 22 intact. */
function reduce9(n: number): number {
  let x = digitSum(n);
  while (x > 9 && x !== 11 && x !== 22) x = digitSum(x);
  return x;
}

/** Reduce to the 1–56 range used by the minor arcana. */
function reduce56(n: number): number {
  return n <= 56 ? n : digitSum(n);
}

// ---- Marseille arcana ↔ deck ---------------------------------------------

const MARSEILLE_NAMES: Record<number, string> = {
  1: 'Le Bateleur',
  2: 'La Papesse',
  3: "L'Impératrice",
  4: "L'Empereur",
  5: 'Le Pape',
  6: "L'Amoureux",
  7: 'Le Chariot',
  8: 'La Justice',
  9: "L'Ermite",
  10: 'La Roue de Fortune',
  11: 'La Force',
  12: 'Le Pendu',
  13: "L'Arcane sans nom",
  14: 'Tempérance',
  15: 'Le Diable',
  16: 'La Maison Dieu',
  17: "L'Étoile",
  18: 'La Lune',
  19: 'Le Soleil',
  20: 'Le Jugement',
  21: 'Le Monde',
  22: 'Le Mat',
};

const ROMAN = [
  '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI',
  'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII',
];

const majorCard = (appNumber: number): TarotCard =>
  DECK.find((c) => c.arcana === 'major' && c.number === appNumber)!;

/**
 * Resolve a Référentiel major arcanum (1–22, Marseille numbering) to a deck
 * card. VIII/XI are swapped to keep the displayed archetype faithful to
 * Marseille, and 22 (Le Mat) maps to The Fool (numbered 0 in RWS).
 */
function majorArcaneCard(arcanum: number): TarotCard {
  if (arcanum === 8) return majorCard(11); // La Justice
  if (arcanum === 11) return majorCard(8); // La Force
  if (arcanum === 22) return majorCard(0); // Le Mat → The Fool
  return majorCard(arcanum);
}

const MINOR_SUITS: Suit[] = ['wands', 'cups', 'swords', 'pentacles'];

/** Resolve a minor arcanum (1–56, Marseille order) to a deck card. */
function minorArcaneCard(arcanum: number): TarotCard {
  const idx = arcanum - 1;
  const suit = MINOR_SUITS[Math.floor(idx / 14)];
  const number = (idx % 14) + 1;
  return DECK.find((c) => c.suit === suit && c.number === number)!;
}

// ---- the fourteen houses --------------------------------------------------

export interface HouseDef {
  /** 1–14. */
  n: number;
  /** Layout key — cardinal slot for the cross, or 'house' for the rest. */
  slot: 'n' | 'e' | 's' | 'w' | 'c' | 'house';
  nameEn: string;
  nameFr: string;
  /** A short framing of what the house speaks to. */
  blurb: string;
  /** The cross (1–5) is rendered apart from the satellite houses (6–14). */
  group: 'cross' | 'house';
  /** House 8 (la météo) is read for the present year, not the birth date. */
  dynamic?: boolean;
}

export const HOUSES: HouseDef[] = [
  { n: 1, slot: 'w', group: 'cross', nameEn: 'Personality', nameFr: 'La personnalité',
    blurb: 'How you meet the world — the temperament you were born wearing.' },
  { n: 2, slot: 'e', group: 'cross', nameEn: 'The Quest', nameFr: 'La quête',
    blurb: 'What you are reaching for; the deeper search that animates your days.' },
  { n: 3, slot: 'n', group: 'cross', nameEn: 'The Mind', nameFr: 'La pensée',
    blurb: 'Your mental world and the preoccupations that frame how you see things.' },
  { n: 4, slot: 's', group: 'cross', nameEn: 'Life Path', nameFr: 'Le chemin de vie',
    blurb: 'The concrete direction your existence tends toward.' },
  { n: 5, slot: 'c', group: 'cross', nameEn: 'The Necessary Passage', nameFr: 'Le passage obligé',
    blurb: 'The recurring threshold you must cross again and again to grow — the heart of the chart.' },
  { n: 6, slot: 'house', group: 'house', nameEn: 'Strengths', nameFr: 'Les qualités',
    blurb: 'Your innate gifts and resources — what comes to you naturally.' },
  { n: 7, slot: 'house', group: 'house', nameEn: 'Challenges', nameFr: 'Les défis',
    blurb: 'The friction you are here to work through.' },
  { n: 8, slot: 'house', group: 'house', dynamic: true, nameEn: 'The Climate', nameFr: 'La météo',
    blurb: 'The prevailing weather of the present year, read against your chart.' },
  { n: 9, slot: 'house', group: 'house', nameEn: 'The Self', nameFr: 'Le soi',
    blurb: 'Your ground of excellence — where you are most fully yourself.' },
  { n: 10, slot: 'house', group: 'house', nameEn: 'Experiences', nameFr: 'Les expériences',
    blurb: 'The lessons and trials through which the world shapes you.' },
  { n: 11, slot: 'house', group: 'house', nameEn: 'Inherited Project', nameFr: 'Le projet parental',
    blurb: 'The unspoken expectations carried down through your lineage.' },
  { n: 12, slot: 'house', group: 'house', nameEn: 'Healing', nameFr: 'La guérison',
    blurb: 'Where wholeness is found, and the path of repair.' },
  { n: 13, slot: 'house', group: 'house', nameEn: 'The Core Question', nameFr: 'La problématique',
    blurb: 'The central paradox your life keeps posing to you.' },
  { n: 14, slot: 'house', group: 'house', nameEn: 'The Minor Arcanum', nameFr: "L'arcane mineur",
    blurb: 'A wildcard key — how to release repeating patterns and ground the whole chart.' },
];

// ---- computation ----------------------------------------------------------

export interface ComputedHouse extends HouseDef {
  /** Arcanum value: 1–22 for the major houses, 1–56 for house 14. */
  arcanum: number;
  /** Marseille name of the arcanum ('' for the minor house). */
  marseille: string;
  /** Roman numeral of the arcanum ('' for the minor house). */
  roman: string;
  card: TarotCard;
}

export interface Referential {
  date: { year: number; month: number; day: number };
  /** The year house 8 (la météo) was read for. */
  weatherYear: number;
  houses: ComputedHouse[];
}

/**
 * Compute the full Référentiel de Naissance for a birth date. `weatherYear`
 * defaults to the current calendar year and drives house 8 (la météo).
 */
export function computeReferential(
  year: number,
  month: number,
  day: number,
  weatherYear: number = new Date().getFullYear(),
): Referential {
  const m1 = reduce22(day); // 23–31 fold back to 1–9
  const m2 = reduce22(month); // 1–12, already in range
  const m3 = reduce22(digitSum(year));
  const m4 = reduce22(m1 + m2 + m3);
  const m5 = reduce22(m1 + m2 + m3 + m4);

  const m6 = reduce22(m1 + m2);
  const m7 = Math.abs(m3 - m2) || 22; // a nil difference reads as Le Mat
  const m8 = reduce22(m6 + reduce9(weatherYear));
  const m9 = reduce22(m6 + m7);
  const m10 = ((22 - m9 - 1 + 22) % 22) + 1; // 22 − M9, folded into 1–22
  const m11 = reduce22(m7 + m3 + m10);
  const m12 = reduce22(m6 + m2 + m4);
  const m13 = reduce22(m9 + m2 + m5 + m4 + m12 + m1 + m3 + m11);
  const m14 = reduce56(m1 + m2 + m3 + m4);

  const values = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14];

  const houses = HOUSES.map((def, i): ComputedHouse => {
    const arcanum = values[i];
    if (def.n === 14) {
      return { ...def, arcanum, marseille: '', roman: '', card: minorArcaneCard(arcanum) };
    }
    return {
      ...def,
      arcanum,
      marseille: MARSEILLE_NAMES[arcanum],
      roman: ROMAN[arcanum],
      card: majorArcaneCard(arcanum),
    };
  });

  return { date: { year, month, day }, weatherYear, houses };
}
