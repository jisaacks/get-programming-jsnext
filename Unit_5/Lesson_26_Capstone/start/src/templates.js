import { isCardFlipped } from './cards';

function suitIcon(card) {
  const Spades = '\u2660';
  const Clubs = '\u2663';
  const Diamonds = '\u2666';
  const Hearts = '\u2665';
  return { Spades, Clubs, Diamonds, Hearts }[card.suit];
}

function getCssClass(card) {
  return `
    card
    ${card.suit.toLowerCase()}
    ${isCardFlipped.get(card) && 'flipped'}
  `
}

export const cardTemplate = card => (
  `<div
    class="${getCssClass(card)}">
    <div class="back">\uD83D\uDC09</div>
    <div class="front" data-suit="${suitIcon(card)}" data-face="${card.face}">
      ${card.face}
    </div>
  </div>`
);
