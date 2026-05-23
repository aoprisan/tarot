// Spread layouts. Each position carries a label and a short prompt that frames
// the card drawn there. `slot` keys feed the CSS grid template for that spread.

export interface SpreadPosition {
  slot: string;
  label: string;
  prompt: string;
}

export interface Spread {
  id: string;
  name: string;
  tagline: string;
  /** Number of cards == positions.length. */
  positions: SpreadPosition[];
}

export const SPREADS: Spread[] = [
  {
    id: 'single',
    name: 'Single Draw',
    tagline: 'One card, one truth',
    positions: [{ slot: 'a', label: 'The Card', prompt: 'What the moment asks you to see.' }],
  },
  {
    id: 'three',
    name: 'Past · Present · Future',
    tagline: 'The thread of time',
    positions: [
      { slot: 'a', label: 'Past', prompt: 'The roots — what brought you here.' },
      { slot: 'b', label: 'Present', prompt: 'The crossing — where you stand now.' },
      { slot: 'c', label: 'Future', prompt: 'The path — where this current flows.' },
    ],
  },
  {
    id: 'mind-body-spirit',
    name: 'Mind · Body · Spirit',
    tagline: 'Three selves in balance',
    positions: [
      { slot: 'a', label: 'Mind', prompt: 'Your thoughts and beliefs.' },
      { slot: 'b', label: 'Body', prompt: 'The material and physical.' },
      { slot: 'c', label: 'Spirit', prompt: 'Your deeper purpose.' },
    ],
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    tagline: 'The full reading',
    positions: [
      { slot: 'a', label: 'The Heart', prompt: 'The core of the matter.' },
      { slot: 'b', label: 'The Crossing', prompt: 'What challenges or supports it.' },
      { slot: 'c', label: 'The Foundation', prompt: 'The distant past and root cause.' },
      { slot: 'd', label: 'The Recent Past', prompt: 'What is now passing away.' },
      { slot: 'e', label: 'The Crown', prompt: 'The best that can be achieved.' },
      { slot: 'f', label: 'The Near Future', prompt: 'What approaches next.' },
      { slot: 'g', label: 'The Self', prompt: 'How you meet this situation.' },
      { slot: 'h', label: 'Environment', prompt: 'Others and outside influences.' },
      { slot: 'i', label: 'Hopes & Fears', prompt: 'What you long for and dread.' },
      { slot: 'j', label: 'The Outcome', prompt: 'Where it all leads.' },
    ],
  },
];

export const DEFAULT_SPREAD = SPREADS[0];
