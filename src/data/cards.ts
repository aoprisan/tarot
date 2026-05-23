// The 78-card Rider–Waite–Smith deck. Imagery (1909) is public domain;
// images live in public/cards/ and are referenced by `image` (a bare filename
// resolved against import.meta.env.BASE_URL at render time).

export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  /** Stable id, e.g. "major-00" or "cups-13". */
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  /** Present only for minor arcana. */
  suit?: Suit;
  /** Major: 0–21. Minor: 1–14 (1 = Ace, 11 Page, 12 Knight, 13 Queen, 14 King). */
  number: number;
  /** Filename inside public/cards/. */
  image: string;
  /** A short, evocative label shown under the title. */
  element: string;
  /** 2–4 upright keywords. */
  upright: string[];
  /** 2–4 reversed keywords. */
  reversed: string[];
  /** One-sentence upright reading. */
  uprightMeaning: string;
  /** One-sentence reversed reading. */
  reversedMeaning: string;
}

const SUIT_ELEMENT: Record<Suit, string> = {
  wands: 'Fire · drive & creation',
  cups: 'Water · feeling & bond',
  swords: 'Air · mind & truth',
  pentacles: 'Earth · craft & means',
};

const major: TarotCard[] = [
  {
    id: 'major-00', name: 'The Fool', arcana: 'major', number: 0, image: 'major-00.jpg',
    element: 'Air · Uranus',
    upright: ['beginnings', 'innocence', 'leap of faith'],
    reversed: ['recklessness', 'hesitation', 'naïveté'],
    uprightMeaning: 'A fresh start beckons — step off the cliff with open-hearted trust and let the journey teach you.',
    reversedMeaning: 'A leap taken without looking, or fear keeping you frozen at the edge; weigh the risk before you move.',
  },
  {
    id: 'major-01', name: 'The Magician', arcana: 'major', number: 1, image: 'major-01.jpg',
    element: 'Air · Mercury',
    upright: ['willpower', 'manifestation', 'resourcefulness'],
    reversed: ['manipulation', 'untapped talent', 'trickery'],
    uprightMeaning: 'You hold every tool you need; focused will turns intention into reality.',
    reversedMeaning: 'Power misdirected or potential left idle — align your means with honest ends.',
  },
  {
    id: 'major-02', name: 'The High Priestess', arcana: 'major', number: 2, image: 'major-02.jpg',
    element: 'Water · Moon',
    upright: ['intuition', 'mystery', 'inner voice'],
    reversed: ['secrets', 'disconnection', 'silenced instinct'],
    uprightMeaning: 'The answer lies beneath the surface; grow still and trust what you already know.',
    reversedMeaning: 'You are ignoring your intuition or kept from the full truth — listen inward again.',
  },
  {
    id: 'major-03', name: 'The Empress', arcana: 'major', number: 3, image: 'major-03.jpg',
    element: 'Earth · Venus',
    upright: ['abundance', 'nurture', 'fertility'],
    reversed: ['dependence', 'creative block', 'neglect'],
    uprightMeaning: 'Life is ripening around you — nurture it and let beauty and growth flourish.',
    reversedMeaning: 'Care has tipped into smothering or self-neglect; tend your own roots first.',
  },
  {
    id: 'major-04', name: 'The Emperor', arcana: 'major', number: 4, image: 'major-04.jpg',
    element: 'Fire · Aries',
    upright: ['structure', 'authority', 'stability'],
    reversed: ['rigidity', 'domination', 'loss of control'],
    uprightMeaning: 'Order and steady leadership build something lasting; set the rules and hold the line.',
    reversedMeaning: 'Control has hardened into tyranny — or slipped away entirely; loosen, or take the reins.',
  },
  {
    id: 'major-05', name: 'The Hierophant', arcana: 'major', number: 5, image: 'major-05.jpg',
    element: 'Earth · Taurus',
    upright: ['tradition', 'guidance', 'belonging'],
    reversed: ['rebellion', 'dogma', 'finding your own path'],
    uprightMeaning: 'Seek wisdom in established ways, mentors, and shared belief.',
    reversedMeaning: 'The old conventions no longer fit; question the doctrine and forge your own creed.',
  },
  {
    id: 'major-06', name: 'The Lovers', arcana: 'major', number: 6, image: 'major-06.jpg',
    element: 'Air · Gemini',
    upright: ['union', 'choice', 'alignment'],
    reversed: ['discord', 'imbalance', 'misalignment'],
    uprightMeaning: 'A meaningful bond or values-led choice asks for your whole, honest self.',
    reversedMeaning: 'Disharmony or a decision made against your values — realign with what you truly want.',
  },
  {
    id: 'major-07', name: 'The Chariot', arcana: 'major', number: 7, image: 'major-07.jpg',
    element: 'Water · Cancer',
    upright: ['willful drive', 'victory', 'control'],
    reversed: ['scattered force', 'aggression', 'no direction'],
    uprightMeaning: 'Harness opposing forces and drive forward with disciplined determination.',
    reversedMeaning: 'Pulling in two directions or steamrolling ahead — regain focus and steer.',
  },
  {
    id: 'major-08', name: 'Strength', arcana: 'major', number: 8, image: 'major-08.jpg',
    element: 'Fire · Leo',
    upright: ['courage', 'gentle power', 'composure'],
    reversed: ['self-doubt', 'raw impulse', 'low energy'],
    uprightMeaning: 'True strength is patient and tender; master the lion within through calm courage.',
    reversedMeaning: 'Doubt or unbridled impulse has the upper hand; reclaim your inner steadiness.',
  },
  {
    id: 'major-09', name: 'The Hermit', arcana: 'major', number: 9, image: 'major-09.jpg',
    element: 'Earth · Virgo',
    upright: ['solitude', 'introspection', 'inner light'],
    reversed: ['isolation', 'withdrawal', 'lost way'],
    uprightMeaning: 'Withdraw to seek the lamp of inner wisdom; the answers are found in quiet.',
    reversedMeaning: 'Solitude has curdled into loneliness, or you avoid the reflection you need.',
  },
  {
    id: 'major-10', name: 'Wheel of Fortune', arcana: 'major', number: 10, image: 'major-10.jpg',
    element: 'Fire · Jupiter',
    upright: ['cycles', 'turning point', 'fate'],
    reversed: ['resistance', 'bad luck', 'clinging to control'],
    uprightMeaning: 'The wheel turns in your favor — ride the change and trust the cycle.',
    reversedMeaning: 'A downturn or stubborn resistance to change; loosen your grip on what must shift.',
  },
  {
    id: 'major-11', name: 'Justice', arcana: 'major', number: 11, image: 'major-11.jpg',
    element: 'Air · Libra',
    upright: ['fairness', 'truth', 'accountability'],
    reversed: ['injustice', 'evasion', 'imbalance'],
    uprightMeaning: 'Truth and consequence come into balance; act with integrity and own your part.',
    reversedMeaning: 'Unfairness, dishonesty, or dodged responsibility distorts the scales.',
  },
  {
    id: 'major-12', name: 'The Hanged Man', arcana: 'major', number: 12, image: 'major-12.jpg',
    element: 'Water · Neptune',
    upright: ['surrender', 'new perspective', 'pause'],
    reversed: ['stalling', 'martyrdom', 'resistance'],
    uprightMeaning: 'Let go and see the world anew; a willing pause reveals what striving could not.',
    reversedMeaning: 'Needless delay or self-sacrifice keeps you suspended — release what no longer serves.',
  },
  {
    id: 'major-13', name: 'Death', arcana: 'major', number: 13, image: 'major-13.jpg',
    element: 'Water · Scorpio',
    upright: ['endings', 'transformation', 'transition'],
    reversed: ['clinging', 'stagnation', 'fear of change'],
    uprightMeaning: 'One chapter must close so another can begin; embrace the transformation.',
    reversedMeaning: 'Refusing a necessary ending keeps you stuck; let the old self go.',
  },
  {
    id: 'major-14', name: 'Temperance', arcana: 'major', number: 14, image: 'major-14.jpg',
    element: 'Fire · Sagittarius',
    upright: ['balance', 'moderation', 'patience'],
    reversed: ['excess', 'imbalance', 'discord'],
    uprightMeaning: 'Blend opposites with patience; the middle path brings healing and flow.',
    reversedMeaning: 'Excess or impatience throws you off-center; find measure again.',
  },
  {
    id: 'major-15', name: 'The Devil', arcana: 'major', number: 15, image: 'major-15.jpg',
    element: 'Earth · Capricorn',
    upright: ['attachment', 'temptation', 'shadow'],
    reversed: ['release', 'reclaiming power', 'awareness'],
    uprightMeaning: 'You are bound by something you could step out of — name the chain you have chosen.',
    reversedMeaning: 'You are breaking free of an unhealthy attachment and reclaiming your power.',
  },
  {
    id: 'major-16', name: 'The Tower', arcana: 'major', number: 16, image: 'major-16.jpg',
    element: 'Fire · Mars',
    upright: ['upheaval', 'sudden change', 'revelation'],
    reversed: ['fear of change', 'averted disaster', 'delay'],
    uprightMeaning: 'A sudden shock topples what was built on false ground; truth clears the way.',
    reversedMeaning: 'You sense the collapse coming and resist it, or narrowly avert it — let the false fall.',
  },
  {
    id: 'major-17', name: 'The Star', arcana: 'major', number: 17, image: 'major-17.jpg',
    element: 'Air · Aquarius',
    upright: ['hope', 'renewal', 'faith'],
    reversed: ['despair', 'disconnection', 'doubt'],
    uprightMeaning: 'After the storm, serene hope and healing return; trust in what is unfolding.',
    reversedMeaning: 'Hope feels distant and faith shaken; reconnect with what quietly sustains you.',
  },
  {
    id: 'major-18', name: 'The Moon', arcana: 'major', number: 18, image: 'major-18.jpg',
    element: 'Water · Pisces',
    upright: ['illusion', 'intuition', 'the unconscious'],
    reversed: ['clarity', 'release of fear', 'truth surfacing'],
    uprightMeaning: 'Not all is as it seems; move by intuition through uncertainty and dream.',
    reversedMeaning: 'Confusion lifts and hidden fears dissolve as truth comes into the light.',
  },
  {
    id: 'major-19', name: 'The Sun', arcana: 'major', number: 19, image: 'major-19.jpg',
    element: 'Fire · Sun',
    upright: ['joy', 'vitality', 'success'],
    reversed: ['dimmed joy', 'overconfidence', 'delay'],
    uprightMeaning: 'Warmth, clarity, and well-earned joy shine on you — celebrate openly.',
    reversedMeaning: 'The light is briefly clouded by doubt or ego; the joy is still there to reclaim.',
  },
  {
    id: 'major-20', name: 'Judgement', arcana: 'major', number: 20, image: 'major-20.jpg',
    element: 'Fire · Pluto',
    upright: ['awakening', 'reckoning', 'rebirth'],
    reversed: ['self-doubt', 'avoidance', 'harsh judgment'],
    uprightMeaning: 'A call to rise, take stock, and step into a renewed sense of purpose.',
    reversedMeaning: 'You are avoiding a reckoning or judging yourself too harshly; answer honestly.',
  },
  {
    id: 'major-21', name: 'The World', arcana: 'major', number: 21, image: 'major-21.jpg',
    element: 'Earth · Saturn',
    upright: ['completion', 'wholeness', 'fulfillment'],
    reversed: ['unfinished', 'loose ends', 'delay'],
    uprightMeaning: 'A cycle completes in fullness and integration; you have arrived.',
    reversedMeaning: 'Something remains unfinished; tie the loose ends before the next beginning.',
  },
];

