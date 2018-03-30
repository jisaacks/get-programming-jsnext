import ControllableSprite from './framework/controllable_sprite';
import { getSpriteProperty, stop } from './framework/game';
import { isPressingSpace } from './framework/interactions';
import { throttle } from './framework/utils';
import { ship as shape } from './shapes';
import Comet from './comet';
import Rocket from './rocket';
import Explosion from './explosion';

export default class Ship extends ControllableSprite {
  static shape = shape;
  static stroke = '#fff';
  static collidesWith = [Comet];

  fire = throttle(() => {
    const x = getSpriteProperty(this, 'x');
    const y = getSpriteProperty(this, 'y');
    const rotation = getSpriteProperty(this, 'rotation');

    new Rocket({ x, y, rotation });
  })

  collision() {
    new Explosion({
      x: getSpriteProperty(this, 'x'),
      y: getSpriteProperty(this, 'y'),
    });

    this.remove();

    setTimeout(stop, 500);
  }

  next() {
    super.next();

    if (isPressingSpace()) {
      this.fire();
    }

    return this;
  }
}
