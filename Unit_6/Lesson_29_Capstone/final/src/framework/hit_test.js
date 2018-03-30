function squareBounds(shape) {
  const xPoints = shape.shape.map(([x, y]) => x)
  const yPoints = shape.shape.map(([x, y]) => y)
  return {
    top:    shape.y + Math.min(...yPoints),
    bottom: shape.y + Math.max(...yPoints),
    left:   shape.x + Math.min(...xPoints),
    right:  shape.x + Math.max(...xPoints)
  }
}

function intersects(a, b) {
  if (a.left > b.right || b.left > a.right)
      return false

  if (a.bottom < b.top || b.bottom < a.top)
      return false

  return true
}

export default function hitTest(a, b) {
  if (Number.isNaN(a.x + a.y + b.x + b.y)) return false;
  return intersects(
    squareBounds(a),
    squareBounds(b)
  )
}
