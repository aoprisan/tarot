import './styles.css';
import '@fontsource/im-fell-dw-pica/400.css';
import '@fontsource/im-fell-dw-pica/400-italic.css';
import '@fontsource/im-fell-dw-pica-sc/400.css';
import '@fontsource/cardo/400.css';
import '@fontsource/cardo/400-italic.css';
import '@fontsource/cardo/700.css';

import { registerSW } from 'virtual:pwa-register';
import { cardImageUrl, CARD_BACK_URL } from './data/cards';
import { SPREADS, DEFAULT_SPREAD, type Spread } from './data/spreads';
import { drawSpread, dailyCard, meaningFor, keywordsFor, type DrawnCard } from './deck';

// ----------------------------------------------------------------------------
// Tiny DOM helper
// ----------------------------------------------------------------------------
type Attrs = Record<string, string | number | boolean | EventListener | undefined>;

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === 'class') node.className = String(value);
    else if (key === 'html') node.innerHTML = String(value);
    else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
    } else if (value === true) node.setAttribute(key, '');
    else node.setAttribute(key, String(value));
  }
  for (const child of children) {
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
}

const EMBLEM = `${import.meta.env.BASE_URL}favicon.svg`;
const orientText = (reversed: boolean) => (reversed ? 'Reversed' : 'Upright');

// ----------------------------------------------------------------------------
// State
// ----------------------------------------------------------------------------
let selectedSpread: Spread = DEFAULT_SPREAD;
let allowReversed = true;
let currentDraw: DrawnCard[] | null = null;

const app = document.getElementById('app')!;

// ----------------------------------------------------------------------------
// Card element (3D flip; tap to reveal, tap again for details)
// ----------------------------------------------------------------------------
function buildSlot(drawn: DrawnCard, index: number): HTMLElement {
  const { card, reversed, position } = drawn;

  // A <div role="button"> rather than a real <button>: percentage heights of
  // children don't resolve against an aspect-ratio inside a <button>, which
  // collapses the absolutely-positioned faces.
  const cardBtn = el('div', {
    class: `card${reversed ? ' is-reversed' : ''}`,
    role: 'button',
    tabindex: 0,
    'aria-label': `${position.label}: face-down card, activate to reveal`,
  });

  cardBtn.append(
    el('span', { class: 'card__inner' }, [
      el('span', { class: 'card__face card__face--back' }, [
        el('img', { src: CARD_BACK_URL, alt: '', 'aria-hidden': 'true' }),
      ]),
      el('span', { class: 'card__face card__face--front' }, [
        el('img', {
          src: cardImageUrl(card),
          alt: `${card.name}${reversed ? ', reversed' : ''}`,
          decoding: 'async',
        }),
      ]),
    ]),
  );

  const keywords = el('p', { class: 'slot__keywords' });

  const slot = el('div', { class: `slot slot--${position.slot}` }, [
    el('span', { class: 'slot__label' }, [position.label]),
    cardBtn,
    keywords,
  ]);
  slot.style.animationDelay = `${index * 90}ms`;

  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    cardBtn.classList.add('is-revealed');
    cardBtn.setAttribute('aria-label', `${position.label}: ${card.name}, ${orientText(reversed)}. Activate for details.`);
    const words = keywordsFor(drawn).join(' · ');
    keywords.innerHTML = '';
    keywords.append(
      reversed ? el('span', { class: 'rev' }, [words]) : document.createTextNode(words),
    );
    slot.classList.add('is-open');
  };

  const activate = () => {
    if (!revealed) reveal();
    else openModal(drawn);
  };
  cardBtn.addEventListener('click', activate);
  cardBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activate();
    }
  });

  // expose for "reveal all"
  (slot as HTMLElement & { reveal?: () => void }).reveal = reveal;
  return slot;
}

// ----------------------------------------------------------------------------
// Reading area
// ----------------------------------------------------------------------------
function renderReading(): HTMLElement {
  const container = el('div', { class: 'reading' });

  if (!currentDraw) {
    container.append(
      el('p', { class: 'empty' }, ['Choose a spread, then draw the cards when you are ready.']),
    );
    return container;
  }

  const spread = el('div', { class: `spread spread--${selectedSpread.id}` });
  const slots = currentDraw.map((d, i) => buildSlot(d, i));
  slots.forEach((s) => spread.append(s));

  const revealAll = el('button', { class: 'ghost-btn', type: 'button' }, ['Reveal all']);
  revealAll.addEventListener('click', () => {
    slots.forEach((s, i) => {
      const fn = (s as HTMLElement & { reveal?: () => void }).reveal;
      if (fn) setTimeout(fn, i * 120);
    });
  });
  const newReading = el('button', { class: 'ghost-btn', type: 'button' }, ['New reading']);
  newReading.addEventListener('click', () => {
    currentDraw = null;
    rerenderReading();
  });

  container.append(
    el('div', { class: 'reading__head' }, [
      el('h3', { class: 'reading__title' }, [selectedSpread.name]),
    ]),
    spread,
    el('div', { class: 'controls__row', style: 'margin-top:1.6rem' }, [revealAll, newReading]),
  );
  return container;
}