// ---- Minor arcana ---------------------------------------------------------

interface MinorSpec {
  number: number;
  name: string;
  upright: string[];
  reversed: string[];
  uprightMeaning: string;
  reversedMeaning: string;
}

const wandsSpec: MinorSpec[] = [
  { number: 1, name: 'Ace of Wands', upright: ['inspiration', 'spark', 'potential'], reversed: ['delays', 'false start', 'lack of energy'], uprightMeaning: 'A spark of creative fire offers a thrilling new venture — seize it.', reversedMeaning: 'The spark sputters; momentum stalls or the timing is off.' },
  { number: 2, name: 'Two of Wands', upright: ['planning', 'foresight', 'first steps'], reversed: ['fear of unknown', 'playing safe', 'indecision'], uprightMeaning: 'You survey your domain and plan a bold future; the world is yours to map.', reversedMeaning: 'Fear of the unknown keeps your plans on the shelf.' },
  { number: 3, name: 'Three of Wands', upright: ['expansion', 'progress', 'looking ahead'], reversed: ['delays', 'obstacles', 'short-sightedness'], uprightMeaning: 'Your ventures set sail; expansion and foresight are rewarded.', reversedMeaning: 'Plans hit delays or you cannot see far enough ahead.' },
  { number: 4, name: 'Four of Wands', upright: ['celebration', 'harmony', 'homecoming'], reversed: ['transition', 'unease at home', 'cancelled plans'], uprightMeaning: 'A joyful milestone — community, home, and harmony to be celebrated.', reversedMeaning: 'A celebration feels hollow, or stability at home is shaken.' },
  { number: 5, name: 'Five of Wands', upright: ['conflict', 'competition', 'friction'], reversed: ['resolution', 'avoiding conflict', 'inner tension'], uprightMeaning: 'Clashing energies and rivalry — the struggle can sharpen you if channeled.', reversedMeaning: 'Conflict eases, or is being suppressed rather than resolved.' },
  { number: 6, name: 'Six of Wands', upright: ['victory', 'recognition', 'confidence'], reversed: ['ego', 'fall from grace', 'lack of recognition'], uprightMeaning: 'Public success and well-earned recognition; ride the triumph.', reversedMeaning: 'Praise is withheld, or pride goes before a fall.' },
  { number: 7, name: 'Seven of Wands', upright: ['defense', 'perseverance', 'standing ground'], reversed: ['overwhelm', 'giving up', 'yielding'], uprightMeaning: 'Hold your position against challengers; your conviction is worth defending.', reversedMeaning: 'The pressure mounts and your resolve wavers — pick your battles.' },
  { number: 8, name: 'Eight of Wands', upright: ['momentum', 'swift action', 'news'], reversed: ['delays', 'frustration', 'scattered energy'], uprightMeaning: 'Things move fast now; messages and progress arrive in a rush.', reversedMeaning: 'Momentum stalls; expect hold-ups and crossed wires.' },
  { number: 9, name: 'Nine of Wands', upright: ['resilience', 'persistence', 'last stand'], reversed: ['exhaustion', 'defensiveness', 'paranoia'], uprightMeaning: 'Battle-worn but unbowed — one more push and you prevail.', reversedMeaning: 'You are running on empty or guarding wounds that need healing.' },
  { number: 10, name: 'Ten of Wands', upright: ['burden', 'responsibility', 'hard work'], reversed: ['release', 'delegation', 'burnout'], uprightMeaning: 'You carry a heavy load near the finish; the weight is real but nearly done.', reversedMeaning: 'Time to set down or share the burden before it breaks you.' },
  { number: 11, name: 'Page of Wands', upright: ['curiosity', 'enthusiasm', 'discovery'], reversed: ['restlessness', 'flightiness', 'false start'], uprightMeaning: 'A spirited explorer brimming with ideas and the urge to begin.', reversedMeaning: 'Eager energy scatters before it lands; ground your enthusiasm.' },
  { number: 12, name: 'Knight of Wands', upright: ['adventure', 'passion', 'bold action'], reversed: ['impulsiveness', 'recklessness', 'haste'], uprightMeaning: 'Charge ahead with fearless passion toward what excites you.', reversedMeaning: 'Headlong haste burns hot and brief; slow enough to aim.' },
  { number: 13, name: 'Queen of Wands', upright: ['confidence', 'warmth', 'magnetism'], reversed: ['self-doubt', 'jealousy', 'withdrawal'], uprightMeaning: 'Radiant, self-assured, and inspiring — own your fiery charisma.', reversedMeaning: 'Insecurity dims your light or curdles into jealousy.' },
  { number: 14, name: 'King of Wands', upright: ['vision', 'leadership', 'boldness'], reversed: ['impulsiveness', 'domineering', 'overreach'], uprightMeaning: 'A visionary leader who turns bold ideas into movements.', reversedMeaning: 'Vision tips into arrogance or scattered, domineering impulse.' },
];

