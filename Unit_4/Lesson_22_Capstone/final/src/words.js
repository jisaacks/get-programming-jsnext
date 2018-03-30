function getWords(cb) {
  cb(['bacon', 'teacher', 'automobile'])
}

export default function getRandomWord(cb) {
  getWords(words => {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    cb(randomWord.toUpperCase())
  })
}
