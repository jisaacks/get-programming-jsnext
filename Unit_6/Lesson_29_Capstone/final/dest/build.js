(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('./framework/canvas');

var _drifting_sprite = require('./framework/drifting_sprite');

var _drifting_sprite2 = _interopRequireDefault(_drifting_sprite);

var _shapes = require('./shapes');

var _game = require('./framework/game');

var _utils = require('./framework/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultOptions() {
  return {
    size: 20,
    sides: 20,
    speed: 1,
    x: Math.random() * _canvas.CANVAS_WIDTH,
    y: Math.random() * _canvas.CANVAS_HEIGHT,
    rotation: Math.random() * (Math.PI * 2)
  };
}

class Comet extends _drifting_sprite2.default {

  constructor(options) {
    super(Object.assign({}, defaultOptions(), options));
    this.shape = (0, _shapes.cometShape)(this.size, this.sides);
  }

  multiply() {
    const x = (0, _game.getSpriteProperty)(this, 'x');
    const y = (0, _game.getSpriteProperty)(this, 'y');
    let size = (0, _game.getSpriteProperty)(this, 'size');
    let speed = (0, _game.getSpriteProperty)(this, 'speed');

    if (size < 5) {
      this.remove();
      return;
    }
    size /= 2;
    speed *= 1.5;
    const removeOnExit = size < 5;
    const r = Math.random() * Math.PI;
    const ninetyDeg = Math.PI / 2;
    (0, _utils.range)(4).forEach(i => new Comet({
      x, y, size, speed, removeOnExit,
      rotation: r + ninetyDeg * i
    }));
    this.remove();
  }
}
exports.default = Comet;
Comet.stroke = '#73C990';

},{"./framework/canvas":3,"./framework/drifting_sprite":5,"./framework/game":6,"./framework/utils":10,"./shapes":12}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sprite = require('./framework/sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _shapes = require('./shapes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const START_SIZE = 10;
const END_SIZE = 50;
const SIDES = 8;

const defaultOptions = {
  size: START_SIZE
};

class Explosion extends _sprite2.default {
  constructor(options) {
    super(Object.assign({}, defaultOptions, options));
    this.shape = (0, _shapes.explosionShape)(this.size, SIDES);
  }

  next() {
    this.size = this.size * 1.1;
    this.shape = (0, _shapes.explosionShape)(this.size, SIDES);
    this.fill = `rgba(255, 100, 0, ${ (END_SIZE - this.size) * .005 })`;
    this.stroke = `rgba(255, 0, 0, ${ (END_SIZE - this.size) * .1 })`;
    if (this.size > END_SIZE) {
      this.remove();
    }
    return this;
  }
}
exports.default = Explosion;

},{"./framework/sprite":9,"./shapes":12}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
exports.next = next;
exports.draw = draw;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = exports.CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = exports.CANVAS_HEIGHT = canvas.height;

