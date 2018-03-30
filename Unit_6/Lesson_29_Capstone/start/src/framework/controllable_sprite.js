import Sprite from './sprite';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './canvas';
import { registerControllableSprite } from './interactions';

const defaultOptions = {
  x: CANVAS_WIDTH/2,
  y: CANVAS_HEIGHT/2,
  rotation: 0,
  vr: 0,
  vx: 0,
  vy: 0
};

export default class ControllableSprite extends Sprite {

  constructor(options) {
    super(Object.assign({}, defaultOptions, options));
    registerControllableSprite(this);
  }

  next() {
    this.rotation += this.vr;
    this.vr *= .95;

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= .99;
    this.vy *= .99;

    return this;
  }

  accelerate() {
    const dx = Math.cos( this.rotation );
    const dy = Math.sin( this.rotation );

    this.vx += dx * .2;
    this.vy += dy * .2;
  }

  turnCCW() {
    if (this.vr > 0) {
      this.vr = 0;
    }
    this.vr = Math.max(this.vr - .03, -.09);
  }

  turnCW() {
    if (this.vr < 0) {
      this.vr = 0;
    }
    this.vr = Math.min(this.vr + .03, .09);
  }

}
