export function range(length) {
  return Array.from({ length }, (x, i) => i)
}

export function throttle(fn) {
  let count = 0
  return (...args) => {
    count++
    if (count >= 5) {
      count = 0
      fn(...args)
    }
  }
}
