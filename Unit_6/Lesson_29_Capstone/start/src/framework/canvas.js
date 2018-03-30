const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

export const CANVAS_WIDTH  = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

export function clear() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function next() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function draw({x, y, rotation, shape, fill, stroke}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.moveTo(shape[0][0], shape[0][1]);
  ctx.beginPath();
  shape.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  ctx.restore();
}
