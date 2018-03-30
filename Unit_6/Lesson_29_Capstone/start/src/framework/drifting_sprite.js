import Sprite from './sprite';
import { getSpriteProperty } from './game';

export default class DriftingSprite extends Sprite {

  next() {
    const speed = getSpriteProperty(this, 'speed') || 1;
    const rotation = getSpriteProperty(this, 'rotation') || 0;

    this.x += Math.cos(rotation) * speed;
    this.y += Math.sin(rotation) * speed;

    return this;
  }

}
