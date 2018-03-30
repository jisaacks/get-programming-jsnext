import Sprite from './sprite';
import * as canvas from './canvas';
import * as interactions from './interactions';
import hitTest from './hit_test';

const allSprites = new Set();
const spritesByType = new Map();
let raf;
let gameOver = false;

export function registerSprite(sprite) {
  const type = sprite.constructor;

  allSprites.add(sprite);

  let proto = Object.getPrototypeOf(sprite)
  while(proto instanceof Sprite) {

    const type = proto.constructor;

    if (!spritesByType.has(type)) {
      spritesByType.set(type, new Set());
    }

    spritesByType.get(type).add(sprite);

    proto = Object.getPrototypeOf(proto);
  }
}

export function unregisterSprite(sprite) {
  allSprites.delete(sprite);
  for (const set of spritesByType.values()) {
    set.delete(sprite);
  }
}

function loopCanvas(sprite) {
  if (sprite.x < 0) sprite.x = canvas.CANVAS_WIDTH;
  if (sprite.y < 0) sprite.y = canvas.CANVAS_HEIGHT;
  if (sprite.x > canvas.CANVAS_WIDTH) sprite.x = 0;
  if (sprite.y > canvas.CANVAS_HEIGHT) sprite.y = 0;
}

function isOutsideCanvas(sprite) {
  if (sprite.x < 0) return true;
  if (sprite.y < 0) return true;
  if (sprite.x > canvas.CANVAS_WIDTH) return true;
  if (sprite.y > canvas.CANVAS_HEIGHT) return true;
  return false;
}

function getObjectProperty(obj, name) {
  const prop = obj[name];
  if (typeof prop === 'function') {
    return obj[name]();
  } else {
    return prop;
  }
}

export function getSpriteProperty(sprite, name) {
  const obj = sprite[name] ? sprite : sprite.constructor;
  return getObjectProperty(obj, name);
}

export function getSpriteProperties(sprite, names) {
  return names.map(name => getSpriteProperty(sprite, name));
}

function colliding(spriteA, spriteB) {
  if (spriteA === spriteB) return false;
  return hitTest({
    x: getSpriteProperty(spriteA, 'x'),
    y: getSpriteProperty(spriteA, 'y'),
    shape: getSpriteProperty(spriteA, 'shape')
  }, {
    x: getSpriteProperty(spriteB, 'x'),
    y: getSpriteProperty(spriteB, 'y'),
    shape: getSpriteProperty(spriteB, 'shape')
  });
}

function draw(sprite) {

  const collidesWith = getSpriteProperty(sprite, 'collidesWith');
  if (collidesWith) {
    searching: for (const type of collidesWith) {
      const set = type === Sprite ? allSprites : spritesByType.get(type);
      for (const instance of set || new Set) {
        if (colliding(sprite, instance)) {
          sprite.collision(instance);
          break searching;
        }
      }
    }
  }

  if (isOutsideCanvas(sprite)) {
    if (getSpriteProperty(sprite, 'removeOnExit')) {
      unregisterSprite(sprite);
      return;
    } else {
      loopCanvas(sprite);
    }
  }

  const props = 'x y rotation shape fill stroke'.split(' ');
  const [x, y, rotation, shape, fill, stroke] = getSpriteProperties(sprite, props);

  canvas.draw({ x, y, rotation, shape, fill, stroke });
}

function frame() {
  if (gameOver) return;

  canvas.next();

  interactions.next();

  allSprites.forEach(sprite => draw( sprite.next() ));

  raf = window.requestAnimationFrame(frame);
}

export function start() {
  canvas.clear();
  interactions.start();

  raf = window.requestAnimationFrame(frame);
}

export function stop() {
  console.log('Game Over');
  gameOver = true;
  interactions.stop();
  window.cancelAnimationFrame(raf);
}
