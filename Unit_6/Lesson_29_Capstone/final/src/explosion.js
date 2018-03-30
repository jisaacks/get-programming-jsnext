import Sprite from './framework/sprite';
import { explosionShape } from './shapes';

const START_SIZE = 10;
const END_SIZE = 50;
const SIDES = 8;

const defaultOptions = {
  size: START_SIZE
}

export default class Explosion extends Sprite {
  constructor(options) {
    super(Object.assign({}, defaultOptions, options));
    this.shape = explosionShape(this.size, SIDES);
  }

  next() {
    this.size = this.size * 1.1;
    this.shape = explosionShape(this.size, SIDES);
    this.fill = `rgba(255, 100, 0, ${(END_SIZE-this.size)*.005})`
    this.stroke = `rgba(255, 0, 0, ${(END_SIZE-this.size)*.1})`
    if (this.size > END_SIZE) {
      this.remove();
    }
    return this;
  }
}