const cupsSpec: MinorSpec[] = [
  { number: 1, name: 'Ace of Cups', upright: ['new love', 'compassion', 'overflow'], reversed: ['emptiness', 'blocked emotion', 'self-love needed'], uprightMeaning: 'The heart opens to new love, joy, and emotional renewal.', reversedMeaning: 'Feelings are blocked or the cup feels empty; turn care inward.' },
  { number: 2, name: 'Two of Cups', upright: ['partnership', 'attraction', 'mutual respect'], reversed: ['imbalance', 'breakup', 'tension'], uprightMeaning: 'A deep, balanced connection — kindred hearts meeting as equals.', reversedMeaning: 'A bond falls out of balance or begins to fracture.' },
  { number: 3, name: 'Three of Cups', upright: ['friendship', 'celebration', 'community'], reversed: ['overindulgence', 'gossip', 'isolation'], uprightMeaning: 'Joyful gathering with your people — raise a glass together.', reversedMeaning: 'Celebration tips into excess, or you feel left out of the circle.' },
  { number: 4, name: 'Four of Cups', upright: ['apathy', 'contemplation', 'reevaluation'], reversed: ['awakening', 'acceptance', 'new openness'], uprightMeaning: 'Discontent turns you inward; an offered gift goes unnoticed.', reversedMeaning: 'You stir from apathy and open to what is being offered.' },
  { number: 5, name: 'Five of Cups', upright: ['loss', 'grief', 'regret'], reversed: ['acceptance', 'moving on', 'recovery'], uprightMeaning: 'Dwelling on what spilled; mourn, but two cups still stand behind you.', reversedMeaning: 'You turn from grief toward what remains and begin to heal.' },
  { number: 6, name: 'Six of Cups', upright: ['nostalgia', 'innocence', 'reunion'], reversed: ['stuck in past', 'naïveté', 'moving forward'], uprightMeaning: 'Sweet memory and innocent kindness; a return to simpler joys.', reversedMeaning: 'Clinging to the past keeps you from the present.' },
  { number: 7, name: 'Seven of Cups', upright: ['choices', 'fantasy', 'wishful thinking'], reversed: ['clarity', 'decisiveness', 'reality check'], uprightMeaning: 'Many tempting options shimmer — beware illusions among them.', reversedMeaning: 'The fog clears and you choose with clear eyes.' },
  { number: 8, name: 'Eight of Cups', upright: ['walking away', 'seeking meaning', 'departure'], reversed: ['fear of change', 'aimlessness', 'staying stuck'], uprightMeaning: 'You leave behind what no longer fulfills you to seek something deeper.', reversedMeaning: 'You linger where you have outgrown, afraid to walk on.' },
  { number: 9, name: 'Nine of Cups', upright: ['contentment', 'satisfaction', 'wish fulfilled'], reversed: ['smugness', 'unmet wishes', 'overindulgence'], uprightMeaning: 'The wish card — emotional satisfaction and quiet contentment.', reversedMeaning: 'Pleasure rings hollow, or a cherished wish stays out of reach.' },
  { number: 10, name: 'Ten of Cups', upright: ['harmony', 'family joy', 'fulfillment'], reversed: ['broken harmony', 'misalignment', 'strife'], uprightMeaning: 'Lasting emotional fulfillment and harmony at home — the rainbow promise.', reversedMeaning: 'The picture-perfect ideal cracks; tend the bonds that matter.' },
  { number: 11, name: 'Page of Cups', upright: ['sensitivity', 'imagination', 'sweet message'], reversed: ['moodiness', 'emotional immaturity', 'creative block'], uprightMeaning: 'A tender, dreaming heart open to wonder and surprising feeling.', reversedMeaning: 'Feelings turn moody or escapist; let the imagination flow again.' },
  { number: 12, name: 'Knight of Cups', upright: ['romance', 'charm', 'following the heart'], reversed: ['moodiness', 'unrealistic', 'disappointment'], uprightMeaning: 'A romantic idealist bearing an offer of the heart.', reversedMeaning: 'Charm masks fickleness or fantasy outruns reality.' },
  { number: 13, name: 'Queen of Cups', upright: ['compassion', 'intuition', 'emotional depth'], reversed: ['over-giving', 'insecurity', 'martyrdom'], uprightMeaning: 'Deeply caring and intuitive — you hold space with grace.', reversedMeaning: 'You give until depleted, or feelings overwhelm your footing.' },
  { number: 14, name: 'King of Cups', upright: ['emotional balance', 'compassion', 'diplomacy'], reversed: ['volatility', 'manipulation', 'withdrawal'], uprightMeaning: 'Master of feeling — calm, wise, and warm under pressure.', reversedMeaning: 'Emotion turns turbulent or coldly controlled.' },
];

