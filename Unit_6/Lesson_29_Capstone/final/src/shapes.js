export const ship = [
  [10, 0], [-10, -5], [-7, 0], [-10, 5], [10, 0]
]

export const rocket = [
  [10, 0], [0, -5], [0, 5], [10, 0]
]

export const ufo = [
  [-20, 0], [-5, -5], [-5, -10], [5, -10], [5, -5],
  [20, 0], [5, 10], [-5, 10], [-20, 0]
]

export function cometShape(size, sides) {
  const points = []
  for (let i = 0; i < 2; i += 2/sides) {
    const distance = size + (Math.random() * 6) - 3
    points.push([
      Math.cos(Math.PI*i)*distance,
      Math.sin(Math.PI*i)*distance
    ])
  }

  return points
}

export function explosionShape(size, sides) {
  const points = []
  let point = 0
  for (let i = 0; i < 2; i += 1/sides) {
    const distance = point % 2 ? size : size / 2
    points.push([
      Math.cos(Math.PI*i)*distance,
      Math.sin(Math.PI*i)*distance
    ])
    point++
  }

  return points
}