function clear() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function next() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw({ x, y, rotation, shape, fill, stroke }) {
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _canvas = require('./canvas');

var _interactions = require('./interactions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultOptions = {
  x: _canvas.CANVAS_WIDTH / 2,
  y: _canvas.CANVAS_HEIGHT / 2,
  rotation: 0,
  vr: 0,
  vx: 0,
  vy: 0
};

class ControllableSprite extends _sprite2.default {

  constructor(options) {
    super(Object.assign({}, defaultOptions, options));
    (0, _interactions.registerControllableSprite)(this);
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
    const dx = Math.cos(this.rotation);
    const dy = Math.sin(this.rotation);

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
exports.default = ControllableSprite;

},{"./canvas":3,"./interactions":8,"./sprite":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _game = require('./game');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DriftingSprite extends _sprite2.default {

  next() {
    const speed = (0, _game.getSpriteProperty)(this, 'speed') || 1;
    const rotation = (0, _game.getSpriteProperty)(this, 'rotation') || 0;

    this.x += Math.cos(rotation) * speed;
    this.y += Math.sin(rotation) * speed;

    return this;
  }

}
exports.default = DriftingSprite;

},{"./game":6,"./sprite":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSprite = registerSprite;
exports.unregisterSprite = unregisterSprite;
exports.getSpriteProperty = getSpriteProperty;
exports.getSpriteProperties = getSpriteProperties;
exports.start = start;
exports.stop = stop;

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _canvas = require('./canvas');

var canvas = _interopRequireWildcard(_canvas);

var _interactions = require('./interactions');

var interactions = _interopRequireWildcard(_interactions);

var _hit_test = require('./hit_test');

var _hit_test2 = _interopRequireDefault(_hit_test);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const allSprites = new Set();
const spritesByType = new Map();
let raf;
let gameOver = false;

function registerSprite(sprite) {
  const type = sprite.constructor;

  allSprites.add(sprite);

  let proto = Object.getPrototypeOf(sprite);
  while (proto instanceof _sprite2.default) {

    const type = proto.constructor;

    if (!spritesByType.has(type)) {
      spritesByType.set(type, new Set());
    }

    spritesByType.get(type).add(sprite);

    proto = Object.getPrototypeOf(proto);
  }
}

function unregisterSprite(sprite) {
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

function getSpriteProperty(sprite, name) {
  const obj = sprite[name] ? sprite : sprite.constructor;
  return getObjectProperty(obj, name);
}

function getSpriteProperties(sprite, names) {
  return names.map(name => getSpriteProperty(sprite, name));
}

function colliding(spriteA, spriteB) {
  if (spriteA === spriteB) return false;
  return (0, _hit_test2.default)({
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
      const set = type === _sprite2.default ? allSprites : spritesByType.get(type);
      for (const instance of set || new Set()) {
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

  allSprites.forEach(sprite => draw(sprite.next()));

  raf = window.requestAnimationFrame(frame);
}

function start() {
  canvas.clear();
  interactions.start();

  raf = window.requestAnimationFrame(frame);
}

function stop() {
  console.log('Game Over');
  gameOver = true;
  interactions.stop();
  window.cancelAnimationFrame(raf);
}

},{"./canvas":3,"./hit_test":7,"./interactions":8,"./sprite":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hitTest;
function squareBounds(shape) {
  const xPoints = shape.shape.map(([x, y]) => x);
  const yPoints = shape.shape.map(([x, y]) => y);
  return {
    top: shape.y + Math.min(...yPoints),
    bottom: shape.y + Math.max(...yPoints),
    left: shape.x + Math.min(...xPoints),
    right: shape.x + Math.max(...xPoints)
  };
}

function intersects(a, b) {
  if (a.left > b.right || b.left > a.right) return false;

  if (a.bottom < b.top || b.bottom < a.top) return false;

  return true;
}

function hitTest(a, b) {
  return intersects(squareBounds(a), squareBounds(b));
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerControllableSprite = registerControllableSprite;
exports.next = next;
exports.isPressingSpace = isPressingSpace;
exports.start = start;
exports.stop = stop;

var _utils = require('./utils');

const SPACE = 32;
const UP = 38;
const LEFT = 37;
const RIGHT = 39;

const actions = {
  [SPACE]: false,
  [UP]: false,
  [LEFT]: false,
  [RIGHT]: false
};

const constrolledSprites = new Set();

function registerControllableSprite(sprite) {
  constrolledSprites.add(sprite);
}

function handleKeyDown(event) {
  actions[event.keyCode] = true;
}

function handleKeyUp(event) {
  actions[event.keyCode] = false;
}

const delay = method => (0, _utils.throttle)(() => {
  for (const sprite of constrolledSprites) {
    sprite[method]();
  }
});

const accelerate = delay('accelerate');
const turnCCW = delay('turnCCW');
const turnCW = delay('turnCW');

function next() {
  if (actions[UP]) accelerate();
  if (actions[RIGHT]) turnCW();
  if (actions[LEFT]) turnCCW();
}

function isPressingSpace() {
  return actions[SPACE];
}

function start() {
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
}

function stop() {
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
}

},{"./utils":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('./canvas');

var _game = require('./game');

function defaultOptions() {
  const x = Math.random() * _canvas.CANVAS_WIDTH;
  const y = Math.random() * _canvas.CANVAS_HEIGHT;
  const rotation = Math.random() * (Math.PI * 2);
}

class Sprite {

  constructor(options) {
    Object.assign(this, defaultOptions(), options);
    (0, _game.registerSprite)(this);
  }

  remove() {
    (0, _game.unregisterSprite)(this);
  }

  next() {
    return this;
  }
  collision() {}

}
exports.default = Sprite;

},{"./canvas":3,"./game":6}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
exports.throttle = throttle;
function range(length) {
  return Array.from({ length }, (x, i) => i);
}

function throttle(fn) {
  let count = 0;
  return (...args) => {
    count++;
    if (count >= 5) {
      count = 0;
      fn(...args);
    }
  };
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _drifting_sprite = require('./framework/drifting_sprite');

var _drifting_sprite2 = _interopRequireDefault(_drifting_sprite);

var _game = require('./framework/game');

var _explosion = require('./explosion');

var _explosion2 = _interopRequireDefault(_explosion);

var _shapes = require('./shapes');

var _comet = require('./comet');

var _comet2 = _interopRequireDefault(_comet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Rocket extends _drifting_sprite2.default {

  collision(target) {
    new _explosion2.default({
      x: (0, _game.getSpriteProperty)(this, 'x'),
      y: (0, _game.getSpriteProperty)(this, 'y')
    });
    target.multiply();
    this.remove();
  }
}
exports.default = Rocket;
Rocket.shape = _shapes.rocket;
Rocket.fill = '#1AC2FB';
Rocket.removeOnExit = true;
Rocket.speed = 5;
Rocket.collidesWith = [_comet2.default];

},{"./comet":1,"./explosion":2,"./framework/drifting_sprite":5,"./framework/game":6,"./shapes":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cometShape = cometShape;
exports.explosionShape = explosionShape;
const ship = exports.ship = [[10, 0], [-10, -5], [-7, 0], [-10, 5], [10, 0]];

const rocket = exports.rocket = [[10, 0], [0, -5], [0, 5], [10, 0]];

const ufo = exports.ufo = [[-20, 0], [-5, -5], [-5, -10], [5, -10], [5, -5], [20, 0], [5, 10], [-5, 10], [-20, 0]];

function cometShape(size, sides) {
  const points = [];
  for (let i = 0; i < 2; i += 2 / sides) {
    const distance = size + Math.random() * 6 - 3;
    points.push([Math.cos(Math.PI * i) * distance, Math.sin(Math.PI * i) * distance]);
  }

  return points;
}

function explosionShape(size, sides) {
  const points = [];
  let point = 0;
  for (let i = 0; i < 2; i += 1 / sides) {
    const distance = point % 2 ? size : size / 2;
    points.push([Math.cos(Math.PI * i) * distance, Math.sin(Math.PI * i) * distance]);
    point++;
  }

  return points;
}

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controllable_sprite = require('./framework/controllable_sprite');

var _controllable_sprite2 = _interopRequireDefault(_controllable_sprite);

var _game = require('./framework/game');

var _interactions = require('./framework/interactions');

var _utils = require('./framework/utils');

var _shapes = require('./shapes');

var _comet = require('./comet');

var _comet2 = _interopRequireDefault(_comet);

var _rocket = require('./rocket');

var _rocket2 = _interopRequireDefault(_rocket);

var _explosion = require('./explosion');

var _explosion2 = _interopRequireDefault(_explosion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Ship extends _controllable_sprite2.default {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.fire = (0, _utils.throttle)(() => {
      const x = (0, _game.getSpriteProperty)(this, 'x');
      const y = (0, _game.getSpriteProperty)(this, 'y');
      const rotation = (0, _game.getSpriteProperty)(this, 'rotation');

      new _rocket2.default({ x, y, rotation });
    }), _temp;
  }

  collision() {
    new _explosion2.default({
      x: (0, _game.getSpriteProperty)(this, 'x'),
      y: (0, _game.getSpriteProperty)(this, 'y')
    });

    this.remove();

    setTimeout(_game.stop, 500);
  }

  next() {
    super.next();

    if ((0, _interactions.isPressingSpace)()) {
      this.fire();
    }

    return this;
  }
}
exports.default = Ship;
Ship.shape = _shapes.ship;
Ship.stroke = '#fff';
Ship.collidesWith = [_comet2.default];

},{"./comet":1,"./explosion":2,"./framework/controllable_sprite":4,"./framework/game":6,"./framework/interactions":8,"./framework/utils":10,"./rocket":11,"./shapes":12}],14:[function(require,module,exports){
'use strict';

var _game = require('./framework/game');

var _ship = require('./ship');

var _ship2 = _interopRequireDefault(_ship);

var _comet = require('./comet');

var _comet2 = _interopRequireDefault(_comet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _ship2.default();

new _comet2.default();
new _comet2.default();
new _comet2.default();

(0, _game.start)();

},{"./comet":1,"./framework/game":6,"./ship":13}]},{},[14]);
