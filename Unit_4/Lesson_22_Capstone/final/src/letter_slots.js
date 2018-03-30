function letterSlot(letter, guesses) {
  if (guesses.includes(letter)) {
    return `<span>${letter}</span>`
  } else {
    return '<span>&nbsp;</span>'
  }
}

export default function letterSlots(word, guesses) {
  const slots = word.split('').map(letter => letterSlot(letter, guesses))

  return `<div>${ slots.join('') }</div>`
}
