import { cardTemplate } from './templates';
import { countHand } from './cards';

const app = document.querySelector('#blackjack');
const statusEl = app.querySelector('.status');

export const dealerEl = app.querySelector('.dealer');
export const playerEl = app.querySelector('.player');
export const buttonsEl = app.querySelector('.buttons');

function domNode(str) {
  var template = document.createElement('template');
  template.innerHTML = str;
  return template.content.firstChild;
}

export function render(element, hand) {
  element.querySelector('.hand').innerHTML = [...hand].map(cardTemplate).join('');
  element.querySelector('.score').innerHTML = countHand(hand);
  updateLabel(element, hand);
}

export function addCard(element, hand, card) {
  hand.add(card);
  const cardNode = domNode(cardTemplate(card));
  element.querySelector('.hand').classList.add("adding");
  element.querySelector('.hand').appendChild(cardNode);
  element.querySelector('.score').innerHTML = countHand(hand);
  setTimeout(() => element.querySelector('.hand').classList.remove("adding"), 10);
}

export function updateLabel(element, hand) {
  const scoreEl = element.querySelector('.score');
  const score = countHand(hand);
  if (score > 21) {
    scoreEl.classList.add('bust');
  } else if (score === 21) {
    scoreEl.classList.add('blackjack');
  }
}

export function status(msg) {
  statusEl.classList.remove('hidden');
  statusEl.innerHTML = msg;
}