const swordsSpec: MinorSpec[] = [
  { number: 1, name: 'Ace of Swords', upright: ['clarity', 'breakthrough', 'truth'], reversed: ['confusion', 'misinformation', 'clouded mind'], uprightMeaning: 'A piercing insight cuts through to truth; clarity is your weapon.', reversedMeaning: 'Mental fog or half-truths blunt your judgment.' },
  { number: 2, name: 'Two of Swords', upright: ['stalemate', 'difficult choice', 'avoidance'], reversed: ['indecision lifts', 'overwhelm', 'truth revealed'], uprightMeaning: 'Blindfolded at a crossroads, you stall a choice you must eventually face.', reversedMeaning: 'The blindfold lifts; a decision can finally be made.' },
  { number: 3, name: 'Three of Swords', upright: ['heartbreak', 'sorrow', 'painful truth'], reversed: ['healing', 'forgiveness', 'releasing pain'], uprightMeaning: 'A sharp grief or betrayal pierces the heart; let it be felt.', reversedMeaning: 'The wound begins to close as you forgive and release.' },
  { number: 4, name: 'Four of Swords', upright: ['rest', 'recovery', 'contemplation'], reversed: ['restlessness', 'burnout', 'reentry'], uprightMeaning: 'Step back to rest and recover; stillness restores the mind.', reversedMeaning: 'You resist needed rest, or are ready to reengage.' },
  { number: 5, name: 'Five of Swords', upright: ['conflict', 'hollow victory', 'discord'], reversed: ['reconciliation', 'making amends', 'release'], uprightMeaning: 'A win at too high a cost; count what the conflict really took.', reversedMeaning: 'A chance to make amends and put down the grudge.' },
  { number: 6, name: 'Six of Swords', upright: ['transition', 'moving on', 'safe passage'], reversed: ['stuck', 'unfinished business', 'resistance'], uprightMeaning: 'Leaving troubled waters for calmer shores; the worst is behind.', reversedMeaning: 'You cannot quite leave the past behind, or the crossing stalls.' },
  { number: 7, name: 'Seven of Swords', upright: ['strategy', 'stealth', 'acting alone'], reversed: ['confession', 'getting caught', 'conscience'], uprightMeaning: 'A clever, cautious move made on your own — or a deception afoot.', reversedMeaning: 'Truth surfaces; secrets and self-deception come undone.' },
  { number: 8, name: 'Eight of Swords', upright: ['restriction', 'feeling trapped', 'self-doubt'], reversed: ['freedom', 'new perspective', 'release'], uprightMeaning: 'Bound and blindfolded by your own thoughts — the cage has an open side.', reversedMeaning: 'You see the way out and free yourself from limiting beliefs.' },
  { number: 9, name: 'Nine of Swords', upright: ['anxiety', 'worry', 'sleepless nights'], reversed: ['relief', 'facing fears', 'hope returns'], uprightMeaning: 'Night fears loom larger than reality; the dread is in the mind.', reversedMeaning: 'Anxiety eases as you face fears in the light of day.' },
  { number: 10, name: 'Ten of Swords', upright: ['rock bottom', 'painful ending', 'collapse'], reversed: ['recovery', 'survival', 'rising again'], uprightMeaning: 'A definitive ending — the worst is over, and dawn breaks behind.', reversedMeaning: 'You rise from the lowest point; recovery has begun.' },
  { number: 11, name: 'Page of Swords', upright: ['curiosity', 'sharp mind', 'vigilance'], reversed: ['gossip', 'scattered ideas', 'all talk'], uprightMeaning: 'A quick, inquisitive mind hungry for truth and new ideas.', reversedMeaning: 'Cleverness turns to chatter, gossip, or restless nerves.' },
  { number: 12, name: 'Knight of Swords', upright: ['drive', 'ambition', 'fast thinking'], reversed: ['impatience', 'recklessness', 'burnout'], uprightMeaning: 'Charging ahead on conviction and intellect — direct and unstoppable.', reversedMeaning: 'Haste and bluntness outrun wisdom; mind the collateral.' },
  { number: 13, name: 'Queen of Swords', upright: ['clarity', 'independence', 'honesty'], reversed: ['coldness', 'bitterness', 'harsh words'], uprightMeaning: 'Perceptive and fair, you cut to the truth without sentiment.', reversedMeaning: 'Sharpness curdles into coldness or cutting words.' },
  { number: 14, name: 'King of Swords', upright: ['intellect', 'authority', 'truth'], reversed: ['tyranny', 'manipulation', 'cold logic'], uprightMeaning: 'Clear-headed authority guided by principle and reason.', reversedMeaning: 'Reason without heart becomes manipulation or cold control.' },
];

