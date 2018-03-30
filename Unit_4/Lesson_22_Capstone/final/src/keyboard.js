const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const firstRow = alphabet.slice(0, 13)
const secondRow = alphabet.slice(13)

function key(letter, guesses) {
  if (guesses.includes(letter)) {
    return `<span>${letter}</span>`
  } else {
    return `<button data-char=${letter}>${letter}</button>`
  }
}

export default function keyboard(guesses) {
  return `
    <div>
      <div>${ firstRow.map(char => key(char, guesses)).join('') }</div>
      <div>${ secondRow.map(char => key(char, guesses)).join('') }</div>
    </div>
  `
}