let readingMount: HTMLElement;
function rerenderReading(): void {
  const fresh = renderReading();
  readingMount.replaceWith(fresh);
  readingMount = fresh;
}

// ----------------------------------------------------------------------------
// Detail modal (single reused instance)
// ----------------------------------------------------------------------------
let modal: HTMLElement;
let modalImg: HTMLImageElement;
let modalCardWrap: HTMLElement;
const modalRefs: Record<string, HTMLElement> = {};

function buildModal(): HTMLElement {
  modalImg = el('img', { alt: '' });
  modalCardWrap = el('div', { class: 'modal__card' }, [modalImg]);

  modalRefs.eyebrow = el('p', { class: 'modal__eyebrow' });
  modalRefs.name = el('h3', { class: 'modal__name' });
  modalRefs.orient = el('p', { class: 'modal__orient' });
  modalRefs.kw = el('ul', { class: 'modal__kw' });
  modalRefs.meaning = el('p', { class: 'modal__meaning' });
  modalRefs.prompt = el('p', { class: 'modal__prompt' });

  const close = el('button', {
    class: 'modal__close',
    type: 'button',
    'aria-label': 'Close',
  }, ['×']);
  close.addEventListener('click', closeModal);

  const panel = el('div', { class: 'modal__panel', role: 'document' }, [
    close,
    modalCardWrap,
    el('div', {}, [
      modalRefs.eyebrow,
      modalRefs.name,
      modalRefs.orient,
      modalRefs.kw,
      modalRefs.meaning,
      modalRefs.prompt,
    ]),
  ]);

  const overlay = el('div', {
    class: 'modal',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Card meaning',
  }, [panel]);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  return overlay;
}

function openModal(drawn: DrawnCard): void {
  const { card, reversed, position } = drawn;
  modalImg.src = cardImageUrl(card);
  modalImg.alt = `${card.name}${reversed ? ', reversed' : ''}`;
  modalCardWrap.classList.toggle('is-reversed', reversed);

  modalRefs.eyebrow.textContent = `${position.label} · ${card.element}`;
  modalRefs.name.textContent = card.name;
  modalRefs.orient.textContent = orientText(reversed);
  modalRefs.orient.className = `modal__orient ${reversed ? 'rev' : 'up'}`;

  modalRefs.kw.innerHTML = '';
  keywordsFor(drawn).forEach((w) => modalRefs.kw.append(el('li', {}, [w])));

  modalRefs.meaning.textContent = meaningFor(drawn);
  modalRefs.prompt.textContent = position.prompt;

  modal.classList.add('is-open');
}

function closeModal(): void {
  modal.classList.remove('is-open');
}

// ----------------------------------------------------------------------------
// Controls
// ----------------------------------------------------------------------------
function renderControls(): HTMLElement {
  const picker = el('div', { class: 'spread-picker', role: 'group', 'aria-label': 'Spread' });
  const chips = SPREADS.map((spread) => {
    const chip = el('button', {
      class: 'chip',
      type: 'button',
      'aria-pressed': spread.id === selectedSpread.id,
    }, [spread.name]);
    chip.addEventListener('click', () => {
      selectedSpread = spread;
      currentDraw = null;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      tagline.textContent = spread.tagline;
      rerenderReading();
    });
    return chip;
  });
  chips.forEach((c) => picker.append(c));

  const tagline = el('p', { class: 'section__note' }, [selectedSpread.tagline]);

  const reversedToggle = el('label', { class: 'toggle' }, [
    (() => {
      const input = el('input', { type: 'checkbox' }) as HTMLInputElement;
      input.checked = allowReversed;
      input.addEventListener('change', () => {
        allowReversed = input.checked;
      });
      return input;
    })(),
    el('span', { class: 'toggle__track' }),
    el('span', {}, ['Allow reversed cards']),
  ]);

  const drawBtn = el('button', { class: 'draw-btn', type: 'button' }, ['Shuffle & Draw']);
  drawBtn.addEventListener('click', () => {
    drawBtn.disabled = true;
    currentDraw = drawSpread(selectedSpread, allowReversed);
    rerenderReading();
    readingMount.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => (drawBtn.disabled = false), 650);
  });

  return el('section', { class: 'section' }, [
    el('div', { class: 'section__head' }, [
      el('h2', { class: 'section__title' }, ['The Reading']),
      tagline,
    ]),
    el('div', { class: 'controls' }, [
      picker,
      el('div', { class: 'controls__row' }, [reversedToggle]),
      drawBtn,
    ]),
  ]);
}

