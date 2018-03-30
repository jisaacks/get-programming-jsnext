import { CANVAS_WIDTH, CANVAS_HEIGHT } from './framework/canvas';
import DriftingSprite from './framework/drifting_sprite';
import { cometShape } from './shapes'
import { getSpriteProperty } from './framework/game';
import { range } from './framework/utils';

function defaultOptions() {
  return {
    size: 20,
    sides: 20,
    speed: 1,
    x: Math.random() * CANVAS_WIDTH,
    y: Math.random() * CANVAS_HEIGHT,
    rotation: Math.random() * (Math.PI * 2)
  }
}

export default class Comet extends DriftingSprite {
  static stroke = '#73C990';

  constructor(options) {
    super(Object.assign({}, defaultOptions(), options));
    this.shape = cometShape(this.size, this.sides);
  }

  multiply() {
    const x = getSpriteProperty(this, 'x');
    const y = getSpriteProperty(this, 'y');
    let size = getSpriteProperty(this, 'size');
    let speed = getSpriteProperty(this, 'speed');

    if (size < 5) {
      this.remove();
      return;
    }
    size /= 2;
    speed *= 1.5;
    const removeOnExit = size < 5;
    const r = Math.random() * Math.PI;
    const ninetyDeg = Math.PI/2;
    range(4).forEach(i => new Comet({
      x, y, size, speed, removeOnExit,
      rotation: r + ninetyDeg * i,
    }))
    this.remove();
  }
}
