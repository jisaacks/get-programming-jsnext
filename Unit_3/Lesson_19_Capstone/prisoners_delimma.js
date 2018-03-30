// --- Prisoners

const retaliate = {
  name: 'retaliate',
  *generator() {
    let stats = []
    for(;;) {
      stats = yield {
        snitch() {
          return stats.pop() > 0
        }
      }
    }
  }
}

const never = {
  name: 'never',
  * generator() {
    for(;;) {
      yield {
        snitch() {
          return false
        }
      }
    }
  }
}

const always = {
  name: 'always',
  * generator() {
    for(;;) {
      yield {
        snitch() {
          return true
        }
      }
    }
  }
}

const rand = {
  name: 'random',
  * generator() {
    for(;;) {
      yield {
        snitch() {
          return Math.random() > 0.5
        }
      }
    }
  }
}

// --- Simulation

function* getPrisoners({ name, generator }) {
  const stats = [], prisoners = generator()

  for(;;) {
    const prisoner = prisoners.next(stats.slice()).value

    const finished = yield Object.assign({}, prisoner, {
      sentencedTo(years) {
        stats.push(years)
      }
    })

    if (finished) {
      break
    }
  }

  return { name, stats }
}

function getScore({ value }) {
  const { name, stats } = value
  const score = stats.reduce( (total, years) => total + years)
  return {
    [name]: score
  }
}

function interrogate(criminal, accomplice) {

  const criminalsnitched = criminal.snitch()
  const accomplicesnitched = accomplice.snitch()

  if (criminalsnitched && accomplicesnitched) {
    criminal.sentencedTo(1)
    accomplice.sentencedTo(1)
  } else if (criminalsnitched) {
    criminal.sentencedTo(0)
    accomplice.sentencedTo(2)
  } else if (accomplicesnitched) {
    criminal.sentencedTo(2)
    accomplice.sentencedTo(0)
  } else {
    criminal.sentencedTo(0)
    accomplice.sentencedTo(0)
  }
}

function do50times(cb) {
  for (let i = 0; i < 50; i++) {
    cb()
  }
}

function test(...candidates) {

  const factories = candidates.map(getPrisoners)
  const tested = []

  for(;;) {
    const criminal = factories.pop()
    tested.push(criminal)

    do50times(() => interrogate(criminal.next().value, criminal.next().value))

    if (!factories.length) {
      break
    }

    for (let i = 0; i < factories.length; i++) {
      const accomplice = factories[i]
      do50times(() => interrogate(criminal.next().value, accomplice.next().value))
    }
  }

  return Object.assign.apply({}, tested.map(criminal => (
    getScore(criminal.next(true)
  ))))
}

test(retaliate , never, always, rand);