// ----------------------------------------------------------------------------
// Daily card
// ----------------------------------------------------------------------------
function renderDaily(): HTMLElement {
  const { card, reversed } = dailyCard();
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const img = el('img', {
    src: cardImageUrl(card),
    alt: `${card.name}${reversed ? ', reversed' : ''}`,
    style: reversed ? 'transform:rotate(180deg)' : '',
  });

  return el('section', { class: 'section' }, [
    el('div', { class: 'daily' }, [
      el('div', { class: 'daily__card' }, [
        el('div', { class: 'card is-revealed', style: 'cursor:default' }, [
          el('div', { class: 'card__inner', style: 'transform:none' }, [
            el('span', { class: 'card__face card__face--front', style: 'transform:none' }, [img]),
          ]),
        ]),
      ]),
      el('div', { class: 'daily__body' }, [
        el('p', { class: 'daily__eyebrow' }, [`Card of the day · ${today}`]),
        el('h2', { class: 'daily__name' }, [card.name]),
        el('p', { class: 'daily__orient' }, [`${orientText(reversed)} · ${card.element}`]),
        el('p', { class: 'daily__meaning' }, [
          reversed ? card.reversedMeaning : card.uprightMeaning,
        ]),
      ]),
    ]),
  ]);
}

// ----------------------------------------------------------------------------
// Compose the page
// ----------------------------------------------------------------------------
function render(): void {
  app.innerHTML = '';

  const masthead = el('header', { class: 'masthead' }, [
    el('img', { class: 'masthead__emblem', src: EMBLEM, alt: '' }),
    el('h1', { class: 'gold-text' }, ['Arcana']),
    el('p', { class: 'masthead__sub' }, ['A celestial tarot companion']),
    el('p', { class: 'rule' }, [el('span', { class: 'rule__mark' }, ['❧'])]),
  ]);

  readingMount = renderReading();

  app.append(
    masthead,
    renderDaily(),
    renderControls(),
    readingMount,
    el('footer', { class: 'colophon' }, [
      el('p', {}, [
        'Imagery: the Rider–Waite–Smith tarot (Pamela Colman Smith, 1909) — public domain, via ',
        el('a', { href: 'https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck', target: '_blank', rel: 'noopener' }, ['Wikimedia Commons']),
        '.',
      ]),
      el('p', {}, ['Works offline · installable · for reflection and entertainment.']),
    ]),
  );

  if (!modal) {
    modal = buildModal();
    document.body.append(modal);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Optional shareable/preview link: ?auto=<spread-id> opens with a spread already
// drawn and revealed (e.g. ?auto=three, ?auto=celtic-cross).
const autoId = new URLSearchParams(location.search).get('auto');
if (autoId) {
  const sp = SPREADS.find((s) => s.id === autoId);
  if (sp) {
    selectedSpread = sp;
    currentDraw = drawSpread(sp, allowReversed);
  }
}

render();

if (currentDraw) {
  // share/preview link: reveal the whole spread immediately
  document.querySelectorAll<HTMLElement>('.slot').forEach((slot) => {
    (slot as HTMLElement & { reveal?: () => void }).reveal?.();
  });
}

// ----------------------------------------------------------------------------
// PWA: register service worker, offer a refresh when an update is ready
// ----------------------------------------------------------------------------
const updateSW = registerSW({
  onNeedRefresh() {
    const reload = el('button', { class: 'ghost-btn', type: 'button' }, ['Refresh']);
    reload.addEventListener('click', () => updateSW(true));
    const toast = el('div', { class: 'toast' }, [
      el('span', {}, ['A new version is ready.']),
      reload,
    ]);
    document.body.append(toast);
    requestAnimationFrame(() => toast.classList.add('is-shown'));
  },
});
