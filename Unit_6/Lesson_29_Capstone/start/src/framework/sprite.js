import { CANVAS_WIDTH, CANVAS_HEIGHT } from './canvas';
import { registerSprite, unregisterSprite } from './game';

function defaultOptions() {
  const x = Math.random() * CANVAS_WIDTH;
  const y = Math.random() * CANVAS_HEIGHT;
  const rotation = Math.random() * (Math.PI * 2);
}

export default class Sprite {

  constructor(options) {
    Object.assign(this, defaultOptions(), options);
    registerSprite(this);
  }

  remove() {
    unregisterSprite(this);
  }

  next() {
    return this;
  }
  collision() {
    
  }

}
