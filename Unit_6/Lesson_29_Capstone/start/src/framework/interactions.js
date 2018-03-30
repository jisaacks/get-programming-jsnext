import { throttle } from './utils';

const SPACE = 32
const UP    = 38
const LEFT  = 37
const RIGHT = 39

const actions = {
  [SPACE]: false,
  [UP]:    false,
  [LEFT]:  false,
  [RIGHT]: false
}

const constrolledSprites = new Set();

export function registerControllableSprite(sprite) {
  constrolledSprites.add(sprite);
}

function handleKeyDown(event) {
  actions[event.keyCode] = true
}

function handleKeyUp(event) {
  actions[event.keyCode] = false
}

const delay = method => throttle(
  () => {
    for (const sprite of constrolledSprites) {
      sprite[method]();
    }
  }
);

const accelerate = delay('accelerate');
const turnCCW    = delay('turnCCW');
const turnCW     = delay('turnCW');

export function next() {
  if (actions[UP]) accelerate();
  if (actions[RIGHT]) turnCW();
  if (actions[LEFT]) turnCCW();
}

export function isPressingSpace() {
  return actions[SPACE];
}

export function start() {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
}

export function stop() {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('keyup', handleKeyUp)
}
