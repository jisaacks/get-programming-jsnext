const baseSpaceShip = {
  [Symbol.for('Spaceship.weapon')]: {
    fire() {
      // the default shooting implementation
    }
  },
  fire: function() {
    if (this.hasAmmo()) {
      const weapon = this[Symbol.for('Spaceship.weapon')];
      weapon.fire();
      this.decrementAmmo();
    }
  },

  // other methods omitted
}

const bomberSpaceShip = Object.assign({}, baseSpaceShip, {
  [Symbol.for('Spaceship.weapon')]: {
    fire() {
      // drop a bomb
    }
  }
});
