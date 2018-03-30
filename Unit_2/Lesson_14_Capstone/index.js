function lock(secret) {
  const key = Symbol('key')

  return {
    key, unlock(keyUsed) {
      if (keyUsed === key) {
        return secret
      } else {
        return '*'.repeat( secret.length || secret.toString().length )
      }
    }
  }
}

function choose(message, options, secondAttempt) {
  const opts = options.map(function(option, index) {  <1>
    return `Type ${index+1} for: ${option}`
  })

  const resp = Number( prompt(`${message}\n\n${opts.join('\n')}`) ) - 1 <2>

  if ( options[resp] ) {
    return resp                  <3>
  } else if (!secondAttempt) {
    return choose(`Last try!\n${message}`, options, true)  <4>
  } else {
    throw Error('No selection')  <5>
  }
}

function init() {
  const { key:key1, unlock:door1 } = lock('A new car')
  const { key:key2, unlock:door2 } = lock('A trip to Hawaii')
  const { key:key3, unlock:door3 } = lock('$100 Dollars')

  const keys = [key1, key2, key3]
  const doors = [door1, door2, door3]

  const key = keys[Math.floor(Math.random() * 3)]

  const message = 'You have been given a \u{1F511} please choose a door.'

  const options = doors.map(function(door, index) {
    return `Door #${index+1}: ${door()}`
  })

  const door = doors[ choose(message, options) ]

  alert( door(key) )
}
