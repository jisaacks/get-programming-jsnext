(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flipCardUp = flipCardUp;
exports.flipCardDown = flipCardDown;
exports.shuffle = shuffle;
exports.pop = pop;
exports.createDeck = createDeck;
exports.dealInitialHand = dealInitialHand;
exports.countHand = countHand;
const suits = new Set(['Spades', 'Clubs', 'Diamonds', 'Hearts']);
const faces = new Set(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']);
const faceValues = new Map([['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9], ['10', 10], ['J', 10], ['Q', 10], ['K', 10]]);

const isCardFlipped = exports.isCardFlipped = new Map();

function flipCardUp(card) {
  isCardFlipped.set(card, true);
}

function flipCardDown(card) {
  isCardFlipped.set(card, false);
}

function shuffle(deck) {
  const cards = [...deck];
  let idx = cards.length;
  while (idx > 0) {
    idx--;
    const swap = Math.floor(Math.random() * cards.length);
    const card = cards[swap];
    cards[swap] = cards[idx];
    cards[idx] = card;
  }
  deck.clear();
  cards.forEach(card => deck.add(card));
}

function pop(deck) {
  const card = [...deck].pop();
  isCardFlipped.set(card, true);
  deck.delete(card);
  return card;
}

function createDeck() {
  const deck = new Set();
  for (const suit of suits) {
    for (const face of faces) {
      deck.add({ face, suit });
    }
  }
  shuffle(deck);
  return deck;
}

function dealInitialHand(hand, deck) {
  hand.add(pop(deck));
  hand.add(pop(deck));
}

function countHand(hand) {
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

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonsEl = exports.playerEl = exports.dealerEl = undefined;
exports.render = render;
exports.addCard = addCard;
exports.updateLabel = updateLabel;
exports.status = status;

var _templates = require('./templates');

var _cards = require('./cards');

const app = document.querySelector('#blackjack');
const statusEl = app.querySelector('.status');

const dealerEl = exports.dealerEl = app.querySelector('.dealer');
const playerEl = exports.playerEl = app.querySelector('.player');
const buttonsEl = exports.buttonsEl = app.querySelector('.buttons');

function domNode(str) {
  var template = document.createElement('template');
  template.innerHTML = str;
  return template.content.firstChild;
}

function render(element, hand) {
  element.querySelector('.hand').innerHTML = [...hand].map(_templates.cardTemplate).join('');
  element.querySelector('.score').innerHTML = (0, _cards.countHand)(hand);
  updateLabel(element, hand);
}

function addCard(element, hand, card) {
  hand.add(card);
  const cardNode = domNode((0, _templates.cardTemplate)(card));
  element.querySelector('.hand').classList.add("adding");
  element.querySelector('.hand').appendChild(cardNode);
  element.querySelector('.score').innerHTML = (0, _cards.countHand)(hand);
  setTimeout(() => element.querySelector('.hand').classList.remove("adding"), 10);
}

function updateLabel(element, hand) {
  const scoreEl = element.querySelector('.score');
  const score = (0, _cards.countHand)(hand);
  if (score > 21) {
    scoreEl.classList.add('bust');
  } else if (score === 21) {
    scoreEl.classList.add('blackjack');
  }
}

function status(msg) {
  statusEl.classList.remove('hidden');
  statusEl.innerHTML = msg;
}

},{"./cards":1,"./templates":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardTemplate = undefined;

var _cards = require('./cards');

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
    ${ card.suit.toLowerCase() }
    ${ _cards.isCardFlipped.get(card) && 'flipped' }
  `;
}

const cardTemplate = exports.cardTemplate = card => `<div
    class="${ getCssClass(card) }">
    <div class="back">\uD83D\uDC09</div>
    <div class="front" data-suit="${ suitIcon(card) }" data-face="${ card.face }">
      ${ card.face }
    </div>
  </div>`;

},{"./cards":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
function wait(iterator, milliseconds, callback) {
  const int = setInterval(() => {
    const { done } = iterator.next();
    if (done) {
      clearInterval(int);
      callback();
    }
  }, milliseconds);
}

},{}],5:[function(require,module,exports){
'use strict';

var _templates = require('./templates');

var _utils = require('./utils');

var _elements = require('./elements');

var _cards = require('./cards');

const deck = (0, _cards.createDeck)();

const dealerHand = new Set();
(0, _cards.dealInitialHand)(dealerHand, deck);
(0, _cards.flipCardDown)([...dealerHand][0]);

const playerHand = new Set();
(0, _cards.dealInitialHand)(playerHand, deck);

(0, _elements.render)(_elements.dealerEl, dealerHand);
(0, _elements.render)(_elements.playerEl, playerHand);

function* dealerPlay() {
  _elements.dealerEl.querySelector('.card').classList.add("flipped");
  // keep hitting until you at least tie
  while ((0, _cards.countHand)(dealerHand) < (0, _cards.countHand)(playerHand)) {
    (0, _elements.addCard)(_elements.dealerEl, dealerHand, (0, _cards.pop)(deck));
    yield;
  }
  // if tied but less than 17, hit again for the win
  if ((0, _cards.countHand)(dealerHand) === (0, _cards.countHand)(playerHand)) {
    if ((0, _cards.countHand)(dealerHand) < 17) {
      (0, _elements.addCard)(_elements.dealerEl, dealerHand, (0, _cards.pop)(deck));
      yield;
    }
  }
}

function dealerTurn(callback) {
  (0, _utils.wait)(dealerPlay(), 1000, callback);
}

function hit() {
  (0, _elements.addCard)(_elements.playerEl, playerHand, (0, _cards.pop)(deck));
  (0, _elements.updateLabel)(_elements.playerEl, playerHand);
  const score = (0, _cards.countHand)(playerHand);
  if (score > 21) {
    _elements.buttonsEl.classList.add('hidden');
    (0, _elements.status)('Bust!');
  } else if (score === 21) {
    stay();
  }
}

function stay() {
  _elements.buttonsEl.classList.add('hidden');
  _elements.dealerEl.querySelector('.score').classList.remove('hidden');
  dealerTurn(() => {
    (0, _elements.updateLabel)(_elements.dealerEl, dealerHand);
    const dealerScore = (0, _cards.countHand)(dealerHand);
    const playerScore = (0, _cards.countHand)(playerHand);
    if (dealerScore > 21 || dealerScore < playerScore) {
      (0, _elements.status)('You win!');
    } else if (dealerScore === playerScore) {
      (0, _elements.status)('Push.');
    } else {
      (0, _elements.status)('Dealer wins!');
    }
  });
}

document.querySelector('.hit-me').addEventListener('click', hit);
document.querySelector('.stay').addEventListener('click', stay);

},{"./cards":1,"./elements":2,"./templates":3,"./utils":4}]},{},[5]);
