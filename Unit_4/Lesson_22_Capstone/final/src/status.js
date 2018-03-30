const MAX_INCORRECT_GUESSES = 5

export function guessesRemaining(word, guesses) {
  const incorrectGuesses = guesses.filter(char => !word.includes(char))
  return MAX_INCORRECT_GUESSES - incorrectGuesses.length
}

export function isGameWon(word, guesses) {
  return !word.split('').find(letter => !guesses.includes(letter))
}

export function isGameOver(word, guesses) {
  return !guessesRemaining(word, guesses) && !isGameWon(word, guesses)
}

export function isStillPlaying(word, guesses) {
  return guessesRemaining(word, guesses) &&
         !isGameOver(word, guesses) &&
         !isGameWon(word, guesses)
}
