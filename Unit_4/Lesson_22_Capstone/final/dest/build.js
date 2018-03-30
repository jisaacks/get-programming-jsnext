(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyboard;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const firstRow = alphabet.slice(0, 13);
const secondRow = alphabet.slice(13);

function key(letter, guesses) {
  if (guesses.includes(letter)) {
    return `<span>${ letter }</span>`;
  } else {
    return `<button data-char=${ letter }>${ letter }</button>`;
  }
}

function keyboard(guesses) {
  return `
    <div>
      <div>${ firstRow.map(char => key(char, guesses)).join('') }</div>
      <div>${ secondRow.map(char => key(char, guesses)).join('') }</div>
    </div>
  `;
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = letterSlots;
function letterSlot(letter, guesses) {
  if (guesses.includes(letter)) {
    return `<span>${ letter }</span>`;
  } else {
    return '<span>&nbsp;</span>';
  }
}

function letterSlots(word, guesses) {
  const slots = word.split('').map(letter => letterSlot(letter, guesses));

  return `<div>${ slots.join('') }</div>`;
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guessesRemaining = guessesRemaining;
exports.isGameWon = isGameWon;
exports.isGameOver = isGameOver;
exports.isStillPlaying = isStillPlaying;
const MAX_INCORRECT_GUESSES = 5;

function guessesRemaining(word, guesses) {
  const incorrectGuesses = guesses.filter(char => !word.includes(char));
  return MAX_INCORRECT_GUESSES - incorrectGuesses.length;
}

function isGameWon(word, guesses) {
  return !word.split('').find(letter => !guesses.includes(letter));
}

function isGameOver(word, guesses) {
  return !guessesRemaining(word, guesses) && !isGameWon(word, guesses);
}

function isStillPlaying(word, guesses) {
  return guessesRemaining(word, guesses) && !isGameOver(word, guesses) && !isGameWon(word, guesses);
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = statusDisplay;

var _status = require('./status');

var status = _interopRequireWildcard(_status);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getMessage(word, guesses) {
  if (status.isGameWon(word, guesses)) {
    return 'YOU WIN!';
  } else if (status.isGameOver(word, guesses)) {
    return 'GAME OVER';
  } else {
    return `Guesses Remaining: ${ status.guessesRemaining(word, guesses) }`;
  }
}

function statusDisplay(word, guesses) {
  return `<div>${ getMessage(word, guesses) }</div>`;
}

},{"./status":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRandomWord;
function getWords(cb) {
  cb(['bacon', 'teacher', 'automobile']);
}

function getRandomWord(cb) {
  getWords(words => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    cb(randomWord.toUpperCase());
  });
}

},{}],6:[function(require,module,exports){
'use strict';

var _words = require('./words');

var _words2 = _interopRequireDefault(_words);

var _status = require('./status');

var _letter_slots = require('./letter_slots');

var _letter_slots2 = _interopRequireDefault(_letter_slots);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _status_display = require('./status_display');

var _status_display2 = _interopRequireDefault(_status_display);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function drawGame(word, guesses) {
  document.querySelector('#status-display').innerHTML = (0, _status_display2.default)(word, guesses);
  document.querySelector('#letter-slots').innerHTML = (0, _letter_slots2.default)(word, guesses);
  document.querySelector('#keyboard').innerHTML = (0, _keyboard2.default)(guesses);
}

(0, _words2.default)(word => {
  const guesses = [];

  document.addEventListener('click', event => {
    if ((0, _status.isStillPlaying)(word, guesses) && event.target.tagName === 'BUTTON') {
      guesses.push(event.target.dataset.char);
      drawGame(word, guesses);
    }
  });

  drawGame(word, guesses);
});

},{"./keyboard":1,"./letter_slots":2,"./status":3,"./status_display":4,"./words":5}]},{},[6]);
