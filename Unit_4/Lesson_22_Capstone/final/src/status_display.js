import * as status from './status'

function getMessage(word, guesses) {
  if (status.isGameWon(word, guesses)) {
    return 'YOU WIN!'
  } else if (status.isGameOver(word, guesses)) {
    return 'GAME OVER'
  } else {
    return `Guesses Remaining: ${status.guessesRemaining(word, guesses)}`
  }
}

export default function statusDisplay(word, guesses) {
  return `<div>${getMessage(word, guesses)}</div>`
}
