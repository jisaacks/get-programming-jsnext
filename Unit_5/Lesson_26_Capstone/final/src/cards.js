const suits = new Set(['Spades', 'Clubs', 'Diamonds', 'Hearts']);
const faces = new Set([
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
]);
const faceValues = new Map([
  ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8],
  ['9', 9], ['10', 10], ['J', 10], ['Q', 10], ['K', 10]
]);

export const isCardFlipped = new Map();

export function flipCardUp(card) {
  isCardFlipped.set(card, true);
}

export function flipCardDown(card) {
  isCardFlipped.set(card, false);
}

export function shuffle(deck) {
  const cards = [ ...deck ];
  let idx = cards.length;
  while (idx > 0) {
    idx--
    const swap = Math.floor(Math.random() * cards.length);
    const card = cards[swap];
    cards[swap] = cards[idx];
    cards[idx] = card;
  }
  deck.clear();
  cards.forEach(card => deck.add(card));
}

export function pop(deck) {
  const card = [ ...deck ].pop()
  isCardFlipped.set(card, true)
  deck.delete(card)
  return card
}

export function createDeck() {
  const deck = new Set();
  for (const suit of suits) {
    for (const face of faces) {
      deck.add({ face, suit });
    }
  }
  shuffle(deck);
  return deck;
}

export function dealInitialHand(hand, deck) {
  hand.add(pop(deck));
  hand.add(pop(deck));
}

export function countHand(hand) {
  let count = 0;
  const aces = new Set();
  for (const card of hand) {
    const { face } = card;
    if (face === 'A') {
      count += 1;
      aces.add(card);
    } else {
      count += faceValues.get(face);
    }
  }
  for (const card of aces) {
    if (count <= 11) {
      count += 10;
    }
  }
  return count;
}