const pentaclesSpec: MinorSpec[] = [
  { number: 1, name: 'Ace of Pentacles', upright: ['opportunity', 'prosperity', 'new venture'], reversed: ['missed chance', 'instability', 'scarcity mindset'], uprightMeaning: 'A tangible new opportunity for wealth, work, or wellbeing is offered.', reversedMeaning: 'A chance slips by, or shaky foundations undercut the gain.' },
  { number: 2, name: 'Two of Pentacles', upright: ['balance', 'adaptability', 'juggling'], reversed: ['overwhelm', 'disorganization', 'dropped ball'], uprightMeaning: 'Juggling priorities with nimble grace; flexibility keeps you afloat.', reversedMeaning: 'Too many demands tip you off balance; something gives.' },
  { number: 3, name: 'Three of Pentacles', upright: ['collaboration', 'craftsmanship', 'teamwork'], reversed: ['discord', 'poor work', 'misaligned goals'], uprightMeaning: 'Skilled collaboration builds something fine; your contribution matters.', reversedMeaning: 'Teamwork falters through poor coordination or sloppy effort.' },
  { number: 4, name: 'Four of Pentacles', upright: ['security', 'saving', 'holding on'], reversed: ['letting go', 'generosity', 'release of control'], uprightMeaning: 'You guard your resources tightly — stable, but watch the grip.', reversedMeaning: 'Loosening your hold brings flow, or fear of loss tightens it further.' },
  { number: 5, name: 'Five of Pentacles', upright: ['hardship', 'insecurity', 'feeling left out'], reversed: ['recovery', 'help arrives', 'turning point'], uprightMeaning: 'A lean spell of want or exclusion; aid is nearer than it feels.', reversedMeaning: 'Hard times ease as support and stability return.' },
  { number: 6, name: 'Six of Pentacles', upright: ['generosity', 'giving & receiving', 'balance'], reversed: ['strings attached', 'inequality', 'debt'], uprightMeaning: 'A fair flow of giving and receiving; share what you have.', reversedMeaning: 'Generosity comes with strings, or the exchange is unequal.' },
  { number: 7, name: 'Seven of Pentacles', upright: ['patience', 'long-term view', 'assessment'], reversed: ['impatience', 'poor return', 'wasted effort'], uprightMeaning: 'Pause to assess your growing investment; good things take time.', reversedMeaning: 'Impatience or meager returns make you question the effort.' },
  { number: 8, name: 'Eight of Pentacles', upright: ['diligence', 'mastery', 'skill-building'], reversed: ['perfectionism', 'lack of focus', 'uninspired work'], uprightMeaning: 'Devoted, repetitive practice hones true mastery.', reversedMeaning: 'Effort drifts — perfectionism or boredom dulls the craft.' },
  { number: 9, name: 'Nine of Pentacles', upright: ['abundance', 'self-reliance', 'refinement'], reversed: ['overwork', 'dependence', 'hollow luxury'], uprightMeaning: 'Earned comfort and graceful independence — enjoy your garden.', reversedMeaning: 'The luxury feels empty, or independence tips into isolation.' },
  { number: 10, name: 'Ten of Pentacles', upright: ['legacy', 'wealth', 'family roots'], reversed: ['instability', 'fleeting success', 'family friction'], uprightMeaning: 'Lasting prosperity, legacy, and the security of belonging.', reversedMeaning: 'Foundations wobble; wealth or family stability is in question.' },
  { number: 11, name: 'Page of Pentacles', upright: ['ambition', 'study', 'new opportunity'], reversed: ['procrastination', 'missed chance', 'lack of progress'], uprightMeaning: 'An earnest student of the practical world, ready to manifest a goal.', reversedMeaning: 'Plans stay on paper; follow-through is missing.' },
  { number: 12, name: 'Knight of Pentacles', upright: ['diligence', 'routine', 'reliability'], reversed: ['stagnation', 'boredom', 'over-caution'], uprightMeaning: 'Steady, methodical, and dependable — slow progress that lasts.', reversedMeaning: 'Reliability hardens into rut and risk-averse stagnation.' },
  { number: 13, name: 'Queen of Pentacles', upright: ['nurture', 'practicality', 'abundance'], reversed: ['self-neglect', 'smothering', 'imbalance'], uprightMeaning: 'Grounded and generous, you nurture both home and ambition.', reversedMeaning: 'You give to all but yourself, losing the work-life balance.' },
  { number: 14, name: 'King of Pentacles', upright: ['prosperity', 'leadership', 'security'], reversed: ['greed', 'materialism', 'controlling'], uprightMeaning: 'A grounded provider whose discipline yields lasting wealth.', reversedMeaning: 'Success curdles into greed, control, or status-obsession.' },
];

function buildMinor(suit: Suit, specs: MinorSpec[]): TarotCard[] {
  return specs.map((s) => ({
    id: `${suit}-${String(s.number).padStart(2, '0')}`,
    name: s.name,
    arcana: 'minor' as const,
    suit,
    number: s.number,
    image: `${suit}-${String(s.number).padStart(2, '0')}.jpg`,
    element: SUIT_ELEMENT[suit],
    upright: s.upright,
    reversed: s.reversed,
    uprightMeaning: s.uprightMeaning,
    reversedMeaning: s.reversedMeaning,
  }));
}

export const DECK: TarotCard[] = [
  ...major,
  ...buildMinor('wands', wandsSpec),
  ...buildMinor('cups', cupsSpec),
  ...buildMinor('swords', swordsSpec),
  ...buildMinor('pentacles', pentaclesSpec),
];

/** Resolve a card image to a URL that respects the deployment base path. */
export function cardImageUrl(card: TarotCard): string {
  return `${import.meta.env.BASE_URL}cards/${card.image}`;
}

export const CARD_BACK_URL = `${import.meta.env.BASE_URL}cards/back.svg`;
