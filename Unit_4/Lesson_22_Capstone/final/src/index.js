import getRandomWord from './words'
import { isStillPlaying } from './status'
import letterSlots from './letter_slots'
import keyboard from './keyboard'
import statusDisplay from './status_display'

function drawGame(word, guesses) {
  document.querySelector('#status-display').innerHTML = statusDisplay(word, guesses)
  document.querySelector('#letter-slots').innerHTML = letterSlots(word, guesses)
  document.querySelector('#keyboard').innerHTML = keyboard(guesses)
}

getRandomWord(word => {
  const guesses = []

  document.addEventListener('click', event => {
    if (isStillPlaying(word, guesses) && event.target.tagName === 'BUTTON') {
      guesses.push(event.target.dataset.char)
      drawGame(word, guesses)
    }
  })

  drawGame(word, guesses)
})
