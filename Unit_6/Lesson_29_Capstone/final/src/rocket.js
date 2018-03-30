import DriftingSprite from './framework/drifting_sprite';
import { getSpriteProperty } from './framework/game';
import Explosion from './explosion';
import { rocket } from './shapes';
import Comet from './comet';


export default class Rocket extends DriftingSprite {
  static shape = rocket;
  static fill = '#1AC2FB';
  static removeOnExit = true;
  static speed = 5;
  static collidesWith = [Comet];

  collision(target) {
    new Explosion({
      x: getSpriteProperty(this, 'x'),
      y: getSpriteProperty(this, 'y'),
    });
    target.multiply();
    this.remove();
  }
}
