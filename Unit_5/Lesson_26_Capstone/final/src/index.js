import { cardTemplate } from './templates';
import { wait } from './utils';

import {
  dealerEl, playerEl, buttonsEl, updateLabel, status, render, addCard
} from './elements';

import {
  createDeck, pop, countHand, dealInitialHand, flipCardDown, flipCardUp
} from './cards';

const deck = createDeck();

const dealerHand = new Set();
dealInitialHand(dealerHand, deck);
flipCardDown([ ...dealerHand ][0]);

const playerHand = new Set();
dealInitialHand(playerHand, deck);

render(dealerEl, dealerHand);
render(playerEl, playerHand);

function* dealerPlay() {
  dealerEl.querySelector('.card').classList.add("flipped");
  // keep hitting until you at least tie
  while( countHand(dealerHand) < countHand(playerHand) ) {
    addCard(dealerEl, dealerHand, pop(deck));
    yield;
  }
  // if tied but less than 17, hit again for the win
  if ( countHand(dealerHand) === countHand(playerHand) ) {
    if (countHand(dealerHand) < 17) {
      addCard(dealerEl, dealerHand, pop(deck));
      yield;
    }
  }
}

function dealerTurn(callback) {
  wait(dealerPlay(), 1000, callback);
}

function hit() {
  addCard(playerEl, playerHand, pop(deck));
  updateLabel(playerEl, playerHand);
  const score = countHand(playerHand);
  if (score > 21) {
    buttonsEl.classList.add('hidden');
    status('Bust!');
  } else if (score === 21) {
    stay();
  }
}

function stay() {
  buttonsEl.classList.add('hidden');
  dealerEl.querySelector('.score').classList.remove('hidden');
  dealerTurn(() => {
    updateLabel(dealerEl, dealerHand);
    const dealerScore = countHand(dealerHand);
    const playerScore = countHand(playerHand);
    if (dealerScore > 21 || dealerScore < playerScore) {
      status('You win!');
    } else if (dealerScore === playerScore) {
      status('Push.');
    } else {
      status('Dealer wins!');
    }
  });
}

document.querySelector('.hit-me').addEventListener('click', hit);
document.querySelector('.stay').addEventListener('click', stay);
