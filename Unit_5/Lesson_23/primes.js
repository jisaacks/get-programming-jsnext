// function primesIterator () {
//   const primes = [2, 3, 5]
//   return {
//     next() {
//       const value = primes.shift()
//       const done = !value
//       return {
//         value,
//         done
//       }
//     }
//   }
// }

function* primesIterator () {
  yield 2
  yield 3
  yield 5
}

const primesIterable = {
  [Symbol.iterator]: primesIterator
}

const myPrimes = [ ...primesIterable ]

[ ...primesIterator() ]
